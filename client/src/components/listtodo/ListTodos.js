import { Fragment, useEffect, useState } from "react"
import Todo from "./Todo"

const ListTodos = ({ date, token, change, setChange }) => {
   const [todos, setTodos] = useState([])

   // fetch todos data on specified day
   const getTodos = async () => {
      try {
         const response = await fetch(`http://localhost:8080/api/v1/listtodo/alltodos/${date}`, {
            headers: {
               "x-access-token": token    // temporary solution to send token
            }
         }).then(data => data.json())

         if (response.success) {
            setTodos(response.data.todos)
         }
         else {
            console.error(response.message)
         }
      } catch (error) {
         console.error(error.message)
      }
   }

   // fetch when dom rendered and re-fetch when  'date', 'post' or 'todos' change it's value
   useEffect(() => {
      console.log('render')
      getTodos()
   }, [date, change])

   return <Fragment>
      <table className="table mt-5 text-center">
         <thead>
            <tr>
               <th>Desctiption</th>
               <th>Done</th>
               <th>Edit</th>
               <th>Delete</th>
            </tr>
         </thead>
         <tbody>
            {todos.map((todo) => <tr key={todo.todo_id}>
               <Todo todo={todo} token={token} change={change} setChange={setChange} />
            </tr>)}
         </tbody>
      </table>
   </Fragment>
}

export default ListTodos