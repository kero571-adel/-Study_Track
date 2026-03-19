# Firestore Security Rules - قواعس الحماية

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // كل مستخدم يمكنه قراءة/كتابة بيانته الخاصة فقط
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // جميع المستندات تحت بيانات المستخدم
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

---

## 🎯 خطوات بعد الكود:

1. **انسخ الكود أعلاه**
2. في Firebase Console، اذهب إلى **Firestore Database** → **Rules**
3. **احذف الكود الحالي** واستبدله بالكود الجديد
4. اضغط **Publish**

---

## 📝 ملخص الخطوات:

1. ✅ اختر **Standard edition**
2. ✅ اضغط **Next**
3. ✅ اختر **Location** قريب منك
4. ✅ اضغط **Next**
5. ✅ اضغط **Create database**
6. ✅ اذهب إلى **Rules**
7. ✅ ضع الكود الجديد
8. ✅ اضغط **Publish**

---

## 🔐 بعدها: تفعيل Authentication

اذهب إلى **Authentication** في القائمة اليسرى:

1. اضغط **Get Started**
2. اختر **Email/Password**
3. فعّل الخيار
4. اضغط **Save**

---

الآن **اضغط Next!** 🚀
