<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useStore } from "../store/index";
import { computed, ref, watchEffect } from "vue";

const calculatePages = (total, perPage) => {
    return total / perPage
}

const store = useStore();
const router = useRouter();

const { sheetsTotalCount } = storeToRefs(store);

const totalLength = ref(0);
const pages = ref(0);

const setPagination = () => {
  totalLength.value = sheetsTotalCount.value;
  pages.value = Math.ceil(
    calculatePages(totalLength.value, paginationOptions.value.rowsPerPage)
  );
};

const paginationOptions = ref({
  page: 1,
  rowsPerPage: 6,
});

const filterItems = computed(() => {
  const start =
    paginationOptions.value.page * paginationOptions.value.rowsPerPage -
    paginationOptions.value.rowsPerPage;
  const end = start + paginationOptions.value.rowsPerPage - 1;

  const items = Array.from({ length: sheetsTotalCount.value }, (_, i) => i + 1);

  return items.filter((item, index) => index >= start && index <= end);
});

function selectSheet(num: number) {
  store.chooseSheet(num);
  router.push({ path: "/quiz" });
}

watchEffect(() => {
  if (sheetsTotalCount.value !== 0) {
    setPagination();
  }
});
</script>

<template>
  <section class="tw-flex tw-flex-col">
    <section
      class="tw-grid tw-grid-cols-2 tw-gap-[10px] tw-w-full tw-min-h-[420px] mb-4"
    >
      <template v-for="sheet in filterItems">
        <v-card
          class="mx-auto"
          max-width="344"
          max-height="130"
          variant="outlined"
        >
          <v-card-item>
            <div>
              <div class="text-overline mb-1">Лист №{{ sheet }}</div>
              <div class="text-caption">Тестирование</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn
              color="teal-accent-4"
              variant="outlined"
              @click="selectSheet(sheet - 1)"
            >
              Начать исследование
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </section>
    <v-pagination
      class="mb-4"
      v-show="sheetsTotalCount > 0"
      v-model="paginationOptions.page"
      :length="pages"
      :total-visible="6"
    ></v-pagination>
    <v-btn color="blue" @click="router.push({ path: '/tests' })"
      >Вернуться назад</v-btn
    >
  </section>
</template>
