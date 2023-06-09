import { Fragment, useState } from 'react';
import './App.css';

//custom hook
import useToken from './customHook/useToken';

//components
import MyCalendar from './components/MyCalender';
import Authenticate from './components/authentication/Authenticate';
import BucketList from './components/bucketlist/BucketList';

function App() {
  const { token, setToken } = useToken();   // useState in custom Hook, which will trigger a component re-render
  const [page, setPage] = useState("todolist")

  const logoutUser = () => {
    sessionStorage.removeItem('token')
    setToken({})
  }

  if (!token) {
    return <Authenticate setToken={setToken} />
  }


  let Page
  if (page == "todolist") {
    Page = <MyCalendar token={token} />
  }
  if (page == "bucketlist") {
    Page = <BucketList token={token} />
  }

  return <Fragment>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      {/* <!-- Brand/logo --> */}
      <a className="navbar-brand" href="/">YOLO</a>

      {/* <!-- Links --> */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <button type='button' onClick={() => setPage("todolist")} className="p-2">To do List</button>
        </li>
        <li className="nav-item">
          <button type='button' onClick={() => setPage("bucketlist")} className="p-2">Buket List</button>
        </li>
        <li className="nav-item">
          <button type='button' onClick={logoutUser} className="p-2">Logout</button>
        </li>
      </ul>
    </nav>

    {Page}
  </Fragment>
}

export default App;
