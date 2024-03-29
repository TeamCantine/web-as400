<template>
  <div class="q-pa-md">
    <q-card class="q-my-md">
      <q-card-section class="q-py-lg q-px-lg">
        <div class="q-pa-lg text-h6" v-if="pref.getUserPrefAsObj.length > 0">
          <q-option-group v-model="group" @update:model-value="onGroupChange" :options="pref.getUserPrefAsObj"
            color="primary" inline />
        </div>

        <div class="q-gutter-md row">
          <q-select filled v-model="model" use-input input-debounce="0" label="LIBDAT" clearable :options="options"
            @filter="filterFn" @update:model-value="onClickLibdat" behavior="menu">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select filled v-model="fileNameModel" use-input :loading="loadingInputFiles" :disable="loadingInputFiles"
            input-debounce="0" label="FILE" autofocus clearable :options="fileNamesOptions" @filter="filterFileNames"
            @update:model-value="onClickFilename" behavior="menu">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>

          <div class="q-ml-lg scritta">
            <q-toggle v-model="queryToggle" size="xl" icon="visibility" label="Query first 5000 Records" color="red" />
          </div>

          <div inline class="flex flex-left">
            <q-input style="min-width: 200px" square color="primary" label-color="primary" outlined clearable
              v-model="fastWordSearch" label="Fast Search">
              <template v-slot:append>
                <q-icon name="bolt" color="primary" />
              </template>
            </q-input>

            <q-btn :loading="loading" inline color="primary q-ml-sm" label="Search" icon-right="send"
              @click="fastSearch" :disable="
                fastWordSearch == null ||
                fastWordSearch == '' ||
                fastWordSearch.length < 3
              " />
            <q-checkbox class="q-ml-xl" size="lg" left-label v-model="deep" label="Ricerca profonda" />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!-- Table 1 -->
    <q-table v-if="!queryToggle && !queryStr.launchQueryPrefered" dense auto-width
      class="text-subtitle2 my-sticky-header-table" table-header-class="text-white" :grid="grid" :rows="rows"
      :columns="columns" row-key="name" :loading="loading" boarderd :title="fileNameModel" separator="cell"
      :rowsPerPage="30" :rows-per-page-options="[0, 8, 18]" style="height: 640px" :filter="filter">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search word">
          <template v-slot:append>
            <q-icon name="search" color="white" />
            <q-toggle v-model="grid" color="red" label="Grid" />
          </template>
        </q-input>

        <q-btn flat class="q-ml-xl" color="yellow" icon-right="archive" label="Export to csv" no-caps
          @click="exportTable" />
      </template>
    </q-table>
    <!-- Table 2 -->
    <q-table class="text-subtitle2 my-sticky-header-table" table-header-class="text-white"
      v-else-if="queryToggle && !queryStr.launchQueryPrefered" :rows="queries" row-key="index" dense auto-width
      :grid="grid" :loading="loading" boarderd :title="fileNameModel" separator="cell" style="height: 640px"
      :filter="filter" :rowsPerPage="10000" :rows-per-page-options="[0, 8, 18]">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" color="white" />
            <q-toggle v-model="grid" color="red" label="Grid" />
          </template>
        </q-input>
      </template>
    </q-table>
    <!-- Table 3 -->
    <q-table v-else-if="queryStr.queries.length" :loading="queryStr.loadingTable"
      class="text-subtitle2 my-sticky-header-table" table-header-class="text-white" title="Risultati query" dense
      boarderd auto-width separator="cell" :rows="queryStr.queries" row-key="name" :rowsPerPage="30"
      :rows-per-page-options="[0, 8, 18]" style="height: 640px" :filter="queryStr.filter" :grid="queryStr.grid">
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


    <!--  <h1>{{as.getQueries}}</h1> -->
  </div>
</template>

<script>
import { ref } from "vue";
import { exportFile } from "quasar";
import { useQuasar } from "quasar";
import { queryStore } from "../stores/query";
import { useStore } from "../stores/as";
import { prefStore } from "../stores/pref";

export default {
  data() {
    return {
      q: useQuasar(),
      as: null,
      pref: null,
      queryStr: null,

      fastWordSearch: "",
      deep: false,

      queries: [],
      queryToggle: false,
      launchQueryPrefered: false,

      pagination: {
        rowsPerPage: 0,
      },

      group: ref(""),

      loadingInputFiles: false,
      model: null,
      stringOptions: [],
      options: this.stringOptions,

      fileNameModel: null,
      filenamesArray: [],
      fileNamesOptions: this.filenamesArray,

      separator: "vertical",
      filter: "",
      grid: false,
      loading: false,
      fileName: "ROLE_USER",
      lib: "WRKJEXP",
      rows: [],
      columns: [
        {
          name: "COLUMN_NAME",
          label: "CAMPO",
          field: "COLUMN_NAME",
          sortable: true,
          align: "center",
        },
        {
          name: "COLUMN_TEXT",
          label: "DESCRIZIONE",
          field: "COLUMN_TEXT",
          sortable: true,
          align: "left",
        },
        {
          name: "TABLE_SCHEMA",
          label: "LIBRERIA",
          field: "TABLE_SCHEMA",
          sortable: true,
          align: "left",
        },
        {
          name: "TABLE_NAME",
          label: "FILE",
          field: "TABLE_NAME",
          sortable: true,
          align: "left",
        },
        {
          name: "KEY_COLUMN",
          label: "CHIAVE",
          field: "KEY_COLUMN",
          sortable: true,
          align: "left",
        },

        {
          name: "KEY_ORDER",
          label: "KEY_ORDER",
          field: "KEY_ORDER",
          sortable: true,
          align: "left",
        },

        {
          name: "DATA_TYPE",
          label: "TIPO",
          field: "DATA_TYPE",
          sortable: true,
        },
        {
          name: "LENGTH",
          label: "LUNGHEZZA",
          field: "LENGTH",
          sortable: true,
        },
        {
          name: "NUMERIC_SCALE ",
          label: "DECIMALE",
          field: "NUMERIC_SCALE",
          sortable: true,
        },
        {
          name: "COLUMN_DEFAULT",
          label: "DEFAULT",
          field: "COLUMN_DEFAULT",
          sortable: true,
        },
        {
          name: "CHARACTER_MAXIMUM_LENGTH",
          label: "LUNGEZZA MASSIMA",
          field: "CHARACTER_MAXIMUM_LENGTH",
          sortable: true,
        },
      ],
    };
  },
  methods: {


    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => this.wrapCsvValue(col.label))]
        .concat(
          this.rows.map((row) =>
            this.columns
              .map((col) =>
                this.wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
      }
    },

    wrapCsvValue(val, formatFn) {
      let formatted = formatFn !== void 0 ? formatFn(val) : val;

      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);

      formatted = formatted.split('"').join('""');
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`;
    },





    /**Loads the filenames list combo based oin the libdat */
    async loadFilenames() {
      try {
        const data = {
          filename: this.model,
        };
        this.loadingInputFiles = true;
        await this.as.getFilenamesAction(data);
        this.filenamesArray = [];
        this.as.getFilenames.forEach((element) => {
          this.filenamesArray.push(
            element.TABLE_NAME + " --> " + element.TABLE_TEXT
          );
        });
        this.loadingInputFiles = false;
      } catch (error) {
        console.log(error);
      }
    },


    /**
     * Loads the libdat based on the first one selected in default
     */
    async loadLibdat() {
      try {
        const data = {
          user: "",
        };

        // Sets the current logged user
        await this.pref.setUserPref(this.q.localStorage.getItem("currentUser"));

        if ((await this.pref.getUserPrefAsObj.length) > 0) {
          this.group = this.pref.getUserPrefAsObj[0].value;
          this.model = this.group;
        }

        await this.as.getUsersAction(data);

        await this.as.getUsers.forEach((element) => {
          this.stringOptions.push(element.TABLE_SCHEMA);
        });

        this.loadFilenames();
      } catch (error) {
        console.log(error);
      }
    },





    /**
     * PRTFFLD
     * Loads the table with the filename information 
     */
    async loadFiles() {
      if (this.fileNameModel) {
        this.loading = true;
        this.rows = [];
        try {
          const data = {
            lib: this.model,
            fileName: this.fileNameModel.split("-->")[0].trim(),
          };

          await this.as.getFilesAction(data);
          this.rows = this.as.getFiles;
          //   this.loadQueries();
          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },



    /** 
     * Query first 50000 records
     * Loads the table with data records saved on the table selected based on the libdat and filename
     */
    async loadQueries() {
      if (this.fileNameModel) {
        this.loading = true;
        this.queries = [];
        try {
          const data = {
            lib: this.model,
            fileName: this.fileNameModel.split("-->")[0].trim(),
          };
          await this.as.getQueriesAction(data);

          this.queries = this.as.getQueries;

          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },



    /**
     * Loads the table with the fast searching word
     */
    async loadFastFiles() {
      if (this.fastWordSearch !== "") {
        this.loading = true;
        this.rows = [];
        try {
          const data = {
            user:
              this.q.localStorage.getItem("currentUser") != null &&
                this.q.localStorage.getItem("currentUser") != ""
                ? this.q.localStorage.getItem("currentUser").trim()
                : "",
            search_word: this.fastWordSearch.trim(),
            all: this.deep ? "all" : "no",
          };

          await this.as.getFastFilesAction(data);
          this.rows = this.as.getFastFiles;
          //   this.loadQueries();
          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },


    onClickLibdat(rr) {
      this.loadFilenames();
      this.fileNameModel = null;
    },

    onClickFilename(rr) {
      this.loadFiles();
      this.filter = ''
      this.queryStr.launchQueryPrefered = false
    },

    filterFileNames(val, update) {
      if (val === "") {
        update(() => {
          this.fileNamesOptions = this.filenamesArray;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.fileNamesOptions = this.filenamesArray.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = this.stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = this.stringOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    /**
     * Calls the search loading file 
     */
    fastSearch() {
      this.loadFastFiles();
    },

    onGroupChange() {
      this.model = this.group;
      this.loadFilenames();
      this.fileNameModel = null;
    },

  },

  // Watcher
  watch: {
    // whenever question changes, this function will run
    queryToggle(newQuestion, oldQuestion) {
      if (newQuestion) {
        this.loadQueries();
        this.queryStr.launchQueryPrefered = false
      }
    },
    fileNameModel(newQuestion, oldQuestion) {
      if (
        newQuestion !== "" &&
        this.fileNameModel != null &&
        this.queryToggle
      ) {
        this.loadQueries();
      }
    },
    fastWordSearch(newQuestion, oldQuestion) {
      if (newQuestion) {
      }
    },
  },

  created() {
    //this.loadFiles();
    this.as = useStore();
    this.pref = prefStore();
    this.queryStr = queryStore();

    this.loadLibdat();

    //this.as.getQueriesAction({lib:"wrkjexp",fileName: "role_user"})
  },
};
</script>

<style lang="sass">


.scritta .q-toggle div.q-toggle__label.q-anchor--skip
  color: #673BB6

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
