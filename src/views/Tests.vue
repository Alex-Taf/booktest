<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';

const file = ref([])

const store = useStore()
const router = useRouter()

const upload = (file: Event) => {
    store.loadTestsFromFile(file)
    router.push({ path: '/choose' })
}
</script>

<template>
    <section class="tw-flex tw-flex-col">
        <h3 class="tw-mb-2">Загрузите тест из файла</h3>
        <v-file-input
            class="tw-w-[650px] tw-h-[100px]"
            clearable
            accept=".xls, .xlsx"
            v-model="file"
            label="Перетащите .xls или .xlsx таблицу в это поле, либо загрузите файл нажав на скрепку"
            @change="upload"
        ></v-file-input>
    </section>
</template>
