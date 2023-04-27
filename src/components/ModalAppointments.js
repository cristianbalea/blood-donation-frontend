function ModalAppointments(props) {
  function getAppointments() {
    fetch("http://localhost:8080/appointment?userId=" + props.id, {
      method: "GET",
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
        body.appointmentResponses.forEach((appointment) => {
          const appointments = document.getElementById("appointments");
          const li = document.createElement("li");

          li.innerText =
            "ID: " +
            appointment.id +
            "\n" +
            "Name: " +
            appointment.firstName + " " + appointment.lastName + "\n" +
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
  }

  return (
    <div className="modal">
      {getAppointments()}
      <h1>Appointments</h1>
      <ul id="appointments" />
      <button onClick={props.onClose}>CLOSE</button>
    </div>
  );
}
export default ModalAppointments;
