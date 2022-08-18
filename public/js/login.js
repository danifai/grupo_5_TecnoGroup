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
            const emailFormat = /\S+@\S+\.\S+/
            const validEmail = email.value.match(emailFormat)
            if (!validEmail){
                errors.push('errorEmailType');
                const liEmailType = document.createElement('li');
                liEmailType.innerHTML = 'Debes ingresar un formato válido de email';
                emailWarning.appendChild(liEmailType)
            };
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