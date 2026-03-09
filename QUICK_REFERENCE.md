## 🎯 Quick Reference Card

### 🚀 Quick Start (3 steps)

```bash
1. npm install
2. npm start
3. Open http://localhost:3000
```

---

### 📍 Navigate to Features

| Feature        | Path          | Sidebar Link  |
| -------------- | ------------- | ------------- |
| Dashboard      | `/`           | 📊 Dashboard  |
| Add Course     | `/add-course` | ➕ Add Course |
| Track Progress | `/progress`   | 📈 Progress   |
| Manage Tasks   | `/tasks`      | ✓ Tasks       |
| Play Games     | `/games`      | 🎮 Games      |

---

### 💾 Data Models

#### Course

```javascript
{
  id: 1678946234,
  title: "React Fundamentals",
  link: "https://...",
  totalVideos: 50,
  watchedVideos: 15
}
```

#### Task

```javascript
{
  id: 1678946234,
  title: "Complete Chapter 5",
  date: "2026-03-15",
  completed: false
}
```

---

### 🎨 Color Palette

- 🟣 Primary: `#667eea` → `#764ba2` (Gradient)
- 🟢 Success: `#10b981`
- 🟡 Warning: `#f59e0b`
- 🔴 Danger: `#ef4444`
- ⚫ Neutral: `#6b7280`

---

### 🧩 Component Tree

```
App
├── Sidebar
│   └── Navigation Links
└── Main Content (Routes)
    ├── Dashboard
    │   └── Summary Cards
    ├── AddCourse
    │   └── Form
    ├── Progress
    │   └── CourseCard (repeated)
    │       └── ProgressBar
    ├── Tasks
    │   └── TaskItem (repeated)
    └── Games
        ├── RockPaperScissors
        └── TicTacToe
```

---

### 📊 Progress Formula

```
Progress % = (watchedVideos / totalVideos) × 100

Examples:
4/30 = 13% → "💪 Great start!"
15/50 = 30% → "💪 Great start!"
25/50 = 50% → "🔥 Halfway there!"
50/50 = 100% → "🎉 Completed!"
```

---

### 🔄 Redux Actions

#### Courses

```javascript
// Add
dispatch(
  addCourse({
    title: "...",
    link: "...",
    totalVideos: 50,
  })
);

// Update
dispatch(
  updateCourseProgress({
    id: 123,
    watchedVideos: 15,
  })
);

// Delete
dispatch(deleteCourse(123));
```

#### Tasks

```javascript
// Add
dispatch(
  addTask({
    title: "...",
    date: "2026-03-15",
  })
);

// Toggle
dispatch(toggleTaskComplete(123));

// Delete
dispatch(deleteTask(123));
```

---

### 📱 Responsive Breakpoints

```
Mobile:    ≤ 768px   → Hamburger menu, stacked layout
Tablet:    769-1199px → Adaptive grid
Desktop:   ≥ 1200px  → Full sidebar, multi-column
```

---

### 🎮 Games Reference

**Rock Paper Scissors**

- Pick ✊ (rock), 📄 (paper), or ✌️ (scissors)
- Computer picks randomly
- Win = +1 point
- Track: wins, losses, draws

**Tic Tac Toe**

- 2 players: X and O
- Click squares to place mark
- First to 3 in a row wins
- Track: X wins, O wins, draws

---

### ✅ Task Filters

```
All       → Show all tasks
Today     → date === today
Overdue   → date < today && !completed
Completed → completed === true
```

---

### 🔐 LocalStorage Keys

```javascript
localStorage.courses; // Courses JSON
localStorage.tasks; // Tasks JSON

// Clear all
localStorage.clear();
```

---

### 🐛 Common Commands

```bash
# Development
npm start                 # Start dev server

# Build
npm build                # Build for production

# Test
npm test                 # Run tests

# Clean
# In browser console:
localStorage.clear()    # Clear all data
```

---

### 📂 Important Files to Know

| File              | Purpose               |
| ----------------- | --------------------- |
| `App.js`          | Main routing & layout |
| `App.css`         | All styling           |
| `redux/store.js`  | State management      |
| `pages/*.js`      | Page components       |
| `components/*.js` | Reusable components   |
| `games/*.js`      | Game logic            |

---

### 🎯 File Locations

```
pages/           → Dashboard, AddCourse, Progress, Tasks, Games
components/      → Sidebar, CourseCard, ProgressBar, TaskItem
games/           → RockPaperScissors, TicTacToe
redux/store.js   → Redux slices
App.js           → Main component
App.css          → All styles
```

---

### 💡 Pro Tips

1. **Add Course** → Auto-redirects to Progress page
2. **Update Progress** → Click "Update Progress" button to edit
3. **Task Date** → Click date input to pick from calendar
4. **Mobile** → Tap ☰ button to open sidebar menu
5. **Data** → Automatically saved to localStorage on every change
6. **Empty State** → Helpful messages when no data exists
7. **Validation** → Form won't submit with errors

---

### 🎓 Learning Focus Areas

- **React**: Components, hooks, routing
- **Redux**: State slices, actions, selectors
- **CSS**: Flexbox, Grid, responsive design
- **JavaScript**: Array methods, date handling, game logic
- **LocalStorage**: Data persistence

---

### 🔍 Debug Tips

```javascript
// Check Redux state in console
state = store.getState();

// Check localStorage
console.log(JSON.parse(localStorage.getItem("courses")));

// Check active route
window.location.pathname;

// Check game score in RPS
// Look at score state in React DevTools
```

---

### ✨ Feature Highlights

✅ Visual progress bars  
✅ Motivational messages  
✅ Task filtering  
✅ Overdue detection  
✅ 2 playable games  
✅ Responsive design  
✅ Data persistence  
✅ Mobile hamburger menu

---

### 🎯 Success Checklist

After running `npm start`:

- [ ] Dashboard loads
- [ ] Can navigate between pages
- [ ] Add course form works
- [ ] Progress bar updates
- [ ] Tasks appear in list
- [ ] Games are playable
- [ ] Mobile menu works
- [ ] Data saves to localStorage
- [ ] No console errors

---

### 🚨 Troubleshooting

| Issue              | Solution                         |
| ------------------ | -------------------------------- |
| Data not saving    | Check localStorage is enabled    |
| Page not rendering | Check browser console for errors |
| Styling broken     | Clear cache (Ctrl+Shift+Del)     |
| Mobile menu stuck  | Refresh page                     |
| Redux not updating | Check dispatch is called         |

---

### 🔗 Important Links

| Resource              | Usage                    |
| --------------------- | ------------------------ |
| `README.md`           | Full documentation       |
| `SETUP_GUIDE.md`      | Quick start instructions |
| `PROJECT_SUMMARY.md`  | Transformation details   |
| `DESIGN_REFERENCE.md` | File reference guide     |

---

### 📈 Next Features (Ideas)

- User authentication
- Cloud backup
- Study streak counter
- Notes taking
- Custom categories
- More games
- Progress charts
- Export data

---

### 🎉 You're All Set!

Your StudyTrack platform is ready to help you track your study progress!

**Start Now:**

```bash
npm install && npm start
```

**Happy Studying! 📚✨**
