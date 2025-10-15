interface RecipeIngredientsProps {
  ingredients: string[];
}

export default function RecipeIngredients({
  ingredients,
}: RecipeIngredientsProps) {
  return (
    <div className="recipe-ingredients">
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
