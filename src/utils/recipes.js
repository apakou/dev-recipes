import fs from 'fs';
import path from 'path';

export const getRecipes = () => {
  const recipesDirectory = path.join(process.cwd(), 'recipes');
  const recipes = [];

  // Function to recursively read directories and files
  const readRecipesFromDirectory = (dirPath) => {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively read subdirectories
        readRecipesFromDirectory(fullPath);
      } else if (path.extname(item) === '.json') {
        // Read JSON files
        try {
          const fileContent = fs.readFileSync(fullPath, 'utf8');
          const recipe = JSON.parse(fileContent);
          
          // Add the file path as an ID for uniqueness
          recipe.id = path.relative(recipesDirectory, fullPath).replace(/\\/g, '/');
          
          recipes.push(recipe);
        } catch (error) {
          console.error(`Error reading recipe file ${fullPath}:`, error);
        }
      }
    });
  };

  try {
    readRecipesFromDirectory(recipesDirectory);
  } catch (error) {
    console.error('Error reading recipes directory:', error);
  }

  return recipes;
};