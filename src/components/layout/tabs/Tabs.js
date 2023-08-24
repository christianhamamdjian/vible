import React, { useState, useEffect } from 'react';
// import { FaAngleDoubleRight, FaTruckLoading } from 'react-icons/fa';
import './index.css'
import { allJobs } from './data'
// const url = 'https://course-api.com/react-tabs-project';
function Tabs() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  // const fetchJobs = async () => {
  //   try {
  //     const response = await fetch(url);
  //     const newJobs = await response.json();
  //     setJobs(newJobs);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  const fetchJobs = async () => {
    try {
      // const response = await fetch(url);
      // const newJobs = await response.json();
      setJobs(allJobs);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )
  }
  const changeValue = (index) => {
    setValue(index);
  }
  const { id, order, title, dates, duties, company } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {jobs.map((job, index) => {
            return <button
              key={job.id}
              onClick={() => changeValue(index)}
              className={`job-btn ${index === value && 'active-btn'}`}
            >{job.company}</button>
          })}</div>

        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                {/* <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight> */}
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>

    </section>
  );
}

export default Tabs;
