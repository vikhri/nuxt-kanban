<script setup lang="ts">
useHead({
  title:'Home | CRM'
})

</script>

<template>
<div class="p-10">
  <h1 class="font-bold text-2xl mb-10">CRM</h1>

  <div>
    <ui-card class="mb-3" draggable="true">
      <ui-card-header role="button">name card</ui-card-header>
      <ui-card-content> company </ui-card-content>
      <ui-card-footer> date </ui-card-footer>
    </ui-card>
  </div>
</div>
</template>

<style scoped>

</style>
