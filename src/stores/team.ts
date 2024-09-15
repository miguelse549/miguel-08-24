import { defineStore } from "pinia";
import { ref } from "vue";
import { PokemonInterface } from "../services/interfaces";

export const useTeamStore = defineStore("team", {
  state: () => ({
    team: <PokemonInterface[]>[],
    selectedPokemon: ref<PokemonInterface | null>(null),
    showOverlay: ref(false),
    overlayDescription: ref(""),
  }),
  actions: {
    addPokemon(pokemon: PokemonInterface) {
      const exists = this.team.some((p) => p.name === pokemon.name);

      if (this.team.length === 6) {
        this.showOverlay = true;
        this.overlayDescription = "El equipo ya tiene 6 pokemones";
        return;
      }

      if (exists) {
        this.showOverlay = true;
        this.overlayDescription = `El equipo ya tiene este pokemon: ${pokemon.name}`;
        return;
      }
      if (!exists && this.team.length < 6) {
        this.showOverlay = true;
        this.overlayDescription = `Pokemon agregado: ${pokemon.name}`;
        this.team.push(pokemon);
        return;
      }
    },
    removePokemon(name) {
      this.team = this.team.filter((p) => p.name !== name);
    },

    getPokemonDetail(id) {
      this.selectedPokemon = this.team.find((p) => p.id === id) || null;
    },

    updatePokemon(updatedPokemon: PokemonInterface) {
      const index = this.team.findIndex((p) => p.id === updatedPokemon.id);

      if (index !== -1) {
        // Si el Pokémon existe en el equipo, actualizamos sus datos
        this.team[index] = { ...this.team[index], ...updatedPokemon };
        this.showOverlay = true;
        this.overlayDescription = `Pokémon actualizado: ${updatedPokemon.name}`;
      } else {
        // Si no se encuentra el Pokémon, mostramos un mensaje
        this.showOverlay = true;
        this.overlayDescription = `Pokémon no encontrado en el equipo.`;
      }
    },
  },
});
