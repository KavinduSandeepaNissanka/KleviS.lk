# KleviS.lk 🛍️

**KleviS.lk** is a full-featured e-commerce web application for a clothing and accessories store, offering a clean, modern shopping experience with product browsing, filtering, wishlist, cart, and an admin dashboard for store management.
---
## Pages
<img width="1339" height="629" alt="image" src="https://github.com/user-attachments/assets/b26048b9-a149-4c06-9d1e-397d06aab945" /><br><br><br>
<img width="1337" height="641" alt="image" src="https://github.com/user-attachments/assets/6a31d90b-50b8-435b-a0ab-d97c72aaf7ed" /><br><br><br>
<img width="1306" height="641" alt="image" src="https://github.com/user-attachments/assets/671af2e1-4842-4475-b092-b100e0894619" /><br><br><br>
<img width="1350" height="639" alt="image" src="https://github.com/user-attachments/assets/65fa7927-209f-4e8a-a579-32b840f317c2" /><br><br><br>
<img width="1325" height="636" alt="image" src="https://github.com/user-attachments/assets/a699aa42-39d6-4f9e-b5d6-a7b15a826967" /><br><br><br>
<img width="1334" height="640" alt="image" src="https://github.com/user-attachments/assets/6c3ec13e-9a2f-41b1-b8ad-0ac3f9c7bc81" /><br><br><br>
<img width="1323" height="613" alt="image" src="https://github.com/user-attachments/assets/3942ebc3-07e6-46f1-864f-b34d6f7706e5" /><br><br><br>
<img width="1340" height="636" alt="image" src="https://github.com/user-attachments/assets/1e3a77ea-ad31-4395-b90a-e83c5f4eddf7" /><br><br><br>
<img width="1310" height="605" alt="image" src="https://github.com/user-attachments/assets/4ca19ab3-6552-4929-90c7-ee607e0a108f" /><br><br><br>
---

## ✨ Features

### Customer-Facing
- **Home page** — Hero banner, category highlights (Men, Women, Kids, Accessories), and a "Trending Now" product showcase with ratings and discount badges.
- **Shop page** — Browse the full product collection with:
  - Category filters (All, Men, Women, Kids, Accessories)
  - Price range filter (slider, up to $200)
  - Product search
  - Sorting (e.g. Newest Arrivals)
- **Product badges** — Highlights for New, Trending, and Discounted items.
- **Wishlist** — Save favorite products for later, with a live item counter in the navbar.
- **Shopping cart** — Add products with size/color selection, adjust quantities, apply coupon codes, and view an order summary before checkout.
- **About Us / Contact pages** — Store information and contact details (location, phone, business hours).
- **Light/Dark mode** toggle and search from the navbar.

### Admin Panel
- **Manage Products** — View, add, edit, and delete products with image, category, brand, and price details.
- **Manage Users** — Administer registered users.

---

## 🖥️ Tech Stack

> Update this section to match your actual implementation.

- **Frontend:** React.js
- **Backend:** Node.js / Express.js
- **Database:** MongoDB
- **Styling:** CSS / Tailwind CSS
- **Authentication:** JWT-based auth for users and admin

---

## 📸 Screenshots

| Home Page | Shop by Category |
|---|---|
| Hero section with call-to-action | Browse by Men, Women, Kids, Accessories |

| Trending Products | Shop / Filters |
|---|---|
| Discounted & trending picks | Category and price filtering |

| Wishlist | Cart |
|---|---|
| Saved items | Cart with size, color, and coupon support |

| Contact | Admin Dashboard |
|---|---|
| Store contact details | Product & user management |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KavinduSandeepaNissanka/KleviS.lk.git
   cd KleviS.lk
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd server
   npm install

   # Frontend
   cd ../client
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**
   ```bash
   # Start backend
   cd server
   npm run dev

   # Start frontend (in a new terminal)
   cd client
   npm start
   ```

5. **Open the app**

   Visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
KleviS.lk/
├── client/            # Frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
├── server/            # Backend API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── package.json
└── README.md
```

---

## 🛠️ Usage

- Browse products from the **Home** or **Shop** page.
- Use filters and search to find specific items.
- Add items to your **Wishlist** ❤️ or **Cart** 🛒.
- Apply a coupon code at checkout for discounts.
- Store admins can log in and access the **Admin** panel to manage products and users.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---


---

<p align="center">Made with ❤️ by the KleviS.lk team</p>
