import { useRef } from "react";

function ModalDeleteAppointment(props) {
  const idRef = useRef();

  function deleteAppointment() {
    const id = idRef.current.value;

    fetch("http://localhost:8080/appointment/delete?appointmentId=" + id, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 400) {
        alert("Appointment not found!");
      } else {
        response.json().then((body) => {
          alert("Appointment deleted!");
        });
      }
    });
  }

  return (
    <div className="modal">
      <h1>Delete appointment</h1>
      <input type="text" ref={idRef} placeholder="ID" />
      <button onClick={deleteAppointment}>DELETE</button>
      <button onClick={props.onClose}>CLOSE</button>
    </div>
  );
}
export default ModalDeleteAppointment;
