const signupForm = document.querySelector(".signup-form");

const signupFormhandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#name-input").value.trim();
  const email = document.querySelector("#email-input").value.trim();
  const password = document.querySelector("#password-input").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', loginFormHandler)
