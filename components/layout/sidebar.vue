<script setup lang="ts">
import {useAuthStore, useIsLoadingStore} from "~/stores/auth.store";

const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore();
const router = useRouter();

const logout = async () => {
  isLoadingStore.set(true);
  await account.deleteSession('current')
  authStore.clear();
  await router.push('/login');
  isLoadingStore.set(false);
}

</script>

<template>
<aside class="px-5 py-8 bg-sidebar h-full w-full relative">
  <NuxtLink to="/" class="mb-10 block">
    <img src="/logo.svg" alt="" width="100px" />
  </NuxtLink>
  <button @click="logout" class="absolute top-2 right-3 transition-colors hover:text-primary">
    <Icon name="line-md:logout" size="20"/>
  </button>
  <LayoutMenu />
</aside>
</template>

<style scoped>

</style>
