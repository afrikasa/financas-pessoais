# 📱 ÍCONES PWA

## 🎨 Ícones Atuais:

Atualmente usa ícones SVG placeholder (símbolo €).

## 🖼️ Para Customizar:

### **Opção 1: Gerar Online (FÁCIL)**
1. Vai a https://www.pwabuilder.com/imageGenerator
2. Upload de uma imagem 512x512
3. Gera todos os tamanhos automaticamente
4. Download e substitui na pasta `public/`

### **Opção 2: Criar Manualmente**
Precisa de 2 ícones PNG:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

### **Dicas de Design:**
- Fundo sólido (não transparente)
- Símbolo centrado
- Cores contrastantes
- Simples e reconhecível
- Bordas arredondadas (o sistema adiciona)

### **Ferramentas:**
- Figma (grátis)
- Canva (grátis)
- GIMP (grátis)
- Photoshop

## 🎨 Sugestões de Design:

**Opção 1: Minimalista**
```
┌─────────┐
│         │
│    €    │  ← Euro grande e bold
│         │
└─────────┘
Fundo: Azul (#3b82f6)
Símbolo: Branco
```

**Opção 2: Com Gráfico**
```
┌─────────┐
│    €    │  ← Euro
│  ╱╲╱╲   │  ← Linha de gráfico
└─────────┘
```

**Opção 3: Calculadora**
```
┌─────────┐
│ ═══ ═══ │  ← Display
│ ◉ ◉ ◉   │  ← Botões
│ ◉ ◉ ◉   │
└─────────┘
```

## 📁 Arquivos Necessários:

```
public/
├── icon-192.png    ← 192x192px
├── icon-512.png    ← 512x512px
└── icon.svg        ← Opcional (fallback)
```

## 🚀 Depois de Substituir:

1. Apaga cache do browser (Ctrl+Shift+Del)
2. Recarrega app (Ctrl+R)
3. Desinstala PWA antiga (se tiver)
4. Reinstala PWA
5. Ícone novo deve aparecer!

---

**Por agora, a app usa o ícone SVG placeholder!** ✅
