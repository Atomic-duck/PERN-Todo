const express = require('express')
const router = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// database
const pool = require("../pgDB")

router.post('/login', async (req, res) => {
   try {
      // Get user input
      const { username, password } = req.body;

      // Validate user input
      if (!(username && password)) {
         return res.status(400).json({
            success: false,
            message: "All input is required"
         });
      }

      // check if user already exist
      const response = await pool.query("SELECT user_id, password FROM users WHERE username=$1",
         [username])
      const user = response.rows[0]

      if (!user) {
         return res.json({
            success: false,
            message: 'non-exist user'
         })
      }
      else {
         // check password
         if (!bcrypt.compareSync(password, user.password)) {
            return res.json({
               success: false,
               message: 'wrong password'
            })
         }

         // Create token
         const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
         });

         return res.json({
            success: true,
            message: "login successfully",
            data: { token }
         })
      }
   } catch (error) {
      console.log(error.message)
      res.json({
         success: false,
         message: "Something went wrong"
      })
   }
})

router.post('/register', async (req, res) => {
   try {
      // Get user input
      const { username, password } = req.body;

      // Validate user input
      if (!(username && password)) {
         return res.status(400).json({
            success: false,
            message: "All input is required"
         });
      }

      // check if user already exist
      const response = await pool.query("SELECT user_id FROM users WHERE username=$1", [username])
      if (response.rows[0]) {
         return res.json({
            success: false,
            message: 'username is already exist'
         })
      }

      //Encrypt user password
      const encryptPassword = bcrypt.hashSync(password)
      // Create user in our database
      const postResponse = await pool.query("INSERT INTO users(username, password) VALUES($1, $2) RETURNING user_id",
         [username, encryptPassword])

      // Create token
      const token = jwt.sign({ user_id: postResponse.rows[0].user_id }, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return res.json({
         success: true,
         message: "register succesfully",
         data: { token }
      })
   } catch (error) {
      console.log(error.message)
      res.json({
         success: false,
         message: "Something went wrong"
      })
   }
})

module.exports = router