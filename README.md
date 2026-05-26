# MiniCommerce API

A backend commerce system built with:

* NestJS
* Prisma
* PostgreSQL
* Redis
* JWT Authentication
* Refresh Tokens
* Caching
* Rate Limiting

This project was built to practice real backend engineering concepts from Day 1 → Day 13.

---

# Features

## Authentication

* Register
* Login
* JWT access tokens
* Refresh token system
* Logout
* Protected routes

---

## Products

* Create product
* Get all products
* Get single product
* Update product
* Delete product

---

## Redis Caching

* Cache product requests
* Faster API responses
* Reduced database load

---

## Rate Limiting

* API request protection
* Prevent spam requests
* Redis-powered throttling

---

# Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| NestJS     | Backend framework     |
| Prisma     | ORM                   |
| PostgreSQL | Database              |
| Redis      | Cache + rate limiting |
| JWT        | Authentication        |
| TypeScript | Language              |

---

# Project Structure

```txt
src/
│
├── auth/
├── users/
├── products/
├── prisma/
├── cache/
├── guards/
├── dto/
└── main.ts
```

---

# Request Flow Example

## Product Request Flow

```txt
Client Request
↓
Controller
↓
Service
↓
Redis Cache Check
↓
If cached → return cache
↓
If not cached → Prisma
↓
PostgreSQL
↓
Save to Redis
↓
Return Response
```

---

# Authentication Flow

```txt
Login Request
↓
Auth Controller
↓
Auth Service
↓
Validate User
↓
Generate Access Token
↓
Generate Refresh Token
↓
Save Refresh Token
↓
Return Tokens
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create:

```txt
.env
```

Add:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/minicommercedb"

JWT_SECRET="supersecret"

REDIS_HOST=localhost
REDIS_PORT=6379
```

---

# Prisma Setup

```bash
npx prisma generate
```

```bash
npx prisma migrate dev --name init
```

---

# Start Server

```bash
npm run start:dev
```

---

# API Endpoints

## Auth

| Method | Endpoint       |
| ------ | -------------- |
| POST   | /auth/register |
| POST   | /auth/login    |
| POST   | /auth/refresh  |
| POST   | /auth/logout   |

---

## Products

| Method | Endpoint      |
| ------ | ------------- |
| POST   | /products     |
| GET    | /products     |
| GET    | /products/:id |
| PATCH  | /products/:id |
| DELETE | /products/:id |

---

# Learning Goals

This project focuses on learning:

* backend architecture
* request lifecycle
* authentication systems
* refresh token security
* Redis caching
* scalable API design
* NestJS modules/services/controllers
* Prisma ORM
* production backend flow

---

# Backend Flow Understanding

This project was built with a:

# flow-first learning approach

Meaning the focus was not only on writing code, but understanding:

* where requests go
* how modules communicate
* why services exist
* why Redis matters
* how authentication works internally
* how scalable systems are structured

---

# Future Improvements

* background jobs
* BullMQ queues
* WebSockets
* payment integration
* Docker
* CI/CD
* unit testing
* microservices

---

# Author

Built by Christopher Castelo while learning backend engineering.
