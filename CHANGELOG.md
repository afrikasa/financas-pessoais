# 📋 CHANGELOG - Finanças Pessoais

Todas as mudanças notáveis do projeto serão documentadas aqui.

---

## [1.8.4] - 2026-03-13 🎨

### ✨ Adicionado
- **Sistema de Temas Personalizáveis**
  - 4 temas: Verde, Azul, Roxo, Laranja
  - Seletor visual no header
  - Gradientes dinâmicos
  - Persistência em localStorage
  - Aplicado em headers e botões principais

### 🔧 Melhorado
- Interface mais personalizável
- Experiência visual adaptável

---

## [1.8.3] - 2026-03-13 ✨

### ✨ Adicionado
- **Efeito Glassmorphism**
  - Cards principais com backdrop-blur-xl
  - Modais com backdrop-blur-sm
  - Transparências sutis (bg-white/80)
  - Bordas semi-transparentes
  - Sombras aprimoradas

### 🔧 Melhorado
- Design mais moderno e elegante
- Profundidade visual aumentada

---

## [1.8.2] - 2026-03-13 📊

### ✨ Adicionado
- **Animações nos Gráficos**
  - Recharts com isAnimationActive
  - Cards com fade + scale
  - Stagger delays (0.1s, 0.2s, 0.3s)
  - Duração 1000ms
  - Easing suave

### 🔧 Melhorado
- Gráficos mais dinâmicos
- Transições visuais profissionais

---

## [1.8.1] - 2026-03-13 🔄

### ✨ Adicionado
- **Transições entre Páginas**
  - AnimatePresence mode="wait"
  - Fade + slide horizontal
  - Todas 8 abas animadas
  - Duração 300ms
  - Easing suave

### 🐛 Corrigido
- Bug: Div duplicado na aba Investimentos

### 🔧 Melhorado
- Navegação mais fluida
- Experiência de transição profissional

---

## [1.8.0] - 2026-03-13 💰

### ✨ Adicionado
- **Sistema de Orçamentos**
  - Orçamentos mensais por categoria
  - Apenas categorias de despesa
  - Cálculo automático de gastos
  - Barra de progresso visual
  - Status: OK (0-79%), Atenção (80-99%), Ultrapassado (100%+)
  - Cores dinâmicas (verde/amarelo/vermelho)
  - Aba dedicada "Orçamentos"
  - Modal para criar/editar orçamentos
  - Persistência localStorage
  - Integração completa com sistema

### 🔧 Melhorado
- Controle financeiro mais preciso
- Visualização de gastos mensais

---

## [1.7.2] - 2026-03-13 🎯

### ✨ Adicionado
- **Metas Financeiras (versão corrigida)**
  - Aba dedicada "Metas"
  - Progresso visual com barra
  - Percentagem completa
  - Modal criar/editar metas
  - Campos: nome, valor alvo, prazo, valor atual
  - Persistência localStorage
  - Integração sistema completo

### 🐛 Corrigido
- Bug: Tags JSX não fechadas (v1.7.1)
- Reconstruído do zero a partir de v1.6.0

### 🔧 Melhorado
- Organização: metas em aba própria vs dashboard

---

## [1.6.0] - 2026-03-12 📈

### ✨ Adicionado
- **Análise de Tendências**
  - 3 Cards Insights: Patrimônio Líquido, Receitas Totais, Despesas Totais
  - Variação percentual vs período anterior
  - Indicadores visuais (↑↓)
  - Cores dinâmicas (verde/vermelho)
- **Gráficos Avançados**
  - Evolução Patrimônio (área)
  - Receitas vs Despesas (área dupla)
  - Top 5 Categorias (barras)
- **Filtros de Período**
  - 7 dias, 30 dias, 90 dias, 1 ano, Tudo
  - Aplicado em gráficos e insights

### 🔧 Melhorado
- Dashboard analytics completo
- Visão financeira aprofundada

---

## [1.5.0] - 2026-03-12 📊

### ✨ Adicionado
- **Gráficos Avançados**
  - Gráfico evolução saldo
  - Gráfico receitas vs despesas
  - Gráfico distribuição categorias
  - Recharts integrado

### 🔧 Melhorado
- Visualização de dados
- Analytics visuais

---

## [1.4.2] - 2026-03-12 🧹

### 🐛 Corrigido
- Reset limpa 100% localStorage
- Estado completamente resetado

---

## [1.4.1] - 2026-03-12 🔧

### 🐛 Corrigido
- Botão Reset funcionalidade

---

## [1.4.0] - 2026-03-12 ✨

### ✨ Adicionado
- **Animações em Modais**
  - Fade in/out
  - Scale 0.95 → 1
  - Backdrop blur
  - Transições suaves

### 🔧 Melhorado
- UX dos modais
- Feedback visual

---

## [1.3.0] - 2026-03-12 🎨

### ✨ Adicionado
- **Sistema de Notificações Toast**
  - Toast.jsx component
  - Sucesso, erro, info, warning
  - Animações entrada/saída
  - Auto-dismiss 3s
- **Loading States**
  - Loading.jsx component
  - Spinner animado
  - Overlay
- **Auto-Download Firebase**
  - Download automático após login
  - Sem confirmação manual
  - UX melhorada

### 🔧 Melhorado
- Feedback visual consistente
- UX Firebase sync

---

## [1.2.0] - 2026-03-09 🔒

### ✨ Adicionado
- **Animações Framer Motion**
  - Fade in cards
  - Stagger lists
  - Smooth transitions
  - Scale effects

### 🔒 Segurança
- **Migração Firebase Completa**
  - Novo projeto: financas-app-2026
  - Vars ambiente (.env)
  - API key rotacionada
  - GitHub secret scanning OK
  - Rules Firestore atualizadas

### 🔧 Melhorado
- Segurança 100%
- Ambiente production-ready

---

## [1.1.1] - 2026-03-09 🐛

### 🐛 Corrigido
- Imports Firebase corrigidos
- Build errors resolvidos

---

## [1.1.0] - 2026-03-09 ☁️

### ✨ Adicionado
- **Sincronização Firebase**
  - Google OAuth
  - Firestore sync
  - Upload/Download dados
  - Multi-device support

### 🔧 Melhorado
- Dados na cloud
- Acessível anywhere

---

## [1.0.0] - 2026-03-08 🎉

### ✨ Adicionado
- **App Base Completo**
  - Gestão transações
  - Categorias customizáveis
  - Múltiplas contas
  - Empréstimos
  - Investimentos
  - Itens recorrentes
  - Dark mode
  - PWA completo
  - localStorage
  - Export PDF
  - Responsivo

### 🎨 Design
- Interface moderna
- Tailwind CSS
- Lucide icons
- Mobile-first

---

## 📊 Estatísticas Globais

**Total de Versões:** 20 releases  
**Features Principais:** 15+  
**Bugs Corrigidos:** 10+  
**Linhas de Código:** 3135 (App.jsx)  
**Tempo Desenvolvimento:** 6 dias  

---

## 🎯 Próximas Features Planejadas

- 📱 Mobile gestures
- 🔔 Notificações smart
- 📊 Export avançado
- 🌍 Multi-moeda
- 🤖 Insights AI
- 📈 Previsões automáticas

---

**Formato:** [Major.Minor.Patch]  
**Convenção:** Semantic Versioning 2.0.0
