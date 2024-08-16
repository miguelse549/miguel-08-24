<template>
  <Loading v-if="isLoading" />
  <div class="container mx-auto p-4">
    <main class="cards">
      <Card
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :name="pokemon.name"
        :image="pokemon.image"
        @click="selectPokemon(pokemon)"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useTeamStore } from "../stores/team";
import api from "../services/api";
import { PokemonInterface } from "../services/interfaces";
import Loading from "../components/Loading.vue";
import Card from "../components/Card.vue";

const pokemons = ref<PokemonInterface[]>([]);
const isLoading = ref(false);
const limit = 25;
let offset = 0;

const teamStore = useTeamStore();

const toggleScroll = (block: boolean) => {
  if (block) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const loadMore = async () => {
  try {
    if (offset >= 151) return;

    isLoading.value = true;
    toggleScroll(true);

    const adjustedLimit = Math.min(limit, 151 - offset);
    const response = await api.getPokemon(adjustedLimit, offset);
    const newPokemons: PokemonInterface[] = [];

    for (const pokemon of response.data.results) {
      const details = await api.getPokemonDetails(pokemon.name);

      const pokemonWithImage: PokemonInterface = {
        ...details.data,
        ...pokemon,
        image: details.data.sprites.other.dream_world.front_default,
      };

      console.log(pokemonWithImage);
      newPokemons.push(pokemonWithImage);
    }

    pokemons.value = pokemons.value.concat(newPokemons);

    console.log(pokemons.value);

    offset += adjustedLimit;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
    toggleScroll(false);
  }
};

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.offsetHeight;

  if (
    scrollTop + windowHeight >= docHeight - 1 &&
    pokemons.value.length < 151 &&
    !isLoading.value
  ) {
    loadMore();
  }
};

onMounted(() => {
  loadMore();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const selectPokemon = (pokemon: PokemonInterface) => {
  teamStore.addPokemon(pokemon);
};
</script>

<style scoped>
.cards {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
</style>
