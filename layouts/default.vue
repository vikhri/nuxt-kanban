<script setup lang="ts">
import { Account } from 'appwrite';
import { useAuthStore, useIsLoadingStore} from "~/stores/auth.store";

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    const user = await account.get()
    if(user) authStore.set(user)
  }
  catch (error){
    router.push('/login');
  }
  finally {
    isLoadingStore.set(false)
  }
}, )

</script>

<template>
  <layout-loader v-if="isLoadingStore.isLoading" />
  <section v-else :class="{grid: authStore.isAuth}">
    <LayoutSidebar v-if="authStore.isAuth" />
    <div>
      <slot />
    </div>
  </section>

</template>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns:  1fr 6fr;
    min-height: 100vh;
  }

</style>
