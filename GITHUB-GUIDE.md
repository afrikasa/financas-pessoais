# 🐙 GUIA GITHUB - PASSO A PASSO

## 🎯 OBJETIVO:

Colocar teu código no GitHub para:
- ✅ Backup do código
- ✅ Versão control
- ✅ Deploy automático Vercel
- ✅ Portfólio público

---

## 📋 REQUISITOS:

1. ✅ Git instalado
2. ✅ Conta GitHub (grátis)
3. ✅ 10 minutos

---

## 🚀 MÉTODO 1: SCRIPTS AUTOMÁTICOS ⭐

### **Passo 1: Setup Git**
```bash
GIT-SETUP.bat
```

Vai pedir:
- Nome (ex: Marcus Costa)
- Email (do GitHub)

### **Passo 2: Criar Repo GitHub**

1. Vai a: https://github.com
2. Login
3. **New repository** (botão verde)
4. **Repository name:** `financas-pessoais`
5. **Description:** `App de gestão financeira pessoal`
6. **Public** ou **Private** (à tua escolha)
7. ❌ **NÃO** marques "Add README"
8. **Create repository**

### **Passo 3: Push para GitHub**
```bash
GITHUB-PUSH.bat
```

Vai pedir:
- URL do repositório (copia do GitHub)
- Exemplo: `https://github.com/teu-username/financas-pessoais.git`

### **Passo 4: PRONTO!** 🎉

Código está no GitHub!

---

## 📋 MÉTODO 2: MANUAL (Linha de Comando)

### **1. Instalar Git**

Se não tens:
```
https://git-scm.com/download/win
```

### **2. Configurar Git**
```bash
git config --global user.name "Teu Nome"
git config --global user.email "teu@email.com"
```

### **3. Inicializar Repo**
```bash
git init
git add .
git commit -m "Initial commit"
```

### **4. Criar Repo GitHub**

GitHub.com → New Repository → `financas-pessoais`

### **5. Conectar e Push**
```bash
git remote add origin https://github.com/teu-username/financas-pessoais.git
git branch -M main
git push -u origin main
```

---

## 🔄 ATUALIZAR DEPOIS:

### **Quando fizeres mudanças:**

```bash
GITHUB-UPDATE.bat
```

OU manual:
```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

---

## 🔗 CONECTAR VERCEL + GITHUB

### **Vantagem:**
Deploy automático quando fazes push!

### **Como fazer:**

**Opção 1: Novo Deploy**
```
1. Vercel.com → New Project
2. Import Git Repository
3. Escolhe: financas-pessoais
4. Deploy!
```

**Opção 2: Conectar Existente**
```
1. Vercel.com → Teu projeto
2. Settings → Git
3. Connect Git Repository
4. Escolhe repo
```

### **Resultado:**
```
git push
  ↓
GitHub atualizado
  ↓
Vercel deploy automático! 🚀
  ↓
App online atualizada em 2 min!
```

---

## 📊 ESTRUTURA GITHUB:

```
financas-pessoais/
├── README.md              ← Descrição (cria depois)
├── src/                   ← Código React
├── public/                ← Assets
├── package.json           ← Dependências
├── vite.config.js         ← Config
├── .gitignore             ← Ficheiros ignorados ✅
└── ...
```

---

## 🔐 AUTENTICAÇÃO:

### **Se pedir password:**

GitHub não aceita password normal!

**Opções:**

**A) Personal Access Token:**
```
1. GitHub → Settings → Developer Settings
2. Personal Access Tokens → Tokens (classic)
3. Generate new token
4. Scope: repo
5. Copia token
6. Usa como password no git push
```

**B) GitHub CLI:**
```
winget install GitHub.cli
gh auth login
```

**C) SSH Keys:**
```
ssh-keygen -t ed25519 -C "teu@email.com"
GitHub → Settings → SSH Keys → Add
```

---

## 📝 CRIAR README.md

Depois de push, cria README no GitHub:

```markdown
# 💰 Finanças Pessoais

App de gestão financeira pessoal com gráficos interativos.

## 🚀 Features

- ✅ Gestão de transações
- ✅ Gráficos Recharts
- ✅ Dark mode
- ✅ Export PDF
- ✅ PWA instalável

## 🔗 Demo

https://financas-pessoais-two.vercel.app

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- Recharts
- jsPDF

## 📱 Install

Clone o repositório e instala dependências:

bash
git clone https://github.com/teu-username/financas-pessoais.git
cd financas-pessoais
npm install
npm run dev


## 📄 License

MIT
```

---

## 🎯 WORKFLOW IDEAL:

```
DESENVOLVIMENTO LOCAL:
1. Código
2. npm run dev
3. Testa

COMMIT:
4. GITHUB-UPDATE.bat
5. Push para GitHub

DEPLOY:
6. Vercel deploy automático!
7. App atualizada online
```

---

## 🐛 TROUBLESHOOTING:

### **"git: command not found"**
```
Instala Git: https://git-scm.com
```

### **"Permission denied"**
```
Usa Personal Access Token como password
```

### **"Repository not found"**
```
Verifica URL do repositório
```

### **"Failed to push"**
```bash
git pull origin main
git push origin main
```

---

## 📊 BRANCHES (Avançado)

Para trabalhar em features sem afetar main:

```bash
# Criar branch
git checkout -b feature/nova-funcionalidade

# Trabalhar...
git add .
git commit -m "Nova feature"

# Push branch
git push origin feature/nova-funcionalidade

# Merge depois no GitHub (Pull Request)
```

---

## ✨ COMANDOS ÚTEIS:

```bash
# Ver status
git status

# Ver histórico
git log --oneline

# Ver diferenças
git diff

# Desfazer mudanças
git checkout -- ficheiro.js

# Voltar commit
git reset --soft HEAD~1

# Ver remotes
git remote -v
```

---

## 🎉 VANTAGENS GITHUB:

- ✅ Backup automático
- ✅ Histórico de mudanças
- ✅ Colaboração (futuro)
- ✅ Issues / Tasks
- ✅ CI/CD (deploy automático)
- ✅ Portfólio público
- ✅ Grátis!

---

## 🔥 PRÓXIMOS PASSOS:

Depois de GitHub:
1. ✅ Conecta Vercel (auto-deploy)
2. ✅ Cria README.md bonito
3. ✅ Adiciona screenshots
4. ✅ Badges (build status, etc)
5. ✅ Contribuições bem-vindas!

---

**🎉 BOA SORTE COM GITHUB!**

Dúvidas? Pergunta! 😊
