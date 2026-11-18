<template>
  <main class="directory-page py-5">
    <b-container>
      <header class="directory-header mb-4">
        <div>
          <p class="eyebrow">ANIMALEC · ADMINISTRAÇÃO · TAREFA 3.1B</p>
          <h1>Patrocinadores</h1>
          <p>Organizações que apoiam o projeto educativo Animalec.</p>
        </div>
        <nav aria-label="Navegação de administração" class="directory-nav">
          <router-link class="btn btn-outline-secondary" :to="{ name: 'admin' }">Voltar à Administração</router-link>
          <router-link class="btn btn-outline-info" :to="{ name: 'adminExperts }">Experts</router-link>
        </nav>
      </header>
      <b-alert show variant="info">Protótipo HTML5/Vue.js — dados demonstrativos guardados apenas neste navegador.</b-alert>
      <section class="directory-panel mb-4" aria-labelledby="directory-filter-title">
        <div class="directory-bar">
          <div>
            <h2 id="directory-filter-title" class="h5 mb-1">Pesquisa e filtros</h2>
            <small>{{ filtered.length }} de {{ items.length }} registo(s)</small>
          </div>
          <button class="btn btn-warning" type="button" @click="beginCreate">+ Novo registo</button>
        </div>
        <div class="filter-row mt-3">
          <label class="sr-only" for="directory-search">Pesquisar</label>
          <input id="directory-search" v-model.trim="search" type="search" class="form-control" placeholder="Pesquisar por nome ou área..." />
          <label class="sr-only" for="directory-status">Filtrar por estado</label>
          <select id="directory-status" v-model="statusFilter" class="form-control">
            <option value="Todos">Todos os estados</option><option value="Ativo">Ativos</option><option value="Inativo">Inativos</option>
          </select>
        </div>
      </section>
      <section v-if="editing" class="directory-panel mb-4" aria-labelledby="directory-form-title">
        <h2 id="directory-form-title" class="h4">{{ form.id ? 'Editar registo' : 'Novo registo' }}</h2>
        <form @submit.prevent="saveRecord">
          <div class="form-group"><label for="sponsors-name">Nome / organização</label><input id="sponsors-name" v-model.trim="form.name" class="form-control" type="text" maxlength="180" required /></div>
          <div class="form-group"><label for="sponsors-sector">Área de atividade</label><input id="sponsors-sector" v-model.trim="form.sector" class="form-control" type="text" maxlength="180" required /></div>
          <div class="form-group"><label for="sponsors-website">Website</label><input id="sponsors-website" v-model.trim="form.website" class="form-control" type="url" maxlength="180"  /></div>
          <div class="form-group"><label for="sponsors-email">E-mail</label><input id="sponsors-email" v-model.trim="form.email" class="form-control" type="email" maxlength="180" required /></div>
          <div class="form-group"><label for="sponsors-support">Tipo de apoio</label><input id="sponsors-support" v-model.trim="form.support" class="form-control" type="text" maxlength="180"  /></div>
          <div class="form-group"><label for="directory-record-status">Estado</label>
            <select id="directory-record-status" v-model="form.status" class="form-control"><option>Ativo</option><option>Inativo</option></select>
          </div>
          <div class="actions"><button class="btn btn-success" type="submit">Guardar</button><button type="button" class="btn btn-outline-secondary" @click="editing = false">Cancelar</button></div>
        </form>
      </section>
      <section aria-labelledby="directory-list-title">
        <h2 id="directory-list-title" class="h4 mb-3">Registos</h2>
        <p v-if="!filtered.length" class="directory-panel">Não foram encontrados registos.</p>
        <div v-else class="directory-grid">
          <article v-for="item in filtered" :key="item.id" class="directory-card">
            <div class="directory-card-head"><h3>{{ item.name }}</h3><span :class="['state-pill', item.status === 'Ativo' ? 'active' : '']">{{ item.status }}</span></div>
            <p><strong>Área:</strong> {{ item.sector }}</p>
            <p v-if="item.support"><strong>Apoio:</strong> {{ item.support }}</p>
            <p v-if="item.email"><strong>E-mail:</strong> {{ item.email }}</p>
            <div class="actions"><button class="btn btn-sm btn-outline-primary" @click="beginEdit(item)">Editar</button><button class="btn btn-sm btn-outline-danger" @click="deleteRecord(item)">Eliminar</button></div>
          </article>
        </div>
      </section>
    </b-container>
  </main>
</template>
<script>
import { directory } from "@/services/directory31b";
const fresh = () => ({ id: "", name: "", sector: "", website: "", email: "", support: "", status: "Ativo" });
export default {
  name: "AdminSponsors",
  data() { return { search: "", statusFilter: "Todos", editing: false, form: fresh() }; },
  computed: {
    items() { return directory.state.sponsors; },
    filtered() {
      const q = this.search.toLocaleLowerCase("pt-PT");
      return this.items.filter(item => {
        const matches = [item.name, item.sector].some(value => String(value || "").toLocaleLowerCase("pt-PT").includes(q));
        return matches && (this.statusFilter === "Todos" || item.status === this.statusFilter);
      });
    }
  },
  methods: {
    beginCreate() { this.form = fresh(); this.editing = true; },
    beginEdit(item) { this.form = { ...item }; this.editing = true; window.scrollTo({ top: 0, behavior: "smooth" }); },
    saveRecord() { directory.upsert("sponsors", this.form); this.editing = false; this.form = fresh(); },
    deleteRecord(item) {
      if (window.confirm(`Eliminar o registo de ${item.name}?`)) directory.remove("sponsors", item.id);
    }
  }
};
</script>
<style scoped>
.directory-page { min-height: 86vh; background: #f3fafb; color: #163d54; }
.directory-header { display:flex; justify-content:space-between; align-items:center; gap:18px; flex-wrap:wrap; }
.directory-header h1 { font-size: clamp(2rem, 4vw, 2.8rem); font-weight:800; }
.eyebrow { color:#008b9c; font-weight:800; letter-spacing:.1em; font-size:.76rem; }
.directory-nav, .actions { display:flex; flex-wrap:wrap; gap:10px; }
.directory-panel, .directory-card { background:white; border:1px solid #dcebf0; border-radius:17px; padding:24px; box-shadow:0 8px 22px rgba(20,60,85,.06); }
.directory-bar { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
.filter-row { display:grid; grid-template-columns:minmax(0,2fr) minmax(170px,1fr); gap:12px; }
.directory-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:18px; }
.directory-card-head { display:flex; align-items:start; justify-content:space-between; gap:12px; }
.directory-card h3 { font-size:1.18rem; font-weight:750; }
.state-pill { padding:4px 9px; border-radius:999px; background:#edf0f3; font-size:.74rem; }
.state-pill.active { background:#d5f6e9; color:#067753; }
.directory-card p { overflow-wrap:anywhere; }
@media (max-width:600px) { .directory-panel,.directory-card {padding:17px;} .filter-row {grid-template-columns:1fr;} .directory-nav {width:100%;} }
</style>
