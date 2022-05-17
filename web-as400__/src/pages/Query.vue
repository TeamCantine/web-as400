<template>
  <div>
    <div class="q-pa-xl">
      <q-card class="my-card">
        <q-card-section>
          <q-btn
            color="primary"
            text-color="white"
            lable="Crea"
            @click="queryStr.dialog = true"
          >
            Crea
          </q-btn>
        </q-card-section>

        <q-separator inset />
        <q-card-section>
          <div class="flex flex-center" v-if="queryStr.loaderUserQuery">
            <q-spinner-ios color="primary" size="7em" />
            <q-tooltip :offset="[0, 8]">QSpinnerIos</q-tooltip>
          </div>

          <q-list
            v-else
            bordered
            separator
            class="text-primary text-subtitle2"
            style="max-height: 400px; overflow: auto"
          >
            <q-item
              dense
              v-for="item in queryStr.queriesSaved"
              clickable
              :key="item.SQLSTR"
            >
              <q-item dense clickable class="q-mr-sm">
                <q-item-section avatar>
                  <q-avatar
                    @click="exec(item.SQLSTR)"

                    color="primary"
                    text-color="white"
                    icon="play_arrow"
                  />
                </q-item-section>
              </q-item>

              <q-item dense clickable class="q-mr-lg">
                <q-item-section avatar>
                  <q-avatar
                    @click="deleteItem(item.LIBDAT, item.TITLE)"
                    rounded
                    flat
                    text-color="red"
                    icon="delete"
                  />
                </q-item-section>
              </q-item>

              <q-item-section style="max-width: 150px">
                <q-item-label>
                  <b> {{ item.TITLE }} </b>
                </q-item-label>
              </q-item-section>

              <q-item-section class="text-left">
                {{ item.SQLSTR }}
              </q-item-section>

              <q-item-section class="text-left">
                {{ item.NOTE }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <pre class="flex flex-center text-red" v-if="queryStr.gError !== null">
   <b> errore:  {{queryStr.gError}} </b>
</pre>

    <q-table
      v-else-if="queryStr.queries.length"
      :loading="queryStr.loadingTable"
      class="q-ma-xl text-subtitle2 my-sticky-header-table"
      table-header-class="text-white"
      title="Risultati query"
      dense
      boarderd
      auto-width
      separator="cell"
      :rows="queryStr.queries"
      row-key="name"
      :rowsPerPage="30"
      :rows-per-page-options="[0, 8, 18]"
      style="height: 480px"
      :filter="queryStr.filter"
      :grid="queryStr.grid"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top-right  >
        <q-input
          borderless
          dense
          debounce="300"
          v-model="queryStr.filter"
          placeholder="Search word"
        >
          <template v-slot:append>
            <q-icon name="search" color="white" />
            <q-toggle color="red" v-model="queryStr.grid" label="Grid" />
          </template>
        </q-input>
      </template>
    </q-table>

    <q-dialog v-model="queryStr.dialog" >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 text-primary">Creazione query</div>
        </q-card-section>

        <q-card-section class="q-pt-none my-modify-placeholder">
          <div class="q-gutter-md" style="min-width: 600px">
            <q-input filled v-model="queryStr.title" label="Titolo" />

            <q-input
              v-model="queryStr.sqlQuery"
              filled
              autogrow
              label="Scriva la SQL qui"
            />

            <q-input v-model="queryStr.note" filled autogrow label="Note" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :disable="queryStr.title == '' || queryStr.sqlQuery == ''"
            flat
            label="OK"
            color="primary"
            @click="insertUserQuery"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { queryStore } from "../stores/query";

const queryStr = queryStore();
const q = useQuasar();

const startQuery = async (sql) => {
  queryStr.loadingTable = true;
  await queryStr.excecQuery(sql);
  queryStr.loadingTable = false;
};

const loadUserQueries = async () => {
  queryStr.loaderUserQuery = true;
  await queryStr.selectUserQuery(q.localStorage.getItem("currentUser"));
  queryStr.loaderUserQuery = false;
};

const deleteItem = (user, title) => {
  q.dialog({
    dark: true,
    title: "Confirm",
    message: "Vuoi cancellare la tua query?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      q.notify({
        color: "primary",
        textColor: "white",
        icon: "delete",
        message: "Query cancellata con successo",
        actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
      });

      queryStr.deleteUserQuery(user, title);
    })
    .onCancel(() => {
      // console.log('Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const insertUserQuery = async () => {
  await queryStr.insertUserQuery({
    user: q.localStorage.getItem("currentUser"),
    title: queryStr.title,
    sqlstr: queryStr.sqlQuery,
    note: queryStr.note,
  });

  q.notify({
    color: "primary",
    textColor: "white",
    icon: "insert",
    message: "Query inserita con successo",
    actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
  });

  queryStr.user = ref("");
  queryStr.title = ref("");
  queryStr.sqlQuery = ref("");
  queryStr.note = ref("");
};

const exec = (sql) => {
  startQuery(sql);
};

onMounted(() => {
  loadUserQueries();
});
</script>

<style lang="sass">





.q-toggle__label.q-anchor--skip
  color: white
.q-table__title
  color: white

.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #673BB6


  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
