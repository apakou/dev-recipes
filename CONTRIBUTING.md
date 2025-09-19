# Contributing to DevRecipes

Thank you for your interest in contributing to DevRecipes! We welcome contributions from developers of all skill levels. This guide will help you get started.

## Ways to Contribute

### 1. Add New Recipes
Share useful code snippets that can help other developers learn.

### 2. Improve Existing Recipes
Enhance descriptions, fix bugs, or optimize existing code examples.

### 3. Add New Programming Languages
Help us expand support for more programming languages.

### 4. Fix Issues
Browse our [Issues](https://github.com/apakou/dev-recipes/issues) and help fix bugs or implement new features.

### 5. Improve Documentation
Help us improve README, comments, or this contributing guide.

## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- Git
- A GitHub account

### Setup
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dev-recipes.git
   cd dev-recipes
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Adding a New Recipe

### Step 1: Choose the Right Directory
Navigate to the appropriate language folder in `recipes/`:
- `recipes/javascript/` for JavaScript recipes
- `recipes/python/` for Python recipes
- Create a new folder if the language doesn't exist

### Step 2: Create Your Recipe File
Create a new `.json` file with a descriptive name using underscores:
```
find_array_maximum.json
reverse_string.json
calculate_fibonacci.json
```

### Step 3: Recipe Format
Follow this exact JSON structure:

```json
{
  "title": "Descriptive Recipe Title",
  "language": "JavaScript",
  "description": "Clear explanation of what this code does and when to use it.",
  "code": "function example() {\n  // Your code here\n  return 'result';\n}",
  "tags": ["relevant", "tags", "here"]
}
```

### Step 4: Recipe Guidelines

#### Title
- Use clear, descriptive titles
- Start with action words (e.g., "Find", "Calculate", "Convert")
- Keep it concise but informative

#### Description
- Explain what the code does
- Mention when it's useful
- Keep it beginner-friendly
- 1-2 sentences maximum

#### Code
- Use `\n` for line breaks in the JSON
- Keep examples simple and focused
- Include comments when helpful
- Ensure code actually works
- Maximum 20 lines for readability

#### Tags
- Use 3-5 relevant tags
- Use lowercase
- Common tags: "array", "string", "function", "beginner", "loop", "object"
- Help others discover your recipe

### Step 5: Test Your Recipe
1. Save your file
2. Refresh the development server
3. Search for your recipe to ensure it appears
4. Verify the code displays correctly
5. Test that copy-to-clipboard works

## Code Contribution Workflow

### 1. Create a Branch
```bash
git checkout -b add-recipe-name
# or
git checkout -b fix-issue-number
```

### 2. Make Your Changes
- Follow existing code style
- Test your changes thoroughly
- Ensure the build passes: `npm run build`

### 3. Commit Your Changes
Write clear commit messages:
```bash
git add .
git commit -m "Add JavaScript array sorting recipe"
# or
git commit -m "Fix search functionality for special characters"
```

### 4. Push and Create Pull Request
```bash
git push origin your-branch-name
```
Then create a Pull Request on GitHub.

## Pull Request Guidelines

### Before Submitting
- [ ] Test your changes locally
- [ ] Run `npm run build` successfully
- [ ] Follow the recipe format exactly
- [ ] Use descriptive commit messages
- [ ] Check for typos and grammar

### Pull Request Description
Include:
- What you added/changed
- Why this change is useful
- Any special instructions for testing

Example:
```
## What
Added a JavaScript recipe for finding the maximum value in an array.

## Why
This is a common operation that beginners often need help with.

## Testing
- Recipe appears in the JavaScript section
- Code can be copied successfully
- Search finds it with "maximum" and "array" keywords
```

## Code Style

### JavaScript/TypeScript
- Use modern JavaScript features
- Include proper error handling when relevant
- Add comments for complex logic
- Use meaningful variable names

### JSON Files
- Use 2-space indentation
- Double quotes for all strings
- No trailing commas
- Validate JSON syntax

## Quality Standards

### Recipe Quality
- Code must be functional and tested
- Explanations should be clear and accurate
- Examples should be practical and useful
- Avoid overly complex solutions

### Beginner-Friendly Focus
- Assume no prior knowledge
- Explain "why" not just "how"
- Use simple, readable code
- Avoid advanced concepts unless necessary

## Getting Help

### Questions?
- Open a [Discussion](https://github.com/apakou/dev-recipes/discussions)
- Ask in an existing [Issue](https://github.com/apakou/dev-recipes/issues)
- Check existing recipes for examples

### Issues?
- Check [existing issues](https://github.com/apakou/dev-recipes/issues) first
- Provide clear reproduction steps
- Include your environment details
- Use issue templates when available

## Recognition

All contributors are recognized in our project. Your GitHub profile will be listed as a contributor, and we appreciate every contribution, no matter how small!

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:
- Be respectful and inclusive
- Help create a welcoming environment
- Focus on constructive feedback
- Respect different skill levels and backgrounds

Thank you for contributing to DevRecipes and helping make open source more accessible!