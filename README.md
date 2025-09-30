# 📋 Todo App

A modern, feature-rich todo application built with React and Vite. Manage your tasks efficiently with categories, due dates, times, and smart filtering.

![Todo App](https://img.shields.io/badge/React-18.x-blue) ![Vite](https://img.shields.io/badge/Vite-5.x-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Functionality
- ✅ **Add, Edit, Delete Tasks** - Full CRUD operations
- ✅ **Mark as Complete** - Toggle task completion with checkbox
- ✅ **Persistent Storage** - Tasks saved to localStorage automatically
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile

### Advanced Features
- 🎨 **Category System** - Organize tasks with color-coded categories
  - Personal (Purple)
  - Work (Blue)
  - Shopping (Green)
  - Health (Red)
  - Finance (Yellow)
  - Other (Gray)

- 📅 **Due Dates & Times** - Set deadlines with native HTML5 pickers
  - Smart date display (Today, Tomorrow, X days, etc.)
  - Optional time selection (12-hour format)
  - Color-coded urgency indicators

- 🔍 **Smart Filtering** - Filter tasks by category
  - One-click category filters
  - Task counters for each category
  - Visual active filter indicator

- 🎯 **Task Statistics** - Track your progress
  - Remaining tasks counter
  - Completed tasks tracking
  - Per-category task counts

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/angheteja2020/todo-app.git
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── App.jsx          # Root component
│   ├── TodoApp.jsx      # Main todo logic & state management
│   ├── TodoItem.jsx     # Individual task display component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # React DOM entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Component Architecture

### TodoApp.jsx (Container Component)
- Manages all application state
- Handles localStorage persistence
- Controls task CRUD operations
- Manages filters and categories
- Renders input forms and task list

### TodoItem.jsx (Presentational Component)
- Displays individual tasks
- Shows category and due date badges
- Provides edit and delete actions
- Handles visual styling and formatting

### Data Flow
```
TodoApp (State & Logic)
   ↓ props (data + callbacks)
TodoItem (UI Display)
   ↑ events (onClick)
TodoApp (State Updates)
```

## 🔧 Key Technologies

- **React 18** - UI library with hooks
- **Vite** - Fast build tool and dev server
- **localStorage** - Client-side data persistence
- **CSS3** - Modern styling with flexbox
- **HTML5** - Native date/time pickers

## 📝 Usage Guide

### Adding a Task
1. Enter task description in the text input
2. Select a category from the dropdown
3. (Optional) Choose a due date
4. (Optional) Set a specific time
5. Click "Add" or press Enter

### Editing a Task
1. Click the pencil icon (✏️) on any task
2. Modify the text, date, or time
3. Click "Update" or press Enter to save
4. Click "Cancel" or press Escape to discard changes

### Filtering Tasks
1. Click any category button above the task list
2. View tasks for that specific category
3. Click "All" to see all tasks

### Completing Tasks
- Click the checkbox or task text to toggle completion
- Completed tasks show with a strikethrough

### Deleting Tasks
- Click the trash icon (🗑️) to permanently remove a task

## 🎯 Task Object Structure

```javascript
{
  id: 1234567890,           // Unique timestamp ID
  text: "Buy groceries",     // Task description
  completed: false,          // Completion status
  category: "Shopping",      // Task category
  dueDate: "2025-10-05",    // Optional due date (YYYY-MM-DD)
  dueTime: "23:59"          // Optional due time (HH:MM)
}
```

## 🎨 Color Scheme

**Primary Theme:** Purple (`#6f42c1`)

**Category Colors:**
- Personal: `#6f42c1` (Purple)
- Work: `#007bff` (Blue)
- Shopping: `#28a745` (Green)
- Health: `#dc3545` (Red)
- Finance: `#ffc107` (Yellow)
- Other: `#6c757d` (Gray)

**Due Date Urgency:**
- Overdue: `#dc3545` (Red)
- Today: `#ffc107` (Yellow)
- Within 3 days: `#fd7e14` (Orange)
- Later: `#6c757d` (Gray)

## 🔒 Data Persistence

Tasks are automatically saved to browser localStorage:
- Saves on every state change
- Loads on component mount
- Persists across browser sessions
- No backend required

**localStorage key:** `tasks`

## 🚀 Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Requires a modern browser with ES6+ support and localStorage API.

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Your Name - [Your GitHub](https://github.com/angheteja2020)

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing fast build tool
- Lucide React for SVG icons

## 📞 Support

For support, email anghellotejada2018@gmail.com or open an issue on GitHub.

---

**Made with ❤️ using React + Vite**