<Structure>
	1- <Composant App/> 
        - Le composant App est l'entrée de notre Application 
		- User: c'est une state ou une variable Local(localstorage) pour verifier la connection, si le user n'est pas connecté(Null) on va le rediriger vers la page "LoginForm" sinon vers page "Recettes" a l'aide de "LocalStorage"

    2- <Composant LoginForm />
    	- Error (State) // Pour Afficher une Alert message
    	- Loading (State) // Pour éviter de soumettre le formulaire plusieurs fois en même temps
    	- < onConect(user) Pour que l'utilisateur puisse se connecter + Stocker les informations de l'utilisateur


    3- <Composant Site C'un composant Parent/>
    	- Page (State ou on utilise l'URL - Pour savoir sur quelle page on est)
    	- ingredients
    	- recipes
    	- currentRecipe

    4- <Composant Recipes>
    	- > recipes (State pour sauvegarder le retour de l'API)

    5- <Composant RecipeDetail>
    	- > id
    	- > recipe

    6- <RecipeEditForm>
    	- > recipe
    	- > ingredients - la list des ingredients
    	- < onSubmit(Recipe, newRecipe)

    7- <ingredients>
    	- > ingredients - La page de la list des ingredients
    	- < onUpdate(Ingredient, newIngredient)
    	- < onDelete(ingredient)
    	- < onCreate(ingredient)

    6- <RecipeCreateForm>
    	- > ingredients
    	- < onSubmit(newRecipe)
