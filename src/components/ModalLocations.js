function ModalLocations(props) {
  function getLocations() {
    fetch("http://localhost:8080/locations", {
      method: "GET",
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
        body.locationResponses.forEach((loc) => {
          const locations = document.getElementById("locs");
          const li = document.createElement("li");
          li.innerText =
            "ID: " +
            loc.id +
            "\n" +
            "Name: " +
            loc.name +
            "\n" +
            "Address: " +
            loc.address +
            "\n" +
            "Area: " +
            loc.area +
            "\n" +
            "Opened from " +
            loc.openHour +
            " to " +
            loc.closingHour +
            "\n" +
            "Opened: " +
            loc.opened;

          locations.appendChild(li);
        });
      });
    });
  }

  return (
    <div className="modal">
      {getLocations()}
      <h1>Locations</h1>
      <ul id="locs" />
      <button onClick={props.onClose}>CLOSE</button>
    </div>
  );
}
export default ModalLocations;
