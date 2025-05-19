# 🌾 FarmMart – Modern Agriculture Marketplace

**FarmMart** is a full-stack e-commerce platform built with **Next.js**, designed to digitally connect farmers, sellers, and consumers. It provides a modern interface to browse, buy, and sell agricultural tools and products.

🔗 **Live Website**: [https://farm.sthajeevan.com.np](https://farm.sthajeevan.com.np)

🧪 **API Base URL**: [https://farm.sthajeevan.com.np/api](https://farm.sthajeevan.com.np/api)

---

## 🚀 Features

- 🛒 View product listings with images, pricing, and specifications
- 🔍 Browse collections and individual collection pages
- 🛍 Add and manage cart items
- 📱 Fully responsive design
- 💬 Contact & support functionality

---

## 🛠 Tech Stack

| Layer       | Technology                              |
| ----------- | --------------------------------------- |
| Framework   | Next.js (App Router)                    |
| Styling     | Tailwind CSS                            |
| State Mgmt  | Context API                             |
| Backend API | REST API (integrated in Next.js `/api`) |
| Hosting     | Netlify (self-hosted)                   |

---

## 📦 API Endpoints

Base URL: `https://farm.sthajeevan.com.np/api`

| Endpoint           | Description                     |
| ------------------ | ------------------------------- |
| `/product`         | Fetch all products              |
| `/product/:id`     | Fetch all products              |
| `/collections/:id` | Fetch specific collection by ID |
| `/product-type`    | View categories                 |
| `/user`            | View user info                  |

---

## 📁 Folder Structure (Simplified)

```
farmmart/
├── app/
│   ├── products/             # Product pages
│   └── layout.tsx           # App layout
├── components/              # UI components
├── public/                  # Static files
├── utils/                   # Helper functions
├── .env.local               # Environment variables
└── next.config.js
```

---

## ⚙️ Getting Started Locally

### 1. Clone the project

```bash
git clone https://github.com/Jeevan1/farm.git
cd farm
```

### 2. Install dependencies

````bash
yarn install


### 3. Run the development server

```bash
yarn dev


Visit `http://localhost:3000` in your browser.

---

## 🌐 Environment Variables

Create a `.env.local` file in the root directory and add:

````

NEXT_PUBLIC_API_URL=https://farm.sthajeevan.com.np/api

```

---

## ✍️ Author

**Jeevan Shrestha**
🌐 [sthajeevan.com.np](https://sthajeevan.com.np)
📧 shresthaj1986@gmail.com
🔗 [GitHub](https://github.com/Jeevan1)

---

```
