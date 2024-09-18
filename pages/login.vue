<script setup lang="ts">
useHead({
  title: 'Login | CRM System'
})

const emailRef = ref('');
const passwordRef = ref('');
const nameRef = ref('');



</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

      <form>
      <ui-input v-model="emailRef" placeholder="email" type="email" class="mb-3"/>
      <ui-input v-model="passwordRef" placeholder="password" type="password" class="mb-3"/>
      <ui-input v-model="nameRef" placeholder="name" type="text" class="mb-3"/>
      <div class="flex items-center justify-center gap-5" >
        <ui-button type="button">Login</ui-button>
        <ui-button type="button">Register</ui-button>
      </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>

