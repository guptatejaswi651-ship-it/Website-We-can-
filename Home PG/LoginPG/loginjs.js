
let loginTab = document.getElementById("loginTab");
let signupTab = document.getElementById("signupTab");
let loginForm = document.getElementById("loginForm");
let signupForm = document.getElementById("signupForm");
let message = document.getElementById("message");

// Switch between Login and Signup
loginTab.onclick = function () {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    message.innerText = "";
};

signupTab.onclick = function () {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    message.innerText = "";
};

// Login
loginForm.onsubmit = function (e) {
    e.preventDefault();
    window.location.href = "Home.html";
};

// Signup
signupForm.onsubmit = function (e) {
    e.preventDefault();
    window.location.href = "Home.html";
};
