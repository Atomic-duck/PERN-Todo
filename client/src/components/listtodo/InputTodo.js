import ListTodos from "./ListTodos"

const { Fragment, useState } = require("react")

const InputTodo = ({ date, token, change, setChange, api }) => {
   const [description, setDescription] = useState("")

   // post description to database when onSubmit
   const onSubmitPost = async (e) => {
      e.preventDefault()
      try {
         const body = {
            description,
            date: date ? date : null,
            token
         }

         const response = await fetch(`http://localhost:8080/api/v1${api}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
         }).then(data => data.json())

         if (response.success) {
            setDescription("")
            setChange(!change)
         }
         else {
            console.error(response.message)
         }
      } catch (error) {
         console.error(error.message)
      }
   }

   return <Fragment>
      <form className="d-flex mt-5" onSubmit={onSubmitPost}>
         <input type="text" className="form-control" value={description} onChange={e => {
            setDescription(e.target.value)
         }}></input>
         <button type="submit" className="btn btn-info">Add</button>
      </form>
   </Fragment>
}

export default InputTodo