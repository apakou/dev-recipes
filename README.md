<img src="public/logo1.png" alt="DevRecipes Logo">

# DevRecipes

A modern, open-source collection of code recipes designed to help new developers make their first contributions to open source projects. Built with Next.js, React, and Tailwind CSS.

## About

DevRecipes is a curated platform that provides simple, practical code examples across multiple programming languages. Our mission is to lower the barrier to entry for open source contributions by offering bite-sized, well-documented code snippets that developers can learn from and contribute to.

## Features

- **Modern UI**: Clean, responsive design with glassmorphism effects and smooth animations
- **Real-time Search**: Search through recipes by title, language, description, or tags
- **Multiple Languages**: Support for JavaScript, Python, and more programming languages
- **Interactive Code Cards**: Copy-to-clipboard functionality and expandable code blocks
- **Dark Mode Support**: Automatic theme switching based on system preferences
- **Static Site Generation**: Fast loading times with Next.js SSG
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Technology Stack

- **Frontend Framework**: Next.js 15.5.3 with Pages Router
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Build Tool**: Next.js built-in compiler
- **Deployment**: Static site generation (SSG)

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/apakou/dev-recipes.git
cd dev-recipes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
dev-recipes/
├── public/                 # Static assets
│   ├── logo.png           # Platform logo
│   └── ...                # Other static files
├── recipes/               # Recipe JSON files
│   ├── javascript/        # JavaScript recipes
│   ├── python/           # Python recipes
│   └── ...               # Other language directories
├── src/
│   ├── components/        # React components
│   │   └── RecipeCard.js # Recipe display component
│   ├── pages/            # Next.js pages
│   │   ├── index.tsx     # Homepage
│   │   └── _app.tsx      # App wrapper
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
│       └── recipes.js    # Recipe loading utilities
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## Adding New Recipes

We welcome contributions! To add a new recipe:

1. **Fork the repository**

2. **Create a new branch**:
```bash
git checkout -b add-new-recipe
```

3. **Add your recipe**: Create a JSON file in the appropriate language directory under `recipes/`. Follow this format:

```json
{
  "title": "Your Recipe Title",
  "language": "JavaScript",
  "description": "A clear description of what this code does.",
  "code": "function example() {\n  return 'Hello, World!';\n}",
  "tags": ["function", "example", "beginner"]
}
```

4. **Test your changes**:
```bash
npm run dev
```

5. **Submit a pull request** with a clear description of your recipe

### Recipe Guidelines

- **Keep it simple**: Recipes should be beginner-friendly
- **Add clear descriptions**: Explain what the code does and when to use it
- **Use relevant tags**: Help others discover your recipe
- **Follow naming conventions**: Use descriptive filenames with underscores
- **Test your code**: Ensure the code example works as expected

## Contributing

We encourage contributions from developers of all skill levels! Here are ways you can contribute:

### Types of Contributions

- **Add new recipes**: Share useful code snippets
- **Improve existing recipes**: Enhance descriptions or code quality
- **Add new languages**: Support for additional programming languages
- **Fix bugs**: Help improve the platform
- **Enhance documentation**: Improve README or code comments
- **UI/UX improvements**: Suggest or implement design enhancements

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create a branch** for your feature/fix
4. **Make your changes**
5. **Test thoroughly**
6. **Commit** with clear messages
7. **Push** to your fork
8. **Create a Pull Request**

### Code Style

- Use TypeScript for new components
- Follow existing code formatting
- Add JSDoc comments for functions
- Ensure responsive design for UI changes
- Test on multiple screen sizes

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Community

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join conversations about the project
- **Pull Requests**: Contribute code improvements or new recipes

## Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Inspired by the open source community
- Thanks to all contributors who help make this project better

## Contact

For questions or suggestions, please open an issue on GitHub or contact the maintainers.

---

**DevRecipes** - Making open source contributions accessible to everyone.
