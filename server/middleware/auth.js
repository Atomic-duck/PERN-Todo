const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
   const token = req.body.token || req.query.token || req.headers["x-access-token"]

   if (!token) {
      return res.json({
         success: false,
         message: "A token is required for authentication"
      })
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = decoded
   } catch (error) {
      console.log(error)
      return res.json({
         success: false,
         err: "Invalid Token"
      })
   }

   next()
}

module.exports = verifyToken