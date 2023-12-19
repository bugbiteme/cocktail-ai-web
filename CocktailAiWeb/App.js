import React, { useState } from 'react';
import './CocktailRecipeFetcher.css'; 

const RecipeFetcher = () => {
  const [prompt, setPrompt] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const PORT = process.env.PORT || 8080;

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://cocktail-ai-git-cocktail.apps.cluster-fcv9b.dynamic.redhatworkshops.io/generate-recipe/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecipeData(data);
    } catch (error) {
      setError('Failed to fetch recipe: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to render recipe with newlines
  const renderRecipe = (recipe) => {
    return recipe.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  return (
    <div className="cocktail-fetcher dark-mode">
      <input 
        type="text" 
        value={prompt} 
        onChange={handleInputChange} 
        placeholder="Enter a cocktail name"
        className="input-field"
      />
      <button 
        onClick={handleSubmit} 
        disabled={isLoading} 
        className="submit-button">
        {isLoading ? 'Loading...' : 'Get Cocktail Recipe'}
      </button>
      {isLoading && <div className="loading-bar"></div>} {/* Loading bar */}
      {error && <p className="error-message">{error}</p>}
      {recipeData && (
        <div className="recipe-result">
          <h2>{recipeData.recipe_name}</h2>
          {renderRecipe(recipeData.recipe)}
          <img 
          src={recipeData.image_url} 
          alt={recipeData.recipe_name} 
          style={{ width: '600px', height: '600px' }}  // Inline style
          />
        </div>
      )}
    </div>
  );
};

export default RecipeFetcher;