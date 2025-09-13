# 🏋️‍♂️ Gym Management System - Backend API

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Varunv003/Gym_Management.git)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk)](https://www.oracle.com/java/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql)](https://dev.mysql.com/)

> A comprehensive REST API backend for Gym Management System with JWT authentication, member management, payment tracking, and analytics.

## ✨ Features

- **🔐 JWT Authentication** with role-based access control (ADMIN/USER)
- **👥 Member Management** - Complete CRUD operations with membership types (Basic, Pro, Gold, Lite)
- **💰 Payment Tracking** - Payment history and management per member
- **📊 Analytics** - Member statistics and monthly revenue reports
- **🛡️ Security** - BCrypt password hashing, input validation, CORS configuration
- **🏗️ Clean Architecture** - Layered design with proper separation of concerns
- **🐳 Containerised Deployment** - Run the entire application stack using Docker Compose.

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Spring Boot** | 3.x | Backend Framework |
| **Java** | 17+ | Programming Language |
| **Spring Security** | 6.x | Authentication & Authorization |
| **Spring Data JPA** | 3.x | Data Persistence |
| **MySQL** | 8.x | Database |
| **JWT** | - | Token-based Authentication |
| **BCrypt** | - | Password Encryption |
| **Maven** | 3.x | Build Tool |
| **Docker** | - | Containerized Deployment |

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8.0+


## Docker Setup
### 1. Clone the Repository

```sh
git clone https://github.com/Varunv003/Gym_Management.git

cd Gym_Management
```

### 2. Configure Your Environment

Copy the example environment file and edit your secrets:

```sh
cp .env.example .env
```

Edit `.env` and set strong passwords for `MYSQL_PASSWORD` and `MYSQL_ROOT_PASSWORD`.

### 3. Run the Application

Build and start the entire stack:

```sh
docker-compose up --build
```

The first run may take a few minutes to download images and build the app.  
Once complete, access gym_management_app at: [http://localhost:8080](http://localhost:8080)

---

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Varunv003/Gym_Management.git
   cd Gym_Management
   ```

2. **Create MySQL database:**
   ```sql
   CREATE DATABASE gym_management_db;

3. **Configure Environment Variables:**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration
   

4. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

## 📡 API Endpoints

### Authentication
```http
POST   /api/auth/login           # Login (Public)
POST   /api/user/saveUser        # Create user (ADMIN/USER)
PUT    /api/user/updateUser      # Update user (ADMIN/USER)
DELETE /api/user/deleteById/{id} # Delete user (ADMIN)
```

### Member Management
```http
GET    /api/members              # Get all members (ADMIN)
POST   /api/members              # Create member (ADMIN)
PUT    /api/members/{id}         # Update member (ADMIN)
DELETE /api/members/{id}         # Delete member (ADMIN)
POST   /api/members/{id}/payments # Add payment (ADMIN)
```

### Payment Management
```http
GET    /api/payments             # Get all payments (ADMIN)
GET    /api/payments/{id}        # Get payment by ID (ADMIN)
GET    /api/payments/member/{id} # Get member payments (ADMIN)
POST   /api/payments             # Create payment (ADMIN)
PUT    /api/payments/{id}        # Update payment (ADMIN)
DELETE /api/payments/{id}        # Delete payment (ADMIN)
```

### Analytics
```http
GET    /api/members/stats/by-type        # Members by type (ADMIN)
GET    /api/members/stats/monthly-revenue # Revenue stats (ADMIN)
```

## 🔧 Postman Collection

### Import Collection
1. Open Postman
2. Click **Import** → **File**
3. Navigate to project folder: `postman/GYM.postman_collection.json`
4. Select and import the file
5. Set environment variable: `baseUrl = http://localhost:8080/api`

### Usage
1. **Login** using the login endpoint to get JWT token
2. **Copy the JWT** from response
3. **Set Authorization** header: `Bearer <your-jwt-token>`
4. **Test other endpoints** with the token

**Note:** All endpoints except login require authentication. Admin role is required for member/payment management.

**⚠️ Important:** The `.env` file contains sensitive information and is ignored by git. Make sure to create your own `.env` file based on `.env.example`.

---

**📖 For detailed API documentation, see [Backend.md](Backend.md)**


