import { useEffect, useState } from "react";
import InputTodo from "../listtodo/InputTodo";

export default function BucketList({ token }) {
   const [change, setChange] = useState(false)
   const [buckets, setBuckets] = useState([])

   const markDone = async (id, done) => {
      try {
         const body = { done }

         const response = await fetch(`http://localhost:8080/api/v1/bucketlist/mark/${id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "x-access-token": token
            },
            body: JSON.stringify(body)
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

   useEffect(() => {
      const getBuketList = async () => {
         try {
            const response = await fetch("http://localhost:8080/api/v1/bucketlist", {
               headers: {
                  "x-access-token": token
               }
            }).then(data => data.json())

            if (response.success) {
               setBuckets(response.data.buckets)
            }
            else {
               console.error(response.message)
            }
         } catch (error) {
            console.error(error.message)
         }
      }

      getBuketList()
   }, [change])

   return <div className="container">
      <InputTodo token={token} change={change} setChange={setChange} api="/bucketlist/post" />
      <div className="mt-5">
         <h1>Things you want to get done before you finish your journey</h1>
         <br></br>
         <ol>
            {buckets.sort((buck1, buck2) => {
               if (buck1.bucket_id < buck2.bucket_id) return -1
               if (buck1.bucket_id > buck2.bucket_id) return 1
               return 0
            }).map(bucket => <li key={bucket.bucket_id}>
               <div className="row">
                  <div className="col-sm-8">{bucket.achieve ? "✅" : "❌"} {bucket.description}</div>
                  <div className="col-sm-4"><button onClick={() => markDone(bucket.bucket_id, !bucket.achieve)}>mark</button></div>
               </div>
            </li>)}
         </ol>
      </div>
   </div>
}