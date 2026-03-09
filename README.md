# 📚 StudyTrack - Personal Study Dashboard Platform

A modern, responsive React.js application designed to help students track their learning progress, manage study tasks, and take productive breaks with fun games.

## ✨ Features

### 📊 Dashboard

- Welcome message with personalized greeting
- Quick summary cards showing:
  - Total number of courses
  - Overall progress percentage
  - Today's tasks count
  - Motivational streak counter
- Quick action links to navigate to main features
- Study tips and best practices

### ➕ Add Course Page

- Simple form to add new courses
- Fields:
  - **Course Title** (required) - e.g., "React.js Fundamentals"
  - **Course Link** (optional) - YouTube playlist or website URL
  - **Total Videos** (required) - Total number of lessons/videos
- Form validation with helpful error messages
- Success feedback and automatic navigation to Progress page
- How-it-works guide for new users

### 📈 Progress Page

- Display all added courses in responsive grid layout
- Overall statistics:
  - Total courses
  - Completed courses
  - Overall progress percentage
  - Total videos watched
- **Course Cards** with:
  - Course title and completion badge
  - Visual progress bar (color changes when complete)
  - Videos watched / Total videos counter
  - Motivational messages based on progress
  - Link to open course resources
  - Update progress button with expandable form
  - Delete course option with confirmation

### ✓ Tasks (Study Planner)

- Add tasks with title and due date
- Task management features:
  - Mark tasks as completed
  - Delete tasks with confirmation
  - Task filtering (All, Today, Overdue, Completed)
- Statistics display:
  - Total tasks count
  - Completed tasks count
  - Overdue tasks count (with warning badge)
- Visual indicators:
  - Completed tasks appear faded with strikethrough
  - Overdue tasks highlighted in red
  - Dates formatted in readable format

### 🎮 Games Page

Two fun mini-games to take study breaks:

#### Rock Paper Scissors

- Play against computer with random choices
- Score tracking (wins, losses, draws)
- Results display (You Won! / You Lost! / Draw)
- Round reset and score reset options

#### Tic Tac Toe

- 2-player game (local multiplayer)
- Score tracking for both players and draws
- Winning line highlighted in gold
- Turn indicator showing current player
- Winner detection with celebration message
- New Game and Reset History buttons

### 📱 Sidebar Navigation

- Fixed sidebar with gradient background
- Navigation links:
  - 📊 Dashboard
  - ➕ Add Course
  - 📈 Progress
  - ✓ Tasks
  - 🎮 Games
- Active link highlighting
- Mobile-responsive with hamburger menu
- App branding and version info

## 🏗️ Project Structure

```
src/
├── pages/
│   ├── Dashboard.js         # Home page with overview
│   ├── AddCourse.js         # Add new course form
│   ├── Progress.js          # View all courses and progress
│   ├── Tasks.js             # Task manager and planner
│   └── Games.js             # Game selection hub
├── components/
│   ├── Sidebar.js           # Main navigation component
│   ├── CourseCard.js        # Reusable course display card
│   ├── ProgressBar.js       # Reusable progress indicator
│   └── TaskItem.js          # Reusable task list item
├── games/
│   ├── RockPaperScissors.js # RPS game component
│   └── Tic Tac Toe.js       # Tic Tac Toe game component
├── redux/
│   └── store.js             # Redux store with courses & tasks slices
├── App.js                   # Main app component with routing
├── App.css                  # All styling (responsive design)
└── index.js                 # Entry point with Redux provider
```

## 🔄 State Management (Redux)

### Courses Slice

```javascript
{
  id: number,
  title: string,
  link: string | null,
  totalVideos: number,
  watchedVideos: number
}
```

**Actions:**

- `addCourse(payload)` - Add new course
- `updateCourseProgress({id, watchedVideos})` - Update progress
- `deleteCourse(id)` - Delete a course

### Tasks Slice

```javascript
{
  id: number,
  title: string,
  date: string (ISO format),
  completed: boolean
}
```

**Actions:**

- `addTask(payload)` - Add new task
- `toggleTaskComplete(id)` - Mark as complete/incomplete
- `deleteTask(id)` - Delete a task

## 💾 Local Storage

All data is persisted to browser's localStorage:

- **courses** - Stores all courses JSON
- **tasks** - Stores all tasks JSON

Data syncs automatically when Redux state changes.

## 🎨 Design System

### Color Scheme

- **Primary Gradient:** #667eea to #764ba2 (Purple)
- **Success:** #10b981 (Green)
- **Warning:** #f59e0b (Amber)
- **Danger:** #ef4444 (Red)
- **Neutral:** #6b7280 (Gray)

### Typography

- **Font Family:** System fonts (-apple-system, BlinkMacSystemFont, etc.)
- **Headings:** 600-700 font-weight
- **Body:** 400 font-weight

### Components

- Card-based layouts with subtle shadows
- Rounded corners (0.5rem - 1rem)
- Smooth transitions (0.3s ease)
- Hover effects on interactive elements

## 📱 Responsive Design

### Breakpoints

- **Desktop:** 1200px+ (full sidebar visible)
- **Tablet:** 769px - 1199px (responsive grid)
- **Mobile:** ≤768px (hamburger menu, stacked layout)

### Mobile Features

- Hamburger menu button (top-left)
- Overlay when menu open
- Single column layout
- Touch-friendly button sizes

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build
```

### First Time Usage

1. **Add Your First Course**

   - Click "Add Course" in sidebar
   - Fill in course title and total videos
   - Optionally add course link
   - Click "Add Course" button

2. **Track Progress**

   - Go to "Progress" page
   - Click "Update Progress" on any course card
   - Enter watched videos count
   - Save to update

3. **Manage Tasks**

   - Click "Tasks" in sidebar
   - Add task title and due date
   - Check off completed tasks
   - Filter by Today, Overdue, or Completed

4. **Take a Break**
   - Click "Games" in sidebar
   - Choose Rock Paper Scissors or Tic Tac Toe
   - Have fun and refresh your mind!

## 🎯 Key Features Explained

### Progress Calculation

```
Progress % = (watchedVideos / totalVideos) × 100
Example: 4 videos watched out of 30 = (4/30) × 100 = 13%
```

### Motivational Messages

- 🚀 0% - "Let's get started!"
- 💪 1-49% - "Great start! Keep going."
- 🔥 50-99% - "You're halfway there!"
- 🎉 100% - "Congratulations! Course completed!"

### Task Filtering

- **All:** Shows all tasks
- **Today:** Shows tasks with today's date
- **Overdue:** Shows incomplete tasks with past due dates
- **Completed:** Shows checked-off tasks

## 📦 Dependencies

### Main Libraries

- **React** 19.1.1 - UI framework
- **React Router DOM** 7.8.2 - Navigation
- **Redux Toolkit** 2.9.0 - State management
- **React Redux** 9.2.0 - Redux integration

### Dev Dependencies

- React Scripts 5.0.1
- Testing Library (React, DOM, User Event)

## 🎓 Learning Value

This project demonstrates:

- ✅ Functional components with React hooks
- ✅ Redux Toolkit for state management
- ✅ Local storage persistence
- ✅ React Router for SPA navigation
- ✅ Responsive CSS design
- ✅ Form handling and validation
- ✅ Game logic (RPS, Tic Tac Toe)
- ✅ Component composition and reusability
- ✅ Conditional rendering
- ✅ Array filtering and mapping
- ✅ Date handling and formatting

## 🔧 Customization

### Add More Games

1. Create new component in `src/games/`
2. Import in `src/pages/Games.js`
3. Add game card in games menu
4. Add route logic in selectedGame state

### Change Color Scheme

Edit CSS variables in `App.css`:

- `.sidebar` - Gradient colors
- `.btn-primary` - Primary button color
- `.success` / `.danger` / `.warning` - Status colors

### Modify Motivational Messages

Edit conditions in `src/components/CourseCard.js` progress calculation section.

### Add Task Categories

Extend task structure with `category` field and filter by category.

## 📝 Future Enhancements

Potential improvements:

- 🔐 User authentication
- ☁️ Cloud sync (Firebase/Supabase)
- 📊 Advanced analytics and charts
- 🎯 Study goals and milestones
- 🏆 Achievements and badges
- 📱 Mobile app (React Native)
- 🔔 Notifications and reminders
- 📤 Export study data
- 🤖 AI study recommendations
- 📚 Study notes integration

## 🐛 Troubleshooting

### Data Not Persisting

- Check browser's localStorage is enabled
- Clear cache and reload
- Check browser console for errors

### Styling Issues

- Ensure App.css is properly imported in App.js
- Check browser DevTools for CSS conflicts
- Clear browser cache

### Component Not Rendering

- Verify imports are correct
- Check Redux store is properly configured
- Ensure Redux Provider wraps app in index.js

## 📄 License

Personal educational project - Free to use and modify

## 👨‍💻 Author

Built as a comprehensive React learning project transforming an online course platform into a personal study tracking dashboard.

---

**Happy Studying! 📚✨**

For questions or improvements, refer to the component comments throughout the codebase.
