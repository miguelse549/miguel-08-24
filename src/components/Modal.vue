<template>
  <div>
    <Teleport to="body">
      <div class="modal-overlay">
        <div class="modal bg-white w-72 md:min-w-[600px] p-6 rounded-lg">
          <slot></slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup></script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
</style>
