function ModalTodaysAppointments(props) {
  function showTodaysAppointments() {
    console.log(props.locationId);
    fetch(
      "http://localhost:8080/appointment/today?locationId=" + props.locationId,
      {
        method: "GET",
      }
    ).then((response) => {
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
      {showTodaysAppointments()}
      <h1>Today's appointments</h1>
      <ul id="appointmentList"></ul>
    </div>
  );
}
export default ModalTodaysAppointments;
