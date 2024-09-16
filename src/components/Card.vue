<template>
  <div
    class="card p-5 cursor-pointer"
    :class="{ 'hover:shadow-personalized': isAnimated }"
  >
    <img
      :src="image"
      :alt="name"
      class="card-image aspect-square p-3 drop-shadow-personalized"
      :class="{ 'hover:z-10 hover:scale-110': isAnimated }"
    />
    <div>
      <h1
        class="text-4xl font-semibold tracking-wide text-gray-700 capitalize py-2"
      >
        {{ name }}
      </h1>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
    default: "",
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  isAnimated: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.card {
  border-radius: 8px;
  overflow: visible;
  text-align: center;
  background-color: white;
  transition: box-shadow 0.3s ease;
  position: relative;
}

.card-image {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}
</style>
