import React, { useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
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
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  // Get unique languages
  const languages = useMemo(() => {
    const langs = ['all', ...new Set(recipes.map(r => r.language.toLowerCase()))];
    return langs;
  }, [recipes]);

  // Filter recipes based on search term and language
  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    // Filter by language
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(recipe => 
        recipe.language.toLowerCase() === selectedLanguage
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(recipe => {
        return recipe.title.toLowerCase().includes(lowercaseSearch) ||
               recipe.language.toLowerCase().includes(lowercaseSearch) ||
               recipe.description.toLowerCase().includes(lowercaseSearch) ||
               (recipe.tags && recipe.tags.some(tag => 
                 tag.toLowerCase().includes(lowercaseSearch)
               ));
      });
    }

    return filtered;
  }, [recipes, searchTerm, selectedLanguage]);

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedLanguage('all');
  };

  return (
    <>
      <Head>
        <title>DevRecipes - Code Recipes for Developers</title>
        <meta name="description" content="A curated collection of code recipes to help developers learn and contribute to open source projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Navigation Header */}
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Title */}
              <div className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="DevRecipes Logo"
                    width={62}
                    height={62}
                    className="w-20 object-contain"
                  />
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">DevRecipes</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Code recipes for everyone</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-6">
                <a href="#recipes" className="text-gray-600 dark:text-gray-300 hover:text-[#0090FF] dark:hover:text-[#0090FF] font-medium transition-colors">
                  Recipes
                </a>
                <a href="#contribute" className="text-gray-600 dark:text-gray-300 hover:text-[#0090FF] dark:hover:text-[#0090FF] font-medium transition-colors">
                  Contribute
                </a>
                <a 
                  href="https://github.com/apakou/dev-recipes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Learn to Code with
              <span className="text-[#0090FF]"> Recipes</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Discover practical code snippets, contribute to open source, and learn programming through bite-sized, well-documented examples.
            </p>
            
            {/* Search and Filter Section */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search recipes, languages, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0090FF] focus:border-transparent outline-none transition-all text-lg"
                  />
                </div>
                
                {/* Language Filter */}
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0090FF] focus:border-transparent outline-none transition-all text-lg capitalize"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang} className="capitalize">
                      {lang === 'all' ? 'All Languages' : lang}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0090FF] rounded-full"></div>
                  <span>{filteredRecipes.length} recipes found</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0090FF] rounded-full"></div>
                  <span>{languages.length - 1} languages</span>
                </div>
                {(searchTerm || selectedLanguage !== 'all') && (
                  <button 
                    onClick={clearSearch}
                    className="text-[#0090FF] hover:text-blue-700 font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="recipes">
          {/* Active Filters */}
          {(searchTerm || selectedLanguage !== 'all') && (
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                    Search: &ldquo;{searchTerm}&rdquo;
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedLanguage !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm capitalize">
                    Language: {selectedLanguage}
                    <button 
                      onClick={() => setSelectedLanguage('all')}
                      className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Recipes Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 border border-gray-200 dark:border-gray-700 shadow-sm max-w-lg mx-auto">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    No recipes found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    We couldn&apos;t find any recipes matching your criteria. Try adjusting your filters or 
                    <button 
                      onClick={clearSearch}
                      className="text-[#0090FF] dark:text-[#0090FF] hover:underline ml-1 font-medium"
                    >
                      browse all recipes
                    </button>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Contributing Section */}
        <section id="contribute" className="bg-white dark:bg-gray-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Contribute?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Help us grow the collection by sharing your favorite code recipes with the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://github.com/apakou/dev-recipes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0090FF] hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
              <a 
                href="https://github.com/apakou/dev-recipes/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Contributing Guide
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-[#0090FF] p-2 rounded-lg">
                  <Image
                    src="/logo.png"
                    alt="DevRecipes Logo"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-xl font-bold text-[#0090FF]">
                  DevRecipes
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Making open source contributions accessible to everyone through practical code recipes.
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 DevRecipes. Open source project for the community.
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
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