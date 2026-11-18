# Tarefa_3.1b — Animalec+ | Sponsors e Experts

## Objetivo
Extensão do Back-office da plataforma Animalec com as entidades **Sponsors** (patrocinadores) e **Experts** (especialistas). Inclui wireframes e mockups **editáveis no draw.io** para desktop e mobile e protótipos HTML5.

## Modelo de dados proposto
- **Sponsor**: identificador interno, nome/organização, área de atividade, website, e-mail, tipo de apoio, estado (ativo/inativo).
- **Expert**: identificador interno, nome, especialidade, instituição, e-mail, breve apresentação, estado (ativo/inativo).

## Funcionalidades e fluxos
Administração → Sponsors/Experts → listar → pesquisar/filtrar → criar/editar/eliminar → voltar à Administração. Formulários com validação HTML5 (campos obrigatórios, e-mail, URL). Confirmação antes de eliminar. Layout adaptativo.

## Artefactos
- `documentacao/wireframes/`: 4 ficheiros `.drawio` (duas entidades × desktop/mobile), baixa fidelidade.
- `documentacao/mockups/`: 4 ficheiros `.drawio` (duas entidades × desktop/mobile), alta fidelidade visual.
- `prototipos_html5/`: 2 documentos HTML5 autónomos com navegação/CRUD local demonstrativo. Podem ser abertos diretamente no navegador.
- `src/views/Admin.vue`: seis cartões na Administração (quatro originais e dois novos).
- `src/views/AdminSponsors.vue` e `AdminExperts.vue`: protótipos integrados em Vue 2 usando marcação semântica HTML5.
- `src/services/directory31b.js`: persistência demonstrativa local (`localStorage`).
- `src/router/index.js`: rotas `/admin/sponsors` e `/admin/experts`.

## Git
Url do projecto: https://github.com/ednacarreiro/Tarefa_3.1b.git