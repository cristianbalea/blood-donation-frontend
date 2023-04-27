import { useRef } from "react";
function ModalCreate(props) {
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

  function validateLocationId(locationId) {
    if (
      !/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
        locationId
      )
    )
      return false;
    return true;
  }

  function createDoctor() {
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
    if (!validateLocationId(locationId)) {
      alert("Invalid location ID!");
      return false;
    }

    const doctor = {
      cnp: cnp,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      locationId: locationId,
    };

    fetch("http://localhost:8080/doctors", {
      method: "POST",
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
      <h1>Create a new Doctor</h1>
      <input type="text" placeholder="CNP" ref={cnpRef} />
      <input type="text" placeholder="Email" ref={emailRef} />
      <input type="text" placeholder="Password" ref={passRef} />
      <input type="text" placeholder="First Name" ref={firstNameRef} />
      <input type="text" placeholder="Last Name" ref={lastNameRef} />
      <input type="text" placeholder="Location ID" ref={locationIdRef} />
      <button onClick={props.onClose}>Close</button>
      <button onClick={createDoctor}>Create</button>
    </div>
  );
}

export default ModalCreate;
