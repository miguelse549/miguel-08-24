<template>
  <div class="container mx-auto p-4">
    <div v-if="team.length === 0">Tu equipo esta vacío</div>
    <main v-else>
      <Card
        v-for="pokemon in team"
        :key="pokemon.name"
        :name="pokemon.name"
        :image="pokemon.image"
        @click="goToPokemonDetail(pokemon.id)"
      >
        <!-- <div class="w-full bg-gray-500 rounded-md">
          <ul class="flex flex-row px-1">
            <li v-for="stat in pokemon.stats" :key="stat.stat.name">
              <ul class="w-10 p-0.5 mt-1 mx-auto">
                <li
                  v-for="index in 15"
                  :key="index"
                  :class="{
                    'border-gray-200 bg-white h-2 mt-1':
                      index <= Math.floor(stat.base_stat / (100 / 15)),
                    'border-gray-200 bg-blue-400 h-2 mt-1':
                      index > Math.floor(stat.base_stat / (100 / 15)),
                  }"
                ></li>
              </ul>
              <span class="text-white">{{ stat.stat.name }}</span>
            </li>
          </ul>
        </div> -->

        <Stat :stats="pokemon.stats"></Stat>

        <button
          @click="removeFromTeam(pokemon.name)"
          @click.stop
          class="bg-gray-400 hover:bg-red-500 text-white rounded-full absolute top-1 right-1 p-1 z-10"
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
