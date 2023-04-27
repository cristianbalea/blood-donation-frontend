import { useRef } from "react";

function ModalDelete() {
  const idRef = useRef();

  function deleteDoctor() {
    const id = idRef.current.value;

    fetch("http://localhost:8080/users/delete?userId=" + id, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 400) {
        alert("Doctor does not exists!");
      } else {
        alert("Doctor deleted!");
      }
    });
  }

  return (
    <div className="modal">
      <h1>Delete doctor</h1>
      <input type="text" placeholder="ID" ref={idRef}></input>
      <button onClick={deleteDoctor}>Delete</button>
    </div>
  );
}
export default ModalDelete;
