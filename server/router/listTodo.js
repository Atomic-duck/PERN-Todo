const express = require('express')
const router = express.Router()
// database
const pool = require("../pgDB")

// Todo Routes
router.post('/post', async (req, res) => {
   try {
      const { description, date } = req.body
      const { user_id } = req.user

      // convert from other format
      // TO_DATE('<date_literal>', '<format_model>')
      // const doc = await pool.query("INSERT INTO todo(description) VALUES($1, TO_DATE($2, 'DD-MM-YYYY')) RETURNING *",
      //    [description, date])

      const doc = await pool.query("INSERT INTO todo(description, date, user_id) VALUES($1, $2, $3) RETURNING *",
         [description, date, user_id])

      res.json({
         success: true,
         message: "Posted successfull"
      })
   } catch (error) {
      console.log(error)
      res.json({
         success: false,
         message: "Something went wrong"
      })
   }
})

router.put('/update/:id', async (req, res) => {
   try {
      const { id } = req.params
      const { description } = req.body
      const doc = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",
         [description, id])

      res.json({
         success: true,
         message: "Updated successfully",
      })
   } catch (error) {
      console.log(error)
      res.json({
         success: false,
         message: "Something went wrong"
      })
   }
})

// get list todo on specified day
router.get('/alltodos/:date', async (req, res) => {
   try {
      const { date } = req.params
      const { user_id } = req.user

      const doc = await pool.query("SELECT todo_id, description, done FROM todo WHERE user_id=$1 AND date=$2",
         [user_id, date])

      return res.json({
         success: true,
         message: "Got successfully",
         data: {
            todos: doc.rows
         }
      })
   } catch (error) {
      console.log(error)
      res.json({
         success: false,
         message: "Something went wrong"
      })
   }
})

router.get('/todo/:id', async (req, res) => {
   try {
      const { id } = req.params
      const doc = await pool.query("SELECT * FROM todo WHERE todo_id=$1",
         [id])

      return res.json({
         success: true,
         message: "Got successfully",
         data: {
            todo: doc.rows[0]
         }
      })
   } catch (error) {
      console.log(error)
      res.json({
         success: false,
         message: "Something went wrong"
      })
   }
})

router.delete('/delete/:id', async (req, res) => {
   try {
      const { id } = req.params
      const doc = await pool.query("DELETE FROM todo WHERE todo_id=$1",
         [id])

      res.json({
         success: true,
         message: "Deleted successfully"
      })

   } catch (error) {
      console.log(error)
      res.json({
         success: false,
         message: "Something went wrong"
      })
   }
})

router.put('/done/:id', async (req, res) => {
   try {
      const { id } = req.params
      const { done } = req.body

      const doc = await pool.query("UPDATE todo SET done=$1 WHERE todo_id=$2",
         [done, id])

      res.json({
         success: true,
         message: "Marked successfully"
      })

   } catch (error) {
      console.log(error)
      res.json({
         success: false,
         message: "Something went wrong"
      })
   }
})

module.exports = router