# 💰 Finanças Pessoais - Versão React Build

## 🚀 SETUP PROFISSIONAL

Esta é a versão **profissional** da app com:
- ✅ React 18 + Vite
- ✅ Build system moderno
- ✅ **Gráficos Recharts funcionais!**
- ✅ Hot reload para desenvolvimento
- ✅ Build otimizado para produção

---

## 📋 REQUISITOS

- **Node.js** 18+ (https://nodejs.org/)
- **npm** (vem com Node.js)

---

## 🔧 INSTALAÇÃO

### **1. Instalar dependências:**
```bash
npm install
```

Aguarde 2-3 minutos enquanto baixa todas as bibliotecas.

---

## 🎯 USAR A APP

### **Modo Desenvolvimento** (recomendado):
```bash
npm run dev
```

- Abre automaticamente no browser
- Hot reload (mudanças aparecem instantaneamente)
- URL: http://localhost:3000

### **Build para Produção:**
```bash
npm run build
```

- Cria pasta `dist/` otimizada
- Ficheiros minificados
- Pronto para deploy

### **Preview da Build:**
```bash
npm run preview
```

- Testa a versão de produção localmente

---

## 📊 GRÁFICOS FUNCIONAM!

Com esta versão, os **3 gráficos** devem funcionar perfeitamente:

1. **Evolução do Patrimônio** (área azul)
2. **Despesas por Categoria** (pizza)
3. **Receitas vs Despesas** (barras)

**Zero bugs!** 🎉

---

## 📁 ESTRUTURA

```
FINANCAS-REACT-BUILD/
├── src/
│   ├── App.jsx           ← App principal
│   ├── main.jsx          ← Entry point
│   └── styles/
│       └── index.css     ← Estilos + Tailwind
├── index.html            ← HTML base
├── package.json          ← Dependências
├── vite.config.js        ← Config Vite
├── tailwind.config.js    ← Config Tailwind
└── dist/                 ← Build (gerado)
```

---

## 🎨 TECNOLOGIAS

| Tech | Versão | Uso |
|------|--------|-----|
| React | 18.2 | Framework UI |
| Vite | 5.0 | Build tool |
| Tailwind | 3.4 | CSS |
| Recharts | 2.10 | Gráficos |
| jsPDF | 2.5 | Export PDF |

---

## 🔥 VANTAGENS vs Versão CDN

| Feature | CDN | Build |
|---------|-----|-------|
| Gráficos | ❌ | ✅ |
| Performance | ⚠️ | ✅ |
| Hot Reload | ❌ | ✅ |
| Tree Shaking | ❌ | ✅ |
| Minificação | ❌ | ✅ |
| TypeScript | ❌ | ✅ (possível) |

---

## 📦 DEPLOY

### **Deploy na Vercel/Netlify:**

1. Fazer build:
   ```bash
   npm run build
   ```

2. Fazer upload da pasta `dist/`

3. Pronto! 🚀

---

## 🐛 TROUBLESHOOTING

### **Erro "npm not found":**
- Instala Node.js: https://nodejs.org/

### **Porta 3000 ocupada:**
- Edita `vite.config.js` → muda `port: 3000`

### **Gráficos não aparecem:**
- Confirma que `npm install` correu bem
- Verifica console (F12)

---

## 💡 PRÓXIMOS PASSOS

Com esta base, podes adicionar:
- TypeScript
- Testes (Jest/Vitest)
- Estado global (Zustand/Redux)
- Backend (Firebase/Supabase)
- PWA
- Animações (Framer Motion)

---

**🎉 BEM-VINDO AO DESENVOLVIMENTO MODERNO!**
