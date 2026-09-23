# 💍 Convite de Casamento Interativo & Landing Page

Projeto moderno e elegante desenvolvido em **React + Vite + Tailwind CSS** para convites de casamento digitais de alto padrão, contendo **dois modelos simultâneos** para demonstração e escolha dos noivos.

---

## ✨ Modelos Inclusos

1. **Modelo 1 — Landing Page Completa de Alto Padrão (`/`)**:
   - Abertura com envelope 3D e selo de cera dourado.
   - Trilha sonora romântica de fundo com player flutuante.
   - Contagem regressiva em tempo real e sincronização de agenda (Google Agenda e Apple iCal).
   - Roteiro visual da celebração (Linha do Tempo).
   - Localização inteligente integrada com 1 clique para Google Maps, Waze e Uber.
   - Lista de presentes com cotas de lua de mel interativas, QR Code Pix dinâmico e cópia de chave sem taxas.
   - Guia de estilo (Dress Code) e formulário RSVP com envio estruturado no WhatsApp.

2. **Modelo 2 — Convite Interativo Clean / Formato Cartão (`/convite2`)**:
   - Design clássico e direto (inspirado no padrão de convites digitais Mercado Livre / Canva).
   - Foto editorial do casal com fusão em degradê no papel linho.
   - Bloco de data tradicional com linhas laterais.
   - Cerimônia e recepção destacadas no mesmo local.
   - 4 botões circulares interativos: **Confirmar Presença (RSVP)**, **Presente Pix**, **Localização** e **Salvar na Agenda**.

---

## 🛠️ Como Personalizar os Dados

Todos os dados dos noivos, data, local e chave Pix ficam centralizados em um único arquivo:
👉 `src/weddingData.ts`

Basta alterar os valores deste arquivo para personalizar todo o site automaticamente!

---

## 🚀 Como Rodar Localmente

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar o servidor de desenvolvimento
npm run dev
```

Acesse no navegador:
* `http://localhost:5173/` (Modelo 1: Landing Page)
* `http://localhost:5173/convite2` (Modelo 2: Convite Cartão)

---

## ☁️ Deploy Recomendado: Vercel vs Netlify

### 🥇 Nossa Recomendação: **Vercel**
* **Por que é a melhor escolha?**
  * Otimização nativa para projetos Vite/React.
  * O link é gerado em menos de 1 minuto (`seunome.vercel.app`).
  * Conexão de domínio personalizado (ex: `casamentodaniela.com.br`) com certificado SSL (HTTPS) automático e 100% gratuito.
  * O projeto já conta com o arquivo `vercel.json` configurado para as rotas (`/convite2`) funcionarem sem erro 404 ao atualizar a página.

### Como fazer o deploy na Vercel:
1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. Clique em **"Add New"** > **"Project"**.
3. Importe o repositório `convite-casamento-interativo`.
4. Clique em **"Deploy"** (as configurações de build são detectadas automaticamente).

---

Feito com carinho para celebrar momentos inesquecíveis! ✨
