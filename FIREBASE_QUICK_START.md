# 🚀 Firebase Integration - Quick Start Guide

## إعداد سريع في 5 خطوات

### ✅ الخطوة 1: إنشاء Firebase Project (2 دقيقة)

```bash
1. اذهب إلى https://console.firebase.google.com/
2. انقر "Create a project"
3. أدخل الاسم: StudyTrack
4. اختر البلد وأكمل
```

### ✅ الخطوة 2: إضافة تطبيق ويب (1 دقيقة)

```bash
1. في Firebase Console، انقر </> (Add app)
2. اختر Web من القائمة
3. أدخل اسم التطبيق: StudyTrack Web
4. سيظهر لك Firebase Config - انسخه
```

### ✅ الخطوة 3: تفعيل الخدمات (2 دقيقة)

**تفعيل Authentication:**

- اذهب إلى Authentication
- انقر Get Started
- فعّل Email/Password

**إنشاء Firestore Database:**

- اذهب إلى Firestore Database
- انقر Create Database
- اختر Start in test mode
- اختر Region قريب منك

### ✅ الخطوة 4: إضافة البيانات في .env

في ملف `.env` في جذر المشروع، أضف:

```env
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
```

**كيفية الحصول على هذه البيانات:**

1. في Firebase Console، انقر على ⚙️ (Settings)
2. اختر Project Settings
3. اذهب إلى قسم "Your apps"
4. انسخ بيانات Config

### ✅ الخطوة 5: تثبيت وتشغيل

```bash
# تثبيت Firebase
npm install firebase

# تشغيل المشروع
npm start
```

---

## ✨ الآن يمكنك:

✅ **التسجيل بحساب جديد**

- البيانات تُحفظ تلقائياً في Firestore
- كلمة المرور آمنة في Firebase Auth

✅ **تسجيل الدخول**

- المستخدم يبقى مسجل دخول حتى بعد إغلاق المتصفح
- البيانات تُحفظ محلياً وفي السحابة

✅ **إضافة مسارات ومهام**

- كل البيانات تُحفظ في Firestore
- يمكن الوصول إليها من أي جهاز

---

## 🔧 إعدادات Firestore Rules (مهم!)

في Firestore Console، اذهب إلى **Rules** واستبدل بهذا:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح لكل مستخدم بالوصول لبياناته فقط
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    match /users/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

ثم انقر **Publish**

---

## 🧪 اختبار سريع

1. **قم بالتسجيل:**

   - اذهب إلى صفحة Register
   - أدخل البيانات وانقر Create Account

2. **تحقق من Firestore:**

   - اذهب إلى Firebase Console
   - اذهب إلى Firestore Database
   - تحقق من Collection "users"
   - يجب أن ترى بيانات المستخدم الجديد ✅

3. **اختبر Persistence:**
   - قم بتسجيل الدخول
   - أغلق المتصفح تماماً
   - افتح المتصفح مرة أخرى
   - يجب أن تكون مسجل دخول! ✅

---

## ⚠️ نصائح مهمة

1. **لا تنشر .env على GitHub**

   - استخدم .gitignore
   - الملف موجود فيه بالفعل ✅

2. **Test Mode في Firestore**

   - صحيح للتطوير فقط
   - قبل الإطلاق، حدّث Security Rules

3. **Firebase مجاني للبدء**

   - Free Tier كافي للتطوير
   - مراقبة الاستخدام مهمة

4. **متغيرات البيئة**
   - تأكد من أن كل المتغيرات موجودة
   - إذا حدث خطأ، تحقق من `.env`

---

## 🐛 الأخطاء الشائعة وحلولها

| المشكلة                           | الحل                                              |
| --------------------------------- | ------------------------------------------------- |
| "Cannot read property 'firebase'" | تأكد من تثبيت Firebase: `npm install firebase`    |
| "FIREBASE_API_KEY is not defined" | افحص ملف `.env` والمتغيرات                        |
| "Permission denied"               | حدّث Firestore Rules وانشرها                      |
| المستخدم لا يبقى مسجل             | تحقق من Persistence في `firebase.js`              |
| بيانات لا تظهر                    | افحص Firestore Database وتأكد من وجود Collections |

---

## 📚 الملفات المرتبطة

| الملف                         | الوصف                     |
| ----------------------------- | ------------------------- |
| `src/firebase.js`             | إعدادات Firebase الأساسية |
| `src/firebaseHelpers.js`      | دوال مساعدة لـ Firestore  |
| `src/context/AuthContext.jsx` | إدارة المصادقة            |
| `.env`                        | متغيرات البيئة            |
| `FIREBASE_SETUP.md`           | دليل التفاصيل             |
| `FIREBASE_EXAMPLES.md`        | أمثلة عملية               |

---

## 🎓 التعلم أكثر

- 📖 [Firebase Docs](https://firebase.google.com/docs)
- 📖 [Firestore Guide](https://firebase.google.com/docs/firestore)
- 📖 [Firebase Auth](https://firebase.google.com/docs/auth)

---

## ✅ Checklist قبل الإطلاق للإنتاج

- [ ] تم إنشاء Firebase Project
- [ ] تم تفعيل Authentication
- [ ] تم إنشاء Firestore Database
- [ ] تم إضافة البيانات في `.env`
- [ ] تم تثبيت Firebase
- [ ] تم اختبار التسجيل والدخول
- [ ] تم اختبار Persistence
- [ ] تم تحديث Firestore Rules
- [ ] تم حذف Test Mode من القواعس
- [ ] تم فحص `.gitignore`

---

**تم! 🎉 المشروع جاهز للاستخدام!**
