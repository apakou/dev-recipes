import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
      {/* Recipe Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {recipe.language}
          </span>
        </div>
      </div>

      {/* Recipe Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
        {recipe.description}
      </p>

      {/* Code Block */}
      <div className="mb-4">
        <pre className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-x-auto text-sm">
          <code className="text-gray-800 dark:text-gray-200 font-mono whitespace-pre">
            {recipe.code}
          </code>
        </pre>
      </div>

      {/* Tags */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeCard;