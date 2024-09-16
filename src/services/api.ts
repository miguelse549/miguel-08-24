import axios from "axios";
import { ref } from "vue";

export const isLoading = ref(false);

const apiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    isLoading.value = true;
    return config;
  },
  (error) => {
    isLoading.value = false;
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    isLoading.value = false;
    return response;
  },
  (error) => {
    isLoading.value = false;

    if (error.response) {
      alert("error por el servidor");
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor.");
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    return Promise.reject(error);
  }
);

export default {
  getPokemon(limit, offset) {
    return apiClient.get(`/pokemon?limit=${limit}&offset=${offset}`);
  },
  getPokemonDetails(id) {
    return apiClient.get(`/pokemon/${id}`);
  },

  getPokemonSpecies(id) {
    return apiClient.get(`/pokemon-species/${id}`);
  },
  getEvolutionChain(id) {
    return apiClient.get(`/evolution-chain/${id}`);
  },
};
