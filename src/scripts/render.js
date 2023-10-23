import { createDepartmentViewModal, createDepartmentEditModal, dismissEmployee, createDepartmentDeleteModal, createUserEditModal, createUserDeleteModal} from "./modals.js"
import { getAllCategories, getAllCompanies, getAllEmployees, getCompanyById, getDepartmentsById, getEmployeeInfo } from "./requests.js"

export const renderAllCompanies = async () => {
    const companies = await getAllCompanies()
    companies.forEach(async company => {
        const ul = document.querySelector('.companies__list')
        ul.innerHTML = ''

        const li = document.createElement('li')
        const companyName = document.createElement('h2')
        const companySector = document.createElement('span')

        li.classList.add('company__item')
        companyName.classList.add('company__name', 'title4')
        companySector.classList.add('company__sector')

        companyName.innerText = company.name

        const categories = await getAllCategories()
        categories.forEach(category => {
            if(company.category_id === category.id) {
                companySector.innerText = category.name
            }
        })

        li.append(companyName, companySector)
        ul.appendChild(li)
    })
}

export const renderFilteredCompanies = (companies) => {
    companies.forEach(async company => {
        const ul = document.querySelector('.companies__list')
        ul.innerHTML = ''

        const li = document.createElement('li')
        const companyName = document.createElement('h2')
        const companySector = document.createElement('span')

        li.classList.add('company__item')
        companyName.classList.add('company__name', 'title3')
        companySector.classList.add('company__sector')

        companyName.innerText = company.name

        const categories = await getAllCategories()
        categories.forEach(category => {
            if(company.category_id === category.id) {
                companySector.innerText = category.name
            }
        })

        li.append(companyName, companySector)
        ul.appendChild(li)
    })
}

export const renderUserInfo = async () => {
    const userInfoContainer = document.querySelector('.user_info__container')
    const user = await getEmployeeInfo()

    const userName = document.createElement('h2')
    const userEmail = document.createElement('p')

    userName.classList.add('user_info__name')
    userEmail.classList.add('user_info__email')

    userName.innerText = user.name
    userEmail.innerText = user.email

    userInfoContainer.append(userName, userEmail)
}

export const renderUserCompanyInfo = async () => {
    const companyContainer = document.querySelector('.user_company__container')
    const user = await getEmployeeInfo()
    if(!user.company_id) {
        const message = document.createElement('h2')

        message.classList.add('not_hired__message')

        message.innerText = "Você ainda não foi contratado"
        
        companyContainer.appendChild(message)
    } else {
        const company = await getCompanyById(user.company_id)

        const companyName = document.createElement('h2')
        const overflowDiv = document.createElement('div')
        const ul = document.createElement('ul')
        
        companyName.classList.add('user_company__name')
        overflowDiv.classList.add('overflow__container')
        ul.classList.add('employees__list')

        const companyDepartments = company.departments.map(d => d.name)
        
        companyName.innerText = `${company.name} - ${companyDepartments.join(" | ")}`
        
        company.employees.forEach(employeer => {
            const card = document.createElement('li')
            const employeesName = document.createElement('h2')
            
            card.classList.add('employees__card')
            employeesName.classList.add('employees__name')

            employeesName.innerText = employeer.name
            card.appendChild(employeesName)
            ul.appendChild(card)
        })

        overflowDiv.appendChild(ul)
        companyContainer.append(companyName, overflowDiv)
    }
}

export const createCompanyDepartments = (departments) => {
    const container = document.querySelector('.departments_list__container')
    container.innerHTML = ''
    const ul = document.createElement('ul')
    ul.classList.add('departments__list', 'admin_dashboard__list')
    departments.forEach(async department => {
        const card = document.createElement('li')
    
        const depInfo = document.createElement('div')
        const depName = document.createElement('h2')
        const depDescription = document.createElement('p')
        const companyName = document.createElement('p')
    
        const depOptions = document.createElement('div')
        const depView = document.createElement('i')
        const depEdit = document.createElement('i')
        const depDelete = document.createElement('i')
    
        card.classList.add('department__card', 'admin_dashboard__card')
    
        depInfo.classList.add('department__info', 'admin_dashboard__card--info')
        depName.classList.add('department__name', 'title4', 'admin_dashboard__card--name')
        depDescription.classList.add('department__description', 'admin_dashboard__card--description')
        companyName.classList.add('company__name', 'admin_dashboard__card--company-name')
    
        depOptions.classList.add('department__options', 'admin_dashboard__card--options')
        depView.classList.add('fa-solid', 'fa-eye', 'department__view', 'view__button')
        depEdit.classList.add('fa-solid', 'fa-pencil', 'department__edit', 'edit__button')
        depDelete.classList.add('fa-solid', 'fa-trash', 'department__delete', 'delete__button')

        depView.dataset.id = department.id
        depEdit.dataset.id = department.id
        depDelete.dataset.id = department.id
        
        depName.innerText = department.name
        depDescription.innerText = department.description
        
        const company = await getCompanyById(department.company_id)
        companyName.innerText = company.name
        
        depInfo.append(depName, depDescription, companyName)
        depOptions.append(depView, depEdit, depDelete)
        card.append(depInfo, depOptions)
        ul.appendChild(card)
        container.appendChild(ul)
    })

}

export const depViewFunctions = () => {
    const depViewButtons = document.querySelectorAll('.department__view')
    depViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            createDepartmentViewModal(button.dataset.id)
        })
    })
}

export const depEditFunctions = () => {
    const depEditButtons = document.querySelectorAll('.department__edit')
    depEditButtons.forEach(button => {
        button.addEventListener('click', () => {
            createDepartmentEditModal(button.dataset.id)
        })
    })
}

export const depDeleteFunctions = () => {
    const depDeleteButtons = document.querySelectorAll('.department__delete')
    depDeleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log(button)
            createDepartmentDeleteModal(button.dataset.id)
        })
    })
}

export const createNoDepartmentsMessage = (name) => {
    const container = document.querySelector('.departments_list__container')
    container.innerHTML = ''

    const message = document.createElement('h2')
    message.classList.add('not_departments__message')
    message.innerText = `A empresa ${name} não possui departamentos`

    container.appendChild(message)
}

export const renderDepartmentViewModal = async (depId) => {
    const department = await getDepartmentsById(depId)

    const depName = document.querySelector('.department__name--modal-view')
    const depDescription = document.querySelector('.department__description--modal-view')
    const companyName = document.querySelector('.company__name--modal-view')

    depName.innerHTML = department.name
    depDescription.innerHTML = department.description
    companyName.innerHTML = department.company.name

    const ul = document.querySelector('.employees_department__list')
    ul.innerHTML = ''
    const employeers = department.employees

    employeers.forEach(employee => {
        const card = document.createElement('li')
        const empName = document.createElement('h2')
        const empDepartment = document.createElement('p')
        const removeEmp = document.createElement('button')

        card.classList.add('employees_department__card')
        empName.classList.add('employee_department__card--name', 'title4')
        empDepartment.classList.add('employee_department__card--company')
        removeEmp.classList.add('employee_department__card--remove', 'form__button', 'button__delete1')

        empName.innerText = employee.name
        empDepartment.innerText = department.name
        removeEmp.innerText = "desligar"

        removeEmp.dataset.id = employee.id

        removeEmp.addEventListener('click', () => dismissEmployee(depId, removeEmp.dataset.id))

        card.append(empName, empDepartment, removeEmp)
        ul.appendChild(card)
    })
}

export const createUsersList = async () => {
    const users = await getAllEmployees()

    const container = document.querySelector('.users_list__container')
    container.innerHTML = ''
    const ul = document.createElement('ul')
    ul.classList.add('users__list', 'admin_dashboard__list')

    users.forEach(async user => {
        const card = document.createElement('li')
    
        const userInfo = document.createElement('div')
        const userName = document.createElement('h2')
        const companyName = document.createElement('span')
    
        const userOptions = document.createElement('div')
        const userEdit = document.createElement('i')
        const userDelete = document.createElement('i')
    
        card.classList.add('user__card', 'admin_dashboard__card')
    
        userInfo.classList.add('user__card--info', 'admin_dashboard__card--info')
        userName.classList.add('user__card--name', 'title4', 'admin_dashboard__card--name')
        companyName.classList.add('user__card--company-name', 'admin_dashboard__card--company-name')
    
        userOptions.classList.add('user__card--options', 'admin_dashboard__card--options')
        userEdit.classList.add('fa-solid', 'fa-pencil', 'user__edit', 'edit__button')
        userDelete.classList.add('fa-solid', 'fa-trash', 'user__delete', 'delete__button')

        userEdit.dataset.id = user.id
        userDelete.dataset.id = user.id

        
        userName.innerText = user.name
        
        if(user.company_id) {
            const company = await getCompanyById(user.company_id)
            
            companyName.innerText = company.name
    
       } else {
            companyName.innerText = "Não contratado"
       }
       
        
        userInfo.append(userName, companyName)
        userOptions.append(userEdit, userDelete)
        card.append(userInfo, userOptions)
        ul.appendChild(card)
        container.appendChild(ul)

        userEdit.addEventListener('click',() => createUserEditModal(userEdit.dataset.id))
        userDelete.addEventListener('click', () => {
            createUserDeleteModal(userDelete.dataset.id, user.name)
        })
    })

}




