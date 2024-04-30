// let jwt = window.localStorage.getItem("jwt");
// if (!jwt || jwt === "undefined" || jwt.length < 20) {
//   window.location.href = "../../Views/auth/login.html";
// }

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = "../../Views/auth/login.html";
}

function pageRegister() {
  window.location.href = "./Views/auth/register.html";
}

function pageLogin() {
  window.location.href = "./Views/auth/login.html";
}

// affiche les équipements disponible à la location
let cards = document.querySelector(".cards");

async function getAllEquipment() {
  let apiCall = await fetch("http://localhost:3003/equipment/all");
  let response = await apiCall.json();
  console.log(response);

  response.result.forEach((equipment) => {
    let imageUrl = `../../back/src/Controllers/uploads/${equipment.image}`;
    console.log(imageUrl);
    cards.innerHTML += `<div class="card" style="width: 18rem;">
                        <img src="${imageUrl}" class="card-img-top" alt="Image ${equipment.name}" />
                        <div class="card-body">
                        <h5 class="card-title">${equipment.name}</h5>
                        <p class="card-text">${equipment.description}</p>
                        <h6 class="card-title">Prix de la location : ${equipment.price} €/jour</h6>
                        <p class="card-text">${equipment.disponibilite}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        </div>`;
  });
}

getAllEquipment();
