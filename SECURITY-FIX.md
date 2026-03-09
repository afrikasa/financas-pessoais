# 🚨 SECURITY FIX - FIREBASE API KEY EXPOSTA

## ⚠️ PROBLEMA CRÍTICO IDENTIFICADO:

```
❌ Firebase API Key foi exposta no GitHub
❌ Ficheiro: src/firebase.js (commit público)
❌ Chave: AIzaSyDom7WdUx2-5wMTu5T1UoBJ1wvWJwsRZM4
❌ Risco: Qualquer pessoa pode usar teus recursos Firebase
```

**Histórico Git mantém a chave mesmo depois de apagar!**

---

## 🔥 AÇÃO IMEDIATA (AGORA - 10 MINUTOS):

### **PASSO 1: REVOGAR CHAVE ANTIGA** ⚡ URGENTE

**1. Vai à Firebase Console:**
```
https://console.firebase.google.com
```

**2. Seleciona teu projeto:**
```
financas-pessoais-f3413
```

**3. Project Settings:**
```
Click no ícone ⚙️ (engrenagem) ao lado de "Project Overview"
```

**4. Restrições da API Key (proteção temporária):**
```
Scroll down → "Your apps" → Web app
Cloud Messaging → API restrictions
```

**Adiciona restrições IMEDIATAS:**
```
☑️ HTTP referrers (websites)
   - https://financas-pessoais-two.vercel.app/*
   - http://localhost:3000/*

☑️ Application restrictions
   - Website restrictions
```

**Isto protege parcialmente até criares nova chave!**

---

### **PASSO 2: CRIAR NOVA API KEY** 🔑

**Opção A: Regenerar Web App**

**1. Firebase Console → Project Settings**

**2. Scroll → "Your apps" → Web app**

**3. Clica "Delete app"** (⚠️ isto remove a app web antiga)

**4. Clica "Add app" → `</>` Web**

**5. Regista nova app:**
```
App nickname: financas-web-secure
☐ Firebase Hosting (não marques)
[Register app]
```

**6. COPIA AS NOVAS CREDENCIAIS:**
```javascript
const firebaseConfig = {
  apiKey: "NOVA_KEY_AQUI",  ← COPIA
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

---

**Opção B: Criar Nova API Key no Google Cloud**

**1. Vai a:**
```
https://console.cloud.google.com/apis/credentials
```

**2. Seleciona projeto:**
```
financas-pessoais-f3413
```

**3. CREATE CREDENTIALS → API Key**

**4. RESTRINGIR IMEDIATAMENTE:**
```
Set an application restriction:
  ○ HTTP referrers (websites)
  
Website restrictions:
  Add item:
    https://financas-pessoais-two.vercel.app/*
    http://localhost:3000/*
    
API restrictions:
  Restrict key:
    ✓ Identity Toolkit API
    ✓ Cloud Firestore API
```

**5. COPIA A NOVA KEY**

---

### **PASSO 3: ATUALIZAR .env COM NOVA KEY** 📝

**1. Abre ficheiro `.env` no projeto**

**2. Substitui credenciais:**
```env
# ANTES (ANTIGA - EXPOSTA):
VITE_FIREBASE_API_KEY=AIzaSyDom7WdUx2-5wMTu5T1UoBJ1wvWJwsRZM4

# DEPOIS (NOVA - SEGURA):
VITE_FIREBASE_API_KEY=tua_nova_key_aqui
```

**3. Atualiza TODAS as variáveis:**
```env
VITE_FIREBASE_API_KEY=nova_api_key
VITE_FIREBASE_AUTH_DOMAIN=financas-pessoais-f3413.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=financas-pessoais-f3413
VITE_FIREBASE_STORAGE_BUCKET=financas-pessoais-f3413.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=novo_sender_id
VITE_FIREBASE_APP_ID=novo_app_id
```

**4. SALVA `.env`**

---

### **PASSO 4: TESTAR LOCALMENTE** 🧪

```bash
# 1. Para servidor se estiver rodando
Ctrl+C

# 2. Reinicia
npm run dev

# 3. Abre
http://localhost:3000

# 4. Testa Firebase
Clica ☁️ → "Entrar com Google"

# 5. Verifica console
F12 → Console
✅ Sem erros "Firebase configuration missing"
✅ Login funciona
```

---

### **PASSO 5: APAGAR CHAVE ANTIGA** 🗑️

**Agora que tens nova chave funcionando:**

**1. Firebase Console → Project Settings**

**2. Cloud Messaging**

**3. Procura a chave antiga:**
```
AIzaSyDom7WdUx2-5wMTu5T1UoBJ1wvWJwsRZM4
```

**4. DELETE / DISABLE**

**OU no Google Cloud Console:**
```
https://console.cloud.google.com/apis/credentials
→ Encontra chave antiga
→ DELETE
```

---

## 🔐 PROTEGER VERCEL DEPLOY:

### **Adicionar variáveis ambiente no Vercel:**

**1. Vai a:**
```
https://vercel.com/afrikasa/financas-pessoais
```

**2. Settings → Environment Variables**

**3. Adiciona CADA variável:**
```
Name: VITE_FIREBASE_API_KEY
Value: tua_nova_api_key
Environment: Production, Preview, Development
[Save]

Name: VITE_FIREBASE_AUTH_DOMAIN
Value: financas-pessoais-f3413.firebaseapp.com
[Save]

[... repete para todas ...]
```

**4. Redeploy:**
```
Deployments → Latest → ... (menu) → Redeploy
```

---

## 🧹 LIMPAR HISTÓRICO GIT (AVANÇADO):

**⚠️ OPCIONAL mas RECOMENDADO**

A chave antiga ainda está no histórico Git. Para remover:

### **Opção A: BFG Repo-Cleaner** (MAIS FÁCIL)

**1. Download BFG:**
```
https://rtyley.github.io/bfg-repo-cleaner/
```

**2. Cria ficheiro `secrets.txt`:**
```
AIzaSyDom7WdUx2-5wMTu5T1UoBJ1wvWJwsRZM4
```

**3. Roda BFG:**
```bash
java -jar bfg.jar --replace-text secrets.txt financas-pessoais/
cd financas-pessoais
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

---

### **Opção B: git filter-repo**

**1. Instala:**
```bash
pip install git-filter-repo
```

**2. Backup:**
```bash
git clone financas-pessoais financas-pessoais-backup
```

**3. Filtra:**
```bash
cd financas-pessoais
git filter-repo --invert-paths --path src/firebase.js --force
```

**4. Re-adiciona firebase.js seguro:**
```bash
git add src/firebase.js
git commit -m "Add secure Firebase config with env variables"
git push --force
```

---

## ✅ VERIFICAÇÃO FINAL:

### **Checklist de Segurança:**

```
✅ Nova API Key criada
✅ Nova key tem restrições (HTTP referrers)
✅ .env atualizado com nova key
✅ .env está no .gitignore
✅ firebase.js usa import.meta.env
✅ Testado local (funciona)
✅ Vercel env variables configuradas
✅ Vercel redeploy feito
✅ Chave antiga APAGADA/DISABLED
✅ (Opcional) Git history limpo
```

---

## 🎯 CONFIGURAÇÃO SEGURA FINAL:

### **.gitignore** (verificar):
```
.env
.env.local
.env.production
```

### **firebase.js** (verificar):
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  // ✅ Correto
  // NOT: apiKey: "hardcoded_key"  // ❌ NUNCA!
```

### **.env** (local only):
```env
VITE_FIREBASE_API_KEY=sua_chave_aqui
# NUNCA commit este ficheiro!
```

### **.env.example** (pode commitar):
```env
VITE_FIREBASE_API_KEY=your_api_key_here
# Template público, sem segredos
```

---

## 🚀 DEPLOY SEGURO:

Depois de tudo configurado:

```bash
# 1. Verifica que .env NÃO vai para commit
git status
# .env não deve aparecer!

# 2. Commit da correção
git add .
git commit -m "security: Move Firebase config to environment variables"
git push

# 3. Vercel faz deploy
# (usa env variables do Vercel dashboard)

# 4. Testa produção
https://financas-pessoais-two.vercel.app
```

---

## 📚 BOAS PRÁTICAS FUTURAS:

### **SEMPRE:**
```
✅ Usa variáveis ambiente para secrets
✅ .env no .gitignore
✅ .env.example como template
✅ Restringe API keys (domains/IPs)
✅ Revisa commits antes de push
✅ Usa GitHub secret scanning
```

### **NUNCA:**
```
❌ Hardcode API keys no código
❌ Commit .env para Git
❌ Partilha keys em chat/email
❌ Usa keys sem restrições
❌ Ignora alertas GitHub
```

---

## 🆘 SE TIVERES PROBLEMAS:

### **Firebase não conecta após mudança:**
```
1. Verifica .env tem TODAS as variáveis
2. Reinicia dev server (npm run dev)
3. Limpa cache browser (Ctrl+Shift+Delete)
4. Verifica console (F12) para erros
```

### **Vercel deploy falha:**
```
1. Verifica env variables no Vercel
2. Todas as 6 variáveis configuradas?
3. Redeploy forçado
4. Check build logs
```

### **Ainda vê key antiga em GitHub:**
```
1. É do histórico Git (normal)
2. Key antiga já foi revogada (seguro)
3. Opcional: limpa histórico (BFG/filter-repo)
```

---

## ⏱️ TIMELINE:

```
00:00 - Restringe key antiga (proteção temporária)
00:02 - Cria nova key
00:04 - Atualiza .env local
00:05 - Testa local
00:07 - Configura Vercel env vars
00:09 - Apaga key antiga
00:10 - ✅ SEGURO!
```

---

## 📞 RECURSOS:

- **Firebase Security:** https://firebase.google.com/docs/projects/api-keys
- **Vite Env Variables:** https://vitejs.dev/guide/env-and-mode.html
- **Vercel Env:** https://vercel.com/docs/environment-variables
- **BFG Repo-Cleaner:** https://rtyley.github.io/bfg-repo-cleaner/

---

**🔒 SEGURANÇA PRIMEIRO!**

**FAZ ISTO AGORA - NÃO DEMORA!** ⚡

10 minutos para segurança total! 🛡️
