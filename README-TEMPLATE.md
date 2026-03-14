# 💰 Finanças Pessoais

> App completa de gestão financeira pessoal com gráficos interativos, dark mode e PWA.

[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://financas-pessoais-two.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 🚀 Demo

**[Ver App Online](https://financas-pessoais-two.vercel.app)**

## ✨ Features

- 📊 **Gráficos Interativos** - Visualização de dados com Recharts
- 🌙 **Dark Mode** - Tema escuro/claro
- 📄 **Export PDF** - Relatórios em PDF
- 📱 **PWA** - Instalável como app nativa
- 💾 **LocalStorage** - Dados salvos localmente
- 📈 **Dashboard** - Visão geral financeira
- 💸 **Gestão de Transações** - Receitas e despesas
- 🔄 **Recorrentes** - Pagamentos automáticos
- 💳 **Contas** - Múltiplas contas bancárias
- 💰 **Empréstimos** - Controlo de dívidas
- 📊 **Investimentos** - Portfólio de investimentos

## 🛠️ Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **PDF:** jsPDF
- **Deploy:** Vercel

## 📸 Screenshots

<!-- Adiciona screenshots aqui -->

## 🚀 Como Usar

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/teu-username/financas-pessoais.git

# Entre na pasta
cd financas-pessoais

# Instale dependências
npm install

# Rode em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Deploy

```bash
# Deploy para Vercel
npm run build
vercel deploy --prod
```

## 📱 Instalar PWA

1. Acesse a [app online](https://financas-pessoais-two.vercel.app)
2. No Chrome: Menu → "Adicionar ao ecrã inicial"
3. No Safari: Partilhar → "Adicionar ao ecrã inicial"

## 📋 Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build produção
npm run preview  # Preview build
```

## 🎨 Funcionalidades Detalhadas

### Dashboard
- Resumo financeiro
- 4 cards principais (Patrimônio, Receitas, Despesas, Poupança)
- Lista de contas
- Transações recentes

### Gráficos
- Evolução do patrimônio (linha)
- Despesas por categoria (pizza)
- Receitas vs Despesas (barras)

### Dark Mode
- Toggle manual
- Salvado em localStorage
- Todas seções compatíveis

### Export PDF
- Relatório completo
- Design profissional
- Data automática

## 🗂️ Estrutura

```
financas-pessoais/
├── public/
│   ├── manifest.json    # PWA config
│   ├── sw.js           # Service worker
│   └── icons/          # PWA icons
├── src/
│   ├── App.jsx         # Componente principal
│   ├── components/     # Componentes
│   ├── styles/         # CSS
│   └── main.jsx        # Entry point
├── vite.config.js      # Vite config
└── package.json        # Dependencies
```

## 🔧 Configuração

### Environment Variables

Não usa variáveis de ambiente por enquanto (dados locais).

### PWA

Manifest e Service Worker em `public/`.

## 🤝 Contribuir

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit (`git commit -m 'Adiciona nova feature'`)
4. Push (`git push origin feature/nova-feature`)
5. Pull Request

## 📝 Roadmap

- [ ] Backend Firebase (sincronização)
- [ ] Autenticação
- [ ] Categorias customizáveis
- [ ] Metas financeiras
- [ ] Notificações
- [ ] Multi-moeda
- [ ] Import/Export CSV
- [ ] Dashboards avançados

## 📄 Licença

MIT © [Teu Nome]

## 👤 Autor

**[Teu Nome]**

- GitHub: [@teu-username](https://github.com/teu-username)
- Email: teu@email.com

## 🙏 Agradecimentos

- [Recharts](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

⭐ Dá uma estrela se gostaste do projeto!
