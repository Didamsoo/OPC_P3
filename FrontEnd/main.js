import {getCategories, getWorks} from "./assets/js/api.js"
import {createCategory, createCategoryAll, createWork, filterWorksByCategory, adminRights, createModalWork, addModalWork, selectCategory, upload} from "./assets/js/element.js"


//_______________________________ RECUPERATION DES TRAVAUX ET DES CATEGORIES _____________________________//
const categories = await getCategories()
createCategoryAll()
categories.forEach(category => {
    createCategory(category)
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

        filterWorksByCategory(CategoryId)
    })
})

//_______________________________ ADMIN MODE _____________________________//

await adminRights()

//_______________________________ MODAL GALLERY _____________________________//

const modalPopup = await getWorks()
const modalContent = document.querySelector('.modalContent')
modalContent.innerHTML = ""

modalPopup.forEach(modalWork => {
    createModalWork(modalWork)
})

//_______________________________ MODAL ONGLET - AJOUTS DE WORKS _____________________________//

await addModalWork()

//_______________________________ AFFICHAGE LISTE CATEGORIES - AJOUTS DE WORKS  _____________________________//

await selectCategory()

//_______________________________ UPLOAD _____________________________//

await upload()