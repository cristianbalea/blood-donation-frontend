import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import classes from "./ModalNewAppointment.module.css";

import "react-datepicker/dist/react-datepicker.css";

function ModalNewAppointment(props) {
  const idRef = useRef();

  const [startDate, setStartDate] = useState(new Date());

  const disabledD = [];

  function setAvailableDates() {
    const startDate = new Date();
    const endDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

    if (idRef.current.value === "") {
      alert("Insert location ID!");
    } else {
      while (startDate <= endDate) {
        const date = startDate.toISOString().split("T")[0];
        const locationId = idRef.current.value;

        const request = {
          date: date,
          locationId: locationId,
        };

        fetch("http://localhost:8080/appointment/available", {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (response.status === 400 || response.status === 500) {
            alert("Something went wrong!");
          } else {
            response.json().then((body) => {
              if (body.available === false) {
                disabledD.push(new Date(date));
              }
            });
          }
        });
        startDate.setDate(startDate.getDate() + 1);
      }
      console.log(disabledD);
    }
  }

  function newAppointment() {
    const locationId = idRef.current.value;
    const donorId = props.donorId;

    const appointment = {
      locationId: locationId,
      donorId: donorId,
      date: new Date(startDate),
    };

    fetch("http://localhost:8080/appointment", {
      method: "POST",
      body: JSON.stringify(appointment),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 400) {
        alert("No available spots!");
      } else {
        response.json().then(() => {
          alert("Appointment created!");
        });
      }
    });
  }

  function isWeekDay(date) {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }

  return (
    <div className="modal">
      <h1>Create new appointment</h1>
      <input
        type="text"
        placeholder="Location ID"
        ref={idRef}
        onClick={setAvailableDates}
      />

      <div className={classes.nostyle}>
        <span></span>
        <DatePicker
          id="dateInput"
          minDate={new Date()}
          maxDate={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)}
          excludeDates={disabledD}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          filterDate={isWeekDay}
        />
        <span></span>
      </div>

      <label id="labelDates"></label>
      <button onClick={newAppointment}>ADD APPOINTMENT</button>
      <button onClick={props.onClose}>CLOSE</button>
    </div>
  );
}
export default ModalNewAppointment;
