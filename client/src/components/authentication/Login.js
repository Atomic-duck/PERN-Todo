import { useState } from "react"

async function loginUser(credentials) {
   return fetch("http://localhost:8080/api/v1/authentication/login", {
      method: "POST",
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
   }).then(
      data => data.json()
   )
}

const Login = ({ setToken, setLogin }) => {
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const [message, setMessage] = useState({ __html: '' })

   const onSubmitLogin = async (e) => {
      e.preventDefault()
      try {
         const userToken = await loginUser({
            username,
            password
         })

         if (!userToken.success) {
            setMessage({
               __html: userToken.message
            })
         }
         else {
            setToken(userToken.data)      // data.token
         }

      } catch (error) {
         console.log(error.message)
      }
   }

   return (
      <form onSubmit={onSubmitLogin}>
         <div className="form-group">
            <label htmlFor="uname">Username:</label>
            <input type="text" className="form-control" id="uname" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required />
         </div>
         <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required />
         </div>
         <p dangerouslySetInnerHTML={message}></p>
         <button type="submit" className="btn btn-primary">Submit</button>
         <button type="button" className="btn" onClick={() => setLogin(false)}>Register</button>
      </form>
   )
}

export default Login