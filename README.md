# @fleetbase/financeiro-engine

Extensão nativa Ember Engine para o Fleetbase Console — módulo de gestão financeira de motoboys da Expresso Neves.

## Arquitetura

Este pacote é um **Ember Engine** que se integra ao Fleetbase Console como módulo nativo, idêntico ao Fleet-Ops, Ledger e Storefront.

```
financeiro-engine/
├── addon/                  # Código da extensão
│   ├── engine.js           # Engine class (Ember Engine)
│   ├── extension.js        # Registro da tab "Financeiro" no header
│   ├── routes.js           # Mapa de rotas
│   ├── controllers/        # Controllers das páginas
│   ├── routes/             # Route handlers
│   ├── templates/          # Templates Handlebars (.hbs)
│   └── styles/             # CSS mínimo (tudo vem do ember-ui)
├── app/                    # Re-exports (padrão Ember addon)
├── config/                 # Configuração do engine
├── extension.json          # Manifesto da extensão Fleetbase
├── Dockerfile              # Multi-stage build
└── package.json            # "fleetbase": { "route": "financeiro" }
```

## Páginas

| Rota | Descrição |
|------|-----------|
| `/financeiro` | Dashboard com KPIs |
| `/financeiro/escalas` | CRUD de escalas de trabalho |
| `/financeiro/lancamentos` | CRUD de lançamentos (combustível, manutenção, etc.) |
| `/financeiro/calculo` | Cálculo semanal por motoboy |
| `/financeiro/creditos` | Gestão de créditos |
| `/financeiro/taxas` | Configuração de taxas |

## Como funciona

1. **`extension.js`** → `menuService.registerHeaderMenuItem('Financeiro', ...)` adiciona a tab no header do console
2. **`application.hbs`** → `<EmberWormhole @to="sidebar-menu-items">` injeta itens na sidebar nativa
3. **Controllers** → Usam `this.fetch.get('int/v1/expresso/...')` para acessar a API Laravel existente
4. **Zero CSS customizado** — tudo herda do design system `@fleetbase/ember-ui`

## Deploy (EasyPanel)

### 1. Apontar o serviço `console` para este repositório

No EasyPanel, configure o serviço `console`:
- **Source**: Git → URL deste repositório
- **Dockerfile path**: `Dockerfile`
- **Build context**: `.`

### 2. Rebuild

Clique em **Rebuild** no EasyPanel. O Dockerfile:
1. Clona o console oficial do Fleetbase
2. Copia este engine para dentro
3. Instala como dependência local
4. Faz `ember build --environment=production`
5. Serve via nginx

### 3. Resultado

A tab "Financeiro" aparecerá no header do console, ao lado de Fleet-Ops e Ledger, com visual 100% nativo.

## API Endpoints Utilizados

| Endpoint | Descrição |
|----------|-----------|
| `GET int/v1/expresso/dashboard` | KPIs do dashboard |
| `GET/POST/DELETE int/v1/expresso/schedules` | CRUD de escalas |
| `GET/POST/DELETE int/v1/expresso/entries` | CRUD de lançamentos |
| `POST int/v1/expresso/calculate` | Cálculo semanal |
| `GET/POST/DELETE int/v1/expresso/credits` | CRUD de créditos |
| `GET/POST int/v1/expresso/rates` | Configuração de taxas |
| `GET int/v1/expresso/drivers` | Lista de motoboys |

## Requisitos

- Node.js 18+
- pnpm 9+
- Fleetbase Console (clonado automaticamente pelo Dockerfile)
