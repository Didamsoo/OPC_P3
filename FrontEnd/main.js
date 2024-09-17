import {getCategories, getWorks} from "./assets/js/api.js"
import {createCategory, createCategoryAll, createWork, filterWorksByCategory, adminRights, createModalWork, addModalWork, selectCategory, upload} from "./assets/js/element.js"


//_______________________________ RECUPERATION DES TRAVAUX ET DES CATEGORIES _____________________________//
// Je récupère les catégories et les travaux depuis l'API
const categories = await getCategories()// Récupération des catégories
createCategoryAll() // Création d'un bouton "Tous" pour afficher toutes les catégories
categories.forEach(category => {
    createCategory(category) // J'affiche chaque catégorie dans le DOM
})

const works = await getWorks()
works.forEach(work => {
    createWork(work)  
})


//_______________________________ GESTION DES CATEGORIES _____________________________//
const defaultCategory = document.querySelector('button.categorie[value="0"]')
defaultCategory.classList.add('selectedCategory')

const categoriesElement = document.querySelectorAll('button.categorie')

categoriesElement.forEach(category => {
    category.addEventListener('click', (e) => {
        const CategoryId = e.currentTarget.value
        categoriesElement.forEach(category => category.classList.remove('selectedCategory'))
        category.classList.add('selectedCategory')

        filterWorksByCategory(CategoryId) // Filtrage dynamique des projets en fonction de la catégorie
    })
})

//_______________________________ ADMIN MODE _____________________________//

await adminRights() // Active le mode admin si l'utilisateur est connecté

//_______________________________ MODAL GALLERY _____________________________//

const modalPopup = await getWorks()
const modalContent = document.querySelector('.modalContent')
modalContent.innerHTML = "" // Réinitialisation de la galerie modale

modalPopup.forEach(modalWork => {
    createModalWork(modalWork) // Création dynamique des projets dans la modale
})

//_______________________________ MODAL ONGLET - AJOUTS DE WORKS _____________________________//

await addModalWork() // Gestion de l'ajout de projets dans la modale

//_______________________________ AFFICHAGE LISTE CATEGORIES - AJOUTS DE WORKS  _____________________________//

await selectCategory() // Affichage des catégories dans la modale

//_______________________________ UPLOAD _____________________________//

await upload() // Gestion de l'upload d'images