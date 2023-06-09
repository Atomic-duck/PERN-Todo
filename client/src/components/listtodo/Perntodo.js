import { useState } from "react"
import InputTodo from "./InputTodo"
import ListTodos from "./ListTodos"

function PernToDo({ date, token }) {
   const [change, setChange] = useState(false)
   let re = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/  // regex for YYYY-MM-DD or YYYY-M-D
   if (!re.test(date)) return <div>
      <h1 className="text-center">Oops! wrong date</h1>
   </div>

   return (
      <div className="container">
         <h1 className="text-center mt-5">To Do List</h1>
         <InputTodo date={date} token={token} change={change} setChange={setChange} api="/listtodo/post" />
         <ListTodos date={date} token={token} change={change} setChange={setChange} />
      </div>
   )
}

export default PernToDo