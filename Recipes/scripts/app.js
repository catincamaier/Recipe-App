/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinksMobile.classList.remove('show-mobile-menu');
        hamburger.classList.remove('active');
    }
});



// Recipe class to represent a recipe
class Recipe {
    constructor(title, image, ingredients) {
        this.title = title;
        this.image = image;
        this.ingredients = ingredients;
    }

    // Generate HTML markup for the recipe card
    generateRecipeCard() {
        const card = document.createElement('div');
        card.className = 'recipe-card';

        const titleElement = document.createElement('h2');
        titleElement.className = 'recipe-title';
        titleElement.textContent = this.title;

        const imageElement = document.createElement('img');
        imageElement.className = 'recipe-image';
        imageElement.src = this.image;

        const ingredientsElement = document.createElement('p');
        ingredientsElement.className = 'recipe-details';
        ingredientsElement.innerHTML = `<span>Ingredients:</span> ${this.ingredients.join(', ')}`;

        card.appendChild(titleElement);
        card.appendChild(imageElement);
        card.appendChild(ingredientsElement);

        return card;
    }
}

// RecipeFinder class to manage the app functionality
class RecipeFinder {
    constructor() {
        this.form = document.getElementById('search-form');
        this.input = document.getElementById('search-input');
        this.recipeList = document.getElementById('recipe-list');

        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }


    // Handle form submission
    handleFormSubmit(event) {
        event.preventDefault();
        const searchTerm = this.input.value;
        this.searchRecipes(searchTerm);
    }

    // Fetch recipes from the API
    searchRecipes(searchTerm) {
        // Clear the recipe list
        this.recipeList.innerHTML = '';

        // Make a web request using fetch API

        // Encode the search term to handle special characters
        const encodedSearchTerm = encodeURIComponent(searchTerm);

        // Make a web request using fetch API
        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${encodedSearchTerm}&app_id=9ea7e2db&app_key=
        86d5e5bbdfacea4d707f5561d0d1ac71`)
            .then(response => response.json())
            .then(data => {
                // Process the response data
                data.hits.forEach(hit => {
                    const recipeData = hit.recipe;
                    const title = recipeData.label;
                    const image = recipeData.image;
                    const ingredients = recipeData.ingredients.map(ingredient => ingredient.text);

                    const recipe = new Recipe(title, image, ingredients);
                    const card = recipe.generateRecipeCard();
                    this.recipeList.appendChild(card);
                });
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }

}


// Function to populate the search input with a predefined ingredient
function populateSearchInput(ingredient) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = ingredient;
}


// Create an instance of the RecipeFinder class
const recipeFinder = new RecipeFinder();