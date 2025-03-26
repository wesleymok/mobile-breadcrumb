# Breadcrumb Manager

## Overview

The Breadcrumb Manager is a responsive JavaScript module designed to improve navigation by dynamically managing breadcrumb displays across different screen sizes. It provides an adaptive interface that intelligently handles breadcrumb visibility, ensuring a clean and user-friendly navigation experience.

## Features

- **Responsive Design**: Automatically adjusts breadcrumb display based on screen width
- **Truncation Support**: Collapses middle breadcrumb items on smaller screens
- **Accessibility**: Includes ARIA attributes for improved screen reader compatibility
- **Ellipsis Expansion**: Allows users to expand and view all breadcrumb items
- **Keyboard Interaction**: Supports keyboard navigation and interaction

## Installation

### Prerequisites
- Requires a container with the ID `breadcrumb-container`
- Expected HTML structure with classes:
  - `.trail-begin` for home link
  - `.trail-end` for current page
  - `.scs-chevron` for navigation separators

### Setup
1. Include the script in your HTML
2. Ensure your breadcrumb HTML follows the expected structure
3. The script will automatically initialize on `DOMContentLoaded`

## HTML Structure Example
```html
<nav id="breadcrumb-container">
    <a href="/" class="trail-begin">Home</a>
    <span class="scs-chevron">›</span>
    <a href="/section">Section</a>
    <span class="scs-chevron">›</span>
    <span class="trail-end">Current Page</span>
</nav>
```

## Configuration

### Key Properties
- `minWidth`: Screen width threshold for truncation (default: 980px)
- `isExpanded`: Tracks current breadcrumb expansion state

### Methods
- `init()`: Initializes the breadcrumb manager
- `truncateBreadcrumbs()`: Collapses breadcrumbs for smaller screens
- `showAllBreadcrumbs()`: Displays all breadcrumb items
- `toggleBreadcrumbs()`: Switches between truncated and expanded views

## Behavior
- On screens narrower than 980px, breadcrumbs automatically truncate
- An ellipsis button (`...`) appears to allow manual expansion
- Clicking or using keyboard interaction expands/collapses breadcrumbs
- Home and current page links always remain visible

## Accessibility
- ARIA attributes added to ellipsis button
- Keyboard support for expanding/collapsing breadcrumbs
- Focus styles for interactive elements

## Styling
Inline CSS is dynamically added for the ellipsis button, providing:
- Consistent color scheme
- Hover and focus states
- Underline effects

## Browser Compatibility
Compatible with modern browsers supporting:
- `addEventListener`
- `querySelector`
- CSS flexible layouts

## Customization
- Modify `minWidth` to adjust truncation breakpoint
- Customize styles by updating `addStyles()` method

## Dependencies
- Vanilla JavaScript
- No external libraries required

## Performance
- Lightweight implementation
- Minimal DOM manipulation
- Efficient event handling

## License
[Insert Your License Here]

## Contributing
Contributions are welcome! Please submit pull requests or open issues on the repository.

## Author
[Your Name/Organization]
```

Would you like me to modify anything about the README?