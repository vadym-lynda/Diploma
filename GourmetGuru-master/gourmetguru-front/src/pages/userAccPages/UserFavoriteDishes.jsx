import RecipeList from "../../components/recipeList";

function UserAccountFavoriteDishes() {
  console.log('Page UserAccountFavoriteDishes')
  return(
  
    <RecipeList  route='http://localhost:8080/api/users/favourite-dishes'/>
   )
}

export default UserAccountFavoriteDishes;