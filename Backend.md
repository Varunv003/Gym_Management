# Gym Management System - Backend API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [Data Models](#data-models)
5. [API Endpoints](#api-endpoints)
   - [Authentication Endpoints](#authentication-endpoints)
   - [User Management Endpoints](#user-management-endpoints)
   - [Member Management Endpoints](#member-management-endpoints)
   - [Payment Management Endpoints](#payment-management-endpoints)
   - [Statistics Endpoints](#statistics-endpoints)
6. [Error Handling](#error-handling)
7. [Security Configuration](#security-configuration)

---

## Overview

This is a Spring Boot REST API for a Gym Management System that handles member registration, payment processing, user authentication, and administrative functionalities.

**Technology Stack:**
- Java 17+
- Spring Boot 3.x
- Spring Security 6.x
- Spring Data JPA
- JWT Authentication
- MySQL/H2 Database
- BCrypt Password Encoding

---

## Authentication

The API uses **JWT (JSON Web Token)** based authentication with the following security features:

- **Password Encryption:** BCrypt with strength 12
- **Session Management:** Stateless
- **Token Type:** Bearer Token
- **Roles:** ADMIN, USER

### Authentication Flow
1. Login with email/password
2. Receive JWT token in response
3. Include token in `Authorization` header for protected endpoints: `Bearer <token>`

---

## Base URL

```
http://localhost:8080/api
```

---

## Data Models

### User Entity
```json
{
  "id": "Long",
  "name": "String",
  "email": "String (unique)",
  "password": "String (encrypted)",
  "number": "String",
  "address": "String",
  "role": "ROLE_ADMIN | ROLE_USER"
}
```

### Member Entity
```json
{
  "id": "Long",
  "name": "String",
  "email": "String",
  "dob": "LocalDate (YYYY-MM-DD)",
  "phone": "String",
  "joinDate": "LocalDate",
  "membershipType": "Basic | Pro | Gold | Lite",
  "services": ["Personal Trainer", "Sauna Access", "Pool Access", "Group Classes"],
  "payments": ["PaymentObject"]
}
```

### Payment Entity
```json
{
  "id": "Long",
  "amount": "String",
  "date": "LocalDate (YYYY-MM-DD)",
  "member": "MemberObject"
}
```

### Enums

**MembershipType:**
- `BRONZE` → Display: "Basic"
- `SILVER` → Display: "Pro"  
- `GOLD` → Display: "Gold"
- `PLATINUM` → Display: "Lite"

**ServiceType:**
- `PERSONAL_TRAINER` → Display: "Personal Trainer"
- `SAUNA_ACCESS` → Display: "Sauna Access"
- `POOL_ACCESS` → Display: "Pool Access"
- `GROUP_CLASSES` → Display: "Group Classes"

**Role:**
- `ROLE_ADMIN`
- `ROLE_USER`

---

## API Endpoints

### Authentication Endpoints

#### Login
**POST** `/api/auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "User authenticated",
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "number": "1234567890",
      "address": "123 Main St",
      "role": "ROLE_ADMIN"
    }
  },
  "successful": true
}
```

**Error Response (401):**
```json
{
  "message": "Invalid username or password",
  "data": null,
  "successful": false
}
```

---

### User Management Endpoints

#### Create User
**POST** `/api/user/saveUser`

**Access:** ADMIN, USER (requires JWT)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "number": "1234567890",
  "address": "123 Main Street",
  "role": "ROLE_USER"
}
```

**Success Response (200):**
```json
{
  "message": "User saved successfully",
  "successful": true
}
```

#### Update User
**PUT** `/api/user/updateUser`

**Access:** ADMIN, USER (requires JWT)

**Request Body:**
```json
{
  "id": 1,
  "name": "John Updated",
  "email": "john.updated@example.com",
  "password": "newPassword123",
  "number": "9876543210",
  "address": "456 New Street",
  "role": "ROLE_USER"
}
```

#### Delete User
**DELETE** `/api/user/deleteById/{id}`

**Access:** ADMIN only (requires JWT)

**Path Parameters:**
- `id` (Long): User ID to delete

**Success Response (200):**
```json
{
  "message": "User deleted successfully",
  "successful": true
}
```

---

### Member Management Endpoints

#### Get All Members
**GET** `/api/members`

**Access:** ADMIN (requires JWT)

**Success Response (200):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "dob": "1990-05-15",
    "phone": "1234567890",
    "joinDate": "2023-01-10",
    "membershipType": "Gold",
    "services": ["Personal Trainer", "Sauna Access"],
    "payments": [
      {
        "id": 1,
        "amount": "75.50",
        "date": "2023-08-01"
      }
    ]
  }
]
```

#### Create Member
**POST** `/api/members`

**Access:** ADMIN (requires JWT)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "dob": "1990-05-15",
  "phone": "1234567890",
  "address": "123 Main Street",
  "membershipType": "Gold",
  "payment": "100.00"
}
```

**Success Response (201):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "dob": "1990-05-15",
  "phone": "1234567890",
  "joinDate": "2024-01-15",
  "membershipType": "Gold",
  "services": [],
  "payments": [
    {
      "id": 1,
      "amount": "100.00",
      "date": "2024-01-15"
    }
  ]
}
```

#### Update Member
**PUT** `/api/members/{id}`

**Access:** ADMIN (requires JWT)

**Path Parameters:**
- `id` (Long): Member ID to update

**Request Body:**
```json
{
  "id": 1,
  "name": "Johnathan Doe",
  "email": "john.doe@example.com",
  "dob": "1990-05-15",
  "joinDate": "2025-06-10",
  "membershipType": "Lite",
  "services": [
    "Pool Access",
    "Sauna Access",
    "Group Classes"
  ]
}
```

#### Delete Member
**DELETE** `/api/members/{id}`

**Access:** ADMIN (requires JWT)

**Path Parameters:**
- `id` (Long): Member ID to delete

**Success Response (204):** No Content

#### Add Payment to Member
**POST** `/api/members/{memberId}/payments`

**Access:** ADMIN (requires JWT)

**Path Parameters:**
- `memberId` (Long): Member ID

**Request Body:**
```json
{
  "amount": "75.50",
  "date": "2023-08-01"
}
```

**Success Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "payments": [
    {
      "id": 2,
      "amount": "75.50",
      "date": "2023-08-01"
    }
  ]
}
```

---

### Payment Management Endpoints

#### Get All Payments
**GET** `/api/payments`

**Access:** ADMIN (requires JWT)

**Success Response (200):**
```json
[
  {
    "id": 1,
    "amount": "100.00",
    "date": "2025-06-05",
    "memberId": 7
  }
]
```

#### Get Payment by ID
**GET** `/api/payments/{id}`

**Access:** ADMIN (requires JWT)

**Path Parameters:**
- `id` (Long): Payment ID

**Success Response (200):**
```json
{
  "id": 5,
  "amount": "150.00",
  "date": "2023-07-15",
  "memberId": 3
}
```

#### Get Payments by Member ID
**GET** `/api/payments/member/{id}`

**Access:** ADMIN (requires JWT)

**Path Parameters:**
- `id` (Long): Member ID

**Success Response (200):**
```json
[
  {
    "id": 1,
    "amount": "100.00",
    "date": "2025-06-05",
    "memberId": 7
  },
  {
    "id": 2,
    "amount": "75.50",
    "date": "2025-07-05",
    "memberId": 7
  }
]
```

#### Create Payment
**POST** `/api/payments`

**Access:** ADMIN (requires JWT)

**Request Body:**
```json
{
  "amount": "5000.00",
  "date": "2025-06-05",
  "memberId": 7
}
```

**Success Response (201):**
```json
{
  "id": 10,
  "amount": "5000.00",
  "date": "2025-06-05",
  "memberId": 7
}
```

#### Update Payment
**PUT** `/api/payments/{id}`

**Access:** ADMIN (requires JWT)

**Path Parameters:**
- `id` (Long): Payment ID to update

**Request Body:**
```json
{
  "id": 2,
  "amount": "2750.50",
  "date": "2025-05-31",
  "memberId": 1
}
```

#### Delete Payment
**DELETE** `/api/payments/{id}`

**Access:** ADMIN (requires JWT)

**Path Parameters:**
- `id` (Long): Payment ID to delete

**Success Response (204):** No Content

---

### Statistics Endpoints

#### Get Members Count by Membership Type
**GET** `/api/members/stats/by-type`

**Access:** ADMIN (requires JWT)

**Success Response (200):**
```json
[
  {
    "name": "Gold",
    "value": 15
  },
  {
    "name": "Pro",
    "value": 8
  },
  {
    "name": "Basic",
    "value": 12
  },
  {
    "name": "Lite",
    "value": 5
  }
]
```

#### Get Monthly Revenue Statistics
**GET** `/api/members/stats/monthly-revenue`

**Access:** ADMIN (requires JWT)

**Success Response (200):**
```json
[
  {
    "name": "Revenue",
    "series": [
      {
        "name": "2023-01",
        "value": 1500.00
      },
      {
        "name": "2023-02", 
        "value": 2200.50
      },
      {
        "name": "2023-03",
        "value": 1800.75
      }
    ]
  }
]
```

---

## Error Handling

### Common HTTP Status Codes

- **200 OK:** Request successful
- **201 Created:** Resource created successfully
- **204 No Content:** Resource deleted successfully
- **400 Bad Request:** Invalid request data
- **401 Unauthorized:** Authentication required or failed
- **403 Forbidden:** Access denied (insufficient permissions)
- **404 Not Found:** Resource not found
- **500 Internal Server Error:** Server error

### Error Response Format

```json
{
  "message": "Error description",
  "data": null,
  "successful": false
}
```

### Common Errors

**Authentication Required (401):**
```json
{
  "message": "Authentication required",
  "successful": false
}
```

**Access Denied (403):**
```json
{
  "message": "Access denied",
  "successful": false
}
```

**Resource Not Found (404):**
```json
{
  "message": "Member not found with id: 123",
  "successful": false
}
```

---

## Security Configuration

### Protected Endpoints
- **ADMIN only:** 
  - `/api/user/deleteById/**`
  - `/api/members`, `/api/payments` (all CRUD operations)
  
- **ADMIN + USER:**
  - `/api/user/saveUser`, `/api/user/updateUser`

### Public Endpoints
- `/api/auth/login`

### JWT Configuration
- **Algorithm:** HS256
- **Expiration:** Configurable (default implementation)
- **Header:** `Authorization: Bearer <token>`

### Password Security
- **Encryption:** BCrypt
- **Strength:** 12 rounds
- **Default Password:** "securepassword" (for new members)

---

## Additional Notes

1. **CORS:** Configured to allow requests from `http://localhost:4200` (Angular frontend)

2. **Database Relations:**
   - Member ↔ Payment: One-to-Many relationship
   - Payments are ordered by date DESC
   - Cascade operations for member deletion

3. **Data Validation:**
   - Email uniqueness enforced
   - Required fields validated
   - Date formats: YYYY-MM-DD

4. **Member Creation Process:**
   - Creates Member entity
   - Auto-creates User account for login
   - Optionally adds initial payment
   - Sets join date to current date

5. **Custom Repository Queries:**
   - Member count by membership type
   - Monthly revenue calculation with date formatting

This documentation covers all endpoints, authentication requirements, request/response formats, and security configurations for the Gym Management System backend API.
