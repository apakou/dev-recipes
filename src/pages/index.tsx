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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      <Head>
        <title>DevRecipes</title>
        <meta name="description" content="A collection of code recipes for developers to contribute to open source projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-violet-50/50 dark:from-gray-900 dark:via-purple-950/20 dark:to-violet-950/30">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-violet-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-violet-400/10 to-fuchsia-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-400/5 to-violet-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Modern Header */}
        <header className="relative">
          {/* Header background with glassmorphism */}
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              {/* Modern logo/title */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl blur-lg"></div>
                    <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                      <Image
                        src="/logo.png"
                        alt="DevRecipes Logo"
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  </div>
                  <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 dark:from-purple-400 dark:via-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent tracking-tight">
                    DevRecipes
                  </h1>
                </div>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"></div>
                  <div className="h-1 w-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"></div>
                  <div className="h-1 w-12 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
                A curated collection of 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-400 dark:to-violet-400 font-semibold"> code recipes </span>
                to help new contributors make their first open-source contribution
              </p>
              
              {/* Modern Search Input */}
              <div className="max-w-xl mx-auto relative group">
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-fuchsia-500/20 rounded-2xl blur transition-all duration-300 ${
                  isSearchFocused ? 'opacity-100 scale-105' : 'opacity-0 group-hover:opacity-50'
                }`}></div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className={`h-6 w-6 transition-colors duration-200 ${
                        isSearchFocused ? 'text-purple-500 dark:text-purple-400' : 'text-gray-400'
                      }`}
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
                    placeholder="Search by title, language, tags, or description..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="block w-full pl-12 pr-12 py-4 text-lg border-0 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-xl ring-1 ring-gray-200/50 dark:ring-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/50 transition-all duration-300"
                  />
                  
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center group/clear"
                    >
                      <svg
                        className="h-5 w-5 text-gray-400 group-hover/clear:text-gray-600 dark:group-hover/clear:text-gray-300 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Modern Stats Bar */}
          <div className="mb-8">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {filteredRecipes.length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Recipe{filteredRecipes.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
                  
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {new Set(recipes.map(r => r.language)).size}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Languages
                    </p>
                  </div>
                </div>
                
                {searchTerm && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800">
                    <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm font-medium text-purple-900 dark:text-purple-300">
                      Showing results for &ldquo;{searchTerm}&rdquo;
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recipes Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-lg max-w-lg mx-auto">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    No recipes found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    We couldn&apos;t find any recipes matching your search. Try adjusting your search terms or 
                    <button 
                      onClick={clearSearch}
                      className="text-purple-600 dark:text-purple-400 hover:underline ml-1 font-medium"
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

        {/* Modern Footer */}
        <footer className="relative mt-20">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="relative">
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-md">
                        <Image
                          src="/logo.png"
                          alt="DevRecipes Logo"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-400 dark:to-violet-400 bg-clip-text text-transparent">
                      DevRecipes
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Open source code recipes to help developers contribute to the community
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-6 mb-6">
                  <a 
                    href="https://github.com/apakou/dev-recipes" 
                    className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://x.com/PakouNiel" 
                    className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  © 2025 DevRecipes. Made with ❤️ for the open source community.
                </div>
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
