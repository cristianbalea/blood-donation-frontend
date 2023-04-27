import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

function LoginPage() {
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  function login() {
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    if (email === "" || pass === "") {
      alert("Fields must be completed!");
    } else {
      const user = {
        email: email,
        password: pass,
      };

      console.log(user);

      fetch("http://localhost:8080/users/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log(response);
        if (response.status === 400) {
          alert("User not found!");
        } else {
          response.json().then((body) => {
            console.log(body);
            if (body.role === "DOCTOR") {
              fetch(
                "http://localhost:8080/doctors/doctor?doctorId=" + body.id,
                {
                  method: "GET",
                }
              ).then((response2) => {
                console.log(response2);
                response2.json().then((body2) => {
                  console.log(
                    "Doctor ID:" +
                      body.id +
                      "\n" +
                      "Location ID:" +
                      body2.locationId
                  );
                  navigate("/doctor", {
                    state: {
                      doctorId: body.id,
                      locationId: body2.locationId,
                    },
                  });
                });
              });
            } else if (body.role === "DONOR") {
              navigate("/donor", {
                state: {
                  donorId: body.id,
                },
              });
            } else if (body.role === "ADMIN") {
              navigate("/admin", {
                state: {
                  adminId: body.id,
                },
              });
            }
          });
        }
      });
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <div>
        <input type="text" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passRef} />
        <button type="button" onClick={login}>
          Login
        </button>
      </div>

      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default LoginPage;
