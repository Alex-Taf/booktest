<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { onMounted, ref } from "vue";

const file = ref([]);
let onLoadFile: Event;
const dialogDelete = ref(false);
const dialogAdd = ref(false);
const onRemoveId = ref(0);
const onRemoveDir = ref("");
const inputPasswd = ref("");

const store = useStore();
const { booksList, passwd } = storeToRefs(store);

const upload = async (file: Event) => {
  await store.uploadBook(file);
  await store.loadAllBooks();

  dialogAdd.value = false;
  
  clean();
};

const remove = async (id: number, dir: string) => {
  await store.deleteBook(id, dir);
  await store.loadAllBooks();
  
  dialogDelete.value = false;
  
  clean();
};

const openRemoveDialog = (id: number, link: string) => {
  dialogDelete.value = true;
  onRemoveId.value = id;
  onRemoveDir.value = link;
};

const openAddDialog = (file: Event) => {
  onLoadFile = file;
  dialogAdd.value = true;
}

const clean = () => {
  file.value = [];
  inputPasswd.value = '';
  onRemoveDir.value = '';
}

onMounted(() => {
  store.loadAllBooks();
});
</script>

<template>
  <section class="tw-w-[700px]">
    <v-file-input
      class="tw-m-auto tw-w-[700px]"
      clearable
      accept=".pdf"
      v-model="file"
      label="Перетащите .pdf в это поле, либо загрузите файл нажав на скрепку"
      @change="openAddDialog"
    ></v-file-input>
    <v-dialog v-model="dialogDelete" persistent width="500px">
      <v-card class="tw-p-5">
        <v-card-title>
          <span class="text-h5">Введите пароль</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="inputPasswd"
            type="password"
            label="Пароль"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="inputPasswd !== passwd"
            color="red"
            variant="flat"
            @click="remove(onRemoveId, onRemoveDir)"
          >
            Удалить
          </v-btn>
          <v-btn color="blue" variant="flat" @click="dialogDelete = false">
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAdd" persistent width="500px">
      <v-card class="tw-p-5">
        <v-card-title>
          <span class="text-h5">Введите пароль</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="inputPasswd"
            type="password"
            label="Пароль"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="inputPasswd !== passwd"
            color="green"
            variant="flat"
            @click="upload(onLoadFile)"
          >
            Добавить
          </v-btn>
          <v-btn color="blue" variant="flat" @click="dialogAdd = false">
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <section
      v-if="booksList.length > 0"
      class="tw-grid tw-grid-cols-3 tw-gap-4"
    >
      <template v-for="(book, index) in booksList">
        <v-card class="mx-auto" variant="outlined">
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">{{ book.title }}</div>
              <div class="text-caption">
                {{ book.link }}
              </div>
            </div>
          </v-card-item>

          <v-card-actions class="tw-w-full tw-flex tw-justify-center">
            <v-btn variant="flat" color="blue" @click="store.loadBook(book.id)">
              Читать
            </v-btn>
            <v-btn
              variant="flat"
              color="red"
              @click="openRemoveDialog(book.id, book.link)"
            >
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </section>
    <section v-else>
      <h3>Загруженные книги отсутствуют</h3>
    </section>
  </section>
</template>
