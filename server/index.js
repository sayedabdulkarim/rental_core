import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
//routes
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;

connectDb();

const app = express();

//
// Increase the limit for parsed data (JSON)
app.use(express.json({ limit: "50mb" })); // Adjust '50mb' as needed
// Increase the limit for parsed data (URL-encoded)
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Adjust '50mb' as needed

const corsOptions = {
  origin: ["http://localhost:3000"], // Client's URL, not the server's
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(cookieParser());

//test
app.get("/", (req, res) => {
  res.json("Hello");
});

//users
app.use("/api/users", userRoutes);

////////////DEPLOYMENT //////////////

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "../client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running successfully");
  });
}
////////////DEPLOYMENT //////////////

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on ${port}`));
