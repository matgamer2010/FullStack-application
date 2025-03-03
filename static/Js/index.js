// Training my javascript skills

const search = document.getElementById("search-for-products");
const cards = document.querySelectorAll("CardClothes");
const searchInput = search.value.ToLowerCase();


function hideCards(){
    cards.classList.add("hidden")
}


function getApi(){
    fech(`http://localhost:3000/api/products/?name_like=&{searchInput}`)
    .then((response) => response.json())
    .then((result) => displayResults(result));
};


function displayResults(response){

    display_cards = document.getElementById("display-cards");
    display_images = document.getElementById("display-images");

    response.

    forEach(element => {
        display_cards.innerHTML = element.name;
        display_images.src =  element.image;  
    });
    cards.classList.remove("hidden");
}


search.addEventListener("input",()=>{
    if (searchInput ===""){
        hideCards();
        return;
    }    
    getApi(searchTerm);
});


getApi();
