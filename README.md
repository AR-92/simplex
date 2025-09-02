# simplex

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight web application framework built with vanilla JavaScript, HTML, and Hyperscript.

## Description

Simplex is a minimalistic web application framework that demonstrates how to build interactive web applications using vanilla JavaScript, HTML, and Hyperscript without heavy frameworks. It includes examples of drag-and-drop functionality, flow-based UI components, and modern web development techniques.

## Key Features

- Pure vanilla JavaScript implementation
- Hyperscript for declarative DOM manipulation
- Drag-and-drop UI components
- Flow-based user interface examples
- Lightweight and fast loading
- No external dependencies
- Modern web standards compliance
- Example applications and templates

## Technologies Used

- **HTML5**: Modern markup and semantic elements
- **CSS3**: Styling and layout with modern features
- **Vanilla JavaScript**: Core programming language
- **Hyperscript**: Declarative DOM manipulation
- **Web APIs**: Drag and drop, localStorage, Fetch API
- **Responsive Design**: Mobile-first approach

## Installation

```bash
# Clone the repository
git clone https://github.com/AR-92/simplex.git
cd simplex

# Run a local server (any static file server will work)
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server

# Then open http://localhost:8000 in your browser
```

## Usage

The repository contains several example applications that demonstrate different aspects of the framework:

### Example Applications
1. **flow.html** - A flow-based UI with draggable nodes
2. **draging.html** - Demonstration of drag-and-drop functionality
3. **example.html** - Comprehensive example with multiple features
4. **node.html** - Node-based interface example

### Core Components
- **app.js** - Main application logic
- **flow.js** - Flow-based UI implementation
- **utils.js** - Utility functions
- **hyperscript.js** - Hyperscript library

## Project Structure

```
simplex/
├── index.html          # Main entry point
├── app.js              # Main application logic
├── flow.html           # Flow-based UI example
├── flow.js             # Flow implementation
├── draging.html        # Drag-and-drop example
├── example.html        # Comprehensive example
├── node.html           # Node-based interface
├── hyperscript.js      # Hyperscript library
├── utils.js            # Utility functions
├── custom.css          # Custom styling
├── config/             # Configuration files
├── controllers/        # Application controllers
├── middlewares/        # Middleware functions
├── models/             # Data models
├── public/             # Public assets
├── routes/             # Application routes
├── services/           # Service layer
├── utils/              # Utility modules
├── views/              # View templates
├── nodes/              # Node components
└── README.md           # This file
```

## Development

### Adding New Features
1. Create new HTML files for different views
2. Add JavaScript logic in separate modules
3. Use hyperscript for DOM manipulation
4. Style with CSS following BEM methodology

### Best Practices
- Keep modules small and focused
- Use semantic HTML
- Implement progressive enhancement
- Write accessible code
- Test across different browsers

## Examples

### Creating a Draggable Element
```javascript
// Example of drag-and-drop implementation
document.addEventListener('dragstart', function(e) {
  // Handle drag start
});

document.addEventListener('dragover', function(e) {
  // Handle drag over
});
```

### Using Hyperscript
```html
<!-- Example of hyperscript usage -->
<div _="on click add .active to me">
  Click me to add active class
</div>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- GitHub: [AR-92](https://github.com/AR-92)