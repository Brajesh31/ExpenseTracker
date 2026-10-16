# 💸 Expense Tracker App (MERN Stack)

A full-stack Expense Tracker application built with **MongoDB, Express.js, React, and Node.js (MERN)** to help users track their income and expenses in an organized and interactive way.

---



You can test the app using:
Email: Test123@gmail.com
Password: Test23!G


---

## 📸 Screenshots

| Signup Page | Dashboard |
|-------------|-----------|
| ![Signup](https://github.com/sar07thak/ExpenseTracker/assets/signup.png) | ![Dashboard](https://github.com/sar07thak/ExpenseTracker/assets/dashboard.png) |

---

## 🔧 Features

✅ User authentication (Signup/Login with JWT & Cookies)  
✅ Track income and expenses with timestamps  
✅ Avatar upload support  
✅ Responsive Dashboard  
✅ Secure password hashing with bcrypt  
✅ CORS-enabled backend  
✅ Protected routes (for authenticated users only)  
✅ Clean UI with React & TailwindCSS  
✅ MongoDB Atlas cloud database

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Axios
- Tailwind CSS
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- bcrypt
- JWT
- Multer (for file uploads)
- CORS
- dotenv

**Deployment:**
- 🟣 Frontend: [Render](https://render.com/)
- 🟢 Backend: [Render](https://render.com/)
- ☁️ Database: MongoDB Atlas

---

## 📁 Project Structure

```bash
📦 ExpenseTracker/
├── client/                  # React frontend
│   ├── Components/
│   ├── Pages/
│   └── ...
├── server/                  # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── ...
└── README.md

# 🚀 Getting Started Locally
Prerequisites:
Node.js

MongoDB Atlas account

1. Clone the repo

bash
Copy
Edit
git clone https://github.com/sar07thak/ExpenseTracker.git
cd ExpenseTracker

2. Backend Setup

bash
Copy
Edit
cd server
npm install

Create a .env file inside /server with:

ini
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
NODE_ENV=development
Start the backend:

bash
Copy
Edit
node server.js

3. Frontend Setup
bash
Copy
Edit
cd ../client
npm install
npm run dev
Visit: http://localhost:5173

🧪 Test User
Use the following credentials:

bash
Copy
Edit
Email: Test123@gmail.com
Password: Test23!G
🤝 Contributing
Pull requests are welcome! Feel free to fork the repo and submit improvements or bug fixes.

📃 License
This project is open source and available under the MIT License.




Last updated: 2026-10-16 06:42 UTC
