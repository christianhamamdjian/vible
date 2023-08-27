import React, { useState, useEffect } from 'react';
import './calendar.css';
import { MoodboardContext } from "../../context/moodboardContext"

export function Calendar() {
  const { handleAddDateBox } = React.useContext(MoodboardContext);

  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  const formattedDate = date.toLocaleString().split(" ")
  const splitDate = formattedDate[0].split("/")
  const formattedDay = +splitDate[1]
  const formattedMonth = +splitDate[0] - 1

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  const addDateToBoard = (d) => {
    setDate(new Date(year, month, d))
    const newDate = new Date(year, month, d)
    handleAddDateBox(newDate)
  }

  function getStartDayOfMonth(date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDate === 0 ? 7 : startDate;
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

  return (
    <div className='calendar'>
      <div className='inner-container'>
        <div className='header'>
          <button className='button' onClick={() => setDate(new Date(year, month - 1, day))}><i className="gg-chevron-left-o"></i></button>
          <div>
            {MONTHS[month]} {year}
          </div>
          <button className='button' onClick={() => setDate(new Date(year, month + 1, day))}><i className="gg-chevron-right-o"></i></button>
        </div>
        <div className='body'>
          {DAYS_OF_THE_WEEK.map((wd) => (
            <div className='day' key={wd}>
              <strong>{wd}</strong>
            </div>
          ))}
          {Array(days[month] + (startDay - 1))
            .fill(null)
            .map((_, index) => {
              const sd = index - (startDay - 2)
              console.log(sd, formattedDay)
              console.log(month, formattedMonth)
              return (
                <div
                  className='day'
                  key={index}
                  style={{
                    // border: `${sd === today.getDate() && "1px solid #eee"}`,
                    border: `${sd === formattedDay && month === formattedMonth && "1px solid #eee"}`,
                    //backgroundColor: `${sd === day && "#eee"}`
                  }}
                  onClick={() => addDateToBoard(sd)}
                >
                  {sd > 0 ? sd : ''}
                </div>
              );
            })}
        </div>
      </div>
    </div >
  );
}

export default Calendar