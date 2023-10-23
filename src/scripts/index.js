import { filterCompanies } from "./filter.js";
import { renderAllCompanies } from "./render.js";

const redirectToLogin = () => {
    const loginButton = document.querySelector('.header__button--login')
    loginButton.addEventListener('click', () => {
        location = "./src/pages/login.html"
    })
}

const redirectToRegister = () => {
    const registerButton = document.querySelector('.header__button--register')
    registerButton.addEventListener('click', () => {
        location = "./src/pages/register.html"
    })    
}

renderAllCompanies()
filterCompanies()
redirectToLogin()
redirectToRegister()
