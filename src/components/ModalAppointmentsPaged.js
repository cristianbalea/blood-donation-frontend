
function ModalAppointmentsPaged(props) {
  var offset = 0;

  var numberOfAppointments = 0;

  function getNumberOfAppointments() {
    console.log(props.locationId);
    fetch(
      "http://localhost:8080/appointment/location?locationId=" +
        props.locationId,
      {
        method: "GET",
      }
    ).then((response) => {
      response.json().then((body) => {
        console.log(body);
        body.appointmentResponses.forEach(() => {
          numberOfAppointments = numberOfAppointments + 1;
        });
      });
    });
  }

  function showAppointmentsNext() {
    if (offset < 0) offset = 0;
    if (offset > numberOfAppointments) offset -= 3;
    const pageNumber = document.getElementById("pageNr");
    if (pageNumber !== null) pageNumber.innerHTML = "Page" + (offset / 3 + 1);

    const ul = document.getElementById("appointmentList");
    if (ul !== null) ul.innerHTML = "";

    console.log(props.locationId);
    const location = props.locationId;

    const request = {
      locationId: location,
      offset: offset,
    };

    fetch("http://localhost:8080/appointment/page", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
        body.appointmentResponses.forEach((appointment) => {
          const appointments = document.getElementById("appointmentList");
          const li = document.createElement("li");

          li.innerText =
            "ID: " +
            appointment.id +
            "\n" +
            "Name: " +
            appointment.firstName +
            " " +
            appointment.lastName +
            "\n" +
            "Location: " +
            appointment.locationName +
            " , " +
            appointment.locationAddress +
            "\n" +
            "Date: " +
            appointment.date +
            "\n" +
            "Confirmed: " +
            appointment.confirmed;

          appointments.appendChild(li);
        });
      });
    });
    console.log(offset);
    offset = offset + 3;
  }

  function showAppointmentsPrev() {
    if (offset < 0) offset = 0;
    if (offset > numberOfAppointments) offset -= 3;
    const pageNumber = document.getElementById("pageNr");
    if (pageNumber !== null) pageNumber.innerHTML = "Page" + (offset / 3 + 1);

    const ul = document.getElementById("appointmentList");
    if (ul !== null) ul.innerHTML = "";

    console.log(props.locationId);
    const location = props.locationId;

    const request = {
      locationId: location,
      offset: offset,
    };

    fetch("http://localhost:8080/appointment/page", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
        body.appointmentResponses.forEach((appointment) => {
          const appointments = document.getElementById("appointmentList");
          const li = document.createElement("li");

          li.innerText =
            "ID: " +
            appointment.id +
            "\n" +
            "Name: " +
            appointment.firstName +
            " " +
            appointment.lastName +
            "\n" +
            "Location: " +
            appointment.locationName +
            " , " +
            appointment.locationAddress +
            "\n" +
            "Date: " +
            appointment.date +
            "\n" +
            "Confirmed: " +
            appointment.confirmed;

          appointments.appendChild(li);
        });
      });
    });
    console.log(offset);
    offset = offset - 3;
  }

  return (
    <div className="modal">
      {getNumberOfAppointments()}
      <h1>Appointments</h1>
      <label id="pageNr">Page 1</label>
      <button onClick={showAppointmentsPrev}>Previous</button>
      <button onClick={showAppointmentsNext}>Next</button>
      <ul id="appointmentList"></ul>
      {showAppointmentsNext()}
    </div>
  );
}

export default ModalAppointmentsPaged;
