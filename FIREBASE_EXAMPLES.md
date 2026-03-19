// Firebase Usage Examples - أمثلة عملية

/\*\*

- مثال 1: استخدام في صفحة Dashboard
- عرض بيانات المستخدم والمسارات
  \*/

import { useAuth } from "../context/AuthContext";
import { getUserCourses, addCourse, updateUserProgress } from "../firebaseHelpers";
import { useEffect, useState } from "react";

export function DashboardExample() {
const { user } = useAuth();
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
if (user?.uid) {
// جلب المسارات من Firestore
getUserCourses(user.uid)
.then(setCourses)
.catch(error => console.error("Error:", error))
.finally(() => setLoading(false));
}
}, [user]);

const handleAddCourse = async (courseData) => {
try {
const courseId = await addCourse(user.uid, {
title: courseData.title,
description: courseData.description,
progress: 0,
});
console.log("تم إضافة المسار:", courseId);
// إعادة جلب البيانات
const updatedCourses = await getUserCourses(user.uid);
setCourses(updatedCourses);
} catch (error) {
console.error("Error adding course:", error);
}
};

if (loading) return <div>جاري التحميل...</div>;

return (
<div>
<h1>مرحباً {user?.displayName || user?.name}</h1>
<p>البريد: {user?.email}</p>
<p>عدد المسارات: {courses.length}</p>
{/_ عرض المسارات _/}
{courses.map(course => (
<div key={course.id}>
<h3>{course.title}</h3>
<p>{course.description}</p>
</div>
))}
</div>
);
}

/\*\*

- مثال 2: إضافة مسار جديد مع حفظ في Firestore
  \*/

import { addCourse, updateUserProgress } from "../firebaseHelpers";

export async function handleAddCourse(userId, courseData) {
try {
// إضافة المسار
const courseId = await addCourse(userId, {
title: courseData.title,
description: courseData.description,
duration: courseData.duration,
level: courseData.level,
progress: 0,
completed: false,
createdAt: new Date().toISOString(),
});

    // تحديث تقدم المستخدم
    await updateUserProgress(userId, 0);

    return { success: true, courseId };

} catch (error) {
console.error("Error adding course:", error);
return { success: false, error: error.message };
}
}

/\*\*

- مثال 3: تحديث تقدم المستخدم
  \*/

import { updateUserProgress, getUserProgress } from "../firebaseHelpers";

export async function updateProgress(userId, newProgress) {
try {
// الحد الأقصى 100%
const validProgress = Math.min(newProgress, 100);

    await updateUserProgress(userId, validProgress);

    // الحصول على التقدم المحدث
    const currentProgress = await getUserProgress(userId);
    console.log("التقدم الجديد:", currentProgress);

    return currentProgress;

} catch (error) {
console.error("Error updating progress:", error);
throw error;
}
}

/\*\*

- مثال 4: إدارة المهام (Tasks)
  \*/

import { addTask, getUserTasks, updateTask, deleteTask } from "../firebaseHelpers";

export async function manageTask(userId, action, taskData) {
try {
switch(action) {
case "add":
// إضافة مهمة جديدة
const taskId = await addTask(userId, {
title: taskData.title,
description: taskData.description,
priority: taskData.priority || "medium",
dueDate: taskData.dueDate,
});
return { success: true, taskId };

      case "get":
        // جلب جميع المهام
        const tasks = await getUserTasks(userId);
        return { success: true, tasks };

      case "update":
        // تحديث مهمة
        await updateTask(userId, taskData.taskId, {
          title: taskData.title,
          completed: taskData.completed,
        });
        return { success: true };

      case "delete":
        // حذف مهمة
        await deleteTask(userId, taskData.taskId);
        return { success: true };

      default:
        return { success: false, error: "Unknown action" };
    }

} catch (error) {
console.error("Error managing task:", error);
return { success: false, error: error.message };
}
}

/\*\*

- مثال 5: تحديث ملف المستخدم الشخصي
  \*/

import { updateUserData } from "../firebaseHelpers";

export async function updateUserProfile(userId, profileData) {
try {
// تحديث البيانات الشخصية
await updateUserData(userId, {
name: profileData.name,
bio: profileData.bio,
phone: profileData.phone,
location: profileData.location,
website: profileData.website,
// إضافة المزيد حسب الحاجة
});

    return { success: true };

} catch (error) {
console.error("Error updating profile:", error);
throw error;
}
}

/\*\*

- مثال 6: Hook مخصص للحصول على بيانات المستخدم
  \*/

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserData } from "../firebaseHelpers";

export function useUserData() {
const { user } = useAuth();
const [userData, setUserData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
if (user?.uid) {
setLoading(true);
getUserData(user.uid)
.then(data => {
setUserData(data);
setError(null);
})
.catch(err => {
setError(err);
console.error("Error fetching user data:", err);
})
.finally(() => setLoading(false));
}
}, [user?.uid]);

return { userData, loading, error };
}

/\*\*

- مثال 7: Hook مخصص للمسارات
  \*/

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserCourses } from "../firebaseHelpers";

export function useCourses() {
const { user } = useAuth();
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
if (user?.uid) {
setLoading(true);
getUserCourses(user.uid)
.then(data => {
setCourses(data);
setError(null);
})
.catch(err => {
setError(err);
console.error("Error fetching courses:", err);
})
.finally(() => setLoading(false));
}
}, [user?.uid]);

const addNewCourse = async (courseData) => {
try {
await addCourse(user.uid, courseData);
// إعادة جلب البيانات
const updatedCourses = await getUserCourses(user.uid);
setCourses(updatedCourses);
return true;
} catch (error) {
setError(error);
console.error("Error adding course:", error);
return false;
}
};

return { courses, loading, error, addNewCourse };
}

/\*\*

- مثال 8: معالجة الأخطاء الشاملة
  \*/

export function getErrorMessage(errorCode) {
const errorMessages = {
"auth/email-already-in-use": "البريد الإلكتروني مسجل بالفعل",
"auth/invalid-email": "البريد الإلكتروني غير صحيح",
"auth/weak-password": "كلمة المرور ضعيفة جداً",
"auth/user-not-found": "المستخدم غير موجود",
"auth/wrong-password": "كلمة المرور غير صحيحة",
"auth/too-many-requests": "حاول لاحقاً - محاولات كثيرة",
"permission-denied": "ليس لديك صلاحية للقيام بهذا",
"not-found": "البيانات غير موجودة",
};

return errorMessages[errorCode] || "حدث خطأ ما، يرجى المحاولة لاحقاً";
}

export default {
DashboardExample,
handleAddCourse,
updateProgress,
manageTask,
updateUserProfile,
useUserData,
useCourses,
getErrorMessage,
};
