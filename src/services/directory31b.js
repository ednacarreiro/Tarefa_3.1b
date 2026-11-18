// Prova de conceito académica: dados de Sponsors e Experts apenas no localStorage.
// Não é uma API, nem garante partilha entre utilizadores/dispositivos.
import Vue from "vue";

const defaults = {
  sponsors: [
    { id: "sp-1", name: "Patrocinador Exemplo", sector: "Educação ambiental", website: "https://example.org", email: "contacto@example.org", support: "Apoio educativo", status: "Ativo" }
  ],
  experts: [
    { id: "ex-1", name: "Especialista Exemplo", specialty: "Biologia marinha", institution: "Centro de Estudos Exemplo", email: "especialista@example.org", bio: "Colabora na revisão de conteúdos educativos sobre animais.", status: "Ativo" }
  ]
};
const state = Vue.observable({ sponsors: [], experts: [] });
function key(kind) { return `animalec:tarefa31b:${kind}:v1`; }
function read(kind) {
  try {
    const raw = localStorage.getItem(key(kind));
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : defaults[kind].slice();
    }
  } catch (error) { /* Armazenamento indisponível: usar os exemplos em memória. */ }
  return defaults[kind].map(item => ({ ...item }));
}
function save(kind) {
  try { localStorage.setItem(key(kind), JSON.stringify(state[kind])); }
  catch (error) { /* Dados continuam acessíveis em memória nesta sessão. */ }
}
["sponsors", "experts"].forEach(kind => { state[kind] = read(kind); });
export const directory = {
  state,
  upsert(kind, record) {
    if (!Object.prototype.hasOwnProperty.call(defaults, kind)) return;
    const row = { ...record, id: record.id || `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    const index = state[kind].findIndex(item => item.id === row.id);
    if (index >= 0) state[kind].splice(index, 1, row);
    else state[kind].push(row);
    save(kind);
  },
  remove(kind, id) {
    if (!Object.prototype.hasOwnProperty.call(defaults, kind)) return;
    const index = state[kind].findIndex(item => item.id === id);
    if (index >= 0) state[kind].splice(index, 1);
    save(kind);
  }
};
