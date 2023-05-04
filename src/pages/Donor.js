import { useLocation, useNavigate } from "react-router-dom";
import ModalLocations from "../components/ModalLocations";
import { useState } from "react";
import Backdrop from "../components/Backdrop";
import ModalEdit from "../components/ModalEditDonor";
import ModalAppointments from "../components/ModalAppointments";
import ModalNewAppointment from "../components/ModalNewAppointment";
import ModalDeleteAppointment from "../components/ModalDeleteAppointment";
import ModalNotifications from "../components/ModalNotifications";

function DonorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showModalLocations, setShowModalLocations] = useState();
  const [showModalEdit, setShowModalEdit] = useState();
  const [showModalNewAppointment, setShowModalNewAppointment] = useState();
  const [showModalAppointments, setShowModalAppointments] = useState();
  const [showModalDelete, setShowModalDelete] = useState();
  const [showModalNotify, setShowModalNotify] = useState();

  function showModalLocationsHandler() {
    setShowModalLocations(true);
  }
  function closeModalLocationsHandler() {
    setShowModalLocations(false);
  }
  function showModalEditHandler() {
    setShowModalEdit(true);
  }
  function closeModalEditHandler() {
    setShowModalEdit(false);
  }
  function showModalNewAppointmentHandler() {
    setShowModalNewAppointment(true);
  }
  function closeModalNewAppointmentHandler() {
    setShowModalNewAppointment(false);
  }
  function showModalAppointmentsHandler() {
    setShowModalAppointments(true);
  }
  function closeModalAppointmentsHandler() {
    setShowModalAppointments(false);
  }
  function showModalNotifyHandler() {
    setShowModalNotify(true);
  }
  function closeModalNotifyHandler() {
    setShowModalNotify(false);
  }
  function showModalDeleteHandler() {
    setShowModalDelete(true);
  }
  function closeModalDeleteHandler() {
    setShowModalDelete(false);
  }

  function deleteAccount() {
    const id = location.state.donorId;
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch("http://localhost:8080/users/delete?userId=" + id, {
        method: "DELETE",
      }).then(() => {
        navigate("/login");
      });
    }
  }

  const [smsRemind, setSmsRemind] = useState();
  const [mailRemind, setMailRemind] = useState();

  //var smsRemind = false;
  //var mailRemind = false;

  function getDonor() {
    const id = location.state.donorId;
    fetch("http://localhost:8080/donor?donorId=" + id, {
      method: "GET",
    }).then((response) => {
      response.json().then((body) => {
        setSmsRemind(body.smsRemind);
        setMailRemind(body.mailRemind);
        //console.log(smsRemind);
        //console.log(mailRemind);
      })
    });
  }

  return (
    <div>
      {/* <h1>{location.state.donorId}</h1> */}
      {getDonor()}
      <h1>Menu</h1>
      <ul>
        <li>
          <button onClick={showModalEditHandler}>EDIT ACCOUNT</button>
        </li>
        <li>
          <button onClick={showModalNewAppointmentHandler}>
            CREATE APPOINTMENT
          </button>
        </li>
        <li>
          <button onClick={showModalAppointmentsHandler}>
            MY APPOINTMENTS
          </button>
        </li>
        <li>
          <button onClick={showModalDeleteHandler}>DELETE APPOINTMENT</button>
        </li>
        <li>
          <button onClick={showModalLocationsHandler}>LOCATIONS</button>
        </li>
        <li>
          <button onClick={deleteAccount}>Delete account</button>
        </li>
        <li>
          <button onClick={showModalNotifyHandler}>Notifications</button>
        </li>

        {showModalLocations && (
          <Backdrop onClick={closeModalLocationsHandler} />
        )}
        {showModalLocations && (
          <ModalLocations onClose={closeModalLocationsHandler} />
        )}
        {showModalEdit && <Backdrop onClick={closeModalEditHandler} />}
        {showModalEdit && (
          <ModalEdit
            id={location.state.donorId}
            onClose={closeModalEditHandler}
          />
        )}
        {showModalAppointments && (
          <Backdrop onClick={closeModalAppointmentsHandler} />
        )}
        {showModalAppointments && (
          <ModalAppointments
            id={location.state.donorId}
            onClose={closeModalAppointmentsHandler}
          />
        )}
        {showModalNewAppointment && (
          <Backdrop onClick={closeModalNewAppointmentHandler} />
        )}
        {showModalNewAppointment && (
          <ModalNewAppointment
            donorId={location.state.donorId}
            onClose={closeModalNewAppointmentHandler}
          />
        )}
        {showModalDelete && <Backdrop onClick={closeModalDeleteHandler} />}
        {showModalDelete && (
          <ModalDeleteAppointment
            id={location.state.donorId}
            onClose={closeModalDeleteHandler}
          />
        )}
        {showModalNotify && <Backdrop onClick={closeModalNotifyHandler} />}
        {showModalNotify && (
          <ModalNotifications
            smsRemind={smsRemind}
            mailRemind={mailRemind}
            id={location.state.donorId}
            onClose={closeModalNotifyHandler}
          />
        )}
      </ul>
    </div>
  );
}
export default DonorPage;
