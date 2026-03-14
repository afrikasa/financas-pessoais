# 🔥 FIREBASE SETUP - GUIA PASSO A PASSO

## 🎯 O QUE VAS FAZER:

1. Criar projeto Firebase (grátis)
2. Configurar Firestore Database
3. Ativar autenticação Google
4. Copiar credenciais para a app
5. Configurar regras de segurança

**Tempo:** ~15 minutos

---

## 📋 PASSO 1: CRIAR PROJETO FIREBASE

### **1.1 Vai ao Firebase Console:**
```
https://console.firebase.google.com
```

### **1.2 Cria novo projeto:**
- Clica "Add project" ou "Adicionar projeto"
- Nome: `financas-pessoais` (ou outro nome)
- Clica "Continue"

### **1.3 Google Analytics (opcional):**
- Podes desativar para simplicidade
- Ou ativa se quiseres analytics
- Clica "Create project"

### **1.4 Aguarda...**
- Leva 30-60 segundos
- Quando terminar, clica "Continue"

---

## 📋 PASSO 2: ATIVAR FIRESTORE DATABASE

### **2.1 No Firebase Console:**
- Menu lateral → "Firestore Database"
- Clica "Create database"

### **2.2 Escolhe modo:**
- **Production mode** ✅ (mais seguro)
- Clica "Next"

### **2.3 Localização:**
- Escolhe: `europe-west1` (Bélgica)
- Ou outra localização europeia
- Clica "Enable"

### **2.4 Aguarda...**
- Leva 1-2 minutos
- Database criada! ✅

---

## 📋 PASSO 3: CONFIGURAR REGRAS FIRESTORE

### **3.1 No Firestore:**
- Tab "Rules" (no topo)

### **3.2 Cola estas regras:**

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - only authenticated users
    match /users/{userId} {
      // User can only read/write their own data
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Subcollections (transactions, accounts, etc.)
      match /{collection}/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### **3.3 Publica:**
- Clica "Publish"
- Regras ativas! ✅

---

## 📋 PASSO 4: ATIVAR AUTENTICAÇÃO GOOGLE

### **4.1 No Firebase Console:**
- Menu lateral → "Authentication"
- Clica "Get started"

### **4.2 Ativa Google:**
- Tab "Sign-in method"
- Clica "Google"
- Toggle: **Enable** ✅
- Project support email: escolhe teu email
- Clica "Save"

---

## 📋 PASSO 5: OBTER CREDENCIAIS

### **5.1 Adiciona Web App:**
- No overview (ícone casa)
- Clica no ícone `</>`(Web)
- App nickname: `financas-web`
- ❌ NÃO marques "Firebase Hosting"
- Clica "Register app"

### **5.2 COPIA as credenciais:**

Vais ver algo assim:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "financas-pessoais-xxxxx.firebaseapp.com",
  projectId: "financas-pessoais-xxxxx",
  storageBucket: "financas-pessoais-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

**COPIA TUDO!** 📋

### **5.3 Clica "Continue to console"**

---

## 📋 PASSO 6: CONFIGURAR APP

### **6.1 Abre:**
```
src/firebase.js
```

### **6.2 Substitui:**

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           // ← Cola aqui
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**Por:**

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXX",        // ← Tuas credenciais
  authDomain: "financas-xxxxx.firebaseapp.com",
  projectId: "financas-xxxxx",
  storageBucket: "financas-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};
```

### **6.3 Salva o ficheiro!**

---

## 📋 PASSO 7: INSTALAR & TESTAR

### **7.1 Instala Firebase:**
```bash
npm install
```

### **7.2 Inicia app:**
```bash
npm run dev
```

### **7.3 Testa:**
- Abre app no browser
- Procura ícone ☁️ (canto superior direito)
- Clica nele
- Clica "Entrar com Google"
- Faz login!

### **7.4 Verifica Firestore:**
- Volta ao Firebase Console
- Firestore Database
- Deve aparecer collection `users` com teu UID!

---

## ✅ CHECKLIST FINAL:

- [ ] Projeto Firebase criado
- [ ] Firestore Database ativado
- [ ] Regras de segurança configuradas
- [ ] Autenticação Google ativada
- [ ] Credenciais copiadas para `src/firebase.js`
- [ ] `npm install` executado
- [ ] App testada com login Google

---

## 🎉 PRONTO!

Agora tens:
- ✅ Cloud backup automático
- ✅ Sincronização tempo real
- ✅ Autenticação Google
- ✅ Dados seguros (regras Firestore)

---

## 🔒 SEGURANÇA:

### **Firestore Rules explicadas:**

```javascript
// Só users autenticados
allow read, write: if request.auth != null 
                   && request.auth.uid == userId;
```

**Significa:**
- ✅ Cada user só vê os seus dados
- ❌ Ninguém vê dados de outros users
- ❌ Sem login = sem acesso

---

## 💡 TROUBLESHOOTING:

### **"Firebase: Error (auth/popup-blocked)"**
→ Browser bloqueou popup. Permite popups para localhost.

### **"Missing or insufficient permissions"**
→ Regras Firestore não publicadas. Vai a Rules → Publish.

### **"Firebase: Error (auth/unauthorized-domain)"**
→ Adiciona domínio em: Authentication → Settings → Authorized domains

### **App não conecta:**
→ Verifica `src/firebase.js` - credenciais corretas?

---

## 📊 FIREBASE FREE TIER:

| Recurso | Limite Grátis |
|---------|---------------|
| **Firestore** | 1 GB storage |
| **Leituras** | 50k/dia |
| **Escritas** | 20k/dia |
| **Deletes** | 20k/dia |
| **Autenticação** | Ilimitado |

**Mais que suficiente para uso pessoal!** ✅

---

## 🔥 PRÓXIMOS PASSOS:

Depois de setup:
1. ✅ Testa login
2. ✅ Testa "Enviar para Cloud"
3. ✅ Abre noutro dispositivo
4. ✅ Testa "Receber da Cloud"
5. ✅ Adiciona transação num device
6. ✅ Vê aparecer no outro! 🎉

---

**🎉 BEM-VINDO À CLOUD!**

Qualquer dúvida, consulta: https://firebase.google.com/docs
