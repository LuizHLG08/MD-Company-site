export const toast = (title,menssage, color, image) => {
    const divToast = document.createElement('div')
    const titleToast = document.createElement('h2')
    const textToast = document.createElement('p')
    const imgToast = document.createElement('img')
    const headerToast = document.createElement('div')

    headerToast.classList.add('header__toast')
    divToast.classList.add('div__toast')
    titleToast.classList.add('title__toast')
    textToast.classList.add('text__toast')
    imgToast.classList.add('img__toast')

    
    imgToast.src = image
    titleToast.innerText = title
    titleToast.style.color = color
    textToast.innerText = menssage
    headerToast.append(imgToast, titleToast)
    divToast.append(headerToast, textToast)
    
    if(title === "Sua conta foi criada com sucesso!") {
        titleToast.style.fontWeight = "bold"
        textToast.innerHTML = 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="../../index.html">Acessar página de login</a>'
    } else if (title === "Falha ao criar a conta!") {
        titleToast.style.fontWeight = "bold"
    }

    Toastify({
        node: divToast,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "toastify",
        style: {
            background: '#FFFFFF',
            border: '2px solid',
            borderColor: color,
            width: '27.5rem',
        }
    }).showToast();
}



