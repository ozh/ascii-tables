# Copilot Instructions for ASCII Tables

## Project Overview

This is a static web application that generates ASCII tables in various formats. Users can input tabular data (separated by tabs or spaces) and convert it to beautifully formatted ASCII tables suitable for code comments, GitHub Markdown, and other text-based formats.

### Key Features
- Supports 15+ table styles (MySQL, Markdown, Unicode, reStructuredText, Jira, MediaWiki, etc.)
- Client-side only - no server required
- Automatic column detection and alignment
- Numeric column detection and right-alignment
- Comment style prefix support for various programming languages
- Settings persistence using browser cookies

## Technology Stack

- **Frontend**: Vanilla JavaScript (jQuery)
- **UI Framework**: Bootstrap 3.x
- **Icons**: Font Awesome
- **No build process**: Direct HTML/CSS/JS files

## Project Structure

```
/
├── index.html              # Main HTML file with UI layout
├── assets/
│   ├── js/
│   │   ├── script.js      # Main application logic (table generation)
│   │   ├── jquery.min.js  # jQuery library
│   │   └── bootstrap.min.js
│   ├── css/
│   │   ├── style.css      # Custom styles
│   │   ├── bootstrap.min.css
│   │   └── font-awesome.min.css
│   └── fonts/             # Font Awesome fonts
└── README.md              # Documentation with examples
```

## Code Style and Conventions

### JavaScript
- Uses jQuery for DOM manipulation and event handling
- Function-based organization (no classes)
- Camelcase naming for functions and variables
- Comments explain complex logic, especially in table generation algorithms
- Cookie functions handle settings persistence

### HTML
- Bootstrap grid system for layout
- Semantic HTML5 elements
- Inline event handlers for simplicity (e.g., `onclick="createTable()"`)
- Form elements use Bootstrap classes

### Key Functions in script.js
- `createTable()` - Main function that orchestrates table generation
- `formatTable()` - Core table formatting logic
- `parseInput()` - Parses user input into rows and columns
- `detectNumericColumns()` - Identifies numeric columns for right-alignment
- `saveSettingsToCookie()` / `loadSettingsFromCookie()` - Settings persistence

## Development Guidelines

### Making Changes

1. **Testing**: This is a client-side only application
   - Open `index.html` directly in a browser
   - No build step required
   - Test all table styles after changes

2. **Cross-browser compatibility**:
   - Ensure changes work in modern browsers (Chrome, Firefox, Safari, Edge)
   - Be mindful of cookie handling differences

3. **Table Formatting**:
   - Each style has specific border characters and layout rules
   - Pay attention to column width calculations
   - Preserve alignment for numeric vs text columns

4. **User Input Handling**:
   - Support both tab and 4-space column separators
   - Handle edge cases (empty cells, single-column rows, special characters)
   - Trim whitespace appropriately based on settings

### Common Tasks

**Adding a new table style:**
1. Add new option to `#style` select in `index.html`
2. Implement formatting logic in `formatTable()` function
3. Define border characters and layout rules
4. Update README.md with example output

**Modifying table generation:**
- Main logic is in `assets/js/script.js`
- Column width calculations consider all rows
- Numeric detection uses regex patterns
- Each style has unique rendering rules

**UI Changes:**
- Edit `index.html` for layout changes
- Use Bootstrap classes for consistent styling
- Custom styles go in `assets/css/style.css`

## Testing Approach

Since this is a static web app:
1. Open `index.html` in a browser
2. Test with sample data containing:
   - Mixed text and numeric columns
   - Varying column widths
   - Special characters
   - Empty cells
   - Single-column rows
3. Verify all table styles render correctly
4. Check cookie persistence (remember settings checkbox)
5. Test tab key functionality in textarea

## Deployment

This is a static site hosted on GitHub Pages:
- Deployment is automatic via GitHub Pages
- No build or compilation needed
- Changes to `main` branch deploy automatically
- Live site: https://ozh.github.io/ascii-tables/

## Important Notes

- **No server-side code**: Everything runs in the browser
- **No npm/build tools**: Direct JavaScript files
- **Cookie-based persistence**: Uses browser cookies for settings
- **jQuery dependency**: Application uses jQuery extensively
- **Bootstrap 3**: UI framework (not Bootstrap 4/5)

## When Suggesting Changes

1. Maintain the simple, build-free architecture
2. Preserve backward compatibility with saved cookies
3. Keep dependencies minimal (avoid adding new libraries)
4. Ensure all table styles continue to work correctly
5. Test numeric column detection and alignment
6. Verify comment prefix functionality works for all styles
