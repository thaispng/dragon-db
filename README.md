# 🐉 Dragons-DB

Uma aplicação web para gerenciar um catálogo de dragões, permitindo visualizar, criar, editar e excluir registros de dragões.

## 📋 Conteúdo

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura e Organização](#arquitetura-e-organização)
- [Como Iniciar](#como-iniciar)
- [Funcionalidades](#funcionalidades)
- [API](#api)

## 🔍 Sobre o Projeto

Dragons-DB é uma aplicação React com TypeScript que permite gerenciar uma base de dados de dragões. O sistema inclui autenticação de usuários, cadastro de dragões com imagens, listagem com paginação, e operações completas de CRUD (Criar, Ler, Atualizar e Deletar).

## 💻 Tecnologias Utilizadas

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript
- **React Router v7** - Roteamento da aplicação
- **TanStack Query (React Query)** - Gerenciamento de estado e cache para requisições
- **Axios** - Cliente HTTP para requisições à API
- **CSS Modules** - Estilização com escopo local
- **Lucide React** - Biblioteca de ícones
- **Testing Library** - Framework para testes

## 🏗️ Arquitetura e Organização

O projeto segue uma arquitetura baseada em componentes com separação clara de responsabilidades:

```
src/
  ├── assets/             # Recursos estáticos (imagens, estilos globais)
  ├── components/         # Componentes reutilizáveis da UI
  ├── context/            # Contextos React (autenticação, tema)
  ├── features/           # Páginas da aplicação
  ├── hooks/              # Hooks personalizados e queries
  ├── lib/                # Utilitários e funções auxiliares
  ├── routes/             # Configuração de rotas
  ├── services/           # Serviços de comunicação com a API
  ├── types/              # Definições de tipos TypeScript
  └── utils/              # Funções utilitárias
```

### Principais Padrões Arquiteturais:

1. **Componentes Reutilizáveis**: Componentes de UI modulares e reutilizáveis
2. **Context API**: Gerenciamento de estado global para temas e autenticação
3. **Custom Hooks**: Encapsulamento da lógica de negócios e requisições à API
4. **Páginas por Funcionalidade**: Organização das páginas baseada em funcionalidades
5. **Sistema de Tema**: Suporte a temas claro e escuro

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/dragons-db.git
   cd dragons-db
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie a aplicação em modo de desenvolvimento:
   ```bash
   npm start
   # ou
   yarn start
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar a aplicação.

## ✨ Funcionalidades

- **Autenticação**: Registro, login e recuperação de senha
- **Lista de Dragões**: Visualização paginada com busca e filtragem
- **Gerenciamento de Dragões**: Criação, edição e exclusão
- **Tema**: Alternância entre tema claro e escuro
- **Responsividade**: Interface adaptável a diferentes tamanhos de tela

## 🔌 API

O projeto utiliza uma API mockada disponível em:
```
http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon
```

### Estrutura de dados do Dragão:
```typescript
type Dragon = {
  id: string;
  createdAt: string;
  name: string;
  type: string;
  histories: string[];
  imageUrl: string;
};
```

## 📄 Scripts Disponíveis

- **npm start**: Inicia a aplicação em modo de desenvolvimento
- **npm test**: Executa os testes
- **npm run build**: Gera uma versão de produção otimizada
