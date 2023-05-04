import Switch from "react-switch";
import { useState, useEffect } from "react";

function ModalNotifications(props) {
  const [checkedSms, setCheckedSms] = useState(props.smsRemind);
  const [checkedEmail, setCheckedEmail] = useState(props.mailRemind);

  const handleChangeSms = () => {
    smss = !smss;
    setCheckedSms(smss);
  };
  const handleChangeEmail = () => {
    maill = !maill;
    setCheckedEmail(maill);
  };

  var smss = props.smsRemind;
  var maill = props.mailRemind;

  useEffect(() => {}, [smss, maill]);

  function saveChoice() {
    console.log(checkedSms);
    console.log(checkedEmail);

    const bodySms = {
      id: props.id,
      remind: checkedSms
    }

    const bodyMail = {
      id: props.id,
      remind: checkedEmail
    }

    fetch("http://localhost:8080/donor/reminder/sms", {
      method: "PUT",
      body: JSON.stringify(bodySms),
      headers: {
        "Content-Type" : "application/json"
      }
    }).then((response) => {
      if(response.status === 400) {
        console.log("Something went terribly wrong");
      }
    });

    fetch("http://localhost:8080/donor/reminder/mail", {
      method: "PUT",
      body: JSON.stringify(bodyMail),
      headers: {
        "Content-Type" : "application/json"
      }
    }).then((response) => {
      if(response.status === 400) {
        console.log("Something went terribly wrong");
      }
    });
  }

  return (
    <div className="modal">
      <label>
        <span>SMS Notifications</span>
        <Switch onChange={handleChangeSms} checked={checkedSms} />
      </label>
      <label>
        <span>Mail Notifications</span>
        <Switch onChange={handleChangeEmail} checked={checkedEmail} />
      </label>
      <button onClick={saveChoice}>Save</button>
    </div>
  );
}

export default ModalNotifications;
