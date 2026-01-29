const signInBtn = document.getElementById("showSignIn");
const signUpBtn = document.getElementById("showSignUp");

const signInForm = document.querySelector(".sign-in");
const signUpForm = document.querySelector(".sign-up");

signInBtn.onclick = () => {
  signInForm.classList.remove("hidden");
  signUpForm.classList.add("hidden");

  signInBtn.classList.add("active");
  signUpBtn.classList.remove("active");
};

signUpBtn.onclick = () => {
  signUpForm.classList.remove("hidden");
  signInForm.classList.add("hidden");

  signUpBtn.classList.add("active");
  signInBtn.classList.remove("active");
};
