import { confirmHireEmployee, createDepartmentModal, confirmEditDepartment, confirmDeleteDepartment, confirmEditUser, confirmDeleteUser, renderCompanyDepartmentsAfterUpdate  } from "./modals.js"
import { createCompanyDepartments, createNoDepartmentsMessage, createUsersList, depDeleteFunctions, depEditFunctions, depViewFunctions } from "./render.js"
import { createDepartmentRequest, getAllCompanies, getEmployeesOutOfWork, getCompanyById, } from "./requests.js"


const logout = () => {
    const button = document.querySelector('.header__button--logout')
    button.addEventListener('click', () => {
        localStorage.removeItem('@kenzie_empresas:token')
        location.replace('../../index.html')
    })
}


const createCompanySelect = async () => {
    const companies = await getAllCompanies()
    const selects = document.querySelectorAll('.select__company')

    selects.forEach(select => {
        companies.forEach(company => {
            const option = document.createElement('option')

            option.value = company.id
            option.innerText = company.name

            select.appendChild(option)
        })
    })
}
const createUserSelect = async () => {
    const users = await getEmployeesOutOfWork()
    const select = document.querySelector('#select__user')
    select.innerHTML = ''
    select.innerHTML = '<option disabled selected value="">Selecionar Usuário</option>'

    users.forEach(user => {
        const option = document.createElement('option')

        option.value = user.id
        option.innerText = user.name

        option.style.color = "#000000"

        select.appendChild(option)
    })
}

const renderCompanyDepartments = () => {
    const select = document.querySelector('#admin__select')
    let lastValue = select.value

    const clickHandler = async () => {
        if (select.value && select.value !== lastValue) {
            const company = await getCompanyById(select.value)
            if (company.departments.length > 0) {
                createCompanyDepartments(company.departments)
                
                const event = new Event('renderDepartments')
                document.dispatchEvent(event)
            } else {
                createNoDepartmentsMessage(company.name)
            }
        }
        lastValue = select.value

    }
    select.removeEventListener('click', clickHandler)
    select.addEventListener('click', clickHandler)
}

const createNewDepartment = () => {
    const button = document.querySelector('.confirm__button--create')
    const inputs = document.querySelectorAll('.create__input')
    const modal = document.querySelector('.modal__create_department')
    const emptyMessage = document.querySelectorAll('.empty__credential')
    const data = {}

    button.addEventListener('click', async (e) => {
        e.preventDefault()
        inputs.forEach(input => {
            if (input.value) {
                data[input.name] = input.value
                input.classList.remove('error')
                emptyMessage.forEach(message => message.classList.contains(input.name) ? message.classList.add('hidden') : null)
            } else {
                input.classList.add('error')
                emptyMessage.forEach(message => message.classList.contains(input.name) ? message.classList.remove('hidden') : null)
            }
        })
        if (Object.keys(data).length == 3) {
            createDepartmentRequest(data)
            inputs.forEach(input => input.value = '')
            modal.close()
            setTimeout(() => renderCompanyDepartmentsAfterUpdate(), 100)
        }

    })

}


createUsersList()
createUserSelect()
renderCompanyDepartments()
createNewDepartment()
createDepartmentModal()
logout()
confirmHireEmployee()
confirmEditDepartment()
confirmDeleteDepartment()
createCompanySelect()

setTimeout(() => {
    confirmEditUser()
    confirmDeleteUser()
}, 110)

document.addEventListener('renderDepartments', () => {
    setTimeout(() => {
        depViewFunctions()
        depEditFunctions()
        depDeleteFunctions()
    }, 100)
})
document.addEventListener('renderDepartmentsEdited', () => {
    setTimeout(() => {
        depDeleteFunctions()
        depViewFunctions()
        depEditFunctions()
    }, 100)
})



