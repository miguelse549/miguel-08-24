<template>
  <div class="container mx-auto p-4">
    <div v-if="team.length === 0">Tu equipo esta vacío</div>
    <main v-else>
      <Card
        class="card"
        v-for="pokemon in team"
        :key="pokemon.name"
        :name="pokemon.name"
        :image="pokemon.image"
        @click="goToPokemonDetail(pokemon.id)"
      >
        <Stat :stats="pokemon.stats"></Stat>

        <button
          @click="goToPokemonDetail(pokemon.id)"
          @click.stop
          class="bg-gray-400 hover:bg-blue-500 text-white rounded-full absolute top-2 right-14 p-2 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>

        <button
          @click="removeFromTeam(pokemon.name)"
          @click.stop
          class="bg-gray-400 hover:bg-red-600 text-white rounded-full absolute top-2 right-2 p-2 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 6h18" stroke-width="2"></path>
            <path d="M19 6l-1 14H6L5 6" stroke-width="1.5"></path>
            <path d="M10 11v6" stroke-width="1.5"></path>
            <path d="M14 11v6" stroke-width="1.5"></path>
            <path d="M9 6V4h6v2" stroke-width="1.5"></path>
          </svg>
        </button>
      </Card>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useTeamStore } from "../stores/team";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Card from "../components/Card.vue";
import Stat from "../components/Stat.vue";

const teamStore = useTeamStore();
const router = useRouter();

let team: any = computed(() => teamStore.team);

const removeFromTeam = (name: string) => {
  teamStore.removePokemon(name);
};

const goToPokemonDetail = (id: string) => {
  router.push(`/team/${id}`);
};
onMounted(() => {
  team = computed(() => teamStore.team);
});
</script>

<style scoped>
main {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
