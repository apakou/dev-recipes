import React, { useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getRecipes } from '../utils/recipes';
import RecipeCard from '../components/RecipeCard';

interface Recipe {
  id: string;
  title: string;
  language: string;
  description: string;
  code: string;
  tags: string[];
}

interface HomeProps {
  recipes: Recipe[];
}

export default function Home({ recipes }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter recipes based on search term
  const filteredRecipes = useMemo(() => {
    if (!searchTerm.trim()) {
      return recipes;
    }

    const lowercaseSearch = searchTerm.toLowerCase();
    
    return recipes.filter(recipe => {
      // Search in title
      if (recipe.title.toLowerCase().includes(lowercaseSearch)) {
        return true;
      }
      
      // Search in language
      if (recipe.language.toLowerCase().includes(lowercaseSearch)) {
        return true;
      }
      
      // Search in tags
      if (recipe.tags && recipe.tags.some(tag => 
        tag.toLowerCase().includes(lowercaseSearch)
      )) {
        return true;
      }
      
      // Search in description
      if (recipe.description.toLowerCase().includes(lowercaseSearch)) {
        return true;
      }
      
      return false;
    });
  }, [recipes, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Head>
        <title>DevRecipes</title>
        <meta name="description" content="A collection of code recipes for developers to contribute to open source projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                DevRecipes
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                A collection of code recipes to help new contributors make their first open-source contribution
              </p>
              
              {/* Search Input */}
              <div className="max-w-md mx-auto relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search recipes by title, language, or tags..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Recipes Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No recipes found
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Try adjusting your search terms or browse all recipes.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const recipes = getRecipes();
  
  return {
    props: {
      recipes,
    },
  };
};
