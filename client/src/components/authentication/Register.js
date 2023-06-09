import { useState } from "react"

const registerUser = async (credentials) => {
   return fetch("http://localhost:8080/api/v1/authentication/register", {
      method: "POST",
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
   }).then(
      data => data.json()
   )
}

const Register = ({ setToken, setLogin }) => {
   const [username, setUsername] = useState("")
   const [c_password, setC_password] = useState("")
   const [password, setPassword] = useState("")
   const [message, setMessage] = useState({ __html: '' })

   const onSubmitRegister = async (e) => {
      e.preventDefault()
      try {
         e.preventDefault()
         if (c_password !== password) {
            setMessage({
               __html: 'need to have same password'
            })
         }
         else {
            const userToken = await registerUser({
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
         }
      } catch (error) {
         console.log(error.message)
      }
   }

   return (
      <form onSubmit={onSubmitRegister}>
         <div className="form-group">
            <label htmlFor="uname">Username:</label>
            <input type="text" className="form-control" id="uname" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required />
         </div>
         <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required />
         </div>
         <div className="form-group">
            <label htmlFor="pwd">Confirm Password:</label>
            <input type="password" className="form-control" id="c-pwd" placeholder="Enter password" value={c_password} onChange={e => setC_password(e.target.value)} required />
         </div>
         <p dangerouslySetInnerHTML={message}></p>
         <button type="submit" className="btn btn-primary">Submit</button>
         <button type="button" className="btn" onClick={() => setLogin(true)}>Login</button>
      </form>
   )
}

export default Register