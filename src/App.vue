<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const menu = ref([
  {
    idx: 1,
    title: "Книги",
    link: '/'
  },
  {
    idx: 2,
    title: "Тесты",
    link: '/tests'
  }
])
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer>
        <v-list>
          <template v-for="item in menu" :key="item.idx">
            <span class="tw-text-2xl tw-cursor-pointer hover:tw-text-blue-400" @click="router.push({ path: item.link })">
                <v-list-item :title="item.title"></v-list-item>
            </span>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar>
        <span class="tw-flex tw-gap-x-4">
          <v-icon icon="mdi-school"></v-icon> <span>ЭУМК Доступное Образование</span>
        </span>
      </v-app-bar>

      <v-main class="container !tw-h-screen">
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
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
