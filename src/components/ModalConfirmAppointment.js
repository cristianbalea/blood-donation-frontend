import { useRef } from "react";

function ModalConfirmAppointment() {
  const idRef = useRef();

  function confirmAppointment() {
    const id = idRef.current.value;
    
    fetch("http://localhost:8080/appointment/confirm?appointmentId=" + id, {
        method: "PUT",
    }).then((response) => {
        response.json().then((body) => {
            console.log(body);
            if(response.status === 400) {
                alert("Appointment does not exists!");
            } else {
                alert("Appointment confirmed!");
            }
        });
    });
  }

  return (
    <div className="modal">
      <h1>Confirm appointment</h1>
      <input type="text" placeholder="ID" ref={idRef} />
      <button onClick={confirmAppointment}>CONFIRM</button>
    </div>
  );
}
export default ModalConfirmAppointment;
