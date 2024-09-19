<script setup lang="ts">
import {useIsLoadingStore, useAuthStore} from "~/stores/auth.store";
import { v4 as uuid } from 'uuid'

useHead({
  title: 'Login | CRM System'
})

const emailRef = ref('');
const passwordRef = ref('');
const nameRef = ref('');

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {

  isLoadingStore.set(true)
  await account.createEmailPasswordSession(emailRef.value, passwordRef.value)
  const response = await account.get()
  if (response) {
    authStore.set({
      email: response.email,
      name: response.name,
      status: response.status,
    })
  }

  emailRef.value = '';
  passwordRef.value = '';
  nameRef.value = '';

  await router.push('/');
  isLoadingStore.set(false)
}

const register = async () => {
  await account.create(uuid(), emailRef.value, passwordRef.value, nameRef.value)

  await login()
}

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
        <ui-button type="button" @click="login">Login</ui-button>
        <ui-button type="button" @click="register">Register</ui-button>
      </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>

