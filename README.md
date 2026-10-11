# 🌸 Korean Flow • Método Korean Flow

> **Aplicação Web & PWA de Pilates, Respiração, Hábitos e Lifestyle Coreano**  
> *Sua jornada de 21 dias de movimento, consciência corporal e consistência serena.*

---

## ✨ Sobre o Projeto

O **Korean Flow** é uma aplicação web progressiva (PWA) desenvolvida com foco em calma, sofisticação e excelência de experiência de usuário (UX). Inspirada no estilo de vida e nas práticas de autocuidado da Coreia do Sul, a aplicação guia os praticantes através de uma jornada estruturada de 21 dias com exercícios de Pilates no solo, mobilidade articular, respiração diafragmática (*Danjeon*), rituais diários de hábitos e uma central de conteúdos bônus.

---

## 📱 Funcionalidades Principais

1. **Onboarding & Personalização**
   - Boas-vindas calorosas e acolhedoras com apresentação dos 3 pilares do método.
   - Personalização com o nome do usuário persistida localmente.
   - Saudação temporal inteligente (*Bom dia*, *Boa tarde*, *Boa noite*).

2. **Jornada de 21 Dias em 3 Fases**
   - **Fase 1 (Dias 1 a 7)**: Despertar & Consciência.
   - **Fase 2 (Dias 8 a 14)**: Fortalecimento & Fluidez.
   - **Fase 3 (Dias 15 a 21)**: Transformação & Hábito.
   - Práticas diárias de 15 a 22 minutos, cada uma com 4 movimentos guiados.

3. **Banco Central de 28 Exercícios Únicos**
   - Descrições anatômicas detalhadas e instruções passo a passo.
   - Dicas de respiração e mentalidade (*mindset* coreano).
   - Estrutura pronta para incorporação de vídeos do YouTube.

4. **Hábitos & Rituais Diários**
   - Rastreamento diário de 5 hábitos essenciais com persistência de dados.
   - Cálculo dinâmico e real de sequência consecutiva (*streak*).

5. **Check-in de Bem-Estar**
   - Registro emocional com 4 estados e campo de reflexão pessoal.

6. **Biblioteca de Bônus & Ebooks**
   - **Guia Xô Barriguinha**: Guia alimentar prático de nutrição leve e rotina sustentável.
   - **Korean Lifestyle**: Mentalidade e hábitos coreanos para viver com intenção.
   - **Guia de Refeições**: Ideias e receitas simples de alimentação.
   - Leitores integrados com paginação, visualização limpa e download de PDF.

7. **Suporte PWA & Atalho para Tela Inicial**
   - Manifest V3 e Service Worker para funcionamento rápido.
   - Card interativo na Home com instruções passo a passo para **iPhone (iOS / Safari)** e **Android (Chrome)**.
   - Reconhecimento automático de modo instalado (*standalone*).

---

## 🎨 Design System K-Wellness

* **Lilás Principal**: `#C9B8DC`
* **Lilás Escuro (CTAs)**: `#8F78A8`
* **Lilás Claro (Superfícies)**: `#EDE7F3`
* **Preto Refinado (Títulos)**: `#171517`
* **Branco Puro (Cards)**: `#FFFFFF`
* **Dourado Discreto**: `#C8A45D`
* **Fundo Suave**: `#FBF9FD`
* **Tipografia**: *Manrope* (Títulos e Números) & *DM Sans* (Corpo e Interface)

---

## 📁 Estrutura de Arquivos

```text
korean-flow/
├── index.html                   # Documento principal da aplicação
├── manifest.json                # Manifesto PWA com ícones e cores
├── sw.js                        # Service Worker para cache e offline
├── package.json                 # Metadados do projeto
├── .gitignore                   # Arquivos ignorados pelo Git
├── server.ps1                   # Servidor HTTP local em PowerShell
├── assets/
│   ├── ebooks/                  # Ebooks em PDF integrados aos leitores
│   │   ├── guia-xo-barriguinha.pdf
│   │   └── korean-lifestyle.pdf
│   └── icons/                   # Ícones de alta resolução PWA (192, 512, SVG)
└── src/
    ├── main.js                  # Ponto de entrada, rotas e eventos
    ├── components/              # Componentes de interface modulares
    ├── data/                    # Dados da jornada, exercícios e bônus
    ├── state/                   # Store centralizada com persistência no LocalStorage
    ├── styles/
    │   └── theme.css            # Folha de estilos e regras do design system
    └── views/                   # Telas (Home, Prática, Hábitos, Biblioteca, Perfil, etc.)
```

---

## 🚀 Como Executar Localmente

### Opção 1: Via Servidor PowerShell Integrado (Recomendado no Windows)
Abra o PowerShell na pasta do projeto e execute:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 3000
```
Depois abra no navegador: `http://localhost:3000/`

### Opção 2: Via VS Code (Live Server)
1. Abra a pasta no **VS Code**.
2. Clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.

### Opção 3: Via Python
```bash
python -m http.server 3000
```

---

## 🌐 Como Publicar no GitHub Pages (Gratuito)

1. Crie um novo repositório no [GitHub](https://github.com/new) com o nome `korean-flow` (pode ser público).
2. Faça o upload de todos os arquivos desta pasta para o repositório.
3. No seu repositório no GitHub:
   - Vá na aba **Settings** (Configurações).
   - No menu lateral esquerdo, clique em **Pages**.
   - Na seção **Branch**, selecione `main` (ou `master`) e a pasta `/ (root)`.
   - Clique em **Save**.
4. Em 1 ou 2 minutos, o GitHub fornecerá a URL pública do seu aplicativo (exemplo: `https://seu-usuario.github.io/korean-flow/`).
