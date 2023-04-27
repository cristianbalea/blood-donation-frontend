import { useRef } from "react";

function ModalEdit(props) {

    var area;

  const cnpRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const bloodTypeRef = useRef();

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
  function validateBloodType(bloodType) {
    if (
      bloodType !== "01" &&
      bloodType !== "A2" &&
      bloodType !== "B3" &&
      bloodType !== "AB4"
    )
      return false;
    return true;
  }

  function setDonorDetails() {
    fetch("http://localhost:8080/donor?donorId=" + props.id, {
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

        area = body.area;

        const bloodType = document.getElementById("textBloodType");
        bloodType.value = body.bloodType;
      });
    });
  }

  function editDonor() {
    const id = props.id;
    const cnp = cnpRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const bloodType = bloodTypeRef.current.value;

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
    if (!validateBloodType(bloodType)) {
      alert("Invalid blood type!");
      return false;
    }

    const user = {
      id: id,
      cnp: cnp,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      area: area,
      bloodType: bloodType,
    };

    fetch("http://localhost:8080/donor/update", {
      method: "PUT",
      body: JSON.stringify(user),
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
      {setDonorDetails()}
      <h1>Update your account</h1>
      <input type="text" ref={cnpRef} id="textCnp" />
      <input type="text" ref={emailRef} id="textEmail" />
      <input type="text" ref={passRef} id="textPass" />
      <input type="text" ref={firstNameRef} id="textFName" />
      <input type="text" ref={lastNameRef} id="textLName" />
      <input type="text" ref={bloodTypeRef} id="textBloodType" />
      <button onClick={props.onClose}>Close</button>
      <button onClick={editDonor}>Update</button>
    </div>
  );
}

export default ModalEdit;
