# 🔧 SETUP GIT - PRIMEIRA VEZ

## ⚠️ ERRO: "not a git repository"

Isso significa que o projeto ainda não está conectado ao Git/GitHub.

---

## 🚀 SETUP COMPLETO (PRIMEIRA VEZ):

### **OPÇÃO A: Projeto JÁ EXISTE no GitHub** ⭐

Se já tens o repo `financas-pessoais` no GitHub:

```batch
cd C:\APP FINANCAS 2

# 1. Inicializa Git
git init

# 2. Adiciona remote
git remote add origin https://github.com/afrikasa/financas-pessoais.git

# 3. Configura branch
git branch -M main

# 4. Adiciona ficheiros
git add .

# 5. Primeiro commit
git commit -m "v1.8.4: Temas Personalizáveis"

# 6. Cria tag
git tag -a v1.8.4 -m "MINOR: Temas Personalizáveis"

# 7. Push inicial (força)
git push -u origin main --force

# 8. Push tags
git push origin --tags
```

⚠️ **NOTA:** O `--force` é só na PRIMEIRA VEZ!

---

### **OPÇÃO B: Criar NOVO Repo no GitHub**

Se ainda não tens o repo:

**1. Vai para GitHub:**
```
https://github.com/new
```

**2. Cria repo:**
```
Nome: financas-pessoais
Descrição: PWA Gestão Finanças Pessoais
Público/Privado: (escolhe)
NÃO inicializar com README/gitignore/license
```

**3. No terminal:**
```batch
cd C:\APP FINANCAS 2

git init
git add .
git commit -m "v1.8.4: Temas Personalizáveis"
git branch -M main
git remote add origin https://github.com/afrikasa/financas-pessoais.git
git push -u origin main
git tag -a v1.8.4 -m "MINOR: Temas Personalizáveis"
git push origin --tags
```

---

### **OPÇÃO C: Projeto já tem .git mas remote errado**

Se tens `.git` mas remote diferente:

```batch
cd C:\APP FINANCAS 2

# Ver remote atual
git remote -v

# Remover remote antigo
git remote remove origin

# Adicionar correto
git remote add origin https://github.com/afrikasa/financas-pessoais.git

# Push
git push -u origin main
git push origin --tags
```

---

## ✅ DEPOIS DO SETUP:

Após fazer o setup inicial, das próximas vezes podes usar:

```batch
FULL-RELEASE.bat
```

Ou manualmente:
```batch
git add .
git commit -m "mensagem"
git push origin main
```

---

## 🔍 VERIFICAR SE GIT ESTÁ OK:

```batch
cd C:\APP FINANCAS 2

# Deve mostrar "On branch main"
git status

# Deve mostrar o remote do GitHub
git remote -v
```

Se mostrar isso, está OK! ✅

---

## 📝 FICHEIROS GIT IMPORTANTES:

Certifica-te que tens:

### **.gitignore** (criar se não existir):
```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
```

### **.env.example** (já tens):
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## 🎯 QUAL É A TUA SITUAÇÃO?

**Caso 1:** Já tens repo `financas-pessoais` no GitHub
→ Usa OPÇÃO A

**Caso 2:** Repo não existe ainda
→ Usa OPÇÃO B

**Caso 3:** Pasta tem .git mas remote errado
→ Usa OPÇÃO C

---

## ⚡ DEPOIS SETUP FUNCIONA:

```batch
FULL-RELEASE.bat
→ Versão: v1.8.5
→ Type: 3
→ Title: Correção X
→ Confirma: S
→ Deploy automático! ✅
```

---

## 🆘 SE AINDA DER ERRO:

Manda:
```batch
cd C:\APP FINANCAS 2
git status
git remote -v
```

E vemos o que falta!
