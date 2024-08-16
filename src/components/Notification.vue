<template>
  <teleport to="body">
    <div
      v-if="isVisible"
      class="fixed left-1/2 bottom-4 transform -translate-x-1/2 w-96 z-50 px-8 md:px-0"
    >
      <div
        class="bg-gray-200 p-4 rounded shadow-lg border border-gray-500 flex items-center justify-between"
      >
        <p class="text-gray-700 text-xs">{{ description }}</p>
        <button @click="hide" class="ml-4 p-2 bg-red-500 text-white rounded">
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
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed, watch } from "vue";
import { useTeamStore } from "../stores/team";

const store = useTeamStore();
const isVisible = computed(() => store.showOverlay);
const description = computed(() => store.overlayDescription);

const hide = () => {
  store.showOverlay = false;
};

watch(isVisible, (newValue) => {
  if (newValue) {
    setTimeout(hide, 3000);
  }
});
</script>
