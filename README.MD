# FREE JS

Forte React Everywhere for NodeJS

## Work in Progress | WIP

FreeJS is considered unstable. The API could change or be removed in future

## Features

- Server and Client Monorepo
- Server Side Rendering (SSR)
- Universal Rendering
- Universal Access Control List (ACL)
- Lazy Loading & Code Splitting
- Webpack Dev Server + Hot Reload
- LDAP Auth / Mock Server
- Type safe
- Logging

## Command

- Install : `yarn install`
- Development + Mock LDAP & SMTP Server : `yarn dev`
- Build : `yarn build`
- Production + Mock LDAP & SMTP Server : `yarn start:mock`

## Scaffolding Folder

- core : client component, store management, and screen
- env : share env variable
- mock : ldap & smtp mocking server
- logger : custom fastify logger
- mobile : react native (ios/android) folder
- server : server instance with session / routes / ssr
- web : react native web folder

## Stacks

### Backend

- Fastify
- LDAP JS
- MongoDB
- NodeMailer

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
- [ ] LDAP Name Search
- [x] LDAP Mock Server
- [x] SMTP Mock Server
- [x] MongoDB Connect / Services
- [x] Customize Database Service Hooks
- [x] Roles
- [x] ACL Integration with MongoDB service
- [x] ACL Readers Field Lotus Notes Style
- [ ] ACL Authors Field Lotus Notes Style (Editable)
- [ ] Safe Delete / Trash Management
- [ ] Mail Service
- [ ] Workflow Engine
- [ ] Mail Engine
- [ ] Attachment

### Frontend

- [x] Accordion
- [x] AppLayout, Header, Title, Content, Footer
- [ ] Authentication (Face ID / Fingerprint)
- [x] Button / Action Bar
- [x] Button / Action Bar for Mobile
- [ ] Carousel
- [ ] Charts
- [x] Drawer / Sidebar
- [x] Form Layout, Row, Col Responsive
- [x] Gesture Handler
- [x] Icon
- [x] Input Text
- [ ] Input Textarea
- [x] Input Password
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
- [ ] Push Notification (FCM/APN)
- [x] Routes
- [ ] Screen Home
- [x] Screen Login
- [x] Screen View
- [ ] Screen Error 404
- [x] Screen Error 500
- [x] Section
- [ ] Section Swipe and Button Navigation for Mobile
- [x] Snackbar
- [x] Table
- [ ] Table Sortable
- [ ] Table Filterable
- [ ] Table Paging
- [ ] Table for Mobile, Swipe for Delete
- [x] Text
