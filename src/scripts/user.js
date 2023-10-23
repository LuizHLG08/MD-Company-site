import { renderUserInfo, renderUserCompanyInfo } from "./render.js"

const logout = () => {
    const logoutButton = document.querySelector('.header__button--logout')
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('@kenzie_empresas:token')
        location.replace('../../index.html')
    })
}


logout()
renderUserInfo()
renderUserCompanyInfo()