<template>
  <div class="container mx-auto p-4">
    <Loading v-if="isLoading" />
    <div v-else>
      <div class="grid grid-cols-2 gap-4">
        <div
          class="bg-slate-200 p-4 text-black col-span-2 md:col-span-1 rounded-lg flex flex-col justify-center items-center shadow-xl"
        >
          <h1 class="text-2xl mb-4 align-self-start">{{ pokemon?.name }}</h1>

          <img
            class="drop-shadow-personalized h-80"
            :src="pokemon?.image"
            alt=""
          />
          <div class="text-sm mt-4 text-gray-400 px-5">
            <p class="mb-2">
              <span class="text-black">Descripción:</span>
              {{ pokemon?.description }}
            </p>

            <p><span class="text-black">Altura:</span> {{ pokemon?.height }}</p>
            <p><span class="text-black">Peso:</span> {{ pokemon?.weight }}</p>
            <p>
              <span class="text-black">Tipos:</span>
              {{ pokemon?.types.map((t) => t.type.name).join(", ") }}
            </p>
          </div>
        </div>

        <div
          class="bg-slate-300 p-4 text-black col-span-2 md:col-span-1 rounded-lg px-9 shadow-md"
        >
          <h2 class="text-md mt-6 mb-4 text-center">Estadísticas</h2>

          <Stat
            v-for="stat in pokemon?.stats"
            :key="stat.stat.name"
            :baseStat="stat.base_stat"
            :stateName="stat.stat.name"
          ></Stat>

          <h2 class="text-md mt-2 mb-4 text-center">Sonidos</h2>

          <div
            v-for="(cryUrl, cryKey) in pokemon?.cries"
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
            </button>
          </div>
        </div>

        <div
          class="bg-slate-200 p-4 text-black col-span-2 rounded-lg shadow-xl"
        >
          <h2 class="text-md mb-4">Cadena Evolutiva</h2>
          <div class="flex items-center justify-center flex-col md:flex-row">
            <div
              v-for="(pokemon, index) in evolutionChain"
              :key="index"
              class="flex flex-col justify-center md:flex-row items-center"
            >
              <div class="text-center flex flex-col items-center border">
                <img
                  :src="getPokemonImage(pokemon.url)"
                  alt=""
                  class="aspect-square h-36 p-4 drop-shadow-personalized"
                />
                <p>{{ pokemon.name }}</p>
              </div>
              <div
                v-if="index < evolutionChain.length - 1"
                class="mx-4 text-xl rotate-90 md:rotate-0"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M8 4l8 8-8 8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loading from "../components/Loading.vue";
import Stat from "../components/Stat.vue";
import { useTeamStore } from "../stores/team";
import api from "../services/api";
import { useTranslations } from "../composables/useTranslations";
import { usePlayCry } from "../composables/usePlayCry";
import { PokemonInterface } from "../services/interfaces";

const { translateCryKey } = useTranslations();
const { playCry } = usePlayCry();

const route = useRoute();
const router = useRouter();
const teamStore = useTeamStore();
const pokemon = ref<PokemonInterface | null>(null);
const evolutionChain = ref(null);
const isLoading = ref(false);

onMounted(async () => {
  if (
    teamStore.team.length === 0 ||
    teamStore.team.some((p: any) => p.id === route.params.id)
  ) {
    router.go(-1);
    return;
  }

  try {
    isLoading.value = true;
    const id = Number(route.params.id);

    const speciesResponse = await api.getPokemonSpecies(id);
    const flavorTextEntry = speciesResponse.data.flavor_text_entries.find(
      (entry: any) => entry.language.name === "es"
    );

    const description = flavorTextEntry
      ? flavorTextEntry.flavor_text
      : "Descripción no disponible";

    const idChain = speciesResponse.data.evolution_chain.url
      .split("/")
      .filter(Boolean)
      .pop();

    const chainResponse = await api.getEvolutionChain(idChain);
    evolutionChain.value = parseEvolutionChain(chainResponse.data.chain);
    console.log(evolutionChain.value, "evolutionChain.value");

    teamStore.getPokemonDetail(id);
    pokemon.value = teamStore.selectedPokemon;
    if (pokemon.value) {
      pokemon.value.description = description;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});

const getPokemonImage = (url: string) => {
  const id = url.split("/").filter(Boolean).pop();
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
};

const parseEvolutionChain = (chain: any) => {
  console.log(chain, "chain");
  const evolutionChain: any = [];

  for (
    let currentChain = chain;
    currentChain;
    currentChain = currentChain.evolves_to[0]
  ) {
    evolutionChain.push({
      name: currentChain.species.name,
      url: currentChain.species.url,
    });

    if (currentChain.evolves_to.length === 0) {
      break;
    }
  }

  console.log(evolutionChain, "evolutionChain");
  return evolutionChain;
};
</script>
