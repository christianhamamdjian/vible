import React, { useState, useEffect } from 'react';
import './calendar.css';

export function Calendar() {
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
          <button className='button' onClick={() => setDate(new Date(year, month - 1, day))}>&lt;</button>
          <div>
            {MONTHS[month]} {year}
          </div>
          <button className='button' onClick={() => setDate(new Date(year, month + 1, day))}>&gt;</button>
        </div>
        <div className='body'>
          {DAYS_OF_THE_WEEK.map((d) => (
            <div className='day' key={d}>
              <strong>{d}</strong>
            </div>
          ))}
          {Array(days[month] + (startDay - 1))
            .fill(null)
            .map((_, index) => {
              const d = index - (startDay - 2)
              return (
                <div
                  className='day'
                  key={index}
                  style={{
                    border: `${d === today.getDate() && "1px solid #eee"}`,
                    //  backgroundColor: `${d === day && "#eee"}`
                  }}
                  onClick={() => setDate(new Date(year, month, d))}
                >
                  {d > 0 ? d : ''}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Calendar