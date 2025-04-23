# 🐉 Dragons-DB

Uma aplicação web para gerenciar um catálogo de dragões, permitindo visualizar, criar, editar e excluir registros de dragões.

## 📋 Conteúdo

- [Sobre o Projeto](#sobre-o-projeto)
- [Objetivos](#objetivos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura e Organização](#arquitetura-e-organização)
- [Como Iniciar](#como-iniciar)
- [Funcionalidades](#funcionalidades)
- [API](#api)

## 🔍 Sobre o Projeto

Dragons-DB é uma aplicação React com TypeScript que permite gerenciar uma base de dados de dragões. O sistema inclui autenticação de usuários, cadastro de dragões, listagem em ordem alfabética, e operações completas de CRUD (Criar, Ler, Atualizar e Deletar).

## 🎯 Objetivos

Este projeto foi desenvolvido atendendo aos seguintes requisitos:

1. **Sistema de Autenticação**:
   - Implementação de página de login, única disponível sem autenticação
   - Sistema de criação de usuário para acesso à aplicação

2. **Gerenciamento de Dragões**:
   - Listagem de dragões organizados em ordem alfabética
   - Funcionalidades de remoção e alteração de informações via interface
   - Cadastro de novos dragões
   - Visualização detalhada incluindo data de criação, nome e tipo

3. **Interface**:
   - Layout totalmente responsivo
   - Design elaborado sem uso de bibliotecas externas como Bootstrap ou Material Design
   - Interface amigável e intuitiva

4. **Qualidade de Código**:
   - Organização estruturada do código
   - Componentização eficiente das páginas
   - Uso adequado de CSS/SASS sem dependências de bibliotecas de estilo externas

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
6. **Rotas Protegidas**: Acesso condicional baseado na autenticação do usuário

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

### Credenciais para Teste

Para acessar a aplicação, você pode usar:
- **Email**: dragondb@email.com
- **Senha**: Dragon12@@

Ou registrar um novo usuário pela interface de cadastro.

## ✨ Funcionalidades

- **Sistema de Autenticação**:
  - Login com validação de campos
  - Cadastro de novos usuários
  - Recuperação de senha
  - Rotas protegidas

- **Gerenciamento de Dragões**:
  - **Listagem**: Exibição em ordem alfabética com paginação
  - **Cadastro**: Formulário para adição de novos dragões
  - **Edição**: Atualização das informações existentes
  - **Remoção**: Exclusão com confirmação
  - **Detalhes**: Visualização completa das informações de cada dragão

- **Interface**:
  - Tema claro/escuro
  - Layout responsivo para diferentes dispositivos
  - Notificações via toast para feedback ao usuário
  - Componentes personalizados sem dependências de UI frameworks externos

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
  imageUrl?: string;
};
```

## 📄 Scripts Disponíveis

- **npm start**: Inicia a aplicação em modo de desenvolvimento
- **npm test**: Executa os testes
- **npm run build**: Gera uma versão de produção otimizada

## 📱 Responsividade

A aplicação foi desenvolvida seguindo o conceito de Mobile First, garantindo uma experiência de usuário adequada em dispositivos com diferentes tamanhos de tela, desde smartphones até desktops.

## ⚠️ Observações Importantes

- Todos os estilos foram implementados manualmente sem uso de bibliotecas como Bootstrap ou Material Design, conforme solicitado
- O projeto está configurado para utilizar TypeScript para maior segurança e manutenibilidade do código
