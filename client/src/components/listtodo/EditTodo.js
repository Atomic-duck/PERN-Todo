import { Fragment, useState } from "react"

const EditTodo = ({ description, setDescription, todo_id, token }) => {
   const [editDiscrip, seteditDiscrip] = useState(description)

   const onClickEdit = async (e) => {
      e.preventDefault()
      try {
         const body = { description: editDiscrip }
         const response = await fetch(`http://localhost:8080/api/v1/listtodo/update/${todo_id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "x-access-token": token
            },
            body: JSON.stringify(body)
         }).then(data => data.json())

         if (response.success) {
            setDescription(editDiscrip)
         }
         else {
            console.error(response.message)
         }
      } catch (error) {
         console.error(error.message)
      }
   }
   return <Fragment>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${todo_id}`}>
         Edit
      </button>

      <div className="modal" id={`id${todo_id}`}>
         <div className="modal-dialog">
            <div className="modal-content">

               <div className="modal-header">
                  <h4 className="modal-title">To Do</h4>
                  <button type="button" className="close" data-dismiss="modal" onClick={() => seteditDiscrip(description)}>&times;</button>
               </div>

               <div className="modal-body">
                  <input type="text" className="form-control" value={editDiscrip} onChange={e => seteditDiscrip(e.target.value)}></input>
               </div>

               <div className="modal-footer">
                  <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => onClickEdit(e)}>Edit</button>
                  <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => seteditDiscrip(description)}>Close</button>
               </div>

            </div>
         </div>
      </div>
   </Fragment>
}

export default EditTodo