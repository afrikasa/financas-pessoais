# 📝 GUIA DE VERSIONAMENTO

## 🎯 Dois Ficheiros, Duas Audiências

Este projeto mantém **DOIS** ficheiros de documentação:

### **1. CHANGELOG.md** (Developers) 🔧
```
Audiência: Developers, técnicos
Conteúdo: TODAS as mudanças (até pequenas)
Tom: Objetivo, conciso, técnico
Formato: Reverse-chronological list
Propósito: Transparência técnica, troubleshooting
```

### **2. RELEASE-NOTES.md** (Users) 🎉
```
Audiência: Users, stakeholders, marketing
Conteúdo: Só features importantes
Tom: Engaging, narrativo, marketing
Formato: Story-driven highlights
Propósito: Drive adoption, mostrar valor
```

---

## 📊 Diferenças na Prática:

### **CHANGELOG.md Exemplo:**

```markdown
## [1.1.0] - 2026-03-09

### Added
- Firebase SDK 10.7.1 integration
- Firestore database connection
- Authentication service with Google OAuth 2.0
- Real-time sync listeners on /transactions and /accounts collections
- Offline persistence with IndexedDB fallback
- Auto-retry mechanism with exponential backoff (max 5 retries)

### Changed
- localStorage.getItem() calls replaced with firestore.collection().get()
- Data model updated: added userId field to all documents
- Sync conflict resolution: server-wins strategy

### Fixed
- Race condition in sync initialization
- Memory leak in realtime listeners (unsubscribe on unmount)
- Authentication token refresh bug (expired tokens not renewed)

### Technical Details
- Firebase Auth: google.com provider
- Firestore rules: user-based read/write
- Bundle size increase: +180KB (gzipped)
```

### **RELEASE-NOTES.md Exemplo:**

```markdown
## APP-FINANCAS-PESSOAIS v1.1.0 ☁️

**Released:** March 9, 2026

### 🎯 What's New

**Cloud Sync is Here!** 🎉

Your finances now sync automatically across all your devices. Start tracking on your computer, continue on your phone - your data is always up to date, everywhere.

### ✨ Highlights

**☁️ Automatic Cloud Backup**  
Never lose your data again. Everything is safely backed up in the cloud and accessible from any device.

**🔄 Real-Time Sync**  
Add an expense on your phone? See it instantly on your computer. Changes sync in real-time across all your devices.

**🔐 Secure Login**  
Sign in with your Google account. Your data is protected and only accessible by you.

**📱 Works Offline**  
No internet? No problem. Continue tracking expenses offline and everything syncs when you're back online.

### 🚀 How to Get Started

1. Open the app
2. Click "Sync" in settings
3. Sign in with Google
4. Your data syncs automatically!

### 💡 Pro Tip

Already using the app? Your existing data will be uploaded to the cloud on first sync. No data loss!

---

**Happy syncing! 💰**
```

---

## 📋 Quando Usar Cada Um:

### **Atualiza CHANGELOG.md quando:**
- Mudas código
- Fixes bugs (qualquer bug, mesmo pequeno)
- Adicionas dependências
- Mudas configurações
- Removes features
- Qualquer mudança técnica

### **Atualiza RELEASE-NOTES.md quando:**
- Lançamentos maiores (v1.0, v1.1, v2.0)
- Features que users vão notar
- Melhorias importantes na UX
- Mudanças que afetam como users usam a app
- Marketing/comunicação de updates

---

## 🔧 Workflow de Update:

### **Para Pequenas Mudanças (Patch):**

```bash
# 1. Fix bug
# 2. Testa

# 3. Atualiza APENAS CHANGELOG.md:
## [1.0.1] - 2026-03-09
### Fixed
- Dark mode button alignment on mobile

# 4. Commit
git add .
git commit -m "v1.0.1 - Fix dark mode button"
git push

# NÃO atualiza RELEASE-NOTES.md
# (users não precisam saber de pequenos fixes)
```

### **Para Features Novas (Minor/Major):**

```bash
# 1. Desenvolve feature
# 2. Testa

# 3. Atualiza CHANGELOG.md (técnico):
## [1.1.0] - 2026-03-09
### Added
- Firebase SDK integration
- Realtime sync listeners
...

# 4. Atualiza RELEASE-NOTES.md (marketing):
## APP-FINANCAS-PESSOAIS v1.1.0
### What's New
Cloud Sync is Here! 🎉
...

# 5. Atualiza package.json:
"version": "1.1.0"

# 6. Commit
git add .
git commit -m "v1.1.0 - Cloud Sync"
git push
```

---

## 📝 Templates:

### **CHANGELOG.md Template:**

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- Feature A with library X v1.2.3
- API endpoint /api/new-feature
- Database migration script for table Y

### Changed
- Function foo() refactored for performance (50% faster)
- API response format: added 'metadata' field
- Default timeout increased from 5s to 10s

### Fixed
- Null pointer exception in component X (issue #123)
- CSS overflow bug on mobile (Safari 14+)
- Race condition in async data loading

### Removed
- Deprecated API endpoint /api/old-feature
- Unused dependency: lodash (reduced bundle by 70KB)

### Security
- Updated axios to v1.6.2 (CVE-2023-XXXX)

### Technical Details
- Node.js: >=18.0.0 required
- Breaking: API /users now requires auth token
- Migration: run `npm run migrate` before deploying
```

### **RELEASE-NOTES.md Template:**

```markdown
## APP-FINANCAS-PESSOAIS vX.Y.Z 🎯

**Released:** Month DD, YYYY  
**Try it:** [link]

### 🎯 What's New

**Catchy one-liner about the main feature**

A paragraph explaining why this matters to users, what problem it solves, how it makes their life better.

### ✨ Highlights

**🎨 Feature Name**  
User-friendly description of what it does and why they'll love it.

**📱 Another Feature**  
How this improves their experience.

### 🚀 How to Get Started

1. Simple step
2. Another step
3. Enjoy!

### 💡 Pro Tips

- Tip that helps users get more value
- Another useful tip

---

**Tagline or call to action! 💰**
```

---

## 🎯 Regras de Ouro:

### **CHANGELOG.md:**
1. ✅ Sem emojis (objetivo)
2. ✅ Detalhes técnicos
3. ✅ Versão numbers específicos
4. ✅ Todas as mudanças
5. ❌ Sem marketing speak

### **RELEASE-NOTES.md:**
1. ✅ Usa emojis (engaging)
2. ✅ Foca em benefícios users
3. ✅ Story-driven
4. ✅ Só highlights importantes
5. ❌ Sem jargão técnico

---

## 📊 Exemplo Real Lado a Lado:

### **Mudança: Adicionar dark mode**

**CHANGELOG.md:**
```markdown
### Added
- Dark mode toggle component with sun/moon icons
- CSS class .dark-mode applied to <body>
- localStorage persistence for theme preference (key: 'theme')
- 47 CSS override rules for dark theme
- Tailwind dark: variant usage across components

### Changed
- Color variables updated to support both themes
- Button contrast ratios meet WCAG AA standards

### Fixed
- Text visibility on gradient backgrounds in dark mode
```

**RELEASE-NOTES.md:**
```markdown
### 🌙 Dark Mode

**Easy on Your Eyes**

Work late at night? We've got you covered. Switch to dark mode with a single tap and your app transforms into a beautiful dark theme that's perfect for low-light environments.

Your preference is saved automatically - set it once and enjoy it everywhere.

**How to Use:**
Look for the sun/moon icon in the top right corner and tap to switch themes.
```

---

## ✅ Checklist Release:

### **Minor/Major Release:**
- [ ] Código desenvolvido e testado
- [ ] CHANGELOG.md atualizado (técnico)
- [ ] RELEASE-NOTES.md atualizado (marketing)
- [ ] package.json version incrementado
- [ ] Screenshots atualizados (se UI mudou)
- [ ] Commit: "vX.Y.Z - Feature name"
- [ ] Push para GitHub
- [ ] Tag criada (opcional): `git tag vX.Y.Z`
- [ ] GitHub Release criado (usa RELEASE-NOTES.md)
- [ ] Vercel deploy verificado

### **Patch Release:**
- [ ] Bug fixado e testado
- [ ] CHANGELOG.md atualizado (só)
- [ ] package.json version incrementado
- [ ] Commit: "vX.Y.Z - Fix description"
- [ ] Push para GitHub

---

**📝 MANTÉM AMBOS ATUALIZADOS MAS SEPARADOS!**

Users querem saber "o que há de novo?"  
Developers querem saber "o que mudou tecnicamente?"

Dá-lhes ambos! 🚀

Este projeto usa **Semantic Versioning (SemVer)**:

```
APP-FINANCAS-PESSOAIS v1.2.3
                        │ │ │
                        │ │ └─ PATCH (bug fixes)
                        │ └─── MINOR (novas features)
                        └───── MAJOR (breaking changes)
```

---

## 📊 Quando Incrementar:

### **MAJOR (v2.0.0)**
```
Mudanças incompatíveis / Breaking changes
Exemplos:
- Mudar estrutura de dados (localStorage)
- Remover funcionalidades
- Refactor completo
```

### **MINOR (v1.1.0)**
```
Novas funcionalidades (compatíveis)
Exemplos:
- Adicionar Firebase
- Adicionar animações
- Nova feature qualquer
```

### **PATCH (v1.0.1)**
```
Bug fixes e melhorias pequenas
Exemplos:
- Fix dark mode
- Fix gráfico
- Correção de texto
```

---

## 🔧 Como Fazer Update:

### **Opção 1: Script Automático** ⭐

```bash
VERSION-UPDATE.bat
```

**Pede:**
1. Número da versão (ex: 1.1.0)
2. Mudanças (added/fixed/removed)
3. Confirma e faz push!

---

### **Opção 2: Manual**

#### **1. Edita CHANGELOG.md:**

```markdown
## [APP-FINANCAS-PESSOAIS v1.1.0] - 2026-03-09

### Added
- ✅ Firebase backend
- ✅ Sincronização automática

### Fixed
- 🔧 Bug no dark mode

### Removed
- ❌ Feature antiga
```

#### **2. Commit e Push:**

```bash
git add CHANGELOG.md
git commit -m "v1.1.0 - Firebase integration"
git push
```

#### **3. Tag (Opcional):**

```bash
git tag -a v1.1.0 -m "Version 1.1.0"
git push origin v1.1.0
```

---

## 📋 Formato CHANGELOG:

### **Template:**

```markdown
## [APP-FINANCAS-PESSOAIS vX.Y.Z] - YYYY-MM-DD

### Added
- ✅ Nova funcionalidade 1
- ✅ Nova funcionalidade 2

### Changed
- 🔄 Mudança em funcionalidade existente

### Fixed
- 🔧 Correção de bug 1
- 🔧 Correção de bug 2

### Removed
- ❌ Funcionalidade removida

### Deprecated
- ⚠️ Funcionalidade será removida em v2.0

### Security
- 🔒 Correção de segurança
```

---

## 🏷️ Tipos de Mudanças:

| Tipo | Emoji | Quando usar |
|------|-------|-------------|
| **Added** | ✅ | Novas funcionalidades |
| **Changed** | 🔄 | Mudanças em features existentes |
| **Fixed** | 🔧 | Correções de bugs |
| **Removed** | ❌ | Funcionalidades removidas |
| **Deprecated** | ⚠️ | Funcionalidades obsoletas |
| **Security** | 🔒 | Correções de segurança |

---

## 📅 Histórico de Versões:

```
v1.0.0 (2026-03-08) - Primeira versão completa
v0.9.0 (2026-03-08) - Deploy e GitHub
v0.8.0 (2026-03-07) - PWA
v0.7.0 (2026-03-07) - React + Vite
v0.6.0 (2026-03-06) - Export PDF
v0.5.0 (2026-03-06) - Dark Mode
v0.4.0 (2026-03-06) - Redesign visual
v0.3.0 (2026-03-05) - Empréstimos
v0.2.0 (2026-03-05) - Investimentos
v0.1.0 (2026-03-04) - Versão inicial
```

---

## 🎯 Workflow Completo:

### **Para Nova Feature:**

```bash
# 1. Desenvolve a feature
# 2. Testa local

# 3. Atualiza versão
VERSION-UPDATE.bat
# Versão: 1.1.0
# Added: Nova feature X

# 4. Edita CHANGELOG.md (detalha melhor)

# 5. Push
# GitHub + Vercel auto-deploy!
```

---

## 📱 Tags Git (Opcional):

Para criar releases no GitHub:

```bash
# Criar tag
git tag -a v1.1.0 -m "Version 1.1.0 - Firebase"

# Push tag
git push origin v1.1.0

# Ver tags
git tag -l

# Delete tag (se errar)
git tag -d v1.1.0
git push origin :refs/tags/v1.1.0
```

**No GitHub:**
- Releases → Create new release
- Escolhe tag v1.1.0
- Adiciona release notes (copia do CHANGELOG)

---

## 🔮 Roadmap (package.json):

Atualiza também `package.json`:

```json
{
  "name": "financas-pessoais",
  "version": "1.1.0",  ← ATUALIZA AQUI
  ...
}
```

---

## 📊 Exemplo Completo:

### **Queres adicionar Firebase:**

1. **Desenvolve** a feature
2. **Testa** local
3. **CHANGELOG.md:**

```markdown
## [APP-FINANCAS-PESSOAIS v1.1.0] - 2026-03-09

### Added
- ✅ Firebase backend integration
- ✅ Sincronização automática entre devices
- ✅ Autenticação Google
- ✅ Firestore database
- ✅ Backup automático na cloud

### Changed
- 🔄 LocalStorage → Firebase Firestore
- 🔄 Estrutura de dados otimizada

### Fixed
- 🔧 Bug sync entre Windows e PWA

### Tech Stack
- Firebase 10.x
- Firestore
- Firebase Auth
```

4. **package.json:**
```json
"version": "1.1.0"
```

5. **Commit:**
```bash
git add .
git commit -m "v1.1.0 - Firebase integration"
git push
```

6. **Tag (opcional):**
```bash
git tag -a v1.1.0 -m "Firebase integration"
git push origin v1.1.0
```

7. **GitHub Release:**
- Cria release v1.1.0
- Copia changelog
- Publica!

---

## ✅ Checklist Update:

Antes de cada versão:

- [ ] Código testado local
- [ ] CHANGELOG.md atualizado
- [ ] package.json version atualizado
- [ ] Commit com mensagem clara
- [ ] Push para GitHub
- [ ] Tag criada (opcional)
- [ ] Release no GitHub (opcional)
- [ ] Verifica deploy Vercel

---

## 🎉 Convenções:

**Mensagens Commit:**
```
v1.1.0 - Firebase integration
v1.0.1 - Fix dark mode bug
v2.0.0 - Major refactor
```

**Branches (futuro):**
```
main           → Produção (v1.0.0)
develop        → Desenvolvimento
feature/X      → Nova feature
hotfix/Y       → Bug crítico
```

---

**📝 MANTÉM O CHANGELOG ATUALIZADO!**

É o histórico do projeto! 🚀
