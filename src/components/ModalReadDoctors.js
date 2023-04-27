function ModalRead() {
  function getDoctors() {
    fetch("http://localhost:8080/doctors/all", {
      method: "GET",
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);

        body.doctorResponseList.forEach((doctor) => {
          const doctorList = document.getElementById("doctor-list");
          const li = document.createElement("li");
          li.innerText =
            "ID: " +
            doctor.id +
            "\nName: " +
            doctor.firstName +
            " " +
            doctor.lastName;
          doctorList.appendChild(li);
        });
      });
    });
  }
  return (
    <div className="modal">
      {getDoctors()}
      <h1>Doctors</h1>
      <ul id="doctor-list" />
    </div>
  );
}
export default ModalRead;
