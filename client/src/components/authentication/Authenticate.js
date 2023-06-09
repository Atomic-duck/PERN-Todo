import { useState } from "react"
import Login from "./Login"
import Register from "./Register"

const Authenticate = ({ setToken }) => {
   const [login, setLogin] = useState(true)

   if (login) {
      return <Login setToken={setToken} setLogin={setLogin} />
   }

   return (
      <Register setToken={setToken} setLogin={setLogin} />
   )
}

export default Authenticate