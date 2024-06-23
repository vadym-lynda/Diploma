import RecipeList from "../../components/recipeList";

function EditRecipes() {
  console.log('page Edit Recipes')
  return(
    <RecipeList route='http://localhost:8080/api/dishes'/>
  )
}

export default EditRecipes;