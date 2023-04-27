import React, { useRef } from "react";
import DatePicker from "react-datepicker";

function ModalNewAppointment(props) {
  const idRef = useRef();
  const dateRef = useRef();

  var disabledD = [];

  // function setAvailableDates() {
  //   if (idRef.current.value === "") {
  //     alert("Insert location ID!");
  //   } else {
  //     // const dates = document.getElementById("dateInput");
  //     // const today = new Date().toISOString().split("T")[0];
  //     // const maxDate = new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000)
  //     //   .toISOString()
  //     //   .split("T")[0];
  //     if (dates !== null) {
  //       // dates.setAttribute("min", today);
  //       // dates.setAttribute("max", maxDate);

  //       const startDate = new Date(today);
  //       const endDate = new Date(maxDate);

  //       while (startDate <= endDate) {
  //         const date = startDate.toISOString().split("T")[0];
  //         const locationId = idRef.current.value;

  //         const request = {
  //           date: date,
  //           locationId: locationId,
  //         };

  //         fetch("http://localhost:8080/appointment/available", {
  //           method: "POST",
  //           body: JSON.stringify(request),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }).then((response) => {
  //           if (response.status === 400 || response.status === 500) {
  //             alert("Something went wrong!");
  //           } else {
  //             response.json().then((body) => {
  //               if (body.available === false) {
  //                 disabledD.push(date);
  //               }
  //             });
  //           }
  //         });
  //         startDate.setDate(startDate.getDate() + 1);
  //       }
  //       console.log(disabledD);
  //     } else {
  //       console.log("your fault");
  //     }
  //   }
  // }

  function setAvailableDates() {
    const startDate = new Date();
    const endDate = new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000);

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
                disabledD.push(date);
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
    const date = dateRef.current.value;
    const donorId = props.donorId;

    const appointment = {
      locationId: locationId,
      donorId: donorId,
      date: date,
    };

    console.log(
      "Location ID: " + locationId + "\nDate: " + date + "Donor ID: " + donorId
    );
    fetch("http://localhost:8080/appointment", {
      method: "POST",
      body: JSON.stringify(appointment),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
      });
    });
  }

  return (
    <div className="modal">
      <h1>Create new appointment</h1>
      <input type="text" placeholder="Location ID" ref={idRef} />
      {/* <input
        type="date"
        ref={dateRef}
        id="dateInput"
        onClick={setAvailableDates}
      /> */}
      {setAvailableDates()}

      <DatePicker
        id="dateInput"
        minDate={new Date()}
        maxDate={new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000)}
      />

      <label id="labelDates"></label>
      <button onClick={newAppointment}>ADD APPOINTMENT</button>
      <button onClick={props.onClose}>CLOSE</button>
    </div>
  );
}
export default ModalNewAppointment;
