<template>
  <div class="card p-5 cursor-pointer">
    <img
      :src="image"
      :alt="name"
      class="card-image aspect-square p-3 drop-shadow-personalized"
    />
    <div>
      <h2 class="text-2xl capitalize py-2">{{ name }}</h2>
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
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: visible;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  position: relative;
}

.card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.card-image {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.card-image:hover {
  transform: scale(1.1);
  z-index: 2;
}
</style>
