import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Team from "../views/Team.vue";
import PokemonDetail from "../views/PokemonDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/team",
    name: "Team",
    component: Team,
  },
  {
    path: "/team/:id",
    name: "PokemonDetail",
    component: PokemonDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
