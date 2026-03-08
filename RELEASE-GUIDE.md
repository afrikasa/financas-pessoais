# 📝 GUIA - CRIAR RELEASES

## 🎯 Como Criar Releases Profissionais

---

## 🚀 MÉTODO 1: SCRIPT AUTOMÁTICO ⭐

### **Usa o script:**
```bash
CREATE-RELEASE.bat
```

### **O script pede:**

**1. Versão:**
```
Digite a NOVA versão (ex: 1.2.0):
→ 1.2.0
```

**2. Tipo:**
```
1. MAJOR (v2.0.0) - Breaking changes
2. MINOR (v1.X.0) - Novas features  
3. PATCH (v1.1.X) - Bug fixes
→ 2 (para MINOR)
```

**3. Título:**
```
Título: Animações Framer Motion
```

**4. Highlights:**
```
Highlight 0: Smooth transitions entre tabs
Highlight 1: Hover effects nos cards
Highlight 2: Loading animations
Highlight 3: FIM
```

**5. Confirma:**
```
Preview...
Confirma? (S/N)
→ S
```

**6. Criar tag?**
```
Criar tag Git agora? (S/N)
→ S

Push para GitHub? (S/N)
→ S
```

### **Resultado:**

Cria ficheiro:
```
GITHUB-RELEASE-v1.2.0.md
```

Com conteúdo profissional pronto para copiar!

---

## 📋 MÉTODO 2: MANUAL

### **Usa os templates:**

**Para FEATURES (MINOR):**
```
Usa: GITHUB-RELEASE-v1.1.0.md como base
Copia e adapta secções
```

**Para BUG FIXES (PATCH):**
```
Usa: GITHUB-RELEASE-v1.1.1.md como base
Copia e adapta secções
```

**Para BREAKING (MAJOR):**
```
Cria novo com foco em:
- Migration guide
- Breaking changes
- Upgrade path
```

---

## 🔢 SEMANTIC VERSIONING

### **MAJOR (v2.0.0):**
```
Quando:
- Breaking changes
- API incompatível
- Refactor completo
- Nova arquitetura

Exemplo:
v1.9.5 → v2.0.0 - Migração TypeScript
```

### **MINOR (v1.X.0):**
```
Quando:
- Novas features
- Melhorias compatíveis
- Novas funcionalidades

Exemplo:
v1.1.5 → v1.2.0 - Adicionar Animações
```

### **PATCH (v1.1.X):**
```
Quando:
- Bug fixes
- Correções pequenas
- Hotfixes

Exemplo:
v1.1.0 → v1.1.1 - Fix import paths
```

---

## 📝 ESTRUTURA RELEASE NOTES

### **Template Base:**

```markdown
# [EMOJI] APP-FINANCAS-PESSOAIS v[VERSION]

**Released:** [DATE]
**Type:** [TYPE]
**Deploy:** https://financas-pessoais-two.vercel.app

---

## [EMOJI] [TÍTULO]

### What's New / What's Fixed

- ✅ Feature/Fix 1
- ✅ Feature/Fix 2
- ✅ Feature/Fix 3

---

## 📥 How to Update

### For Existing Users:
Refresh browser (Ctrl+F5)

### New Installation:
Visit app URL

---

## 📋 Full Changelog

Link to CHANGELOG.md

---

## 🔗 Links

- Live App
- Repository
- Documentation

---

## 📊 Version History

Timeline

---

⭐ Star / 💬 Discuss / 🐛 Report

---

**Made with ❤️ by Marcus Costa**
```

---

## 🎨 EMOJIS POR TIPO:

| Tipo | Emoji | Uso |
|------|-------|-----|
| **Major** | 🚀 | Breaking changes, v2.0.0 |
| **Minor** | ✨ | New features |
| **Patch** | 🔧 | Bug fixes |
| **Security** | 🔒 | Security fixes |
| **Performance** | ⚡ | Performance improvements |
| **UI/UX** | 🎨 | Design updates |
| **Docs** | 📚 | Documentation |
| **Dependencies** | 📦 | Dependency updates |

---

## 📋 CHECKLIST RELEASE:

### **Antes de criar:**
- [ ] Código testado
- [ ] CHANGELOG.md atualizado
- [ ] RELEASE-NOTES.md atualizado
- [ ] package.json version atualizado
- [ ] Commit + Push feito
- [ ] Tag criada

### **Criar release:**
- [ ] GitHub → Releases → New
- [ ] Tag selecionada
- [ ] Título bonito
- [ ] Description completa
- [ ] Screenshots (opcional)
- [ ] Assets (opcional)
- [ ] "Latest release" marcado (se for)
- [ ] Publish!

### **Depois de publicar:**
- [ ] Verifica deploy Vercel
- [ ] Testa app atualizada
- [ ] Anuncia (Twitter, etc)
- [ ] Atualiza README se necessário

---

## 🔄 WORKFLOW COMPLETO:

```
1. Desenvolve feature
2. Testa local
3. Atualiza CHANGELOG.md
4. Atualiza RELEASE-NOTES.md
5. Atualiza package.json version
6. CREATE-RELEASE.bat
7. Git commit + push
8. Git tag
9. GitHub Release
10. Vercel auto-deploy
11. Testa produção
12. Anuncia!
```

---

## 💡 DICAS PRO:

### **Release Titles:**
```
✅ Good:
- ☁️ Cloud Sync Integration
- 🎨 New Dark Mode Theme
- ⚡ Performance Improvements

❌ Bad:
- Update
- New version
- Changes
```

### **Highlights:**
```
✅ Good:
- User-facing benefits
- Concrete improvements
- Clear value proposition

❌ Bad:
- Technical jargon
- Implementation details
- Vague descriptions
```

### **Screenshots:**
```
✅ Include:
- New features in action
- Before/after comparisons
- UI improvements
- Mobile/desktop views
```

---

## 📊 EXEMPLOS REAIS:

### **v1.2.0 - Animações:**
```markdown
# ✨ APP-FINANCAS-PESSOAIS v1.2.0

**Type:** Feature Release

## ✨ Smooth Animations

### What's New
- ✅ Framer Motion integration
- ✅ Smooth tab transitions
- ✅ Card hover effects
- ✅ Loading animations
- ✅ Page transitions

## 🎨 Enhanced UX
Experience a more polished, modern interface...
```

### **v1.1.2 - Hotfix:**
```markdown
# 🔧 APP-FINANCAS-PESSOAIS v1.1.2

**Type:** Bug Fix

## 🐛 What's Fixed
- ✅ Dark mode toggle persistence
- ✅ PDF export date format
- ✅ Chart legend alignment

## 📥 How to Update
Refresh browser - fixes apply automatically!
```

---

## 🎯 AUTOMAÇÃO FUTURA:

Podes criar CI/CD para automatizar mais:

```yaml
# .github/workflows/release.yml
name: Create Release
on:
  push:
    tags:
      - 'v*'
jobs:
  release:
    - Create GitHub Release
    - Upload assets
    - Notify Discord/Slack
```

---

## 📚 RECURSOS:

- **Keep a Changelog:** https://keepachangelog.com
- **Semantic Versioning:** https://semver.org
- **GitHub Releases:** https://docs.github.com/releases

---

**🎉 CRIA RELEASES PROFISSIONAIS SEMPRE!**
