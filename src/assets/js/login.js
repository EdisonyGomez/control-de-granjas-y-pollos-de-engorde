document.getElementById("password-icon").addEventListener("click", changePass);
document.getElementById("password-icon2").addEventListener("click", changePass2);

var password1 = document.getElementById("password1");
var pass = document.getElementById("password-icon");

var password2 = document.getElementById("password2");
var pass2 = document.getElementById("password-icon2");
//Evento para mostrar y ocultar menú
function changePass(){
    if ( password1.type === "text" ) {
        password1.type = "password"
        pass.classList.remove('fa-eye-slash');
    } else {
        password1.type = "text"
        pass.classList.toggle("fa-eye-slash");
    }
}

function changePass2(){
    if ( password2.type === "text" ) {
        password2.type = "password"
        pass2.classList.remove('fa-eye-slash');
    } else {
        password2.type = "text"
        pass2.classList.toggle("fa-eye-slash");
    }
}


       

  