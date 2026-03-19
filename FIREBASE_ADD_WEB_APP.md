# 📱 إضافة تطبيق ويب في Firebase Console - خطوة بخطوة

## الخطوة الحالية: أنت في صفحة Project Overview

أنت ترى صفحة الترحيب مع الخيارات المختلفة. الآن تحتاج لإضافة تطبيق ويب.

---

## 🎯 ما تفعله الآن:

### 1️⃣ ابحث عن زر الإضافة في الأعلى

في الصفحة التي أمامك، في الجزء العلوي الأيسر:

```
+ Add app
```

✅ **اضغط على "Add app"** (الزر الأزرق)

---

## 📝 ما سيظهر بعدها:

ستظهر نافذة بخيارات مختلفة:

- 📱 iOS
- 🤖 Android
- 🌐 **Web** ← هذا ما تريده!
- ⚙️ Unity
- وغيرها

---

## ✅ الخطوة الثانية:

### اضغط على **"Web"** (الأيقونة الزرقاء)

```
</> Web
```

---

## 🎬 ما سيحدث:

ستظهر نافذة جديدة بـ 3 حقول:

```
☐ Hosting
App nickname: [ ______________________ ]
```

أضف الاسم:

```
StudyTrack Web
```

ثم اضغط **"Register App"**

---

## 🎉 بعدها مباشرة:

ستظهر لك بيانات Firebase Config - **اها هنا!**

ستكون على هذا الشكل:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "studytrack-xxx.firebaseapp.com",
  projectId: "studytrack-xxx",
  storageBucket: "studytrack-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123xyz",
};
```

---

## 📋 ما تفعل بهذه البيانات:

### 1. انسخ كل البيانات

- اضغط على "Copy" أو اختر البيانات وانسخها يدوياً

### 2. فتح ملف `.env` في مشروعك

```
c:\kero\react\interactive_learning_platform\.env
```

### 3. استبدل البيانات:

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyD...
REACT_APP_FIREBASE_AUTH_DOMAIN=studytrack-xxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=studytrack-xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=studytrack-xxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123xyz
```

---

## ⏭️ بعد ذلك:

تابع الخطوات في **FIREBASE_QUICK_START.md**:

### 2️⃣ تفعيل Authentication

- اذهب إلى **Authentication** في القائمة اليسرى
- اضغط **Get Started**
- اختر **Email/Password**

### 3️⃣ إنشاء Firestore Database

- اذهب إلى **Firestore Database**
- اضغط **Create Database**
- اختر **Start in test mode**
- اختر منطقة قريبة

---

## 🎯 الملخص:

1. ✅ اضغط "Add app"
2. ✅ اختر "Web"
3. ✅ أدخل "StudyTrack Web"
4. ✅ اضغط "Register App"
5. ✅ انسخ البيانات
6. ✅ ضعها في `.env`
7. ✅ تابع الخطوات التالية

---

**الآن اذهب وابدأ! أنت قريب جداً! 🚀**
