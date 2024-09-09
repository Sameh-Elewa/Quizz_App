let form = document.querySelector(".form");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let login = document.querySelector(".login");

login.addEventListener("click", (e) => {
    e.preventDefault();
    const emailAddress = email.value.toLowerCase();
    const passwordAddress = password.value;
    const getName = localStorage.getItem("UserName");
    const getEmail = localStorage.getItem("Email");
    const getPassword = localStorage.getItem("Password");

    if (emailAddress == "" && passwordAddress == ""){
        alert("Input field has no value");
    }else if(emailAddress==getEmail && passwordAddress==getPassword){
        alert(`Login Successful! Hello, ${getName}`);
        window.location.href = "../Exam/Exam.html";
    }else{
        alert("Something Is Wrong");
    }
})