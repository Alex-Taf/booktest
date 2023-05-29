<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import { storeToRefs } from "pinia";
import { useStore } from "../store";

const store = useStore()
const { currBook } = storeToRefs(store)

const page = ref(1);
const { pdf, pages } = usePDF(
  currBook.value.link
);
</script>

<template>
  <div style="text-align: center">
    <div class="tw-mb-5">
      <v-btn color="blue" @click="page = page > 1 ? page - 1 : page">Prev</v-btn>
      <span>{{ page }} / {{ pages }}</span>
      <v-btn color="green" @click="page = page < pages ? page + 1 : page">Next</v-btn>
    </div>
    <VuePDF :pdf="pdf" :page="page" />
  </div>
</template>
