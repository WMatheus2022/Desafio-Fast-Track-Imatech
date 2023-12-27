document.addEventListener('DOMContentLoaded', function () {

    const elements = {
        emailInputLogin: document.querySelector("#inputEmail3"),
        passwordInputLogin: document.querySelector("#inputPassword3"),
        emailInputSignup: document.querySelector("#inputEmail"),
        passwordInputSignup: document.querySelector("#inputPassword"),
        nomeInput: document.querySelector("#nomeUser"),
        loginButton: document.querySelector("#loginButton"),
        signupButton: document.querySelector("#signupButton")
    };

    let usersData = JSON.parse(localStorage.getItem('usersData')) || [];

    // Função para validar e estilizar o campo de entrada
    function validateAndStyleInput(input, minLength) {
        const value = input.value.trim();
        const isValid = value.length >= minLength && value !== '';

        input.style.borderColor = isValid ? 'green' : 'red';
        return isValid;
    }

    // Adicionando eventos de teclado para validação em tempo real
    elements.emailInputLogin.addEventListener('input', () => validateAndStyleInput(elements.emailInputLogin, 3));
    elements.passwordInputLogin.addEventListener('input', () => validateAndStyleInput(elements.passwordInputLogin, 6));

    elements.emailInputSignup.addEventListener('input', () => validateAndStyleInput(elements.emailInputSignup, 3));
    elements.passwordInputSignup.addEventListener('input', () => validateAndStyleInput(elements.passwordInputSignup, 6));
    elements.nomeInput.addEventListener('input', () => validateAndStyleInput(elements.nomeInput, 4));

    // Função para validar o formulário de login
    function Login() {
        if (validateAndStyleInput(elements.emailInputLogin, 3) && validateAndStyleInput(elements.passwordInputLogin, 6)) {
            usersData.push({
                email: elements.emailInputLogin.value,
                senha: elements.passwordInputLogin.value
            });

            localStorage.setItem('usersData', JSON.stringify(usersData));
            displayModal("Login bem-sucedido!");
            window.location.href = "gerenciador.html";
        } else {
            displayModal("Preencha todos os campos.");
        }

    }
    
    elements.loginButton.addEventListener('click', Login)
    elements.signupButton.addEventListener('click', Cadastro)

    // Função para validar o formulário de cadastro
    function Cadastro() {
        if (validateAndStyleInput(elements.nomeInput, 4) && validateAndStyleInput(elements.emailInputSignup, 3) && validateAndStyleInput(elements.passwordInputSignup, 6)) {
            usersData.push({
                nome: elements.nomeInput.value,
                email: elements.emailInputSignup.value,
                senha: elements.passwordInputSignup.value
            });

            localStorage.setItem('usersData', JSON.stringify(usersData));
            displayModal("Cadastro bem-sucedido!");
            window.location.href = "gerenciador.html";
            
        } else {
            displayModal("Preencha todos os campos.");
        }
    }

    // Função para exibir o modal
    function displayModal(message) {
        document.getElementById("modalMessage").innerText = message;
        $('#myModal').modal('show');
    }

});
