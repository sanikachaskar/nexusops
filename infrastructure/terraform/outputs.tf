output "server_public_ip" {
  description = "Public IP of NexusOps server"
  value       = aws_instance.nexusops_server.public_ip
}

output "server_public_dns" {
  description = "Public DNS of NexusOps server"
  value       = aws_instance.nexusops_server.public_dns
}

output "mysql_endpoint" {
  description = "MySQL RDS endpoint"
  value       = aws_db_instance.mysql.endpoint
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.nexusops.id
}

output "app_url" {
  description = "NexusOps app URL"
  value       = "http://:3000"
}
