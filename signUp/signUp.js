let form = document.querySelector(".signUp");
let userName = document.querySelector(".userName");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let confirmPassword = document.querySelector(".confirmPassword");

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validation();
});

function validation() {
    let user = userName.value.trim();
    let mail = email.value.toLowerCase().trim();
    let pass1 = password.value.trim();
    let pass2 = confirmPassword.value.trim();

    localStorage.setItem("UserName", user);
    localStorage.setItem("Email", mail);
    localStorage.setItem("Password", pass1);
    localStorage.setItem("Confirm Password", pass2);

    if (user === '' || mail === '' || pass1 === '' || pass2 === '') {
        alert('Please fill in all fields for signup.');
        return;
    }

    if (!emailRegex.test(mail)) {
        alert('Please enter a valid email address for signup.');
        return;
    }

    if (pass1 !== pass2) {
        alert('Passwords do not match for signup.');
        return;
    }

    alert("SignUp Successful");
}
