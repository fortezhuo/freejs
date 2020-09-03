# FREE JS

WIP | Forte React Everywhere for NodeJS

## Features

- Server and Client Monorepo
- Server Side Rendering (SSR)
- Universal Rendering
- Lazy Loading & Code Splitting
- Webpack Dev Server + Hot Reload
- LDAP Auth / Mock Server
- Type safe
- Logging

## Command

- Install : `yarn install`
- Development + LDAP Server : `yarn dev:ldap`
- Build : `yarn build`
- Production + LDAP Server : `yarn start:ldap`

## Scaffolding Folder

- core : client component, store management, and screen
- env : share env variable
- ldapmock : ldap mocking server
- logger : custom fastify logger
- mobile : react native (ios/android) folder
- server : server instance with session / routes / ssr
- web : react native web folder

## Stacks

### Backend

- Fastify
- LDAP JS
- MongoDB

### Frontend

- React Hooks
- React Native/Web
- React Router Native/DOM
- State Management MobX
- Tailwind Style

## Todos

### Backend

- [x] Integrate Fastify and Webpack Dev Server
- [x] Favicon, Session, Compress GZIP
- [x] Server Side Rendering / SSR
- [x] Lazy Loading Code Splitting
- [x] Optimized Webpack Production (size below 244KB)
- [x] Pretty Logging
- [x] LDAP Auth / Login
- [x] LDAP Mock Server
- [x] MongoDB Connect / Services
- [x] Roles
- [ ] ACL Bind
- [ ] Safe Delete / Trash Management
- [ ] Mail Service
- [ ] Workflow Engine
- [ ] Mail Engine
- [ ] Attachment

### Frontend

- [x] Accordion
- [x] AppLayout, Header, Title, Content, Footer
- [x] Button / Action Bar
- [x] Drawer / Sidebar
- [x] Form Layout, Row, Col Responsive
- [x] Icon
- [x] Input Text
- [ ] Input Textarea
- [x] Input Select
- [ ] Input Select Async
- [ ] Input Select Creatable
- [ ] Input Select Async Creatable
- [x] Input Checkbox
- [ ] Input Radio
- [x] Input DateTime
- [x] Loader
- [x] Menu
- [x] Modal
- [x] Routes
- [ ] Section
- [x] Snackbar
- [x] Table
- [ ] Table Sortable
- [ ] Table Filterable
- [ ] Table Paging
- [x] Text
