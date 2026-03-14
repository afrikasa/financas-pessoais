# 🚀 INSTRUÇÕES DE DEPLOY - v1.8.4

## 📋 O QUE TENS NESTE PACKAGE:

```
✅ Código completo v1.8.4
✅ CHANGELOG.md atualizado
✅ RELEASE-NOTES-v1.8.4.md
✅ FULL-RELEASE.bat (automação)
✅ Todos ficheiros necessários
```

---

## 🚀 DEPLOY PASSO A PASSO:

### **OPÇÃO A: Deploy Automático** ⭐ (RECOMENDADO)

**1. Copia tudo para o projeto:**
```
Origem: Este package
Destino: C:\APP FINANCAS 2\
Ação: Substitui todos ficheiros
```

**2. Abre terminal no projeto:**
```
cd C:\APP FINANCAS 2
```

**3. Executa o batch:**
```
FULL-RELEASE.bat
```

**4. Responde perguntas:**
```
Versão? v1.8.4
Tipo? 2 (MINOR)
Título? Temas Personalizáveis
Confirma? S
```

**5. Script faz tudo:**
```
✅ git add .
✅ git commit
✅ git tag v1.8.4
✅ git push origin main
✅ git push --tags
✅ Vercel auto-deploy
```

**6. Verifica:**
```
→ https://vercel.com/dashboard (build)
→ https://financas-pessoais-two.vercel.app (teste)
```

**7. GitHub Release:**
```
→ https://github.com/afrikasa/financas-pessoais/releases/new
→ Tag: v1.8.4
→ Title: v1.8.4 - Temas Personalizáveis
→ Descrição: [cola RELEASE-NOTES-v1.8.4.md]
→ Publish!
```

---

### **OPÇÃO B: Deploy Manual**

Se preferires fazer à mão:

```bash
# 1. Vai para projeto
cd C:\APP FINANCAS 2

# 2. Status
git status

# 3. Add
git add .

# 4. Commit
git commit -m "v1.8.4: Temas Personalizáveis"

# 5. Tag
git tag -a v1.8.4 -m "MINOR: Temas Personalizáveis"

# 6. Push código
git push origin main

# 7. Push tags
git push origin --tags
```

---

## ✅ CHECKLIST PÓS-DEPLOY:

```
□ Build Vercel OK
□ App funciona em produção
□ Temas funcionam
□ Dark mode OK
□ Sem erros console
□ Mobile responsive
□ PWA install OK
□ Firebase sync OK
□ GitHub Release criado
□ CHANGELOG no repo
```

---

## 📝 GITHUB RELEASE:

**Cria em:**
https://github.com/afrikasa/financas-pessoais/releases/new

**Preenche:**
```
Tag: v1.8.4
Title: v1.8.4 - Temas Personalizáveis
Description: [cola conteúdo RELEASE-NOTES-v1.8.4.md]
```

---

## 🐛 SE ALGO CORRER MAL:

### **Tag já existe:**
```bash
git tag -d v1.8.4
git push origin :refs/tags/v1.8.4
git tag -a v1.8.4 -m "MINOR: Temas Personalizáveis"
git push origin --tags
```

### **Vercel falha build:**
```
1. Verifica .env vars no dashboard
2. Força redeploy
3. Verifica logs
```

### **App não atualiza:**
```
1. Clear cache browser (Ctrl+Shift+R)
2. Verifica versão em produção
3. Testa incognito
```

---

## 🎯 RESULTADO ESPERADO:

Depois do deploy:
```
✅ v1.8.4 no GitHub
✅ Tag v1.8.4 criada
✅ Release notes publicado
✅ CHANGELOG atualizado no repo
✅ Vercel deployed
✅ App live com temas!
```

---

## 🔗 LINKS ÚTEIS:

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/afrikasa/financas-pessoais
- **App Live:** https://financas-pessoais-two.vercel.app
- **Firebase Console:** https://console.firebase.google.com

---

**BOA SORTE!** 🚀

**QUALQUER DÚVIDA, REVÊ ESTAS INSTRUÇÕES!** 📖
