const express = require("express");

const { body, validationResult } = require("express-validator");

const router = express.Router();

/*

  User registration route

*/

router.post(

  "/register",

  // Email validation

  body("email")

    .isEmail()

    .withMessage("Invalid email format"),

  // Password validation

  body("password")

    .isLength({ min: 8 })

    .withMessage("Password must be at least 8 characters"),

  async (req, res) => {

    // Collect validation errors

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({

        errors: errors.array()

      });

    }

    const { email, password } = req.body;

    // pretend DB save

    const user = {

      id: Date.now(),

      email

    };

    return res.status(201).json({

      message: "User created",

      user

    });

  }

);

module.exports = router;