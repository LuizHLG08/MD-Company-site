import { renderDepartmentViewModal } from "./render.js"
import { toast } from "./toast.js"

const baseUrl = "http://localhost:3333"

const green = "#36B37E"
const red = "#c73650"

const createHeaders = () => {
    const token = localStorage.getItem("@kenzie_empresas:token")
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }
}

export const getAllCompanies = async () => {
    const response = await fetch(`${baseUrl}/companies/readAll`)
    const responseJson = await response.json()
    return responseJson
}

export const getAllCategories = async () => {
    const response = await fetch(`${baseUrl}/categories/readAll`)
    const responseJson = await response.json()
    return responseJson
}

export const getCompanyByCategory = async (categoryName) => {
    const response = await fetch(`${baseUrl}/companies/readByCategory/${categoryName}`)
    const responseJson = await response.json()
    return responseJson
}

export const loginRequest = async (data) => {
    const inputEmail = document.querySelector('.login__input--email')
    const inputPassword = document.querySelector('.login__input--password')
    const wrongEmail = document.querySelector('#wrong-email')
    const wrongPassword = document.querySelector('#wrong-password')

    const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    const responseJson = await response.json()
    if (response.ok) {
        localStorage.setItem("@kenzie_empresas:token", responseJson.authToken)
        toast("Login realizado com sucesso", "", green, "../../src/assets/img/check.svg")
        responseJson.isAdm ? 
        setTimeout(() => location.replace('../../src/pages/admin.html'), 1500) :
        setTimeout(() => location.replace('../../src/pages/user.html'), 1500)
    } else {
        if (responseJson.message.includes('email') && inputEmail.value) {
            inputEmail.classList.add('error')
            wrongEmail.classList.remove('hidden')
        } else if (responseJson.message.includes('senha') && inputPassword.value) {
            wrongEmail.classList.add('hidden')
            inputPassword.classList.add('error')
            wrongPassword.classList.remove('hidden')
        }
    }
}

export const registerRequest = async (data) => {
    const response = await fetch(`${baseUrl}/employees/create`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    const responseJson = await response.json()
    if(response.ok) {
        toast("Usuário criado com sucesso", "Agora você pode acessar a página de usuários", green, "../../src/assets/img/check.svg")
        setTimeout(() => location.replace('../../src/pages/login.html'), 1500)

    } else {
        toast("Falha ao criar a conta!", responseJson.message , red, "../../src/assets/img/red-cross.svg")
    }
}

export const getEmployeeInfo = async () => {
    const response = await fetch(`${baseUrl}/employees/profile`, {
        method: 'GET',
        headers: createHeaders(),
    })
    const responseJson = await response.json()
    if(response.ok) {
        return responseJson
    }
}

export const getCompanyById = async (id) => {
    const response = await fetch(`${baseUrl}/companies/readById/${id}`, {
        method: 'GET',
        headers: createHeaders()
    })
    const responseJson = await response.json()
    if (response.ok) {
        return responseJson
    }
}

export const createDepartmentRequest = async (data) => {
    const response = await fetch(`${baseUrl}/departments/create`, {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(data),
    })
    const responseJson = await response.json()
    if(response.ok) {
        toast("Departamento criado com sucesso!", "", green, "../../src/assets/img/check.svg")
        return responseJson
    } else {
        toast("Falha ao criar departamento!", responseJson.message, red, "../../src/assets/img/red-cross.svg")

    }
}

export const getAllEmployees = async () => {
    const response = await fetch(`${baseUrl}/employees/readAll`, {
        method: 'GET',
        headers: createHeaders(),
    })
    const responseJson = await response.json()
    if (response.ok) {
        return responseJson
    }
}
export const getEmployeesOutOfWork = async () => {
    const response = await fetch(`${baseUrl}/employees/outOfWork`, {
        method: 'GET',
        headers: createHeaders(),
    })
    const responseJson = await response.json()
    if (response.ok) {
        return responseJson
    }
}

export const getDepartmentsById = async (id) => {
    const response = await fetch(`${baseUrl}/departments/readById/${id}`, {
        method: 'GET',
        headers: createHeaders(),
    })
    const responseJson = await response.json()
    if (response.ok) {
        return responseJson
    }
}

export const hireEmployeeById = async (empId, data) => {
    const response = await fetch(`${baseUrl}/employees/hireEmployee/${empId}`, {
        method: 'PATCH',
        headers: createHeaders(),
        body: JSON.stringify(data),
    })
    const responseJson = await response.json()
    if (response.ok) {
        toast("Funcionário contratado com sucesso!", "", green, "../../src/assets/img/check.svg")
        return responseJson
    } else {
        toast("Não foi possível contratar usuário!", responseJson.message, red, "../../src/assets/img/red-cross.svg")
    }
}

export const dismissEmployeeRequest = async (id) => {
    const response = await fetch(`${baseUrl}/employees/dismissEmployee/${id}`, {
        method: 'PATCH',
        headers: createHeaders()
    })
    const responseJson = await response.json()
    if (response.ok) {
        toast("Funcionário demitido com sucesso!", "", green, "../../src/assets/img/check.svg")
    } else {
        toast("Não foi possível demitir funcionário!", responseJson.message, red, "../../src/assets/img/red-cross.svg")
    }
}


export const editDepartmentRequest = async (depId, data) => {
    const response = await fetch(`${baseUrl}/departments/update/${depId}`, {
        method: 'PATCH',
        headers: createHeaders(),
        body: JSON.stringify(data)
    })
    const responseJson = await response.json()
    if(response.ok) {
        toast(responseJson.message, "", green, "../../src/assets/img/check.svg")
        return responseJson
    } else {
        toast("Não foi possível atualizar o departamento!", responseJson.message, red, "../../src/assets/img/red-cross.svg")
    }
}

export const deleteDepartmentRequest = async (depId) => {
    const response = await fetch(`${baseUrl}/departments/delete/${depId}`, {
        method: 'DELETE',
        headers: createHeaders(),
    })
    const responseJson = await response.json()
    if(response.ok) {
        toast(responseJson.message, "", green, "../../src/assets/img/check.svg")
        return responseJson
    } else {
        toast("Não foi possível deletar departemento!", responseJson.message, red, "../../src/assets/img/red-cross.svg")
    }
}

export const editUserRequest = async (id, data) => {
    const response = await fetch(`${baseUrl}/employees/updateEmployee/${id}`, {
        method: 'PATCH',
        headers: createHeaders(),
        body: JSON.stringify(data),
    })
    const responseJson = await response.json()
    if(response.ok) {
        toast("Usuário atualizado com sucesso!", "", green, "../../src/assets/img/check.svg")
    } else {
        toast("Não foi possível editar usuário!", responseJson.message, red, "../../src/assets/img/red-cross.svg")
    }
}

export const deleteUserRequest = async (id) => {
    const response = await fetch(`${baseUrl}/employees/deleteEmployee/${id}`, {
        method: 'DELETE',
        headers: createHeaders(),
    })
    const responseJson = await response.json()
    if(response.ok) {
        toast(responseJson.message, "", green, "../../src/assets/img/check.svg")
    } else {
        toast("Não foi possível deletar usuário!", responseJson.message, red, "../../src/assets/img/red-cross.svg")
    }
}
