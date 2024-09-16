<template>
  <div class="w-full bg-gray-400 rounded-md">
    <ul class="flex flex-row justify-center px-1">
      <li v-for="stat in stats" :key="stat.stat.name" class="w-32">
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
        <p class="text-white text-center">
          {{ translateStatKey(stat.stat.name) }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTranslations } from "../composables/useTranslations";
const { translateStatKey } = useTranslations();
import { StatInterface } from "../services/interfaces";

const props = defineProps<{
  stats: StatInterface[];
}>();
</script>

<style scoped>
p {
  font-size: 10px;
}
</style>
