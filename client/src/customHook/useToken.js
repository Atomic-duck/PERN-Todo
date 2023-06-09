import { useState } from "react";

// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// By convention, custom Hooks start with the keyword use*.
// reuse it across multiple components
export default function useToken() {
   const getToken = () => {
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      return userToken?.token                       // "?.": if userToken is undefined, there will have no error.
   }

   const [token, setToken] = useState(getToken())

   const saveToken = userToken => {
      sessionStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);
   };

   return {
      setToken: saveToken,
      token
   }
}