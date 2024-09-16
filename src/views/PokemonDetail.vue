<template>
  <div class="container mx-auto p-4">
    <Modal v-if="showModal">
      <form @submit.prevent="updatePokemon">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input type="text" id="name" v-model="pokemonEdit.name" required />
        </div>

        <div class="form-group">
          <label for="height">Altura</label>
          <input
            type="number"
            id="height"
            v-model="pokemonEdit.height"
            required
          />
        </div>

        <div class="form-group">
          <label for="weight">Peso</label>
          <input
            type="number"
            id="weight"
            v-model="pokemonEdit.weight"
            required
          />
        </div>

        <div class="form-group">
          <label for="type">Descripción</label>
          <textarea v-model="pokemonEdit.description" required />
        </div>

        <div class="flex gap-3">
          <button type="submit" class="btn-save">Guardar</button>
          <button @click.prevent="cancelEdit" class="btn-cancel">
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
    <Loading v-if="isLoading" />
    <div v-else>
      <div class="grid grid-cols-2 gap-4 lg:w-full xl:w-3/4 mx-auto">
        <div
          class="bg-white p-4 relative text-black col-span-2 md:col-span-1 rounded-lg shadow-personalized"
        >
          <button
            @click="editFromPokemon(pokemon.id)"
            @click.stop
            class="bg-gray-400 absolute top-2 right-2 rounded-full p-2 z-10 hover:bg-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                d="M3 21v-2.586l11.293-11.293 2.586 2.586L5.586 21H3zm17.707-14.293l-2-2a1 1 0 00-1.414 0L15 5.586l2.586 2.586 2.293-2.293a1 1 0 000-1.414z"
                fill="white"
              />
            </svg>
          </button>
          <h1
            class="text-4xl font-semibold tracking-wide text-gray-700 mb-4 align-self-start capitalize"
          >
            {{ pokemon?.name }}
          </h1>

          <div class="flex items-center justify-center flex-col lg:flex-row">
            <img
              class="drop-shadow-personalized h-64 aspect-square"
              :src="pokemon?.image"
              alt=""
            />
            <div
              class="text-sm mt-4 text-gray-500 px-5 w-full overflow-hidden break-words"
            >
              <p class="mb-2">
                <span class="text-gray-700 text-base font-semibold"
                  >Descripción:</span
                >
                {{ pokemon?.description }}
              </p>

              <p>
                <span class="text-gray-700 text-base font-semibold"
                  >Altura:</span
                >
                {{ pokemon?.height }}
              </p>
              <p>
                <span class="text-gray-700 text-base font-semibold">Peso:</span>
                {{ pokemon?.weight }}
              </p>
              <p>
                <span class="text-gray-700 text-base font-semibold"
                  >Tipos:</span
                >
                {{ pokemon?.types.map((t) => t.type.name).join(", ") }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white p-4 text-gray-700 col-span-2 md:col-span-1 rounded-lg px-9 shadow-personalized"
        >
          <h2
            class="text-md mt-6 mb-4 text-center text-xl font-semibold tracking-wide"
          >
            Estadísticas
          </h2>
          <Stat :stats="pokemon?.stats"></Stat>

          <h2 class="text-md mt-2 mb-4 text-center text-xl font-semibold">
            Sonidos
          </h2>

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
          class="bg-white p-4 text-gray-700 col-span-2 rounded-lg shadow-personalized"
        >
          <h2 class="text-md mb-4 text-xl font-semibold ttext-gray-700">
            Cadena Evolutiva
          </h2>
          <div class="flex items-center justify-center flex-col md:flex-row">
            <div
              v-for="(pokemon, index) in evolutionChain"
              :key="index"
              class="flex flex-col justify-center md:flex-row items-center"
            >
              <div class="text-center flex flex-col items-center">
                <img
                  :src="getPokemonImage(pokemon.url)"
                  alt=""
                  class="aspect-square h-36 p-4 drop-shadow-personalized border-2 border-black rounded-3xl"
                />

                <p class="text-gray-700 capitalize font-medium">
                  {{ pokemon.name }}
                </p>
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
import Modal from "../components/Modal.vue";
import { useTeamStore } from "../stores/team";
import api from "../services/api";
import { usePlayCry } from "../composables/usePlayCry";
import { PokemonInterface } from "../services/interfaces";
const { playCry } = usePlayCry();

const route = useRoute();
const router = useRouter();
const teamStore = useTeamStore();
const pokemon = ref();
const evolutionChain = ref();
const isLoading = ref(false);
const showModal = ref(false);

const pokemonEdit = ref<PokemonInterface>({
  id: 0,
  name: "",
  height: 0,
  weight: 0,
  description: "",
});

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
  return evolutionChain;
};

const editFromPokemon = (id: string) => {
  const pokemonId = id;
  teamStore.getPokemonDetail(pokemonId);
  if (teamStore.selectedPokemon) {
    pokemonEdit.value = { ...teamStore.selectedPokemon }; // Copiar los datos
  }
  showModal.value = true;
};

const updatePokemon = () => {
  teamStore.updatePokemon(pokemonEdit.value); // Actualizar en el store
  showModal.value = false; // Navegar de vuelta al equipo
  teamStore.getPokemonDetail(pokemonEdit.value.id);
  pokemon.value = teamStore.selectedPokemon;
};

// Método para cancelar la edición
const cancelEdit = () => {
  showModal.value = false;
};
</script>

<style scoped>
.edit-pokemon {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: none;
  min-height: 150px;
}

.btn-save,
.btn-cancel {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
}

.btn-save {
  background-color: #4caf50;
  color: white;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.btn-save:hover,
.btn-cancel:hover {
  opacity: 0.8;
}
</style>
