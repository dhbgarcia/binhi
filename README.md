# Binhi 🌱

**Binhi** (Tagalog for “seed”) is a farm‑to‑table e‑commerce web application built for the Philippine **Department of Agriculture (DA)**. It connects farmers directly with consumers, allowing the DA to curate and manage a public‑market catalogue while customers shop for fresh produce and poultry in real‑time.

---

## Overview

Binhi promotes the **farm‑to‑table** movement by giving Filipino farmers a direct channel to sell their goods while providing consumers a convenient, trustworthy way to buy local produce. The DA serves as the sole merchant — maintaining product listings, processing orders, and publishing sales reports. Customers must register and log‑in to browse, add to cart, and place cash‑on‑delivery orders.

---

## Features

### 👥 User Management

| Role                          | Capabilities                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Customer**                  | • Register / log in \| Browse catalogue \| Add to cart \| Place & cancel orders before merchant confirmation                                                  |
| **Department of Agriculture** | • Single built‑in admin account \| Manage all users \| CRUD product listings & inventory \| Confirm orders \| Generate weekly, monthly & annual sales reports |

### 🛒 E‑Commerce Core

* **Product Catalogue** with name, type (crop / poultry), price, description & quantity.
* **Dynamic Sorting** by name, type, price, or quantity (asc/desc).
* **Shopping Cart** total price computation, item count & deletions.
* **Order Fulfilment Workflow** — *pending → confirmed → delivered* (COD only).

### 📈 Analytics

* **Sales Dashboard** summarising income per product and totals.
* **Time‑framed Reports** (weekly | monthly | annual) downloadable as CSV.

### 🔐 Security & UX

* JWT‑based authentication with protected routes (admin vs customer).
* Responsive React UI themed for agriculture & e‑commerce.
* Error handling, toasts & accessible forms.

---

## Tech Stack

| Layer      | Technology                                           |
| ---------- | ---------------------------------------------------- |
| Front‑end  | **React 18** + Vite + React‑Router‑DOM + TailwindCSS |
| Back‑end   | **Node.js LTS** + **Express 5**                      |
| Database   | **MongoDB Atlas / Community Edition**                |
| Auth       | JSON Web Tokens (JWT)                                |
| State Mgmt | Redux Toolkit / Context API                          |
| Testing    | Jest + React Testing Library                         |

## Getting Started

### Prerequisites

* **Node.js ≥ 18** & **npm**
* **MongoDB** instance (local or Atlas)

### Installation

```bash
git clone https://github.com/CMSC100-2S2425-U4L/project-repo-danebase
cd binhi
npm install
cp .env.example .env   # add your env vars
```

### Environment Variables (`.env`)

```
MONGO_URI=mongodb+srv://nemarfa:useruser@farm2table.1qig69y.mongodb.net/
JWT_SECRET_KEY=qwertyuiopqwertyuiopqwertyuiop
```

### Running Locally

```bash
# start client & server concurrently
npm run dev
```

Opens `http://localhost:3000` 

### Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Runs React (Vite) & Express concurrently |
| `node server.js` | Runs the backend server                  |

## Usage Guide

### Customer Flow

1. **Register** with email‑formatted username & password.
2. **Log in** → redirected to **Shop**.
3. **Browse & sort** products → add to cart.
4. **Checkout** (cash‑on‑delivery) → order status “Pending Confirmation”.
5. **Cancel** allowed until DA confirms.

### Administrator Flow (DA)

1. **Log in** with built‑in admin credentials.
2. Access **Dashboard** →

   * Manage users
   * CRUD products / update inventory
   * Review & confirm orders
   * View sales reports (weekly / monthly / yearly)

---

## Commit & Branching Guidelines

* **One** team member accepted the GitHub Classroom assignment; others added as collaborators.
* Work on feature branches (`feat/<feature-name>`), then PR into `main`.
* Follow the conventional commit style posted in Google Classroom:

  ```
  feat(cart): implement item deletion
  fix(auth): correct JWT expiry bug
  docs(readme): update installation guide
  ```
* **Minimum commits per member:** 5 significant commits.
* Final submission must reside in **one branch** (`main`) with all modules integrated.

---

> “From seed to table, empowering farmers and feeding communities — one click at a time.”
