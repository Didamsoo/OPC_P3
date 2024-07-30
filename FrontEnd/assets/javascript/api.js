//_______________________________RÉCUPÉRATION DES DONNÉES D'API____________________//

const url='http://localhost:5678/api/'

//________CATÉGORIES______//
export async function getCategories() {
    return fetch(`${url}categories`)
        .then(response => response.json())
}
//________RECUPERATION DES TRAVAUX______//
export async function getWorks() {
    return fetch(`${url}works`)
        .then(response => response.json())
}


//________AJOUT DE NOUVEAUX TRAVAUX______//
export async function addNewWork(formData) {
    let token = sessionStorage.getItem('token')
    const response = await fetch(`${url}works`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${token}`
        },
        body: formData
    })
    if (!response.ok) {
        throw new Error('Une erreur est survenue lors de l\'ajout du travail.')
    }
    return response.json()
}

//________SUPPRESSION DES TRAVAUX______//
export async function deleteWork(id) {
    let token = sessionStorage.getItem('token')
    const response = await fetch(`${url}works/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        },
    });
}


//________LOGIN______//
export async function login () {
    document.addEventListener('submit', (event) => {
        event.preventDefault()
        let formInfo = {
            email: document.getElementById('email'),
            password: document.getElementById('password'),
            submit: document.querySelector('.submitInfo')
        }
    
        return fetch(`${url}users/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formInfo.email.value,
                password: formInfo.password.value,
            }),
        })
        .then(response => response.json())
        .then((data) => {
            if (data.message) {
                alert("Identifiant ou mot de passe incorrect")
            } else {
                sessionStorage.setItem("token", data.token)
                window.location.replace("index.html")
            }
        })
    })
}


