interface RecipeInstructionsProps {
  instructions: string[];
}

export default function RecipeInstructions({
  instructions,
}: RecipeInstructionsProps) {
  return (
    <div className="recipe-instructions">
      <h2>Instructions</h2>
      <ol>
        {instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
