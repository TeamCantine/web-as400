<template>
  <div>
    <div class="q-px-xl">
      <q-card class="my-card">
        <q-card-section>
          <!-- Botton that create a SQL-->
          <q-btn color="primary" text-color="white" lable="Crea" @click="createBtnDialog">
            Crea
          </q-btn>
        </q-card-section>

        <q-separator inset />
        <q-card-section>
          <div class="flex flex-center" v-if="queryStr.loaderUserQuery">
            <q-spinner-ios color="primary" size="7em" />
            <q-tooltip :offset="[0, 8]">Caricando le query....</q-tooltip>
          </div>
          <!-- Lista delle query -->
          <q-list v-else bordered separator class="text-primary text-subtitle2"
            style="max-height: 400px; overflow: auto">
            <q-item dense v-for="item in queryStr.queriesSaved" clickable :key="item.SQLSTR">
              <q-item dense clickable class="q-mr-sm">
                <q-item-section avatar>
                  <q-avatar @click="exec(item.SQLSTR)" color="primary" text-color="white" icon="play_arrow" />
                </q-item-section>
              </q-item>

              <q-item dense clickable class="q-mr-lg">
                <q-item-section avatar>
                  <q-avatar @click="deleteItem(item.LIBDAT, item.TITLE)" rounded flat text-color="red" icon="delete" />
                </q-item-section>
              </q-item>

              <q-item-section style="max-width: 150px" @click="loadDialog(item)">
                <q-item-label>
                  <b> {{ item.TITLE }} </b>
                </q-item-label>
              </q-item-section>

              <q-item-section class="text-left" @click="loadDialog(item)">
                {{ item.SQLSTR }}
              </q-item-section>

              <q-item-section class="text-left" @click="loadDialog(item)">
                {{ item.NOTE }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <pre class="flex flex-center text-red" v-if="queryStr.gError !== null">
   <b> errore:  {{ queryStr.gError }} </b>
   </pre>

    <!-- Tabella dei risultati-->
    <q-table v-else-if="queryStr.queries.length" :loading="queryStr.loadingTable"
      class="q-mx-xl q-my-lg text-subtitle2 my-sticky-header-table" table-header-class="text-white"
      title="Risultati query" dense boarderd auto-width separator="cell" :rows="queryStr.queries" row-key="name"
      :rowsPerPage="30" :rows-per-page-options="[0, 8, 18]" style="height: 480px" :filter="queryStr.filter"
      :grid="queryStr.grid">
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="queryStr.filter" placeholder="Search word">
          <template v-slot:append>
            <q-icon name="search" color="white" />
            <q-toggle color="red" v-model="queryStr.grid" label="Grid" />
          </template>
        </q-input>
      </template>
    </q-table>

    <!-- Dialogo che crea le SQL-->

    <q-dialog v-model="queryStr.dialog" transition-show="rotate" transition-hide="rotate">
      <q-card style="width: 1800px; max-width: 90vw; height: 90%;">
        <q-card-section>
          <div class="text-h6 text-primary">Composizione query</div>
        </q-card-section>

        <q-separator></q-separator>

        <div style="max-height: 80vh" class="my-modify-placeholder scroll">
          <q-card class="q-ma-lg">
            <q-card-section>
              <div class="row q-col-gutter-x-md">
                <div class="col">
                  <q-input dense filled v-model="queryStr.title" label="Titolo" />
                </div>
                <div class="col">
                  <q-input v-model="queryStr.sqlQuery" filled dense autogrow label="Scrivi la SQL qui" />
                </div>

                <div class="col">
                  <q-input dense v-model="queryStr.note" filled autogrow label="Note" />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="q-ma-lg">
            <q-card-section v-if="queryStr.createDialog" bordered class="my-card q-mb-xl">
              <q-card-section>
                <div class="row">
                  <q-option-group v-model="group" @update:model-value="onGroupChange" :options="pref.getUserPrefAsObj"
                    color="primary" inline />
                </div>
                <div class="q-pa-md row items-start q-gutter-md">




                  <p class="text-subtitle2 text-red q-mt-lg">
                    <b>
                      {{ queryStr.select }}
                    </b>
                  </p>


                  <q-select filled dense v-model="queryStr.libdatM" use-input input-debounce="0" label="Libreria dati"
                    clearable :options="queryStr.optionLibdat" @filter="filterLibdat"
                    @update:model-value="onClickLibdat" behavior="menu" style="max-width: 150px; height: 10px">
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">No results</q-item-section>
                      </q-item>
                    </template>
                  </q-select>

                  <q-select filled dense hide-bottom-space :loading="queryStr.loadingFileM" v-model="queryStr.fileM"
                    use-input input-debounce="0" label="File" clearable :options="queryStr.optionFile"
                    @filter="filterFile" @update:model-value="onClickFilename" behavior="menu"
                    style="max-width: 280px; max-height: 10px important!">
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">No results</q-item-section>
                      </q-item>
                    </template>
                  </q-select>

                  <div class="vertical">
                    <p class="text-subtitle2 text-red q-ma-none">
                      {{ queryStr.where }}
                    </p>
                    <q-toggle :disable="!queryStr.fileM" v-model="queryStr.toggleWhere" @update:model-value="changeAll"
                      color="primary" />
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div class="">
                  <q-table v-show="queryStr.toggleWhere" dense title="Seleziona campi" :rows="queryStr.rows"
                    :columns="queryStr.columns" row-key="COLUMN_TEXT" selection="multiple" boarderd :rowsPerPage="30"
                    :rows-per-page-options="[0, 8, 18]" style="height: 280px" v-model:selected="queryStr.selected"
                    @update:selected="upadtePreview" />
                  <!--   
                  <pre class="text-subtitle2">
                <b> {{ queryStr.preview }} </b>
                </pre>
            
                  <q-btn
                    size="sm"
                    class="q-ml-xl"
                    color="primary"
                    @click="queryStr.compila"
                    icon="settings"
                    >Compila
                  </q-btn>
                      -->
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <q-card-actions align="right">
          <q-btn :disable="queryStr.title == '' || queryStr.sqlQuery == ''" flat label="Save" icon="save"
            color="primary" @click="insertUserQuery" v-close-popup />

          <q-btn flat label="close" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { queryStore } from "../stores/query";

import { prefStore } from "../stores/pref";

const queryStr = queryStore();
const q = useQuasar();

const pref = prefStore();
const group = ref("");

const upadtePreview = (val) => {
  console.log(val);

  queryStr.setPreview();
};

const faa = (ev) => {
  queryStr.selected = ev;
};

const startQuery = async (sql) => {
  queryStr.loadingTable = true;
  await queryStr.excecQuery(sql);
  queryStr.loadingTable = false;
};

const loadUserQueries = async () => {
  queryStr.loaderUserQuery = true;
  await queryStr.selectUserQuery(q.localStorage.getItem("currentUser"));

  queryStr.loaderUserQuery = false;
  // load the files
  group.value = pref.getUserPrefAsObj[0].value;
  queryStr.libdatM = group.value;
  onClickLibdat();
};

const onGroupChange = () => {
  queryStr.libdatM = group.value;
  onClickLibdat();
  queryStr.fileM = ref(null);
  queryStr.selected = ref([])
  queryStr.rows = []
};

const changeAll = (item) => {
  queryStr.sqlAutomati();

  // carica la tabella con i dati
  if (queryStr.toggleWhere) loadColumns();
};

const loadColumns = async () => {
  if (queryStr.fileM && queryStr.libdatM) {
    queryStr.columsLoading = true;
    queryStr.rows = [];
    try {
      const data = {
        lib: queryStr.libdatM,
        fileName: queryStr.fileM.split("-->")[0].trim(),
      };

      console.log("Dove sono");
      console.log(data);

      await queryStr.getColumsAction(data);
      //     this.rows = this.as.getFiles;

      queryStr.columsLoading = false;
    } catch (error) {
      console.log(error);
      queryStr.columsLoading = false;
    }
  }
};

const onClickFilename = () => {
  queryStr.sqlAutomati();
  // loadFiles();
  changeAll({})
  queryStr.selected = ref([])

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
        actions: [{ label: "Dismiss", color: "white", handler: () => { } }],
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

const onClickLibdat = () => {
  loadFilenames();
  queryStr.sqlAutomati();
};

const loadFilenames = async () => {
  try {
    const data = {
      filename: queryStr.libdatM,
    };
    queryStr.loadingFileM = true;
    await queryStr.getFilenamesAction(data);

    queryStr.filenamesArray = [];

    queryStr.getFilenames.forEach((element) => {
      queryStr.filenamesArray.push(
        element.TABLE_NAME + " --> " + element.TABLE_TEXT
      );
    });

    queryStr.loadingFileM = false;
  } catch (error) {
    console.log(error);
  }
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
    actions: [{ label: "Dismiss", color: "white", handler: () => { } }],
  });
  queryStr.user = ref("");
  queryStr.title = ref("");
  queryStr.sqlQuery = ref("");
  queryStr.note = ref("");
};

const loadDialog = (item) => {
  queryStr.user = item.LIBDAT;
  queryStr.title = item.TITLE;
  queryStr.sqlQuery = item.SQLSTR;
  queryStr.note = item.NOTE;

  queryStr.dialog = true;
  queryStr.createDialog = false;
};

const filterLibdat = (val, update) => {
  if (val === "") {
    update(() => {
      queryStr.optionLibdat = queryStr.stringOptLibdat;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    queryStr.optionLibdat = queryStr.stringOptLibdat.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterFile = (val, update) => {
  if (val === "") {
    update(() => {
      queryStr.optionFile = queryStr.filenamesArray;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    queryStr.optionFile = queryStr.filenamesArray.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const loadLibdat = async () => {
  queryStr.sqlQuery = ref("");
  queryStr.title = ref("");
  queryStr.note = ref("");

  try {
    const data = {
      user: "",
    };
    await queryStr.getLibdatAction(data);

    queryStr.getLibl.forEach((element) => {
      queryStr.stringOptLibdat.push(element.TABLE_SCHEMA);
    });
  } catch (error) {
    console.log(error);
  }
};

const exec = (sql) => {
  startQuery(sql);
};

const createBtnDialog = () => {
  loadLibdat();
  // queryStr.sqlAutomati()
  queryStr.dialog = true;
  queryStr.createDialog = true;
};

onMounted(() => {
  loadUserQueries();
});
</script>

<style lang="sass">
.q-textarea.q-field--dense.q-field--labeled
  font-size: 15px


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
