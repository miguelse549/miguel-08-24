<template>
  <div>
    <Navbar class="sticky top-0 right-0 left-0 z-20" />
    <router-view></router-view>
    <Notification />
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/NavBar.vue";
import Notification from "./components/Notification.vue";
</script>

<style>
body {
  font-family: "Press Start 2P", sans-serif;
  background-color: rgb(235, 228, 228);
}
</style>
