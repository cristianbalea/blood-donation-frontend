import { useLocation } from "react-router-dom";
import { useState } from "react";
import Backdrop from "../components/Backdrop";
import ModalTodaysAppointments from "../components/ModalTodaysAppointments";
//import ModalAllAppointmentsAtLocation from "../components/ModalAllAppointmentsAtLocation";
import ModalConfirmAppointment from "../components/ModalConfirmAppointment";
import ModalAppointmentsPaged from "../components/ModalAppointmentsPaged";

function DoctorPage() {
  const location = useLocation();

  const [showModalToday, setShowModalToday] = useState();
  const [showModalAll, setShowModalAll] = useState();
  const [showModalConfirm, setShowModalConfirm] = useState();

  function showModalTodayHandler() {
    setShowModalToday(true);
  }
  function closeModalTodayHandler() {
    setShowModalToday(false);
  }
  function showModalAllHandler() {
    setShowModalAll(true);
  }
  function closeModalAllHandler() {
    setShowModalAll(false);
  }
  function showModalConfirmHandler() {
    setShowModalConfirm(true);
  }
  function closeModalConfirmHandler() {
    setShowModalConfirm(false);
  }

  return (
    <div>
      <h1>MENU</h1>
      <ul>
        <li>
          <button onClick={showModalTodayHandler}>TODAY'S APPOINTMENTS</button>
        </li>
        <li>
          <button onClick={showModalAllHandler}>ALL APPOINTMENTS</button>
        </li>
        <li>
          <button onClick={showModalConfirmHandler}>CONFIRM APPOINTMENT</button>
        </li>

        {showModalToday && <Backdrop onClick={closeModalTodayHandler} />}
        {showModalToday && (
          <ModalTodaysAppointments
            locationId={location.state.locationId}
            onClose={closeModalTodayHandler}
          />
        )}

        {showModalAll && <Backdrop onClick={closeModalAllHandler} />}
        {showModalAll && (
          <ModalAppointmentsPaged
            doctorId={location.state.doctorId}
            locationId={location.state.locationId}
            onClose={closeModalAllHandler}
          />
        )}

        {showModalConfirm && <Backdrop onClick={closeModalConfirmHandler} />}
        {showModalConfirm && (
          <ModalConfirmAppointment onClose={closeModalConfirmHandler} />
        )}
      </ul>
    </div>
  );
}
export default DoctorPage;
