<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { onMounted, ref } from "vue";

const file = ref([])

const store = useStore();
const { booksList } = storeToRefs(store);

const upload = async (file: Event) => {
    store.uploadBook(file)
}

onMounted(() => {
  store.loadAllBooks();
});
</script>

<template>
  <section class="tw-w-full">
    <v-file-input
      class="tw-m-auto tw-w-[500px]"
      clearable
      accept=".pdf"
      v-model="file"
      label="Перетащите .pdf в это поле, либо загрузите файл нажав на скрепку"
      @change="upload"
    ></v-file-input>
    <section class="tw-flex tw-flex-wrap">
      <template v-for="book in booksList" :key="book.id">
      <v-card class="mx-auto" max-width="344" variant="outlined">
        <v-card-item>
          <div>
            <div class="text-h6 mb-1">{{ book.title }}</div>
            <div class="text-caption">
              {{ book.link }}
            </div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn variant="outlined" @click="store.loadBook(book.id)">
            Читать
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
    </section>
  </section>
</template>
