# ✨🔒 APP-FINANCAS-PESSOAIS v1.2.0

**Released:** March 9, 2026  
**Type:** Feature Release + Security Update  
**Deploy:** https://financas-pessoais-two.vercel.app

---

## 🎉 Major Update: Animations + Security + Fixes!

This is our biggest update yet! Beautiful animations, critical security improvements, and important bug fixes all in one release.

---

## ✨ New: Smooth Animations

**Dashboard Cards:**
- 🎭 Graceful fade-in on load
- 📈 Hover: scale 1.05x + lift 5px
- ⚡ Spring transitions (smooth!)
- 🎯 Sequential stagger effect

**Navigation:**
- 🖱️ Hover effects on tabs
- 👆 Tap feedback
- 60fps GPU-accelerated

---

## 🔒 Security: Complete Overhaul

**CRITICAL FIX:**
- 🚨 Firebase API key was exposed on GitHub
- ✅ Moved to environment variables (.env)
- ✅ New Firebase project (clean slate)
- ✅ Old project deleted
- 🛡️ Industry-standard security now!

---

## 🐛 Fixes: Cloud Sync Works!

**Fixed:**
- ✅ Upload error: n.indexOf (IDs → strings)
- ✅ Google Auth: "invalid action"  
- ✅ Firebase imports
- ✅ All 6 collections sync perfectly

---

## 📥 How to Update

**Users:** Refresh browser (Ctrl+F5)  
**Note:** Re-login with Google (one-time, due to security)

**Developers:**
```bash
git pull
npm install
# Configure .env (see .env.example)
npm run dev
```

---

## 📊 Technical

```javascript
// Animation
<motion.div whileHover={{ scale: 1.05, y: -5 }}>

// Security  
apiKey: import.meta.env.VITE_FIREBASE_API_KEY

// Fix
doc(db, 'collection', String(id))  // Was: id
```

**Bundle:** +15KB gzipped  
**Performance:** 60fps maintained  
**Security:** 3 critical issues fixed

---

## 🔗 Links

- **App:** https://financas-pessoais-two.vercel.app
- **Docs:** [CHANGELOG.md](CHANGELOG.md)
- **Security:** [SECURITY-FIX.md](SECURITY-FIX.md)

---

**Full Changelog:** [`v1.1.1...v1.2.0`](https://github.com/afrikasa/financas-pessoais/compare/v1.1.1...v1.2.0)

⭐ Star • 💬 Discuss • 🐛 Report • 🔒 Security

**Made with ❤️ ✨ 🔒 by Marcus Costa**
