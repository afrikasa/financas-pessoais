# ⚡ AÇÃO RÁPIDA - 5 PASSOS URGENTES

## 🚨 FIREBASE KEY EXPOSTA - RESOLVER EM 10 MIN

---

## 📋 FAZER AGORA (ORDEM):

### **1. PROTEGER KEY ANTIGA** (2 min) 🛡️

```
https://console.firebase.google.com
→ Teu projeto (financas-pessoais-f3413)
→ ⚙️ Project Settings
→ Scroll → Cloud Messaging
→ API restrictions
→ Adiciona:
  ✓ https://financas-pessoais-two.vercel.app/*
  ✓ http://localhost:3000/*
→ SAVE
```

**Isto protege até criares nova key!**

---

### **2. CRIAR NOVA KEY** (3 min) 🔑

```
Firebase Console → Project Settings
→ "Your apps" → Web app
→ DELETE app antiga
→ ADD NEW APP → Web </>
→ Nickname: financas-web-secure
→ Register app
→ COPIA TODAS as credenciais
```

---

### **3. ATUALIZAR .ENV** (1 min) 📝

Abre `.env` na raiz do projeto.

Substitui por novas credenciais:

```env
VITE_FIREBASE_API_KEY=NOVA_KEY_AQUI
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Salva!

---

### **4. TESTAR** (2 min) 🧪

```bash
# Para servidor
Ctrl+C

# Reinicia
npm run dev

# Abre
http://localhost:3000

# Testa login
Clica ☁️ → Entrar com Google

# ✅ Funciona? NEXT!
# ❌ Erro? Verifica .env e reinicia
```

---

### **5. APAGAR KEY ANTIGA** (2 min) 🗑️

```
Firebase Console → Project Settings
→ Cloud Messaging
→ Procura key antiga: AIzaSyDom...
→ DELETE ou DISABLE

Ou:

https://console.cloud.google.com/apis/credentials
→ Procura key antiga
→ DELETE
```

---

## ✅ FEITO!

**Demora 10 minutos total.**

**Depois:**
- Configura Vercel env vars (ver SECURITY-FIX.md)
- Deploy
- Testa produção

---

**PARA GUIA COMPLETO:** Ver `SECURITY-FIX.md`

**DÚVIDAS?** Lê passo a passo detalhado!

---

**🔒 FAZ AGORA!** ⚡
