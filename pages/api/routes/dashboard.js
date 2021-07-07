const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/dashboard", async (req, res) => {
	try{
		const loans = await pool().query("SELECT * FROM loans WHERE borrower_id = $1", [req.user_id]);
		return res.json({ loans: loans.rows });
	}	catch(err) {
		console.error(err.message);
    res.status(500).send("Server error");
	}
});

module.exports = router;