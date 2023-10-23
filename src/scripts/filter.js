import { renderAllCompanies, renderFilteredCompanies } from "./render.js"
import { getCompanyByCategory } from "./requests.js"


export const filterCompanies = async () => {
    const input = document.querySelector('.select__sector')
    input.addEventListener('click',async () => {
        if(input.value !== 'Selecionar Setor') {
            if(input.value !== 'Todos') {
            let filteredCompanies = await getCompanyByCategory(input.value)
            renderFilteredCompanies(filteredCompanies)
            } else {
                renderAllCompanies()
            }
        }
    })
}