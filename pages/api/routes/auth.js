const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
// const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

router.post("/signUp", async (req, res) => {
  const { email, password, calculation_id } = req.body;
  // Figur out the right way to add role
  const user_role = 'borrower';
  try {
    const user = await pool().query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool().query(
      "INSERT INTO users (user_email, user_password, user_role, calculation_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, bcryptPassword, user_role, calculation_id]
    );

    const pToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ pToken });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool().query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const pToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ pToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// router.post("/verify", authorize, (req, res) => {
//   try {
//     res.json(true);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

module.exports = router;
