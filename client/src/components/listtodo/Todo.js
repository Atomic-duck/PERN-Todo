import { Fragment, useState } from "react";
import EditTodo from "./EditTodo"

export default function Todo({ todo, token, change, setChange }) {
   const [done, setDone] = useState(todo.done | false)
   const [description, setDescription] = useState(todo.description)

   // delete a todo
   const deleteTodo = async (id) => {
      try {
         const response = await fetch(`http://localhost:8080/api/v1/listtodo/delete/${id}`, {
            method: "DELETE",
            headers: {
               "x-access-token": token
            }
         }).then(data => data.json())

         if (response.success) {
            setChange(!change)
         }
         else {
            console.error(response.message)
         }
      } catch (error) {
         console.error(error.message)
      }
   }

   // done a todo
   const doneTodo = async (id) => {
      try {
         const body = { done: !done }

         const response = await fetch(`http://localhost:8080/api/v1/listtodo/done/${id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "x-access-token": token
            },
            body: JSON.stringify(body)
         }).then(data => data.json())

         if (response.success) {
            setDone(!done)
         }
         else {
            console.error(response.message)
         }
      } catch (error) {
         console.error(error.message)
      }
   }

   if (done) {
      return <Fragment>
         <td>{description}</td>
         <td><button className="btn btn-warning" onClick={() => doneTodo(todo.todo_id)}>Wait!!!</button></td>
      </Fragment>
   }

   return <Fragment>
      <td>{description}</td>
      {/* if props from parent pass to children and that prop update in children or that prop update in the parent component so both will re-render */}
      <td><button className="btn btn-info" onClick={() => doneTodo(todo.todo_id)}>Done</button></td>
      <td><EditTodo description={description} setDescription={setDescription} todo_id={todo.todo_id} token={token} /></td>
      <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
   </Fragment>
}