# Firebase Integration Setup Guide

## خطوات ربط Firebase بالمشروع

### 1. إنشاء Firebase Project

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. انقر على "Create a new project"
3. أدخل اسم المشروع: **StudyTrack**
4. اتبع الخطوات وأنهِ الإنشاء

### 2. إضافة تطبيق ويب

1. في Firebase Console، انقر على الأيقونة **</>** (Add app)
2. اختر **Web**
3. أدخل اسم التطبيق
4. انسخ Firebase Config

### 3. تفعيل Authentication

1. اذهب إلى **Authentication** في القائمة اليسرى
2. انقر على **Get Started**
3. فعّل **Email/Password** provider
4. فعّل **User sign-up** إذا أردت السماح للمستخدمين بالتسجيل

### 4. إعداد Firestore Database

1. اذهب إلى **Firestore Database** في القائمة اليسرى
2. انقر على **Create Database**
3. اختر **Start in test mode** (للتطوير)
4. اختر منطقة قريبة منك

### 5. تحديث متغيرات البيئة

في ملف `.env` في جذر المشروع، استبدل القيم:

```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
```

يمكنك الحصول على هذه القيم من Firebase Console:

- اذهب إلى **Project Settings** (⚙️)
- اختر تطبيقك من القسم **Your apps**
- انسخ بيانات الـ Config

### 6. تثبيت Firebase

```bash
npm install firebase
```

### 7. تشغيل المشروع

```bash
npm start
```

## الميزات المضافة

✅ **تسجيل دخول آمن** - Authentication مع Firebase
✅ **حفظ بيانات المستخدم** - في Firestore Database
✅ **الاحتفاظ بالجلسة** - المستخدم يبقى مسجل دخول حتى بعد إغلاق المتصفح
✅ **معالجة الأخطاء** - رسائل خطأ واضحة للمستخدم
✅ **تحديث البيانات** - إمكانية تحديث ملف المستخدم

## Firestore Rules (للاختبار)

في Firestore Database، انقر على **Rules** وأضف:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /courses/{courseId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /tasks/{taskId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## الملفات المعدّلة

- `src/firebase.js` - إعدادات Firebase
- `src/context/AuthContext.jsx` - المصادقة مع Firebase
- `src/pages/Login.jsx` - تحديث صفحة الدخول
- `src/pages/Register.jsx` - تحديث صفحة التسجيل
- `.env` - متغيرات البيئة

## ملاحظات مهمة

1. **لا تنسخ Firebase Config في Git** - استخدم `.env`
2. **Test Mode في Firestore** - قم بتحديث الـ rules قبل الإطلاق للإنتاج
3. **Persistence** - المستخدم سيبقى مسجل دخول حتى بعد إغلاق المتصفح
4. **بيانات المستخدم** - تُحفظ تلقائياً في Firestore مع كل تسجيل دخول جديد
