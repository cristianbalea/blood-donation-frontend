import { useRef } from "react";

function ModalChat(props) {
  const userInput = useRef();

  function processInput() {
    const l = document.getElementById("response");
    if(l !== null) {
      l.innerText = "Wait a few moments...";
    }

    //console.log(userInput.current.value);
    const input = userInput.current.value.toLowerCase();


    const prompt =
      "Answer very short to the following question like you are the " +
      "chatbot of a blood donation platform. If the question is not blood donation related, tell this. " +
      input;

    const body = {
      prompt: prompt,
      max_tokens: 50,
    };

    fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "",
      },
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
        const l = document.getElementById("response");
        if (l !== null) {
          l.innerText = body.choices[0].text;
        }
      });
    });
  }

  return (
    <div className="modal">
      <div>
        <h2>Chat assistant</h2>
      </div>
      <div>
        <label id="response">Hi, how can I help you?</label>
      </div>
      <div>
        <input type="text" ref={userInput}></input>
        <button onClick={processInput}>Send</button>
      </div>
      <div>
        How much blood can you donate?
        <br />
        How long do I have to wait to donate again?
        <br />
        What are the benefits of blood donation?
        <br />
      </div>
    </div>
  );
}

export default ModalChat;
