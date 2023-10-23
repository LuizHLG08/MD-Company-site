import { registerRequest } from "./requests.js"

const redirect = () => {
    const homeButton = document.querySelector('.header__button--home')
    const loginButton = document.querySelector('.header__button--login')
    const resumeButton = document.querySelector('.form__button--home')

    homeButton.addEventListener('click', () => location.replace('../../index.html'))
    loginButton.addEventListener('click', () => location.replace('./login.html'))
    resumeButton.addEventListener('click', (e) => {
        e.preventDefault()
        location.replace('../../index.html')
    })
}

const register = () => {
    const inputs = document.querySelectorAll('.register__input')
    const button = document.querySelector('.form__button--register')
    const emptyMessage = document.querySelectorAll('.empty__credential')
    const data = {}
    button.addEventListener('click', (e) => {
        e.preventDefault()
        inputs.forEach(input => {
            if (input.value === '') { 
                input.classList.add('error')
                emptyMessage.forEach(message => message.classList.contains(input.name) ? message.classList.remove('hidden') : null)
                
            } else {
                data[input.name] = input.value
                input.classList.remove('error')
                emptyMessage.forEach(message => message.classList.contains(input.name) ? message.classList.add('hidden') : null)
            }
        })
        registerRequest(data)
    })
}

redirect()
register()