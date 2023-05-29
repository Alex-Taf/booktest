<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const drawer = ref(false);
const menu = ref([
  {
    idx: 1,
    title: "Книги",
    icon: "mdi-book",
    link: "/",
  },
  {
    idx: 2,
    title: "Тесты",
    icon: "mdi-history",
    link: "/tests",
  },
]);
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list density="compact" nav>
        <section class="tw-flex tw-flex-col tw-gap-y-3 tw-pt-5">
          <template v-for="item in menu" :key="item.idx">
            <span
              class="tw-flex tw-gap-x-10 tw-text-xl tw-cursor-pointer tw-w-full tw-bg-blue-100 tw-p-2 tw-rounded-lg hover:tw-bg-blue-200 hover:tw-text-blue-400"
              @click="router.push({ path: item.link })"
            >
              <v-icon :icon="item.icon"></v-icon>
              <span>{{ item.title }}</span>
            </span>
          </template>
        </section>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="pl-4">
      <span class="tw-flex tw-items-center tw-gap-x-4">
        <v-icon icon="mdi-menu" @click="drawer = !drawer"></v-icon>
        <v-icon icon="mdi-school"></v-icon>
        <span class="tw-text-xl">ЭУМК Доступное Образование</span>
      </span>
    </v-app-bar>

    <v-main class="container tw-min-h-full">
      <router-view />
    </v-main>
  </v-layout>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  margin: 5px;
}
.plugins {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
}

.container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
