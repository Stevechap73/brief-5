// const { rmSync } = require("fs");

async function addEquipment() {
  let image = document.querySelector(".image");
  let name = document.querySelector(".name").value;
  let description = document.querySelector(".description").value;
  let disponibilite = document.querySelector(".disponibilite").value;
  let price = document.querySelector(".price").value;

  //   let arrival = document.querySelector(".arrival").value;
  //   let departure = document.querySelector(".departure").value;

  const formData = new FormData();

  formData.append("image", image.files[0]);

  const response = await fetch("http://localhost:3003/equipment/add/image", {
    method: "POST",
    body: formData,
  });
  let data = await response.json();

  if (response.status === 200) {
    let uploadedImage = data.newFileName;

    let equipment = {
      name: name,
      description: description,
      disponibilite: disponibilite,
      price: price,
      image: uploadedImage,
    };

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(equipment),
    };
    // rmSync;

    const Response = await fetch(
      "http://localhost:3003/equipment/add/equipment",
      request
    ).then((res) => {
      if (res.status === 201) {
        alert("inserted");
      }
    });
  }
}
addEquipment();
