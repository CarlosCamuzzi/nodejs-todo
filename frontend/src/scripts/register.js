// REGISTER
const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target.querySelector("#name").value;
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;

  const user = {
    name: name,
    email: email,
    password: password,
  };

  postUser(user);
});

// https://localhost:8080
// POST Register
const postUser = async (param) => {
  return await fetch(`http://localhost:8080/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(param),
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.error(error));
};
