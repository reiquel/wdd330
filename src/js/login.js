import { login } from "./auth.mjs";
import { getParam } from "./utils.mjs";

getParam("redirect");

// this is how it would look if we listen for the submit on the form
document.forms["login-form"].addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  const form = `{
        "email": "${username}",
        "password": "${password}"
    }`;

  const request = JSON.parse(form);

  login(request);
});
