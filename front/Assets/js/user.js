let cards2 = document.querySelector(".cards2");

async function getAllEquipmentIsTrue() {
  let apiCall = await fetch("http://localhost:3003/equipment/all/true");
  let response = await apiCall.json();
  console.log(response);

  response.result.forEach((equipment) => {
    let imageUrl = `http://localhost:3003/uploads/${equipment.image}`;
    console.log(imageUrl);
    cards2.innerHTML += `<div class="card ms-3" style="width: 25rem;">
                        <img src="${imageUrl}" class="card-img-top img-fluid" style="widht: 500px height: auto" alt="Image ${equipment.name}" />
                        <div class="card-body">
                        <h5 class="card-title">${equipment.name}</h5>
                        <p class="card-text">${equipment.description}</p>
                        <h6 class="card-title">Prix de la location : ${equipment.price} €/jour</h6>
                        <p class="card-text">${equipment.disponibilite}</p>
                        <a href="./Views/auth/login.html" class="btn btn-primary">Louer</a>
                        </div>
                        </div>`;
  });
}
getAllEquipmentIsTrue();

function logout2() {
  localStorage.removeItem("jwt");
  window.location.href = "../../Views/auth/login.html";
}

function pageRegister2() {
  window.location.href = "../Views/auth/register.html";
}

function pageLogin2() {
  window.location.href = "../Views/auth/login.html";
}
