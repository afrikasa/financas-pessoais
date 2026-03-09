# 🚀 DEPLOY v1.2.0 - GUIA COMPLETO

## 📋 VERSÃO: v1.2.0

**Conteúdo:**
- ✨ Animações Framer Motion
- 🔒 Security fixes (Firebase .env)
- 🐛 Upload fixes (IDs → strings)

---

## ⚠️ IMPORTANTE - FIREBASE MUDOU!

**Novo projeto:** `financas-app-2026`  
**Antigo projeto:** `financas-pessoais-f3413` (APAGADO)

**Users precisarão fazer re-login!** (uma vez apenas)

---

## 📝 PRÉ-REQUISITOS:

```
✅ Novo Firebase project configurado
✅ .env com novas credenciais
✅ Código testado local
✅ Animações funcionando
✅ Cloud sync funcionando
```

---

## 🚀 DEPLOY AUTOMÁTICO (5 MIN):

### **PASSO 1: Verifica .env local**

```env
VITE_FIREBASE_API_KEY=AIza[nova_key]
VITE_FIREBASE_AUTH_DOMAIN=financas-app-2026.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=financas-app-2026
VITE_FIREBASE_STORAGE_BUCKET=financas-app-2026.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=[novo_id]
VITE_FIREBASE_APP_ID=[novo_id]
```

✅ Tem TODAS as variáveis?

---

### **PASSO 2: Testa local (última vez)**

```bash
npm run dev
http://localhost:3000

Testa:
✅ Animações (cards hover)
✅ Login Google
✅ Upload cloud
✅ Download cloud
```

---

### **PASSO 3: Deploy automático**

```bash
FULL-RELEASE.bat
```

**Inputs:**
```
Versão: 1.2.0
Tipo: 2 (MINOR)
Título: Animations + Security + Cloud Sync Fixes
Confirma: S
```

**Script faz:**
```
✅ Git add .
✅ Git commit
✅ Git push
✅ Git tag v1.2.0
✅ GitHub Release
✅ Abre browser
```

---

### **PASSO 4: Configurar Vercel Environment Variables**

**CRÍTICO:** Vercel precisa das NOVAS variáveis!

**1. Vai a:**
```
https://vercel.com/afrikasa/financas-pessoais
→ Settings
→ Environment Variables
```

**2. APAGA variáveis antigas** (se existirem)

**3. ADICIONA novas (uma por uma):**

```
Name: VITE_FIREBASE_API_KEY
Value: [cola_nova_key_aqui]
Environments: Production, Preview, Development
[Save]

Name: VITE_FIREBASE_AUTH_DOMAIN  
Value: financas-app-2026.firebaseapp.com
Environments: Production, Preview, Development
[Save]

Name: VITE_FIREBASE_PROJECT_ID
Value: financas-app-2026
Environments: Production, Preview, Development
[Save]

Name: VITE_FIREBASE_STORAGE_BUCKET
Value: financas-app-2026.firebasestorage.app
Environments: Production, Preview, Development
[Save]

Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: [novo_id]
Environments: Production, Preview, Development
[Save]

Name: VITE_FIREBASE_APP_ID
Value: [novo_id]
Environments: Production, Preview, Development
[Save]
```

---

### **PASSO 5: Aguardar Vercel Deploy**

**Vercel detecta push automático!**

```
GitHub push → Vercel webhook
→ Build inicia
→ 2-3 minutos
→ Deploy production
→ ✅ LIVE!
```

**Acompanha:**
```
https://vercel.com/afrikasa/financas-pessoais
→ Deployments
→ Vê progresso
```

---

### **PASSO 6: Testar Produção**

**Quando deploy completar:**

```
https://financas-pessoais-two.vercel.app
```

**Testa:**
1. ✅ Animações (cards fade-in)
2. ✅ Hover effects funcionam
3. ✅ Login Google
4. ✅ Upload cloud
5. ✅ Download cloud
6. ✅ Console sem erros (F12)
7. ✅ Mobile responsivo

---

### **PASSO 7: Verificar Firebase**

**Firebase Console:**

**1. Authentication → Users**
```
Deve ver users que fizerem login
```

**2. Firestore Database → Data**
```
users/
  └── [user_id]/
      ├── transactions/ ✅
      ├── accounts/ ✅
      └── ...
```

---

## 📊 CHECKLIST COMPLETO:

```
PRÉ-DEPLOY:
✅ .env configurado
✅ Testado local
✅ Firebase novo projeto
✅ Código commitado

DEPLOY:
✅ FULL-RELEASE.bat executado
✅ Git push completo
✅ Tag v1.2.0 criada
✅ GitHub Release publicada

VERCEL:
✅ Environment variables configuradas
✅ Deploy automático completado
✅ Production URL atualizada

TESTES:
✅ Animações funcionam
✅ Firebase sync ok
✅ Google auth ok
✅ Mobile responsivo
✅ Console limpo
```

---

## ⚠️ AVISOS IMPORTANTES:

### **1. Users precisarão re-login:**
```
Motivo: Novo Firebase project
Ação: "Entrar com Google" novamente
Frequência: UMA VEZ apenas
```

### **2. Dados locais mantidos:**
```
✅ LocalStorage intacto
✅ Dados não são perdidos
✅ Só precisam re-sync
```

### **3. Vercel env vars CRÍTICOS:**
```
❌ Sem env vars = Firebase não funciona
✅ Todas as 6 variáveis necessárias
⏱️ Redeploy se esquecer alguma
```

---

## 🔄 SE ALGO FALHAR:

### **Build Error no Vercel:**
```
1. Check build logs
2. Verifica env variables
3. Testa local: npm run build
4. Fix + commit + push
```

### **Firebase não conecta:**
```
1. Vercel env vars corretas?
2. Firebase project ativo?
3. Authorized domains ok?
4. Check console (F12)
```

### **Animações não aparecem:**
```
1. Framer Motion instalado?
2. npm install no Vercel?
3. Cache browser limpo?
```

---

## 🎯 TIMELINE ESTIMADO:

```
00:00 - Testa local (5 min)
00:05 - FULL-RELEASE.bat (2 min)
00:07 - Configura Vercel env (3 min)
00:10 - Aguarda deploy (2-3 min)
00:13 - Testa produção (2 min)
00:15 - ✅ COMPLETO!
```

**Total: ~15 minutos**

---

## 📱 PÓS-DEPLOY:

### **1. Anuncia (opcional):**
```
Twitter/LinkedIn:
"🎉 v1.2.0 está live!
✨ Animações suaves
🔒 Security updates
🐛 Bug fixes

Try it: https://financas-pessoais-two.vercel.app"
```

### **2. Monitora:**
```
- Vercel Analytics
- Firebase Usage
- User feedback
- Console errors
```

### **3. Documenta:**
```
✅ Release notes publicadas
✅ Changelog atualizado
✅ GitHub release criada
```

---

## 🆘 SUPORTE:

**Problemas?**
- Check deployment logs
- Verifica env variables
- Testa local primeiro
- Reverte se crítico: `git revert HEAD`

---

**🎉 BOA SORTE COM O DEPLOY!**

Vai correr tudo bem! 🚀
