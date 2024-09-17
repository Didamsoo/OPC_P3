// RÉCUPÉRATION DES DONNÉES DE L'API

const url='http://localhost:5678/api/'


//_______________________________ CATEGORIES _____________________________//
export async function getCategories() {
    return fetch(`${url}categories`) // J'envoie une requête GET à l'API pour récupérer les catégories
        .then(response => response.json()) // Je récupère les données en format JSON
}


//_______________________________ RECUPERER LES TRAVAUX _____________________________//
export async function getWorks() {
    return fetch(`${url}works`) // Requête GET pour récupérer les travaux
        .then(response => response.json()) // Transformation en JSON
}

//_______________________________ SUPPRESSION TRAVAUX _____________________________//
export async function deleteWork(id) {
    let token = sessionStorage.getItem('token') // J'utilise le token stocké pour autoriser la suppression
    const response = await fetch(`${url}works/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}` // J'ajoute le token dans le header pour l'authentification
        },
    });
}


//_______________________________ AJOUT DE NOUVEAUX TRAVAUX _____________________________//
export async function addNewWork(formData) {
    let token = sessionStorage.getItem('token') // Je récupère le token de session pour l'ajout
    const response = await fetch(`${url}works`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${token}` // Ajout du token pour autoriser la requête
        },
        body: formData // J'envoie le formulaire avec l'image et les infos du projet
    })
    if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du travail.')
    }
    return response.json()
}


//_______________________________ LOGIN _____________________________//
export async function login () {
    document.addEventListener('submit', (event) => {
        event.preventDefault(); // J'empêche le rechargement de la page lors de la soumission du formulaire


        let formInfo = {
            email: document.getElementById('email'), // Je récupère la valeur de l'email
            password: document.getElementById('password'), // Je récupère la valeur du mot de passe
            submit: document.querySelector('.submitInfo')
        };

        fetch(`${url}users/login`, {
            method: "POST", // J'envoie une requête POST pour authentifier l'utilisateur
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formInfo.email.value, // J'envoie l'email saisi
                password: formInfo.password.value, // J'envoie le mot de passe saisi
            }),
        })
        .then(response => {
            if (!response.ok) {
                // Si le statut de la réponse n'est pas OK (par exemple, 401), on lève une erreur
                throw new Error('Erreur dans l’identifiant ou le mot de passe');
            }
            return response.json();
        })
        .then((data) => {
            sessionStorage.setItem("token", data.token); // Je stocke le token dans la session après connexion réussie
            window.location.replace("index.html"); // Redirection vers la page d'accueil
        })
        .catch((error) => {
            // On affiche le message d'erreur si l'identifiant ou le mot de passe est incorrect
            alert(error.message);
        });
    });
}

