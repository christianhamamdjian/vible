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

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

  return (
    <div className='calendar'>
      <div className='inner-container'>
        <div className='header'>
          <button className='button toggler' onClick={() => setDate(new Date(year, month - 1, day))}><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.07,7.757 L14.485,9.172 L11.656,12 L14.485,14.828 L13.07,16.243 L8.828,12 L13.07,7.757 z" fill="currentColor" />
            <path d="M12,1 C18.075,1 23,5.925 23,12 C23,18.075 18.075,23 12,23 C5.925,23 1,18.075 1,12 C1,5.925 5.925,1 12,1 z M12,3 C7.029,3 3,7.029 3,12 C3,16.971 7.029,21 12,21 C16.971,21 21,16.971 21,12 C21,7.029 16.971,3 12,3 z" fill="currentColor" />
          </svg>
          </button>
          <div>
            {MONTHS[month]} {year}
          </div>
          <button className='button toggler' onClick={() => setDate(new Date(year, month + 1, day))}><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0858 7.75739L15.3284 12L11.0858 16.2427L9.67157 14.8285L12.5 12L9.67157 9.1716L11.0858 7.75739Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z"
              fill="currentColor"
            />
          </svg></button>
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
              return (
                <div
                  className='day'
                  key={index}
                  style={{
                    border: `${sd === new Date().getDate() && month + 1 === new Date().getMonth() + 1 ? "1px solid #eee" : "1px solid transparent"}`,
                    backgroundColor: `${sd === new Date().getDate() && month + 1 === new Date().getMonth() + 1 ? "#eee" : "transparent"}`
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