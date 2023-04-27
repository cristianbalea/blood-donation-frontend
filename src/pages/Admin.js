//import { useLocation } from "react-router-dom";
import { useState } from "react";
import Backdrop from "../components/Backdrop";
import ModalCreate from "../components/ModalCreateDoctor";
import ModalRead from "../components/ModalReadDoctors";
import ModalUpdate from "../components/ModalUpdateDoctor";
import ModalDelete from "../components/ModalDeleteDoctor";
import ModalLocations from "../components/ModalLocations";

function AdminPage() {

  const [showModalCreate, setShowModalCreate] = useState();
  const [showModalRead, setShowModalRead] = useState();
  const [showModalUpdate, setShowModalUpdate] = useState();
  const [showModalDelete, setShowModalDelete] = useState();
  const [showModalLocations, setShowModalLocations] = useState();

  function showModalCreateHandler() {
    setShowModalCreate(true);
  }
  function closeModalCreateHandler() {
    setShowModalCreate(false);
  }
  function showModalReadHandler() {
    setShowModalRead(true);
  }
  function closeModalReadHandler() {
    setShowModalRead(false);
  }
  function showModalUpdateHandler() {
    setShowModalUpdate(true);
  }
  function closeModalUpdateHandler() {
    setShowModalUpdate(false);
  }
  function showModalDeleteHandler() {
    setShowModalDelete(true);
  }
  function closeModalDeleteHandler() {
    setShowModalDelete(false);
  }
  function showModalLocationsHandler() {
    setShowModalLocations(true);
  }
  function closeModalLocationsHandler() {
    setShowModalLocations(false);
  }

  return (
    <div>
      <h2>MENU</h2>
      <ul>
        <li>
          <button onClick={showModalCreateHandler}>CREATE</button>
        </li>
        <li>
          <button onClick={showModalReadHandler}>READ ALL</button>
        </li>
        <li>
          <button onClick={showModalUpdateHandler}>UPDATE</button>
        </li>
        <li>
          <button onClick={showModalDeleteHandler}>DELETE</button>
        </li>
        <li>
          <button onClick={showModalLocationsHandler}>LOCATIONS</button>
        </li>

        {showModalCreate && <Backdrop onClick={closeModalCreateHandler} />}
        {showModalCreate && <ModalCreate onClose={closeModalCreateHandler} />}
        {showModalRead && <Backdrop onClick={closeModalReadHandler} />}
        {showModalRead && <ModalRead onClose={closeModalReadHandler} />}
        {showModalUpdate && <Backdrop onClick={closeModalUpdateHandler} />}
        {showModalUpdate && <ModalUpdate onClose={closeModalUpdateHandler} />}
        {showModalDelete && <Backdrop onClick={closeModalDeleteHandler} />}
        {showModalDelete && <ModalDelete onClose={closeModalDeleteHandler} />}
        {showModalLocations && (
          <Backdrop onClick={closeModalLocationsHandler} />
        )}
        {showModalLocations && (
          <ModalLocations onClose={closeModalLocationsHandler} />
        )}
      </ul>
    </div>
  );
}

export default AdminPage;
