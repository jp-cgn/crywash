# 💼 Wallet Backend API

A simple backend API built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.
This project focuses on **user-based wallet management** with authentication and clean REST design.

> ⚠️ This is a learning & MVP-focused project and is still in development.

---

## ✨ Features

* 🔐 JWT-based authentication
* 👤 User-owned wallets (1:n relationship)
* ➕ Create wallets
* 📄 List own wallets (pagination)
* ❌ Delete wallets (ownership enforced)
* 🗄 Prisma ORM with PostgreSQL
* ⚡ Indexed & performant queries

---

## 🧱 Tech Stack

* **Node.js**
* **Express**
* **Prisma**
* **PostgreSQL**
* **JWT Authentication**

---

## 📡 API Overview

| Method | Endpoint            | Description                 |
| ------ | ------------------- | --------------------------- |
| POST   | `/wallet`           | Create a new wallet         |
| GET    | `/wallet`           | Get own wallets (paginated) |
| DELETE | `/wallet/:walletId` | Delete own wallet           |

> All routes require authentication via **Bearer Token**.

---


## 🔒 Security Notes

* User identity is derived **only from JWT**
* Ownership checks enforced on all wallet actions
* No user input is trusted for authorization

---

## 📌 Status

🚧 **In development / MVP stage**

Planned improvements:

* Wallet updates (rename)
* Soft delete
* Transactions & history
* Better validation & error handling

---

## 👨‍💻 Author

Built as a backend learning project with a focus on **clean architecture**, **security**, and **scalability**.
