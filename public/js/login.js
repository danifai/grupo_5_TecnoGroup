window.onload = function () {
    const formulario = document.querySelector('#form');
    const email = document.querySelector('#email')
    const password = document.querySelector('#password');
    const emailWarning = document.querySelector('#emailError');
    const passwordWarning = document.querySelector('#passwordError');

    //------DESDE AQUÍ CONTINUE CON LAS VALIDACIONES DEL FORMULARIO -------//    
    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {

        emailWarning.innerHTML = '';
        passwordWarning.innerHTML = '';
        const errors = [];

        if (email.value == '') {
            errors.push('errorEmail');
            const liEmail = document.createElement('li');
            liEmail.innerHTML = 'El campo email es requerido';
            emailWarning.appendChild(liEmail);
        } else {
            const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailValid = email.value.match(emailFormat);
                if(!emailValid){
                    errors.push('errorEmailValid');
                    const liEmailValid = document.createElement('li');
                    liEmailValid.innerHTML = 'Debes ingresar un formato de correo válido';
                    emailWarning.appendChild(liEmailValid);
                }
        }

        if (password.value == '') {
            errors.push('errorPassword');
            const liPassword = document.createElement('li');
            liPassword.innerHTML = 'El campo password es requerido';
            passwordWarning.appendChild(liPassword);
        }
        if (errors.length > 0) {
            e.preventDefault();
        }
    });
}