const express = require("express");
const router = express.Router();
const admin = require("../config/firebase-admin-config");

router.get("/", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((userRecord) => ({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    }));
    res.json(users);
  } catch (error) {
    console.error("Error listing users:", error);
    res.status(500).send("Error listing users");
  }
});

module.exports = router;
