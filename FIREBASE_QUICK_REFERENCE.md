# Firebase Quick Reference - مرجع سريع

## 📌 الاستيراد الأساسي

```javascript
import { useAuth } from "../context/AuthContext";
import {
  getUserCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  addTask,
  getUserTasks,
  updateTask,
  deleteTask,
  updateUserProgress,
} from "../firebaseHelpers";
```

---

## 👤 استخدام بيانات المستخدم

### الحصول على المستخدم الحالي

```javascript
const { user, loading } = useAuth();

// الخصائص المتاحة:
// user.uid - معرف المستخدم الفريد
// user.email - البريد الإلكتروني
// user.displayName - الاسم
// user.name - الاسم الكامل
// user.createdAt - تاريخ الإنشاء
// user.progress - التقدم
```

### تحديث بيانات المستخدم

```javascript
const { updateUserProfile } = useAuth();

await updateUserProfile({
  name: "الاسم الجديد",
  progress: 50,
  customField: "قيمة",
});
```

---

## 📚 المسارات (Courses)

### إضافة مسار

```javascript
const courseId = await addCourse(user.uid, {
  title: "اسم المسار",
  description: "الوصف",
  duration: "أسبوعين",
  level: "مبتدئ",
  progress: 0,
});
```

### الحصول على جميع المسارات

```javascript
const courses = await getUserCourses(user.uid);
// النتيجة: مصفوفة من المسارات مع id لكل واحد
```

### تحديث مسار

```javascript
await updateCourse(user.uid, courseId, {
  title: "العنوان الجديد",
  progress: 75,
});
```

### حذف مسار

```javascript
await deleteCourse(user.uid, courseId);
```

---

## ✅ المهام (Tasks)

### إضافة مهمة

```javascript
const taskId = await addTask(user.uid, {
  title: "اسم المهمة",
  description: "الوصف",
  priority: "high", // low, medium, high
  dueDate: "2024-12-31",
});
```

### الحصول على جميع المهام

```javascript
const tasks = await getUserTasks(user.uid);
```

### تحديث مهمة (مثلاً وضع علامة كمكتملة)

```javascript
await updateTask(user.uid, taskId, {
  completed: true,
  title: "العنوان الجديد",
});
```

### حذف مهمة

```javascript
await deleteTask(user.uid, taskId);
```

---

## 📊 التقدم (Progress)

### تحديث تقدم المستخدم

```javascript
await updateUserProgress(user.uid, 75); // من 0 إلى 100
```

### الحصول على التقدم الحالي

```javascript
const progress = await getUserProgress(user.uid);
```

---

## 🔐 المصادقة (Authentication)

### تسجيل دخول

```javascript
const { login } = useAuth();

try {
  await login(email, password);
  // سيتم الانتقال تلقائياً إذا نجح
} catch (error) {
  console.error(error.message);
}
```

### التسجيل

```javascript
const { register } = useAuth();

try {
  await register({
    name: "الاسم",
    email: "email@example.com",
    password: "password123",
  });
} catch (error) {
  console.error(error.message);
}
```

### تسجيل خروج

```javascript
const { logout } = useAuth();

await logout();
```

---

## 🎣 Custom Hooks مفيدة

### استخدام بيانات المستخدم مع تحميل

```javascript
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserData } from "../firebaseHelpers";

function MyComponent() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getUserData(user.uid)
        .then(setUserData)
        .finally(() => setLoading(false));
    }
  }, [user?.uid]);

  if (loading) return <div>جاري التحميل...</div>;
  return <div>{userData?.name}</div>;
}
```

### Hook للمسارات مع التحديث

```javascript
function useCoursesList() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getUserCourses(user.uid).then(setCourses);
    }
  }, [user?.uid]);

  const addNewCourse = async (courseData) => {
    await addCourse(user.uid, courseData);
    const updated = await getUserCourses(user.uid);
    setCourses(updated);
  };

  return { courses, addNewCourse };
}
```

---

## ⚠️ معالجة الأخطاء الشائعة

### في try-catch

```javascript
try {
  // كود
} catch (error) {
  if (error.code === "auth/user-not-found") {
    // المستخدم غير موجود
  } else if (error.code === "auth/wrong-password") {
    // كلمة مرور خاطئة
  } else if (error.code === "permission-denied") {
    // لا توجد صلاحيات
  } else {
    console.error(error.message);
  }
}
```

---

## 📝 مثال عملي شامل

```javascript
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserCourses, addCourse } from "../firebaseHelpers";

function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تحميل المسارات عند الدخول
  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);
    getUserCourses(user.uid)
      .then(setCourses)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user?.uid]);

  // إضافة مسار جديد
  const handleAddCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await addCourse(user.uid, {
        title: formData.get("title"),
        description: formData.get("description"),
      });

      // إعادة تحميل المسارات
      const updated = await getUserCourses(user.uid);
      setCourses(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;

  return (
    <div>
      <h1>مرحباً {user?.name}</h1>

      <form onSubmit={handleAddCourse}>
        <input name="title" placeholder="عنوان المسار" required />
        <textarea name="description" placeholder="الوصف"></textarea>
        <button type="submit">إضافة مسار</button>
      </form>

      <div>
        {courses.map((course) => (
          <div key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
```

---

## 🔗 روابط مهمة

| الموضوع          | الرابط                                                |
| ---------------- | ----------------------------------------------------- |
| Firebase Console | https://console.firebase.google.com/                  |
| Firebase Docs    | https://firebase.google.com/docs                      |
| Firestore API    | https://firebase.google.com/docs/firestore/quickstart |
| Auth API         | https://firebase.google.com/docs/auth                 |

---

## ✅ نقاط يجب تذكرها

1. ✅ تأكد من وجود `user.uid` قبل أي عملية
2. ✅ استخدم try-catch لجميع العمليات
3. ✅ حدّث البيانات بعد أي تغيير
4. ✅ تحقق من `.env` إذا حدث خطأ
5. ✅ استخدم useEffect لجلب البيانات
6. ✅ أضف loading state أثناء العمليات
7. ✅ عالج الأخطاء برسائل واضحة للمستخدم

---

تم! 🎉 استخدم هذا المرجع السريع في مشاريعك!
