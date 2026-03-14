# 🚀 GUIA DE DEPLOY - VERCEL

## 🎯 RESULTADO FINAL:

Tua app online 24/7 com URL tipo:
```
https://financas-pessoais.vercel.app
```

- ✅ Grátis
- ✅ HTTPS automático
- ✅ Deploy em 5 minutos
- ✅ Atualizações instantâneas

---

## 📋 MÉTODO 1: VERCEL CLI (RECOMENDADO) ⭐

### **Passo 1: Instalar Vercel CLI**

```bash
npm install -g vercel
```

Aguarda 1-2 minutos...

### **Passo 2: Login Vercel**

```bash
vercel login
```

Escolhe uma opção:
- **GitHub** (recomendado)
- **Email**
- **GitLab**

Confirma no email/browser!

### **Passo 3: Deploy Automático**

```bash
DEPLOY.bat
```

OU manualmente:

```bash
npm run build
vercel deploy --prod
```

### **Passo 4: Responde perguntas:**

```
? Set up and deploy? [Y/n] 
→ Y

? Which scope? 
→ Escolhe teu username

? Link to existing project? [y/N]
→ N

? What's your project's name? 
→ financas-pessoais

? In which directory is your code located?
→ ./

? Want to override the settings? [y/N]
→ N
```

### **Passo 5: AGUARDA...**

```
Building...
Uploading...
Deploying...
✅ Production: https://financas-pessoais-xxx.vercel.app
```

### **Passo 6: COPIA URL!**

```
https://financas-pessoais-xxx.vercel.app
```

**PRONTO!** App está ONLINE! 🎉

---

## 📋 MÉTODO 2: VERCEL WEBSITE (SEM CLI)

### **Passo 1: Build Local**

```bash
BUILD.bat
```

Cria pasta `dist/` com tudo!

### **Passo 2: Vercel.com**

1. Vai a: https://vercel.com
2. **Sign Up** (grátis)
   - Usa GitHub (recomendado)
3. **New Project**
4. **Import Git Repository** OU
5. **Deploy from local folder**

### **Passo 3A: Com GitHub** ⭐

```
1. Cria repo no GitHub
2. Push teu código
3. Vercel → Import → Escolhe repo
4. Framework: Vite
5. Deploy!
```

### **Passo 3B: Upload Manual**

```
1. Vercel → New Project
2. Upload folder "dist/"
3. Framework: Other
4. Deploy!
```

### **Passo 4: URL Pronta!**

```
https://financas-pessoais.vercel.app
```

---

## 🔧 CONFIGURAÇÃO AUTOMÁTICA:

Vercel deteta Vite automaticamente!

Mas se pedir, config é:

```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

---

## 📱 TESTAR NO TELEMÓVEL:

### **1. Abre URL no telemóvel:**
```
https://tua-app.vercel.app
```

### **2. Instala PWA:**
```
Android: Menu → Adicionar ao ecrã inicial
iPhone: Partilhar → Adicionar ao ecrã inicial
```

### **3. FUNCIONA!**
- ✅ Sem PC ligado
- ✅ Sem ngrok
- ✅ 24/7 online
- ✅ Grátis forever!

---

## 🔄 ATUALIZAR APP:

### **Com CLI:**
```bash
1. Faz mudanças no código
2. DEPLOY.bat
3. Nova versão online em 1 min!
```

### **Com GitHub:**
```bash
1. git add .
2. git commit -m "update"
3. git push
4. Vercel deploy automático!
```

---

## 🎨 CUSTOMIZAR URL:

### **URL Grátis:**
```
https://financas-pessoais-abc123.vercel.app
```

### **Domínio Custom (Opcional):**
```
Compra domínio: financas.com
Adiciona no Vercel: Settings → Domains
```

---

## 📊 VERCEL FREE PLAN:

| Feature | Limite |
|---------|--------|
| **Banda** | 100 GB/mês |
| **Builds** | Ilimitados |
| **Projetos** | Ilimitados |
| **HTTPS** | ✅ Grátis |
| **Custom Domain** | ✅ Grátis |

**Mais que suficiente para uso pessoal!**

---

## 🐛 TROUBLESHOOTING:

### **Erro: "vercel not found"**
```bash
npm install -g vercel
```

### **Erro no build:**
```bash
# Testa local primeiro:
npm run build

# Se funcionar, tenta deploy novamente
```

### **404 Error:**
```
Vercel → Settings → Output Directory
Confirma: dist
```

### **PWA não funciona:**
```
Vercel suporta PWA 100%!
Confirma:
- manifest.json em public/
- sw.js em public/
- HTTPS ativado (automático)
```

---

## ✨ VANTAGENS VERCEL:

- ✅ Deploy em 1 minuto
- ✅ SSL/HTTPS automático
- ✅ CDN global (rápido worldwide)
- ✅ Preview URLs (testa antes)
- ✅ Analytics grátis
- ✅ Zero configuração
- ✅ Git integration

---

## 🎯 WORKFLOW IDEAL:

```
DESENVOLVIMENTO:
1. Código local
2. npm run dev
3. Testa localhost

DEPLOY:
1. DEPLOY.bat
2. App online em 1 min!
3. Testa no telemóvel
```

---

## 📱 DEPOIS DO DEPLOY:

1. ✅ Desinstala app ngrok antiga
2. ✅ Instala app da Vercel (URL permanente)
3. ✅ Fecha ngrok (não precisa mais!)
4. ✅ Usa app de qualquer lugar!

---

## 🔥 PRÓXIMOS PASSOS:

Depois de deploy:
- Firebase (sincronização cloud)
- Custom domain (teu-nome.com)
- Analytics (ver uso)
- Animações

---

**🎉 BOA SORTE COM O DEPLOY!**

Se tiveres dúvidas, pergunta! 😊
