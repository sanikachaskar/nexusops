variable "aws_region"            { default = "ap-south-1"    description = "AWS region" }
variable "gcp_project_id"         { default = "nexusops-prod" description = "GCP project ID" }
variable "gcp_region"             { default = "asia-south1"   description = "GCP region" }
variable "azure_subscription_id"  { default = ""              description = "Azure subscription ID" }
variable "ec2_instance_type"      { default = "t3.medium"     description = "EC2 instance type" }
variable "ec2_ami"                { default = "ami-0f5ee92e2d63afc18" description = "Ubuntu 22.04 ap-south-1" }
variable "key_pair_name"          { default = "nexusops-key"  description = "SSH key pair" }
variable "ssh_cidr"               { default = "0.0.0.0/0"    description = "SSH allowed CIDR" }
variable "db_password"            { default = "changeme123"  description = "RDS master password" sensitive = true }
