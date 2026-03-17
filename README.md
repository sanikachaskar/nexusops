
---

##  Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)
- [Terraform](https://www.terraform.io/downloads) (for cloud deployment)
- [Node.js](https://nodejs.org/) (for TypeScript compilation)
- [.NET SDK 8.0](https://dotnet.microsoft.com/download)

### Local Development

```bash
# Clone the repository
git clone https://github.com/sanikachaskar/nexusops.git
cd nexusops

# Run with Docker (all services)
cd infrastructure/docker
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# MySQL: localhost:3306
# MongoDB: localhost:27017
# PostgreSQL: localhost:5432
