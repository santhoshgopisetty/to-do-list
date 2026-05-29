# Premium Responsive To-Do List App

A modern, highly responsive, and beautiful To-Do List web application featuring client-side persistence, priority categorizations, status filtering, and an integrated light/dark mode theme switcher.

## Features

- **Rich Modern Aesthetics**: Built using curated, warm pastel colors, sleek shadows, rounded cards, and smooth micro-animations.
- **Fully Responsive Layout**: Fully optimized with CSS Flexbox, Grid, and Media Queries to render beautifully on mobile phones, tablets, and desktop monitors.
- **Premium Dark Mode**: Seamless, animated transitions between a warm cream light mode and a modern midnight dark mode.
- **Local Storage Persistence**: Automatically saves your tasks list and theme preference so they survive browser refreshes and sessions.
- **Priority Categorization**: Color-coded badges to sort tasks by priority (Low, Medium, High).
- **Status Filtering**: Instantly filter your list by **All**, **Active**, and **Completed** tasks.
- **Interactive Controls**: Hover-revealed delete buttons (visible by default on mobile touchscreens) and clean custom-designed circular checkboxes.

## Technologies Used

- **HTML5**: Semantic tags, clean structure, responsive viewports.
- **CSS3 (Vanilla)**: Media queries, variable transitions, custom scrollbars, styling resets.
- **JavaScript (ES6+)**: Document Object Model (DOM) manipulation, event listeners, localStorage API, dynamic render state pipelines.
- **Lucide Icons**: Crisp vector SVGs for light/dark mode and delete actions.

## Getting Started

To run the application locally:

1. **Clone the repository** (or download the files).
2. **Open the project**:
   - Double-click `index.html` to open it directly in your browser.
   - Alternatively, open the directory in VS Code and run it using the **Live Server** extension for real-time hot-reloading.
3. Add a new task, select its priority level, and hit `Enter` or click the `+` icon!

## File Structure

```text
├── index.html     # HTML structure and header links
├── styles.css     # CSS variable colors, media queries, layout, and dark mode rules
├── script.js      # JS task lifecycle CRUD actions, filters, and localstorage hooks
└── .gitignore     # Standard gitignore configurations
```
