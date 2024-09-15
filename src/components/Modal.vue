<template>
  <div>
    <Teleport to="body">
      <div class="modal-overlay">
        <div class="modal">
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
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background-color: white;
  min-width: 600px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
