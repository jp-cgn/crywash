# 💼 Wallet Backend API

A backend API built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.
This project focuses on **secure user authentication** and **user-owned wallet management** using a clean REST architecture.

> 🚧 This project is currently in **MVP / learning stage** and under active development.

---

## ✨ Features

* 🔐 JWT authentication via **HTTP-only cookies**
* 👤 User-based access control (ownership enforced)
* 💼 Wallet management (create, list, delete)
* 📄 Pagination support
* 🗄 Prisma ORM with PostgreSQL
* ⚡ Indexed queries for performance
* 🧱 Clean and minimal REST design

---

## 🧱 Tech Stack

* **Node.js**
* **Express**
* **Prisma**
* **PostgreSQL**
* **JWT (Cookie-based Authentication)**

---

## 🔐 Authentication

Authentication is handled using **JWT stored in HTTP-only cookies**.

* JWT is issued on login
* Token is automatically sent with each request via cookies
* No Authorization or Bearer headers are used
* Authentication is validated via middleware

This approach improves security by preventing direct access to the token from client-side JavaScript.

---

## 📡 API Overview

### 🔐 Auth

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| POST   | `/auth/register` | Register a new user            |
| POST   | `/auth/login`    | Login and set JWT cookie       |
| GET    | `/auth/me`       | Get current authenticated user |

---

### 💼 Wallets

| Method | Endpoint            | Description                 |
| ------ | ------------------- | --------------------------- |
| POST   | `/wallet/create`           | Create a new wallet         |
| GET    | `/wallet/getWallets`           | Get own wallets (paginated) |
| DELETE | `/wallet/:walletId` | Delete own wallet           |

> 🔒 All wallet endpoints require a valid **JWT cookie**.

---


## 🔒 Security Notes

* User identity is derived **only** from JWT cookies
* Ownership checks are enforced on all wallet operations
* No sensitive data is accepted from client input for authorization
* Cookies should be configured as:

  * `httpOnly`
  * `sameSite`
  * `secure` (in production)

---

## 📌 Project Status

**MVP / Learning Project**

Planned improvements:

* Wallet rename (PATCH)
* Soft delete instead of hard delete
* Wallet transactions & history
* Improved validation & error handling
* Tests & documentation

---

## 👨‍💻 Author

Built as a backend-focused learning project with an emphasis on
**security**, **clean architecture**, and **scalable design**.
