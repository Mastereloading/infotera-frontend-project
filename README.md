# Desafio InfoTera Front-end – Sistema de Reserva de Hotéis

## 🚀 Sobre o Projeto

Este projeto é uma aplicação web de busca e reserva de hotéis, desenvolvida com **Next.js**, **TypeScript** e **Tailwind CSS**. Permite ao usuário buscar destinos, visualizar hotéis disponíveis, conferir detalhes do hotel, selecionar um quarto e preencher os dados de reserva no checkout.

O projeto consome uma **Fake API** fornecida para simulação dos dados.

---

## 🔗 Como Rodar o Projeto

### 1. Clonar o repositório da aplicação

```bash
git clone https://github.com/Mastereloading/infotera-frontend-project.git
cd infotera-frontend-project
```

### 2. Instalar dependências

```bash
pnpm install
```
ou, se você usa npm ou yarn:  
```bash
npm install
# ou
yarn install
```

### 3. Clonar e rodar o servidor Fake API

```bash
git clone https://github.com/enio-infotera/infotera-frontend-test-server
cd infotera-frontend-test-server
pnpm install
pnpm run server
```

- A API estará disponível em `http://localhost:3333`  
- Endpoints principais:
  - `/suggestions` → lista de destinos
  - `/hotels` → lista de hotéis
  - `/hotels/:id` → detalhes de hotel

### 4. Rodar a aplicação

No diretório do seu projeto:

```bash
pnpm dev
```

- Acesse a aplicação em `http://localhost:3000`

---

## ✅ Checklist do Projeto

| Funcionalidade                       | Status |
|--------------------------------------|--------|
| (X) Projeto rodando localmente        | ✅     |
| (X) Navegação entre páginas           | ✅     |
| (X) SearchBar com autocomplete        | ✅     |
| (X) Cards de hotéis estilizados       | ✅     |
| (X) Página de detalhes do hotel       | ✅     |
| (X) Quartos exibidos no mesmo card    | ✅     |
| (X) Responsividade e layout           | ✅     |

---

## 🛠 Próximos Passos / Melhorias

- Finalizar **Redux/Zustand** para salvar quarto selecionado  
- Implementar **formulário de checkout completo** com React Hook Form + Zod  
- Adicionar **animações suaves** para melhorar UX  
- Criar **testes unitários** para componentes críticos  

---