import { Fragment, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment'
import PernToDo from './listtodo/Perntodo';

function MyCalendar({ token }) {
  const [dateState, setDateState] = useState(new Date())
  //Change Date Method 
  const changeDate = (value) => {
    setDateState(value)
  }

  return (
    <Fragment>
      <div className="container mt-5">
        <h1>React Calendar</h1>
        <div>
          <Calendar
            value={dateState}
            onChange={changeDate}
          />
          <p className='text-center mt-2'>Selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
          <div>
            <PernToDo date={moment(dateState).format('YYYY-MM-DD')} token={token} />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default MyCalendar