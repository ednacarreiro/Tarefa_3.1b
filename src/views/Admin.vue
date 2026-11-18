<template>
  <main class="page-section admin-31b">
    <b-container>
      <HeaderPage title="Gestão do Animalec" />
      <p class="text-center text-muted">Back-office · Gestão de conteúdos e colaboradores</p>
      <b-row class="mt-4">
        <b-col v-for="item in options" :key="item.routeName" cols="12" sm="6" lg="4" class="mb-4">
          <router-link :to="{ name: item.routeName }" class="admin-31b-card">
            <i :class="'fas fa-' + item.iconName" aria-hidden="true"></i>
            <strong>{{ item.title }}</strong>
            <small>{{ item.description }}</small>
          </router-link>
        </b-col>
      </b-row>
      <p class="text-center text-muted small">Sponsors e Experts: prova de conceito com registos guardados neste navegador.</p>
    </b-container>
  </main>
</template>
<script>
import HeaderPage from "@/components/HeaderPage.vue";
export default {
  name: "Admin",
  components: { HeaderPage },
  data() {
    return { options: [
      { routeName: "listUsers", iconName: "users", title: "Utilizadores", description: "Gestão dos utilizadores" },
      { routeName: "listAnimals", iconName: "dog", title: "Animais", description: "Catálogo de animais" },
      { routeName: "listQuizzes", iconName: "file-alt", title: "Quizzes", description: "Desafios educativos" },
      { routeName: "listQuestions", iconName: "question-circle", title: "Questões", description: "Perguntas dos quizzes" },
      { routeName: "adminSponsors", iconName: "handshake", title: "Sponsors", description: "Patrocinadores e parcerias" },
      { routeName: "adminExperts", iconName: "user-graduate", title: "Experts", description: "Especialistas e áreas de conhecimento" }
    ] };
  }
};
</script>
<style scoped>
.admin-31b { background: #f2fafb; min-height: 85vh; color: #143c55; }
.admin-31b-card { display: flex; flex-direction: column; gap: 10px; min-height: 180px; background: white; border: 1px solid #dcebef; border-radius: 18px; padding: 25px; text-decoration: none; color: #143c55; box-shadow: 0 10px 32px rgba(20,60,85,.07); transition: transform .2s; }
.admin-31b-card:hover, .admin-31b-card:focus { transform: translateY(-3px); text-decoration: none; color: #006e83; }
.admin-31b-card i { color: #008e9f; font-size: 2.5rem; }
.admin-31b-card strong { font-size: 1.25rem; }
.admin-31b-card small { color: #54717d; }
</style>
