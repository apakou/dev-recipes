import React, { useState } from 'react';

const RecipeCard = ({ recipe }) => {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(recipe.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800',
      python: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
      java: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800',
      typescript: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800',
      css: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
      html: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-200 dark:border-orange-800',
    };
    return colors[language.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border border-gray-200 dark:border-gray-800';
  };

  return (
    <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-gray-900/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        {/* Header with improved layout */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {recipe.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getLanguageColor(recipe.language)}`}>
                <span className="w-2 h-2 rounded-full bg-current mr-1.5 opacity-75"></span>
                {recipe.language}
              </span>
            </div>
          </div>
          
          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
            title="Copy code"
          >
            {isCopied ? (
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>

        {/* Description with better typography */}
        <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm leading-relaxed font-medium">
          {recipe.description}
        </p>

        {/* Modern code block */}
        <div className="mb-5">
          <div className="relative">
            {/* Code header */}
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-2">
                  {recipe.language.toLowerCase()}.{recipe.language.toLowerCase() === 'javascript' ? 'js' : recipe.language.toLowerCase() === 'python' ? 'py' : 'txt'}
                </span>
              </div>
              <button
                onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {isCodeExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            
            {/* Code content */}
            <pre className={`bg-gray-50 dark:bg-gray-900 rounded-b-lg p-4 overflow-x-auto text-sm transition-all duration-300 ${
              isCodeExpanded ? 'max-h-none' : 'max-h-32'
            }`}>
              <code className="text-gray-800 dark:text-gray-200 font-mono whitespace-pre leading-relaxed">
                {recipe.code}
              </code>
            </pre>
            
            {/* Fade overlay for collapsed code */}
            {!isCodeExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent rounded-b-lg pointer-events-none"></div>
            )}
          </div>
        </div>

        {/* Enhanced tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300 hover:from-blue-100 hover:to-blue-50 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 dark:hover:text-blue-300 transition-all duration-200 cursor-default border border-gray-200/50 dark:border-gray-600/50"
              >
                <span className="mr-1">#</span>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default RecipeCard;