const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/scoreCalculator", async (req, res) => {
	try {
    const { 
			loan_amount,
			loan_purpose,
			age,
			zip_code,
			highest_education_level,
			income_primary_source,
			employment_type,
			primary_annual_income,
			income_from_other_sources,
			secondary_annual_income,
			outstanding_credit_balance,
			outstanding_other_loan_balance,
			savings,
     } = req.body;

    let newScore = await pool().query(`INSERT INTO score_calculations (
				loan_amount,
				loan_purpose,
				age,
				zip_code,
				highest_education_level,
				income_primary_source,
				employment_type,
				primary_annual_income,
				income_from_other_sources,
				secondary_annual_income,
				outstanding_credit_balance,
				outstanding_other_loan_balance,
				savings) VALUES (
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9,
				$10,
				$11,
				$12,
				$13
			)
			RETURNING *`,
			[
				loan_amount,
				loan_purpose,
				age,
				zip_code,
				highest_education_level,
				income_primary_source,
				employment_type,
				primary_annual_income,
				income_from_other_sources,
				secondary_annual_income,
				outstanding_credit_balance,
				outstanding_other_loan_balance,
				savings,
			]
		);
		return res.json({ apr: '8.0%' });
	}	catch (err) {
		console.error(err.message);
    res.status(500).send("Server error");
	}
});

module.exports = router;