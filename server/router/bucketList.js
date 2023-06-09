const express = require('express')
const router = express.Router()
// database
const pool = require("../pgDB")


router.get('/', async (req, res) => {
   try {
      const { user_id } = req.user

      const doc = await pool.query('SELECT bucket_id, description, achieve FROM bucketlist WHERE user_id=$1',
         [user_id])

      return res.json({
         success: true,
         message: "Got successfully",
         data: {
            buckets: doc.rows
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

router.post('/post', async (req, res) => {
   try {
      const { user_id } = req.user
      const { description } = req.body

      const doc = await pool.query('INSERT INTO bucketlist(description, user_id) VALUES($1, $2)',
         [description, user_id])

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

router.put('/mark/:id', async (req, res) => {
   try {
      const { id } = req.params
      const { done } = req.body

      const doc = await pool.query("UPDATE bucketlist SET achieve=$1 WHERE bucket_id=$2",
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

router.delete('/delete/:id', async (req, res) => {
   try {
      const { id } = req.params
      const doc = await pool.query("DELETE FROM bucketlist WHERE bucket_id=$1",
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

module.exports = router