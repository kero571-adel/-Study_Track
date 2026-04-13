// context/LanguageContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

// ✅ ترجمات شاملة للمشروع - الإنجليزية
export const translations = {
  en: {
    // ===== Navigation =====
    dashboard: "Dashboard",
    addCourse: "Add Course",
    progress: "Progress",
    tasks: "Tasks",
    games: "Games",
    settings: "Settings",
    logout: "Logout",
    toggleLang: "عربي",
    
    // ===== Branding =====
    studyTrack: "📚 StudyTrack",
    tagline: "Your Personal Study Companion",
    
    // ===== Dashboard =====
    welcome: "Welcome back,",
    stats: "Your Stats",
    totalCourses: "Total Courses",
    completedCourses: "Completed",
    totalTasks: "Total Tasks",
    completedTasks: "Done",
    quickActions: "Quick Actions",
    continueLearning: "Continue Learning",
    viewProgress: "View Progress",
    manageTasks: "Manage Tasks",
    takeABreak: "Take a Break",
    addFirstCourse: "Add Your First Course",
    
    // ===== Study Tips =====
    studyTips: "💡 Study Tips",
    tip1Title: "Consistency is Key:",
    tip1Desc: "Study a little bit every day rather than cramming.",
    tip2Title: "Track Progress:",
    tip2Desc: "Keep your courses updated to stay motivated.",
    tip3Title: "Plan Your Tasks:",
    tip3Desc: "Break down your study into manageable tasks.",
    
    // ===== Add Course Page =====
    addNewCourse: "➕ Add New Course",
    startTrackingCourse: "Start tracking a new course",
    courseTitle: "Course Title",
    courseTitlePlaceholder: "e.g., React.js Fundamentals",
    courseTitleHint: "Enter the name of the course you want to track",
    courseTitleRequired: "Course title is required",
    courseLink: "Course Link",
    courseLinkPlaceholder: "https://youtube.com/playlist?list=...",
    courseLinkHint: "Optional: YouTube playlist, course website, or any relevant link",
    totalVideos: "Total Number of Videos",
    totalVideosPlaceholder: "e.g., 50",
    totalVideosHint: "Total videos/lessons in this course",
    totalVideosPositive: "Total videos must be a positive number",
    addCourseBtn: "Add Course",
    addingCourse: "Adding...",
    courseAdded: "✓ Course added successfully!",
    pleaseLogin: "Please login first",
    addCourseFailed: "Failed to add course",
    howItWorks: "💡 How It Works",
    howItWorks1: "Add a course with the title and total number of videos",
    howItWorks2: "Track your progress by updating watched videos",
    howItWorks3: "See your overall progress with visual progress bars",
    howItWorks4: "Get motivational messages as you progress",
    howItWorks5: "Mark courses as completed and celebrate your achievement!",
    
    // ===== Progress Page =====
    yourProgress: "📈 Your Progress",
    trackJourney: "Track your learning journey",
    overallProgress: "Overall Progress",
    videosWatched: "Videos Watched",
    noCourses: "📚 No courses yet",
    noCoursesDesc: "Start by adding a course to track your learning progress.",
    addFirstCourseBtn: "Add Your First Course",
    
    // ===== Tasks Page =====
    studyTasks: "✓ Study Tasks",
    planTasks: "Plan and track your study tasks",
    addNewTask: "Add New Task",
    taskTitle: "Task Title",
    taskTitlePlaceholder: "e.g., Complete Chapter 5",
    dueDate: "Due Date",
    addTaskBtn: "Add Task",
    addingTask: "Adding...",
    taskAdded: "✓ Task added successfully!",
    taskTitleRequired: "Task title is required",
    dueDateRequired: "Due date is required",
    addTaskFailed: "Failed to add task",
    filters: {
      today: "Today",
      all: "All",
      overdue: "Overdue",
      completed: "Completed",
    },
    emptyTasks: {
      all: "📝 No tasks yet. Create one to get started!",
      today: "📝 No tasks for today. Enjoy your break!",
      overdue: "✓ No overdue tasks. Great job staying on track!",
      completed: "📝 No completed tasks yet.",
    },
    
    // ===== Games Page =====
    takeStudyBreak: "🎮 Take a Study Break",
    playFunGames: "Play some fun games to refresh your mind",
    chooseGame: "Choose a Game",
    backToMenu: "← Back to Menu",
    loadingGame: "Loading game...",
    
    // ===== Rock Paper Scissors =====
    rockPaperScissors: "Rock Paper Scissors",
    playAgainstComputer: "Play against the computer",
    rock: "Rock",
    paper: "Paper",
    scissors: "Scissors",
    you: "You",
    computer: "Computer",
    vs: "vs",
    wins: "Wins",
    losses: "Losses",
    draws: "Draws",
    youWon: "🎉 You Won!",
    youLost: "😢 You Lost!",
    itsDraw: "🤝 It's a Draw!",
    resetRound: "Reset Round",
    resetScore: "Reset Score",
    
    // ===== Tic Tac Toe =====
    ticTacToe: "Tic Tac Toe",
    playerVsPlayer: "Player vs Player",
    playerVsComputer: "Player vs Computer",
    twoPlayersTakeTurns: "2 Players, Take Turns",
    challengeTheAI: "Challenge the AI",
    firstToThreeInRow: "First to get 3 in a row (horizontally, vertically, or diagonally) wins!",
    newGame: "New Game",
    resetGame: "Reset Game",
    changeMode: "Change Mode",
    resetHistory: "Reset History",
    youX: "You (X)",
    computerO: "Computer (O)",
    playerX: "Player X",
    playerO: "Player O",
    computerThinking: "🤔 Computer is thinking...",
    yourTurn: "Your Turn:",
    computersTurn: "Computer's Turn:",
    currentTurn: "Current Turn:",
    
    // ===== Auth Pages =====
    signIn: "Sign In",
    createAccount: "Create Account",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    signInLink: "Sign in",
    signUpLink: "Sign up",
    passwordMinLength: "Password must be at least 6 characters",
    passwordsNotMatch: "Passwords do not match",
    pleaseFillAllFields: "Please fill in all fields",
    emailAlreadyInUse: "Email already registered. Please login or use a different email.",
    weakPassword: "Password is too weak. Please use a stronger password.",
    invalidEmail: "Invalid email address.",
    registrationFailed: "Registration failed. Please try again.",
    loginFailed: "Login failed. Please try again.",
    
    // ===== Common =====
    loading: "Loading...",
    error: "Error",
    success: "Success",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    yes: "Yes",
    no: "No",
    confirm: "Confirm",
    close: "Close",
    back: "Back",
    next: "Next",
    submit: "Submit",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    refresh: "Refresh",
    
    // ===== Alerts & Messages =====
    deleteConfirm: "Are you sure you want to delete this?",
    courseDeleteConfirm: "Are you sure you want to delete this course?",
    taskDeleteConfirm: "Delete this task?",
    migrationWelcome: "🎉 Welcome Back!",
    migrationMessage: "We migrated your data to the cloud:",
    gotIt: "Got it!",
    
    // ===== Stats Labels =====
    dueToday: "Due today",
    streak: "Streak",
    keepItUp: "Keep It Up!",
    stayConsistent: "Stay consistent",
  },
  
  // ✅ ترجمات شاملة للمشروع - العربية
  ar: {
    // ===== Navigation =====
    dashboard: "لوحة التحكم",
    addCourse: "إضافة دورة",
    progress: "التقدم",
    tasks: "المهام",
    games: "الألعاب",
    settings: "الإعدادات",
    logout: "تسجيل خروج",
    toggleLang: "English",
    
    // ===== Branding =====
    studyTrack: "📚 مسار الدراسة",
    tagline: "رفيقك الشخصي للدراسة",
    
    // ===== Dashboard =====
    welcome: "مرحبًا بك،",
    stats: "إحصائياتك",
    totalCourses: "إجمالي الدورات",
    completedCourses: "مكتملة",
    totalTasks: "إجمالي المهام",
    completedTasks: "منجزة",
    quickActions: "إجراءات سريعة",
    continueLearning: "متابعة التعلم",
    viewProgress: "عرض التقدم",
    manageTasks: "إدارة المهام",
    takeABreak: "خذ استراحة",
    addFirstCourse: "أضف أول دورة لك",
    
    // ===== Study Tips =====
    studyTips: "💡 نصائح للدراسة",
    tip1Title: "الاستمرارية هي المفتاح:",
    tip1Desc: "ادرس قليلًا كل يوم بدلاً من المذاكرة المكثفة.",
    tip2Title: "تابع تقدمك:",
    tip2Desc: "حدّث دوراتك باستمرار لتبقى متحفزًا.",
    tip3Title: "خطّط لمهامك:",
    tip3Desc: "قسّم دراستك إلى مهام صغيرة قابلة للإنجاز.",
    
    // ===== Add Course Page =====
    addNewCourse: "➕ إضافة دورة جديدة",
    startTrackingCourse: "ابدأ في تتبع دورة جديدة",
    courseTitle: "عنوان الدورة",
    courseTitlePlaceholder: "مثال: أساسيات React.js",
    courseTitleHint: "أدخل اسم الدورة التي تريد تتبعها",
    courseTitleRequired: "عنوان الدورة مطلوب",
    courseLink: "رابط الدورة",
    courseLinkPlaceholder: "https://youtube.com/playlist?list=...",
    courseLinkHint: "اختياري: قائمة تشغيل يوتيوب، موقع الدورة، أو أي رابط ذي صلة",
    totalVideos: "عدد الفيديوهات الكلي",
    totalVideosPlaceholder: "مثال: 50",
    totalVideosHint: "إجمالي الفيديوهات/الدروس في هذه الدورة",
    totalVideosPositive: "عدد الفيديوهات يجب أن يكون رقمًا موجبًا",
    addCourseBtn: "إضافة الدورة",
    addingCourse: "جاري الإضافة...",
    courseAdded: "✓ تمت إضافة الدورة بنجاح!",
    pleaseLogin: "يرجى تسجيل الدخول أولاً",
    addCourseFailed: "فشل في إضافة الدورة",
    howItWorks: "💡 كيف يعمل",
    howItWorks1: "أضف دورة مع العنوان وإجمالي عدد الفيديوهات",
    howItWorks2: "تابع تقدمك عن طريق تحديث الفيديوهات المُشاهدة",
    howItWorks3: "شاهد تقدمك الكلي مع أشرطة التقدم المرئية",
    howItWorks4: "احصل على رسائل تحفيزية أثناء تقدمك",
    howItWorks5: "علّم الدورات كمكتملة واحتفل بإنجازك!",
    
    // ===== Progress Page =====
    yourProgress: "📈 تقدمك",
    trackJourney: "تابع رحلة تعلمك",
    overallProgress: "التقدم الكلي",
    videosWatched: "الفيديوهات المُشاهدة",
    noCourses: "📚 لا توجد دورات بعد",
    noCoursesDesc: "ابدأ بإضافة دورة لمتابعة تقدمك في التعلم.",
    addFirstCourseBtn: "أضف أول دورة لك",
    
    // ===== Tasks Page =====
    studyTasks: "✓ مهام الدراسة",
    planTasks: "خطط وتابع مهام دراستك",
    addNewTask: "إضافة مهمة جديدة",
    taskTitle: "عنوان المهمة",
    taskTitlePlaceholder: "مثال: إنهاء الفصل الخامس",
    dueDate: "تاريخ الاستحقاق",
    addTaskBtn: "إضافة المهمة",
    addingTask: "جاري الإضافة...",
    taskAdded: "✓ تمت إضافة المهمة بنجاح!",
    taskTitleRequired: "عنوان المهمة مطلوب",
    dueDateRequired: "تاريخ الاستحقاق مطلوب",
    addTaskFailed: "فشل في إضافة المهمة",
    filters: {
      today: "اليوم",
      all: "الكل",
      overdue: "متأخرة",
      completed: "مكتملة",
    },
    emptyTasks: {
      all: "📝 لا توجد مهام بعد. أنشئ مهمة للبدء!",
      today: "📝 لا توجد مهام لليوم. استمتع براحتك!",
      overdue: "✓ لا توجد مهام متأخرة. أحسنت في المتابعة!",
      completed: "📝 لا توجد مهام مكتملة بعد.",
    },
    
    // ===== Games Page =====
    takeStudyBreak: "🎮 خذ استراحة من الدراسة",
    playFunGames: "العب ألعابًا ممتعة لتنشيط ذهنك",
    chooseGame: "اختر لعبة",
    backToMenu: "→ العودة للقائمة",
    loadingGame: "جاري تحميل اللعبة...",
    
    // ===== Rock Paper Scissors =====
    rockPaperScissors: "حجرة ورقة مقص",
    playAgainstComputer: "العب ضد الكمبيوتر",
    rock: "حجرة",
    paper: "ورقة",
    scissors: "مقص",
    you: "أنت",
    computer: "الكمبيوتر",
    vs: "ضد",
    wins: "فوز",
    losses: "خسارة",
    draws: "تعادل",
    youWon: "🎉 فزت!",
    youLost: "😢 خسرت!",
    itsDraw: "🤝 تعادل!",
    resetRound: "إعادة الجولة",
    resetScore: "إعادة النتيجة",
    
    // ===== Tic Tac Toe =====
    ticTacToe: "إكس أو",
    playerVsPlayer: "لاعب ضد لاعب",
    playerVsComputer: "لاعب ضد الكمبيوتر",
    twoPlayersTakeTurns: "لاعبان، تناوب الأدوار",
    challengeTheAI: "تحدي الذكاء الاصطناعي",
    firstToThreeInRow: "أول من يحصل على 3 في صف (أفقي، عمودي، أو قطري) يفوز!",
    newGame: "لعبة جديدة",
    resetGame: "إعادة اللعبة",
    changeMode: "تغيير الوضع",
    resetHistory: "إعادة السجل",
    youX: "أنت (X)",
    computerO: "الكمبيوتر (O)",
    playerX: "اللاعب X",
    playerO: "اللاعب O",
    computerThinking: "🤔 الكمبيوتر يفكر...",
    yourTurn: "دورك:",
    computersTurn: "دور الكمبيوتر:",
    currentTurn: "الدور الحالي:",
    
    // ===== Auth Pages =====
    signIn: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    fullName: "الاسم الكامل",
    forgotPassword: "نسيت كلمة المرور؟",
    noAccount: "ليس لديك حساب؟",
    haveAccount: "لديك حساب بالفعل؟",
    signInLink: "سجّل دخولك",
    signUpLink: "أنشئ حسابًا",
    passwordMinLength: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
    passwordsNotMatch: "كلمتا المرور غير متطابقتين",
    pleaseFillAllFields: "يرجى ملء جميع الحقول",
    emailAlreadyInUse: "البريد الإلكتروني مسجل مسبقًا. سجّل دخولك أو استخدم بريدًا آخر.",
    weakPassword: "كلمة المرور ضعيفة. استخدم كلمة مرور أقوى.",
    invalidEmail: "عنوان البريد الإلكتروني غير صالح.",
    registrationFailed: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
    loginFailed: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
    
    // ===== Common =====
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجاح",
    delete: "حذف",
    edit: "تعديل",
    save: "حفظ",
    cancel: "إلغاء",
    yes: "نعم",
    no: "لا",
    confirm: "تأكيد",
    close: "إغلاق",
    back: "رجوع",
    next: "التالي",
    submit: "إرسال",
    search: "بحث",
    filter: "تصفية",
    sort: "ترتيب",
    refresh: "تحديث",
    
    // ===== Alerts & Messages =====
    deleteConfirm: "هل أنت متأكد من الحذف؟",
    courseDeleteConfirm: "هل أنت متأكد من حذف هذه الدورة؟",
    taskDeleteConfirm: "حذف هذه المهمة؟",
    migrationWelcome: "🎉 مرحبًا بعودتك!",
    migrationMessage: "تم نقل بياناتك إلى السحابة:",
    gotIt: "فهمت!",
    
    // ===== Stats Labels =====
    dueToday: "مستحقة اليوم",
    streak: "سلسلة الأيام",
    keepItUp: "استمر!",
    stayConsistent: "حافظ على الاستمرارية",
  },
};

// ========================================
// ✅ مزود اللغة - Language Provider
// ========================================
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // محاولة جلب اللغة المحفوظة من أول تحميل
    try {
      return localStorage.getItem("language") || "en";
    } catch {
      return "en";
    }
  });

  // ✅ تحديث الصفحة عند تغيير اللغة
  useEffect(() => {
    try {
      localStorage.setItem("language", language);
    } catch (e) {
      console.warn("Could not save language to localStorage:", e);
    }
    
    // تحديث اتجاه الصفحة
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    
    // تحديث اتجاه MUI
    document.body.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    
    // تحديث عنوان الصفحة
    const title = language === "ar" ? "مسار الدراسة" : "StudyTrack";
    document.title = title;
  }, [language]);

  // ✅ تبديل اللغة
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  // ✅ دالة الترجمة الأساسية - آمنة للفشل
  const t = (key) => {
    try {
      return translations[language]?.[key] || translations.en?.[key] || key;
    } catch {
      return key;
    }
  };

  // ✅ دالة الترجمة المتداخلة (مثل: t('filters.today'))
  const tNested = (keyPath) => {
    try {
      const keys = keyPath.split(".");
      let result = translations[language];
      for (const key of keys) {
        result = result?.[key];
        if (result === undefined) break;
      }
      return result || translations.en?.[keyPath.split(".")[0]] || keyPath;
    } catch {
      return keyPath;
    }
  };

  // ✅ دالة مساعدة للتحقق من اتجاه النص
  const isRTL = language === "ar";

  // ✅ دالة للحصول على لغة التاريخ (لـ date-fns)
  const getDateLocale = () => {
    return language === "ar" ? "ar-EG" : "en-US";
  };

  // ✅ قيمة الـ Context
  const value = {
    language,
    isRTL,
    toggleLanguage,
    t,
    tNested,
    getDateLocale,
    translations: translations[language] || translations.en,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// ========================================
// ✅ هوك استخدام اللغة
// ========================================
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// ========================================
// ✅ هوك مساعد للاستخدام في المكونات
// ========================================
export const useTranslation = () => {
  const { t, language, isRTL } = useLanguage();
  return { t, language, isRTL };
};