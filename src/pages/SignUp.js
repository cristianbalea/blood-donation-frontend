import { useRef } from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
  const cnpRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const locationRef = useRef();
  const bloodTypeRef = useRef();

  function validateCnp(cnp) {
    if (cnp.length !== 13) return false;
    return true;
  }

  function validateEmail(email) {
    if (email === "") return false;
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

  function registerHandler() {
    const cnp = cnpRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const location = locationRef.current.value;
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
      cnp: cnp,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      area: location,
      bloodType: bloodType,
    };

    fetch("http://localhost:8080/donor/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 400) {
        alert("Account already exists!");
      } else {
        console.log(response);
        response.json().then((body) => {
          console.log(body);
          alert("Account created!");
        });
      }
    });
  }

  return (
    <div>
      <h1>Sign Up</h1>

      <div>
        <input type="text" placeholder="CNP" ref={cnpRef} />
        <input type="text" placeholder="E-mail" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passRef} />
        <input type="text" placeholder="First name" ref={firstNameRef} />
        <input type="text" placeholder="Last name" ref={lastNameRef} />
        <select ref={locationRef}>
          <option value="Cluj-Napoca">Cluj-Napoca</option>
          <option value="Turda">Turda</option>
          <option value="Oradea">Oradea</option>
          <option value="Bucuresti">Bucuresti</option>
          <option value="Timisoara">Timisoara</option>
          <option value="Iasi">Iasi</option>
          <option value="Craiova">Craiova</option>
        </select>
        <input
          type="text"
          placeholder="Blood Type: 01|A2|B3|AB4"
          ref={bloodTypeRef}
        />
        <button type="button" onClick={registerHandler}>
          Sign Up
        </button>
      </div>

      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default SignUpPage;
