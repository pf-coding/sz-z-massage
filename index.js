require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { auth } = require("./config/firebase-admin-config");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const listUsersResult = await auth.listUsers();
    res.json(listUsersResult.users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
});

app.delete("/users/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    await auth.deleteUser(uid);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
