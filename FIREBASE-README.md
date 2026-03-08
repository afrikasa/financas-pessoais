# ☁️ FIREBASE CLOUD SYNC

## 🎯 O QUE É?

Sincronização automática dos teus dados financeiros entre todos os dispositivos usando Firebase Cloud.

---

## ✨ FUNCIONALIDADES:

### **✅ Backup Automático**
Todos os dados salvos na cloud Google Firebase.

### **✅ Sincronização Tempo Real**
Mudanças sincronizam instantaneamente entre devices.

### **✅ Multi-Device**
Acede aos mesmos dados no PC, telemóvel, tablet.

### **✅ Offline First**
Continua a usar offline, sincroniza quando voltar online.

### **✅ Autenticação Segura**
Login com conta Google - dados protegidos.

---

## 📋 SETUP RÁPIDO:

### **Passo 1: Firebase Console**
```
1. Vai a: https://console.firebase.google.com
2. Cria projeto: "financas-pessoais"
3. Ativa Firestore Database
4. Ativa Authentication (Google)
5. Copia credenciais
```

### **Passo 2: Configurar App**
```
1. Abre: src/firebase.js
2. Cola tuas credenciais Firebase
3. Salva
```

### **Passo 3: Instalar**
```bash
npm install
npm run dev
```

### **Passo 4: Login**
```
1. Clica ícone ☁️ (canto superior direito)
2. "Entrar com Google"
3. Autoriza
4. Pronto!
```

---

## 🔧 COMO USAR:

### **Primeiro Login:**
```
1. Clica ☁️
2. "Entrar com Google"
3. Autoriza acesso
4. "Enviar para Cloud" (primeira vez)
5. Dados na cloud! ✅
```

### **Noutro Dispositivo:**
```
1. Abre app
2. Clica ☁️
3. "Entrar com Google" (mesma conta)
4. "Receber da Cloud"
5. Dados sincronizados! ✅
```

### **Uso Normal:**
```
Dados sincronizam automaticamente!
Só precisas fazer login 1x por device.
```

---

## 📱 WORKFLOW TÍPICO:

### **PC (Casa):**
```
1. Login Google
2. Adiciona despesas
3. Fecha app
→ Dados na cloud ✅
```

### **Telemóvel (Rua):**
```
1. Login Google
2. Vê mesmas despesas!
3. Adiciona nova despesa
→ Sincroniza com PC ✅
```

### **Tablet:**
```
1. Login Google
2. Vê tudo atualizado!
```

---

## 🔒 SEGURANÇA:

### **Firestore Rules:**
```javascript
// Cada user só vê seus dados
allow read, write: if request.auth.uid == userId;
```

### **O que significa:**
- ✅ Dados encriptados em trânsito (HTTPS)
- ✅ Só tu vês teus dados
- ✅ Ninguém mais tem acesso
- ✅ Autenticação obrigatória

---

## 💾 ESTRUTURA FIRESTORE:

```
users/
  └── {userId}/
      ├── transactions/
      │   ├── transaction_1
      │   ├── transaction_2
      │   └── ...
      ├── accounts/
      │   └── ...
      ├── categories/
      │   └── ...
      ├── loans/
      │   └── ...
      ├── investments/
      │   └── ...
      └── recurring/
          └── ...
```

Cada user tem sua pasta separada! 🔒

---

## 📊 LIMITES GRÁTIS:

Firebase Free Tier (Spark Plan):

| Recurso | Limite |
|---------|--------|
| **Storage** | 1 GB |
| **Reads** | 50,000/dia |
| **Writes** | 20,000/dia |
| **Deletes** | 20,000/dia |

**Para uso pessoal:** INFINITO! ✅

Exemplo:
- 100 transações/mês = 100 writes
- Ver dashboard 50x/dia = 500 reads
- **Muito abaixo do limite!**

---

## 🎯 FUNCIONALIDADES:

### **Enviar para Cloud:**
Upload manual de todos os dados locais.

**Quando usar:**
- Primeiro login
- Mudaste muita coisa offline
- Backup manual

### **Receber da Cloud:**
Download de todos os dados da cloud.

**Quando usar:**
- Novo device
- Restaurar dados
- Sincronizar manualmente

### **Automático:**
Depois do primeiro sync, tudo automático! ✨

---

## 💡 DICAS:

### **✅ Primeiro Device (PC):**
```
1. Login
2. "Enviar para Cloud"
3. Confirma que apareceu no Firestore Console
```

### **✅ Segundo Device (Telemóvel):**
```
1. Login (mesma conta Google!)
2. "Receber da Cloud"
3. Vê tudo igual ao PC!
```

### **✅ Uso Normal:**
Adiciona/edita normalmente, sincroniza automático!

---

## 🐛 TROUBLESHOOTING:

### **"Missing or insufficient permissions"**
```
→ Firestore rules não configuradas
→ Vai a FIREBASE-SETUP.md passo 3
```

### **"User not authenticated"**
```
→ Faz login primeiro (ícone ☁️)
```

### **Dados não sincronizam**
```
→ Verifica internet
→ Logout e login novamente
→ Verifica Firebase Console
```

### **"Firebase: Error (auth/popup-blocked)"**
```
→ Permite popups no browser
→ Ou usa modo incógnito
```

---

## 📚 ARQUITETURA:

### **Componentes:**

**src/firebase.js**
- Configuração Firebase
- Inicialização

**src/services/firebaseSync.js**
- CRUD operations
- Real-time listeners

**src/hooks/useFirebaseSync.js**
- React hook
- State management

**src/components/FirebaseSyncPanel.jsx**
- UI do sync panel
- Botões login/upload/download

---

## 🔄 FLUXO DE DADOS:

```
User Action
    ↓
App.jsx (useState)
    ↓
firebaseSync.saveX()
    ↓
Firestore Database
    ↓
onSnapshot listener
    ↓
Outros devices atualizados! ✨
```

---

## 🚀 PRÓXIMAS FEATURES:

Planeado para v1.2.0:
- [ ] Sync automático em background
- [ ] Conflict resolution avançado
- [ ] Offline queue
- [ ] Sync status indicator detalhado

---

## 📖 DOCUMENTAÇÃO:

- **Setup:** FIREBASE-SETUP.md
- **Firebase Docs:** https://firebase.google.com/docs
- **Firestore:** https://firebase.google.com/docs/firestore

---

**☁️ BEM-VINDO À CLOUD!**

Nunca mais percas os teus dados! 🎉
