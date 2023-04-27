import { useRef } from "react";
function ModalUpdate(props) {
  const idRef = useRef();
  const cnpRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const locationIdRef = useRef();

  function validateCnp(cnp) {
    if (cnp.length !== 13) return false;
    return true;
  }
  function validateEmail(email) {
    if (!email.includes("@donate.ro")) return false;
    return true;
  }
  function validatePass(password) {
    if (password === "") return false;
    return true;
  }
  function validateName(name) {
    if (name === "") return false;
    return true;
  }
  function validateId(id) {
    if (
      !/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
        id
      )
    )
      return false;
    return true;
  }

  function setDoctorDetails() {
    const doctorId = idRef.current.value;

    fetch("http://localhost:8080/doctors/doctor?doctorId=" + doctorId, {
      method: "GET",
    }).then((response) => {
      console.log(response);
      response.json().then((body) => {
        console.log(body);
        const cnp = document.getElementById("textCnp");
        cnp.value = body.cnp;

        const email = document.getElementById("textEmail");
        email.value = body.email;

        const pass = document.getElementById("textPass");
        pass.value = body.password;

        const fname = document.getElementById("textFName");
        fname.value = body.firstName;

        const lname = document.getElementById("textLName");
        lname.value = body.lastName;

        const location = document.getElementById("textLocation");
        location.value = body.locationId;
      });
    });
  }

  function updateDoctor() {
    const id = idRef.current.value;
    const cnp = cnpRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const locationId = locationIdRef.current.value;

    if (!validateCnp(cnp)) {
      alert("Invalid CNP!");
      return false;
    }
    if (!validateEmail(email)) {
      alert("Invalid E-mail!");
      return false;
    }
    if (!validatePass(password)) {
      alert("Invalid password!");
      return false;
    }
    if (!validateName(firstName) || !validateName(lastName)) {
      alert("Invalid name!");
      return false;
    }
    if (!validateId(locationId)) {
      alert("Invalid location ID!");
      return false;
    }

    const doctor = {
      id: id,
      cnp: cnp,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      locationId: locationId,
    };

    fetch("http://localhost:8080/doctors/update", {
      method: "PUT",
      body: JSON.stringify(doctor),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      response.json().then((body) => {
        console.log(body);
      });
    });
  }

  return (
    <div className="modal">
      <h1>Update Doctor</h1>
      <input type="text" placeholder="ID" ref={idRef} />
      <button onClick={setDoctorDetails}>Get doctor</button>
      <p></p>
      <input type="text" ref={cnpRef} id="textCnp" />
      <input type="text" ref={emailRef} id="textEmail" />
      <input type="text" ref={passRef} id="textPass" />
      <input type="text" ref={firstNameRef} id="textFName" />
      <input type="text" ref={lastNameRef} id="textLName" />
      <input type="text" ref={locationIdRef} id="textLocation" />
      <button onClick={props.onClose}>Close</button>
      <button onClick={updateDoctor}>Update</button>
    </div>
  );
}

export default ModalUpdate;
