import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./utils/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import { initializeAdmin } from "./utils/initAdmin.js";

const app = express();
dotenv.config();

connectDb();
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

initializeAdmin();

app.use(cors({
    origin: "*",
}));

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server running on port ${port}`));