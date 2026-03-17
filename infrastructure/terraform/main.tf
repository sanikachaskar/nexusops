# NexusOps — AWS Infrastructure

resource "aws_vpc" "nexusops" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "nexusops-vpc", Project = "nexusops" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.nexusops.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "a"
  map_public_ip_on_launch = true
  tags = { Name = "nexusops-public" }
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.nexusops.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "b"
  tags = { Name = "nexusops-private" }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.nexusops.id
  tags   = { Name = "nexusops-igw" }
}

resource "aws_security_group" "web_sg" {
  name   = "nexusops-web-sg"
  vpc_id = aws_vpc.nexusops.id
  ingress { from_port=80;  to_port=80;  protocol="tcp"; cidr_blocks=["0.0.0.0/0"] }
  ingress { from_port=443; to_port=443; protocol="tcp"; cidr_blocks=["0.0.0.0/0"] }
  ingress { from_port=22;  to_port=22;  protocol="tcp"; cidr_blocks=[var.ssh_cidr] }
  egress  { from_port=0;   to_port=0;   protocol="-1";  cidr_blocks=["0.0.0.0/0"] }
  tags = { Name = "nexusops-web-sg" }
}

resource "aws_security_group" "db_sg" {
  name   = "nexusops-db-sg"
  vpc_id = aws_vpc.nexusops.id
  ingress { from_port=3306; to_port=3306; protocol="tcp"; security_groups=[aws_security_group.web_sg.id] }
  ingress { from_port=5432; to_port=5432; protocol="tcp"; security_groups=[aws_security_group.web_sg.id] }
  egress  { from_port=0;    to_port=0;    protocol="-1";  cidr_blocks=["0.0.0.0/0"] }
  tags = { Name = "nexusops-db-sg" }
}

resource "aws_instance" "nexusops_server" {
  ami                    = var.ec2_ami
  instance_type          = var.ec2_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.web_sg.id]
  key_name               = var.key_pair_name
  user_data = <<-UD
    #!/bin/bash
    apt-get update -y
    apt-get install -y docker.io docker-compose git
    systemctl start docker && systemctl enable docker
    git clone https://github.com/sanikachaskar/nexusops.git /opt/nexusops
    cd /opt/nexusops/infrastructure/docker && docker-compose up -d
  UD
  tags = { Name = "nexusops-server", Project = "nexusops" }
}

resource "aws_db_instance" "mysql" {
  identifier           = "nexusops-mysql"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  db_name              = "nexusops_db"
  username             = "nexusops_user"
  password             = var.db_password
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name = aws_db_subnet_group.nexusops.name
  skip_final_snapshot  = true
  tags = { Name = "nexusops-mysql" }
}

resource "aws_db_subnet_group" "nexusops" {
  name       = "nexusops-db-subnet-group"
  subnet_ids = [aws_subnet.public.id, aws_subnet.private.id]
}
