<template>
  <div class="stat-container h-screenl">
    <label class="text-base font-semibold text-start text-black">
      {{ translateStatKey(stateName) }}
      <span class="text-base text-red-500">
        {{ scaleStat(baseStat) }}
      </span>
    </label>
    <input
      type="range"
      :value="scaleStat(baseStat)"
      min="0"
      max="100"
      class="w-full"
      disabled
    />
  </div>
</template>

<script setup lang="ts">
import { useTranslations } from "../composables/useTranslations";
import { useStats } from "../composables/useStats";

const { translateStatKey } = useTranslations();
const { scaleStat } = useStats();

defineProps({
  stateName: {
    type: String,
    required: true,
  },
  baseStat: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped></style>
