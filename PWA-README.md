# 📱 PWA - PROGRESSIVE WEB APP

## ✅ PWA ATIVADO!

A tua app agora é uma **Progressive Web App**!

---

## 🎉 O QUE MUDOU:

### **1. Botão "Instalar"**
- Aparece automaticamente no canto inferior
- Popup bonito com gradiente azul
- Clica para instalar!

### **2. Funciona Offline**
- Service Worker ativado
- Cache automático
- Abre mesmo sem internet!

### **3. Ícone Próprio**
- Símbolo € azul (temporário)
- Podes customizar! (ver abaixo)

### **4. Experiência Nativa**
- Full screen (sem barra browser)
- Splash screen
- Parece app de verdade!

---

## 📱 COMO INSTALAR:

### **Android (Chrome):**
```
1. Abre a app no Chrome
2. Aparece popup "Instalar App" OU
3. Menu (⋮) → "Adicionar ao ecrã inicial"
4. Clica "Instalar"
5. Ícone aparece no home screen!
```

### **iPhone (Safari):**
```
1. Abre a app no Safari
2. Botão "Partilhar" (□↑)
3. "Adicionar ao ecrã inicial"
4. Clica "Adicionar"
5. Ícone aparece!
```

### **Desktop (Chrome/Edge):**
```
1. Abre no Chrome
2. Ícone de instalação na barra de URL OU
3. Popup automático
4. Clica "Instalar"
5. App abre em janela própria!
```

---

## 🎨 CUSTOMIZAR ÍCONE:

### **Opção 1: Gerador Automático** ⭐
```
1. Abre: public/generate-icons.html no browser
2. Clica "Gerar Ícones"
3. Download automático de icon-192.png e icon-512.png
4. Move para pasta public/
5. Rebuild: npm run build
```

### **Opção 2: Online (Recomendado)**
```
1. Vai a: https://www.pwabuilder.com/imageGenerator
2. Upload de imagem 512x512
3. Gera todos os tamanhos
4. Download e substitui em public/
```

### **Opção 3: Manual**
```
Cria 2 ficheiros PNG:
- icon-192.png (192x192 pixels)
- icon-512.png (512x512 pixels)

Salva em: public/
```

---

## 🎨 CUSTOMIZAR CORES:

Edita `public/manifest.json`:

```json
{
  "theme_color": "#3b82f6",     ← Cor da barra (Android)
  "background_color": "#f3f4f6" ← Cor do splash screen
}
```

Cores sugeridas:
- Azul: `#3b82f6` (atual)
- Verde: `#22c55e`
- Roxo: `#a855f7`
- Vermelho: `#ef4444`

---

## 🚀 TESTAR PWA:

### **Lighthouse (Chrome DevTools):**
```
1. F12 → Tab "Lighthouse"
2. Categoria: "Progressive Web App"
3. "Analyze page load"
4. Vê pontuação PWA!
```

### **Checklist PWA:**
- ✅ HTTPS (em produção)
- ✅ Service Worker registado
- ✅ Manifest válido
- ✅ Ícones (192 + 512)
- ✅ Offline funciona
- ✅ Instalável

---

## 📊 FUNCIONALIDADES PWA:

### **✅ Ativo:**
- Instalação
- Offline básico
- Ícone custom
- Splash screen
- Full screen

### **📋 Opcional (Adicionar Depois):**
- Push notifications
- Background sync
- Compartilhar API
- Cache avançado
- Shortcuts

---

## 🔧 FICHEIROS PWA:

```
public/
├── manifest.json         ← Config da PWA
├── sw.js                 ← Service Worker
├── icon.svg              ← Ícone SVG (fallback)
├── icon-192.png          ← Ícone pequeno
├── icon-512.png          ← Ícone grande
├── generate-icons.html   ← Gerador de ícones
└── ICONS-README.md       ← Guia dos ícones
```

---

## 🌐 DEPLOY PWA:

### **Para funcionar 100%, precisa HTTPS!**

Opções grátis:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

Todos dão HTTPS automático!

---

## 💡 DICAS:

### **Cache:**
- Service Worker cacheia automaticamente
- Para limpar: DevTools → Application → Clear storage

### **Update:**
- Novas versões carregam automaticamente
- Ou recarrega (Ctrl+R)

### **Debug:**
- Chrome DevTools → Application → Service Workers
- Vê status, updates, cache

---

## 📱 DEMONSTRAÇÃO:

Depois de instalar, a app:
1. ✅ Aparece no menu de apps
2. ✅ Abre full screen
3. ✅ Tem ícone próprio
4. ✅ Funciona offline
5. ✅ Parece app nativa!

---

**🎉 APROVEITA TUA PWA!**

Agora podes usar a app como se fosse nativa! 📱✨
