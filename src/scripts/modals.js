import { renderDepartmentViewModal, createCompanyDepartments, createUsersList, } from "./render.js"
import { dismissEmployeeRequest, editDepartmentRequest, hireEmployeeById, getCompanyById, deleteDepartmentRequest, getDepartmentsById, editUserRequest, getEmployeeInfo, deleteUserRequest } from "./requests.js"
import { toast } from "./toast.js"

export const createDepartmentModal = () => {
    const modal = document.querySelector('.modal__create_department')
    const openModal = document.querySelector('.department__button--create')
    const closeModal = document.querySelector('.close__modal--create')

    openModal.addEventListener('click', () => modal.showModal())
    closeModal.addEventListener('click', () => modal.close())
}

export const createDepartmentViewModal = (depId) => {
    const modal = document.querySelector('.modal__view_department')
    const closeModal = document.querySelector('.close__modal--view')
    modal.showModal()
    const confirmButton = document.querySelector('#confirm__button--hire')
    confirmButton.dataset.id = depId

    renderDepartmentViewModal(depId)

    closeModal.addEventListener('click', () => modal.close())
}

export const confirmHireEmployee = () => {
    const confirmButton = document.querySelector('#confirm__button--hire')

    const handleClick = (e) => {
        e.preventDefault()
        const input = document.querySelector('#select__user')
        const data = {
            department_id: confirmButton.dataset.id
        }
        if (input.value) {
            hireEmployeeById(input.value, data)
        }
        setTimeout(() => renderDepartmentViewModal(confirmButton.dataset.id), 100)
    }


    confirmButton.removeEventListener('click', handleClick)
    confirmButton.addEventListener('click', handleClick)
}

export const dismissEmployee = (depId, empId) => {
    dismissEmployeeRequest(empId)
    setTimeout(() => renderDepartmentViewModal(depId), 100)

}

export const createDepartmentEditModal = (depId) => {
    const modal = document.querySelector('.modal__edit_department')
    const closeButton = document.querySelector('.close__modal--edit')
    const confirmButton = document.querySelector('.edit__department--confirm')
    modal.showModal()
    confirmButton.dataset.id = depId
    
    closeButton.addEventListener('click', () => modal.close())
}

export const confirmEditDepartment = () => {
    const confirmButton = document.querySelector('.edit__department--confirm')
    const modal = document.querySelector('.modal__edit_department')
    const inputs = document.querySelectorAll('.edit_department__input')
    const data = {}

    
    const handleClick = (e) => {
        e.preventDefault()
        inputs.forEach(input => {
            if (input.value) {
                data[input.name] = input.value
            }
        })
        if (Object.keys(data).length > 0) {
            editDepartmentRequest(confirmButton.dataset.id, data)
            inputs.forEach(input => input.value = '')
            modal.close()
            setTimeout(() => renderCompanyDepartmentsAfterUpdate(), 100)
        } else {
            toast("Preencha pelo menos um dos campos", "", "#c73650", "../../src/assets/img/red-cross.svg")
        }
    }
    
    confirmButton.removeEventListener('click', handleClick)
    confirmButton.addEventListener('click', handleClick)

}

export const renderCompanyDepartmentsAfterUpdate = async () => {
    const select = document.querySelector('#admin__select')

    if (select.value) {
        const company = await getCompanyById(select.value)
        if (company.departments.length > 0) {
            createCompanyDepartments(company.departments)
            const event = new Event('renderDepartmentsEdited')
            document.dispatchEvent(event)
        } else {
            createNoDepartmentsMessage(company.name)
        }
    }
}

export const createDepartmentDeleteModal = async (depId) => {
    const department = await getDepartmentsById(depId)
    const deleteWarning = document.querySelector('.delete__department--warning')
    deleteWarning.innerHTML = `Realmente deseja remover o Departamento ${department.name} e demitir seus funcionários?`

    const modal = document.querySelector('.modal__delete--department')
    const closeButton = document.querySelector('.close__modal--delete-department')
    const confirmButton = document.querySelector('.delete__department--confirm')
    modal.showModal()
    confirmButton.dataset.id = depId
    
    closeButton.addEventListener('click', () => modal.close())
}

export const confirmDeleteDepartment = () => {
    const modal = document.querySelector('.modal__delete--department')
    const confirmButton = document.querySelector('.delete__department--confirm')

    const handleClick = () => {
        deleteDepartmentRequest(confirmButton.dataset.id)
        modal.close()
        setTimeout(() => renderCompanyDepartmentsAfterUpdate(), 100)
    }
    confirmButton.removeEventListener('click', handleClick)
    confirmButton.addEventListener('click', handleClick)
}

export const createUserEditModal = (userId) => {
    const modal = document.querySelector('.modal__edit_user')
    const confirmButton = document.querySelector('.edit__user--confirm')
    const closeButton = document.querySelector('.close__modal--edit-user')
    modal.showModal()
    confirmButton.dataset.id = userId
    
    closeButton.addEventListener('click', () => modal.close())
}

export const confirmEditUser = () => {
    const modal = document.querySelector('.modal__edit_user')
    const confirmButton = document.querySelector('.edit__user--confirm')
    const data = {}
    
    confirmButton.addEventListener('click', (e) => {
        e.preventDefault()
        const inputs = document.querySelectorAll('.edit_user__input')
        inputs.forEach(input => {
            if (input.value) {
                data[input.name] = input.value
            }
        })
        if (Object.keys(data).length > 0) {
            editUserRequest(confirmButton.dataset.id, data)
            inputs.forEach(input => input.value = '')
            modal.close()
            setTimeout(() => createUsersList(), 100)
        } else {
            toast("Preencha pelo menos um dos campos", "", "#c73650", "../../src/assets/img/red-cross.svg")
        }
    })
}
export const createUserDeleteModal = (userId, name) => {
    const modal = document.querySelector('.modal__delete_user')
    const confirmButton = document.querySelector('.delete__user--confirm')
    const closeButton = document.querySelector('.close__modal--delete-user')
    const warning = document.querySelector('.delete__user--warning')
    warning.innerHTML = `Realmente deseja remover o usuário ${name}?`
    confirmButton.dataset.id = userId
    modal.showModal()
    
    closeButton.addEventListener('click', () => modal.close())
}

export const confirmDeleteUser = () => {
    const modal = document.querySelector('.modal__delete_user')
    const confirmButton = document.querySelector('.delete__user--confirm')
    confirmButton.addEventListener('click', () => {
        deleteUserRequest(confirmButton.dataset.id)
        modal.close()
        setTimeout(() => createUsersList(), 100)
    })
}