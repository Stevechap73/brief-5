async function handleRegister() {
  let email = document.querySelector(".email").value;
  let password = document.querySelector(".password").value;
  let role = document.querySelector(".role").value;
  let firstName = document.querySelector(".firstName").value;
  let adress = document.querySelector(".adress").value;

  let user = {
    email: email,
    password: password,
    role: role,
    firstName: firstName,
    adress: adress,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  };

  let apiRequest = fetch("http://localhost:3003/user/register", request);
  let response = await apiRequest;
  console.log(response);
  if (response.status === 201) {
    window.location.href = "./login.html";
  } else {
    alert("Mauvais identifiants");
  }
}

async function handleLogin() {
  let email = document.querySelector(".email").value;
  let password = document.querySelector(".password").value;

  let user = {
    identifier: email,
    password: password,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  };

  let apiRequest = fetch("http://localhost:3003/user/login", request);
  let response = await apiRequest;
  let data = await response.json();
  console.log(response);
  if (response.status === 200) {
    let jwt = data.jwt;
    let role = data.role;
    window.localStorage.setItem("jwt", jwt);
    console.log(role);
    if (role === "admin") {
      window.location.href = "../../Views/admin/admin.html";
    } else {
      window.location.href = "../../Views/user/user.html";
    }
  } else {
    alert("Mauvais identifiants");
  }
}
