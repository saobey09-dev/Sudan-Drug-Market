// --- المتغيرات العامة ---
let lang = 'ar';

/**
* وظيفة تغيير اللغة
* تقوم بتعديل اتجاه الصفحة، النصوص، وحالة الأزرار
*/
function changeLanguage(selectedLang) {
lang = selectedLang;
// تغيير لغة الوثيقة والاتجاه (RTL للعربي، LTR للإنجليزي)
document.documentElement.lang = lang;
document.body.style.direction = (lang === 'ar') ? 'rtl' : 'ltr';

// تحديث شكل أزرار تبديل اللغة
document.getElementById('arBtn').classList.toggle('active', lang === 'ar');
document.getElementById('enBtn').classList.toggle('active', lang === 'en');

// تحديث النصوص في صفحة الدخول والتحقق
updateAuthTexts();
// إذا كان التطبيق مفتوحاً بالفعل، أعد رسم شريط التنقل لتغيير اللغة والترتيب
if (document.getElementById('main-app').style.display === 'block') {
renderNavigation();
}
}

/**
* تحديث نصوص واجهة الدخول بناءً على اللغة المختارة
*/
function updateAuthTexts() {
const texts = {
ar: {
title: "سوق الدواء<br>السوداني",
subTitle: "منصتك الموثوقة لتداول الدواء في السودان",
emailInstr: "سجل دخولك عبر البريد الإلكتروني",
sendBtn: "إرسال رمز التأكيد",
verifyInstr: "أدخل الرمز المكون من 6 أرقام المرسل لبريدك",
confirmBtn: "تأكيد الدخول",
backBtn: "رجوع",
alertEmail: "يرجى إدخال البريد الإلكتروني أولاً"
},
en: {
title: "Sudanese<br>Drug Market",
subTitle: "Your trusted platform for medicine in Sudan",
emailInstr: "Log in via email",
sendBtn: "Send Verification Code",
verifyInstr: "Enter the 6-digit code sent to your email",
confirmBtn: "Confirm Login",
backBtn: "Back",
alertEmail: "Please enter email first"
}
};

const t = texts[lang];
document.querySelector('.main-title').innerHTML = t.title;
document.querySelector('.sub-title').innerText = t.subTitle;
document.getElementById('email-instruction').innerText = t.emailInstr;
document.getElementById('btn-text-send').innerText = t.sendBtn;
document.getElementById('verify-instruction').innerText = t.verifyInstr;
document.getElementById('btn-text-verify').innerText = t.confirmBtn;
document.getElementById('btn-text-back').innerText = t.backBtn;
}

/**
* الانتقال من مرحلة إدخال الإيميل إلى مرحلة كود التحقق
*/
function showVerify() {
const email = document.getElementById('emailInput').value;
if (email && email.includes('@')) {
document.getElementById('login-section').style.display = 'none';
document.getElementById('verify-section').style.display = 'block';
} else {
const msg = (lang === 'ar') ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email';
alert(msg);
}
}

/**
* الرجوع من شاشة الكود إلى شاشة الإيميل
*/
function goBackToLogin() {
document.getElementById('verify-section').style.display = 'none';
document.getElementById('login-section').style.display = 'block';
}

/**
* الدخول النهائي للتطبيق بعد "التحقق"
*/
function enterApp() {
const otp = document.getElementById('otpInput').value;
if (otp.length === 6) {
document.getElementById('auth-screen').style.display = 'none';
document.getElementById('main-app').style.display = 'block';
// إعداد شريط التنقل وتحميل الصفحة الرئيسية
renderNavigation();
showHome();
} else {
const msg = (lang === 'ar') ? 'الرمز يجب أن يكون 6 أرقام' : 'Code must be 6 digits';
alert(msg);
}
}

/**
* رسم شريط التنقل السفلي (Bottom Navigation)
* يقوم بعكس ترتيب الأزرار تلقائياً حسب اللغة
*/
function renderNavigation() {
const nav = document.getElementById('main-nav');
// تعريف الأزرار
const buttons = [
{ id: 'home', icon: '🏠', label: lang === 'ar' ? 'الرئيسية' : 'Home' },
{ id: 'profile', icon: '👤', label: lang === 'ar' ? 'صفحتي' : 'Profile' },
{ id: 'notif', icon: '🔔', label: lang === 'ar' ? 'تنبيهات' : 'Alerts' },
{ id: 'settings', icon: '⚙️', label: lang === 'ar' ? 'إعدادات' : 'Settings' }
];

// ترتيب الأزرار: في الإنجليزية (Home على اليسار)، في العربية (الرئيسية على اليمين)
// نستخدم CSS Flexbox للتحكم في الاتجاه
if (lang === 'en') {
nav.style.flexDirection = 'row';
} else {
nav.style.flexDirection = 'row-reverse';
}

nav.innerHTML = buttons.map(b => `
<div class="nav-btn" id="nav-${b.id}" onclick="switchPage('${b.id}')">
<span class="nav-icon">${b.icon}</span>
<small class="nav-label">${b.label}</small>
</div>
`).join('');
// تمييز الزر الحالي (الرئيسية افتراضياً)
setActiveNav('home');
}

/**
* التبديل بين الصفحات عند الضغط على الأزرار السفلية
*/
function switchPage(pageId) {
setActiveNav(pageId);

// استدعاء الدوال من الملفات الأخرى (home.js, profile.js, etc.)
if (pageId === 'home') showHome();
if (pageId === 'profile') showProfile();
if (pageId === 'notif') showNotifications();
if (pageId === 'settings') showSettings();
// التمرير لأعلى الصفحة عند التبديل
window.scrollTo(0, 0);
}

/**
* تغيير لون الزر النشط في الشريط السفلي
*/
function setActiveNav(pageId) {
document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
const activeBtn = document.getElementById(`nav-${pageId}`);
if (activeBtn) activeBtn.classList.add('active');
}

