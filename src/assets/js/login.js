document.getElementById("password-icon").addEventListener("click", changePass);

var password1 = document.getElementById("password1");
var pass = document.getElementById("password-icon");
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



       

  