require("dotenv").config();

const express = require("express");
const app = express();
const authRoutes = require("./Routes/auth-routes");
const homeRoutes = require("./Routes/home-routes");
const adminRoutes = require("./Routes/admin-routes");
const uploadImageRoutes = require("./Routes/image-routes");

const PORT = process.env.PORT || 3000;
const connectToDB = require("./Db/db");
connectToDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", uploadImageRoutes);

app.listen(PORT, () => {
  console.log(`server listening ${PORT}`);
});
