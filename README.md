# Dashboard Clima & Notícias

Projeto desenvolvido para a disciplina de **Laboratório de Desenvolvimento Web** — FATEC Itatiba (Prof. Leandro Felipe Carvalho).

Dashboard interativo que exibe clima em tempo real, previsão de 5 dias e as últimas notícias do Brasil, com gráfico de temperatura gerado pelo Chart.js.

---

## Funcionalidades

- Busca de clima atual por cidade (temperatura, humidade, vento, sensação térmica)
- Previsão dos próximos 5 dias com ícones de condição
- Gráfico de linha com a temperatura média de cada dia (Chart.js)
- Feed das últimas notícias nacionais com link para a fonte
- Salva a última cidade pesquisada no LocalStorage
- Layout responsivo (desktop, tablet e mobile)

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Estrutura | HTML5 |
| Estilo | CSS3 (Grid, Flexbox, variáveis CSS) |
| Lógica | JavaScript ES6+ (Fetch API, DOM, LocalStorage) |
| Gráficos | [Chart.js](https://www.chartjs.org/) via CDN |
| Clima | [OpenWeatherMap API](https://openweathermap.org/api) |
| Notícias | [GNews API](https://gnews.io/) |

---

## Pré-requisitos

- Navegador moderno (Chrome, Edge ou Firefox)
- Chave de API do **OpenWeatherMap** (gratuita)
- Chave de API do **GNews** (gratuita)

Não é necessário instalar nada — o projeto roda diretamente no browser.

---

## Como obter as chaves de API

### OpenWeatherMap

1. Acesse [openweathermap.org](https://openweathermap.org/) e crie uma conta gratuita
2. Vá em **API keys** no painel da sua conta
3. Copie a chave gerada (pode levar alguns minutos para ativar)

Plano gratuito: **1.000 requisições/dia**

### GNews API

1. Acesse [gnews.io](https://gnews.io/) e clique em **Get API Key**
2. Preencha o cadastro e confirme o e-mail
3. Copie a chave exibida no painel

Plano gratuito: **100 requisições/dia**, notícias com até 12h de atraso

> **Dica:** para evitar qualquer problema de CORS ao abrir via `file://`, use a extensão **Live Server** do VS Code (`http://127.0.0.1:5500`).

---

## Como configurar as chaves

Abra o arquivo `js/weather.js` e substitua o valor da constante na primeira linha:

```js
// js/weather.js
const WEATHER_API_KEY = 'SUA_CHAVE_AQUI'; // <-- cole sua chave aqui
```

Abra o arquivo `js/news.js` e faça o mesmo:

```js
// js/news.js
const NEWS_API_KEY = 'SUA_CHAVE_AQUI'; // <-- cole sua chave do gnews.io aqui
```

Salve os dois arquivos.

---

## Como executar

1. Clone ou baixe o repositório:

```bash
git clone https://github.com/<seu-usuario>/atv_labweb.git
```

2. Abra a pasta do projeto e dê um duplo clique no arquivo `index.html`

Ou, se preferir usar uma extensão do VS Code (recomendado para evitar problemas de CORS com a NewsAPI):

1. Instale a extensão **Live Server** no VS Code
2. Clique com o botão direito em `index.html` → **Open with Live Server**
3. O browser abrirá automaticamente em `http://127.0.0.1:5500`

---

## Estrutura de pastas

```
atv_labweb/
├── index.html              # Página principal
├── css/
│   ├── style.css           # Estilos globais e variáveis CSS
│   └── responsive.css      # Media queries (mobile-first)
├── js/
│   ├── main.js             # Inicialização, eventos e gráfico
│   ├── weather.js          # Integração com OpenWeatherMap API
│   └── news.js             # Integração com NewsAPI
├── assets/
│   └── icons/              # Ícones SVG de condições climáticas
├── wireframe.html          # Wireframe do projeto (entrega acadêmica)
├── .gitignore
└── README.md
```

---

## Critérios da disciplina atendidos

| Critério | Como foi implementado |
|----------|-----------------------|
| Consumo de API Externa | OpenWeatherMap (clima) + NewsAPI (notícias) |
| Operações de CRUD | LocalStorage salva e recupera cidades favoritas |
| Interface Responsiva | CSS Grid + Media Queries (mobile, tablet, desktop) |
| Manipulação de DOM/Estado | Busca dinâmica, renderização de cards e atualização do gráfico |

---

## Autor

**Gian Coelho** — FATEC Itatiba, 2026
