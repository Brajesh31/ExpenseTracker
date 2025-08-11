const express = require('express');
const app = express();
const main = require('./config/db'); // Assuming you have this file
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');
const userRouter = require("../Backend/Routes/userRoutes.js");
const incomeRouter = require("../Backend/Routes/incomeRoutes.js")
const expenseRouter = require("../Backend/Routes/expenseRoutes.js");
const dashboardRoutes = require("../Backend/Routes/dashBoardRoutes.js");

// --- MIDDLEWARE ---
// The order is important!
const allowedOrigins = [
  "http://localhost:5173",                                  // Local dev frontend
  "https://expensetracker-front-rpp5.onrender.com"         // Your deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// 2. Parse cookies
app.use(cookieParser());

// 3. Parse JSON and URL-encoded request bodies
// THIS MUST COME BEFORE THE ROUTES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Serve static files (like uploaded avatars)
// This makes the 'public' folder accessible from the web
app.use(express.static(path.join(__dirname, 'public')));


// --- ROUTES ---
app.use("/api/user",userRouter);
app.use("/api/income" , incomeRouter);
app.use("/api/expense" , expenseRouter);
app.use("/api/dashboard" , dashboardRoutes );

// --- SERVER START ---
main().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT || 3000}`);
  });
}).catch(err => {
  console.error("❌ Database connection failed:", err);
});
