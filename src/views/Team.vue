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
        <Stat
          v-for="stat in pokemon.stats"
          :key="stat.stat.name"
          :baseStat="stat.base_stat"
          :stateName="stat.stat.name"
        ></Stat>

        <div
          v-for="(cryUrl, cryKey) in pokemon.cries"
          :key="cryKey"
          class="mt-4 inline-flex"
        >
          <button
            @click="playCry(cryUrl)"
            @click.stop
            class="bg-gray-400 text-white rounded-full mb-2 mx-2 p-2 hover:bg-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="24"
              height="24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5L6 9H2v6h4l5 4V5zM15 9v6m2-4a4 4 0 010 4m0-8a8 8 0 010 8"
              />
            </svg>
            <!-- {{ translateCryKey(cryKey) }} -->
          </button>
        </div>
        <button
          @click="removeFromTeam(pokemon.name)"
          @click.stop
          class="bg-red-500 text-white absolute top-1 right-1 rounded-md p-1 z-10"
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
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
import { usePlayCry } from "../composables/usePlayCry";
const { playCry } = usePlayCry();

const teamStore = useTeamStore();
const router = useRouter();

let team = computed(() => teamStore.team);

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
