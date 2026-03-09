# 🚨 SECURITY FIX - INSTALAÇÃO URGENTE

## ⚠️ API KEY EXPOSTA NO GITHUB!

**INSTALA ESTE FIX AGORA!**

---

## 📦 FICHEIROS INCLUÍDOS:

```
✅ .env (com tuas credenciais antigas - PRECISAS MUDAR!)
✅ .env.example (template público)
✅ .gitignore (protege .env)
✅ src/firebase.js (usa variáveis ambiente)
✅ SECURITY-FIX.md (guia completo)
✅ QUICK-SECURITY-FIX.md (ação rápida)
```

---

## 🚀 INSTALAR (30 SEGUNDOS):

### **1. Extrai ZIP**

### **2. Arrasta TUDO para:**
```
C:\APP FINANCAS 2\
```

### **3. Substitui ficheiros**
```
Windows pergunta: "Substituir?"
→ SIM PARA TODOS
```

### **4. LÊ OS GUIAS:**
```
QUICK-SECURITY-FIX.md (5 passos, 10 min)
SECURITY-FIX.md (guia completo)
```

---

## ⚡ AÇÃO URGENTE:

**Depois de instalar, IMEDIATAMENTE:**

1. Vai a Firebase Console
2. Restringe key antiga (proteção temporária)
3. Cria nova key
4. Atualiza .env com nova key
5. Apaga key antiga

**Ver:** `QUICK-SECURITY-FIX.md` para passo a passo!

---

## 🔒 O QUE MUDOU:

### **ANTES (INSEGURO):**
```javascript
// firebase.js
const firebaseConfig = {
  apiKey: "AIzaSy...",  // ❌ Hardcoded!
```

### **DEPOIS (SEGURO):**
```javascript
// firebase.js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  // ✅ .env
```

### **.env (NÃO VAI PARA GIT):**
```env
VITE_FIREBASE_API_KEY=tua_key_aqui
```

### **.gitignore:**
```
.env  ✅ Protegido!
```

---

## ✅ DEPOIS DE INSTALAR:

1. Segue `QUICK-SECURITY-FIX.md`
2. Cria nova Firebase key
3. Atualiza .env
4. Testa local
5. Deploy

---

**🔥 URGENTE - FAZ AGORA!**
