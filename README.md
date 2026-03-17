@'
# NexusOps 🚀

**Cloud Infrastructure & Analytics Dashboard**

![NexusOps](https://img.shields.io/badge/NexusOps-v1.0-blue)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=flat&logo=terraform&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-512BD4?style=flat&logo=dotnet&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)

## 📋 Overview

NexusOps is a production-grade, full-stack cloud infrastructure and analytics dashboard built to monitor, secure, and manage cloud resources across **AWS, GCP, and Azure**. It demonstrates expertise in 15+ modern technologies including cloud computing, infrastructure as code, containerization, multiple databases, and full-stack development.

**Live Demo:** [Coming Soon]
**GitHub:** [github.com/sanikachaskar/nexusops](https://github.com/sanikachaskar/nexusops)

---

## 🎯 Skills Showcase

| Category | Technologies |
|----------|-------------|
| **☁️ Cloud Platforms** | AWS (EC2, VPC, RDS), GCP, Azure |
| **🏗️ Infrastructure as Code** | Terraform, AWS CloudFormation |
| **🐳 Containerization** | Docker, Docker Compose, Nginx |
| **🗄️ Databases** | MySQL, PostgreSQL, MongoDB, Oracle DB, Redis |
| **🔧 Backend** | ASP.NET Core, VB.NET, REST APIs |
| **🎨 Frontend** | HTML5, CSS3, PHP, TypeScript, JavaScript |
| **🔄 Version Control** | Git, GitHub, CI/CD workflows |
| **🐧 Operating System** | Linux (Ubuntu), Bash scripting |
| **🔒 Security** | IAM roles, Security Groups, TLS/SSL, VPC Networking |

---

## ✨ Features

### ✅ Module 1: Authentication & Access Control
- Role-based login (Admin/Engineer/Viewer)
- JWT token authentication
- Enterprise SSO integration
- Live session management

### ✅ Module 2: Real-Time Dashboard
- Live resource utilization charts (CPU/Memory/Network)
- Cloud provider health status (AWS/GCP/Azure)
- Activity feed with real-time events
- Database connection health monitoring

### ✅ Module 3: Cloud Resource Monitor
- 24+ live instances across AWS/GCP/Azure
- Filter by provider, status, region, type
- Live CPU/Memory bars with color coding
- Monthly cost tracking per instance
- SSH/Start/Stop/Delete actions

### ✅ Module 4: Multi-Database Viewer
- MySQL, PostgreSQL, MongoDB, Oracle DB, Redis
- Query editor with syntax highlighting
- Schema viewer with tables, columns, keys
- Real-time metrics (connections, query time, IOPS)
- Health indicators (green/yellow/red)

### ✅ Module 5: Admin Panel
- User management (Add/Edit/Delete)
- Permission matrix (Admin/Engineer/Viewer)
- System configuration toggles (2FA, Maintenance Mode)
- Complete audit log with timestamps

### 🚧 Module 6: Docker Containerization (In Progress)
- Multi-container setup with docker-compose
- Nginx reverse proxy configuration
- ASP.NET Core backend container
- MySQL, MongoDB, PostgreSQL containers
- Linux-based Alpine images

### 🚧 Module 7: Terraform IaC (In Progress)
- AWS infrastructure provisioning
- VPC with public/private subnets
- EC2 instances with auto-scaling
- RDS MySQL database
- Security groups and IAM roles

---

## 🏗️ Architecture
┌─────────────────────────────────────────────────────────────┐
│ Client Browser │
└───────────────────────────────┬─────────────────────────────┘
│ HTTPS
┌───────────────────────────────▼─────────────────────────────┐
│ Nginx Reverse Proxy │
│ (Load Balancer) │
└───────────────────────────────┬─────────────────────────────┘
│
┌───────────────────────┼───────────────────────┐
│ │ │
┌───────▼───────┐ ┌───────▼───────┐ ┌───────▼───────┐
│ Frontend │ │ Backend │ │ Admin │
│ Container │ │ Container │ │ Module │
│ (Nginx) │ │ (ASP.NET) │ │ (VB.NET) │
└───────────────┘ └───────┬───────┘ └───────────────┘
│
┌───────────────────────┼───────────────────────┐
│ │ │
┌───────▼───────┐ ┌───────▼───────┐ ┌───────▼───────┐
│ MySQL │ │ PostgreSQL │ │ MongoDB │
│ (Users) │ │ (Analytics) │ │ (Logs) │
└───────────────┘ └───────────────┘ └───────────────┘
