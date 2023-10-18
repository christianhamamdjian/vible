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
          <button className='button toggler'
            style={{ width: "3rem", height: "3rem", padding: ".5rem" }}
            onClick={() => setDate(new Date(year, month - 1, day))}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginLeft: "-.2rem" }}
              xmlns="http://www.w3.org/2000/svg">
              <path d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z" fill="currentColor"></path></svg>
          </button>
          <div>
            {MONTHS[month]} {year}
          </div>
          <button
            className='button toggler'
            style={{ width: "3rem", height: "3rem", padding: ".5rem" }}
            onClick={() => setDate(new Date(year, month + 1, day))}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z" fill="currentColor"></path></svg>
          </button>
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