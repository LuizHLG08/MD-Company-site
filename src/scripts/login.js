import { loginRequest } from "./requests.js"

const redirectToHome = () => {
    const homeButton = document.querySelector('.header__button--home')
    homeButton.addEventListener('click', () => {
        location.replace('../../index.html')
    })
}

const redirectToRegister = () => {
    const registerButton = document.querySelector('.header__button--register')
    registerButton.addEventListener('click', () => {
        location.replace("./register.html")
    })
    const formRegisterButton = document.querySelector('.form__button--register')
    formRegisterButton.addEventListener('click', (e) => {
        e.preventDefault()
        location.replace('./register.html')
    })    
}

const logIn = () => {
    const submitButton = document.querySelector('.form__button--login')
    const userEmail = document.querySelector('.login__input--email')
    const userPassword = document.querySelector('.login__input--password')

    const emptyEmail = document.querySelector('#empty-email')
    const emptyPassword = document.querySelector('#empty-password')

    const inputs = document.querySelectorAll('.login__input')
    
    submitButton.addEventListener('click', (e) => {
        e.preventDefault()
        const data = {
            email: userEmail.value,
            password: userPassword.value
        }

        //Estilização dos inputs
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('error')
                input.name === 'email' ? 
                emptyEmail.classList.remove('hidden') :
                emptyPassword.classList.remove('hidden')
            } else {
                input.classList.remove('error')
                input.name === 'email' ? 
                emptyEmail.classList.add('hidden') :
                emptyPassword.classList.add('hidden')
            }
        })
        loginRequest(data)
    })
}

redirectToHome()
redirectToRegister()
logIn()

