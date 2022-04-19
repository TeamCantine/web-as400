<template>
  <div class="q-pa-md">
    <q-card class="q-my-md">
      <q-card-section class="q-py-lg q-px-lg">
        <div class="q-pa-lg text-h6">
          <q-option-group
            v-model="group"
            @update:model-value="onGroupChange"
            :options="optionsGroup"
            color="primary"
            inline
          />
        </div>

        <div class="q-gutter-md row">
          <q-select
            filled
            v-model="model"
            use-input
            input-debounce="0"
            label="LIBDAT"
            clearable
            :options="options"
            @filter="filterFn"
            @update:model-value="onClickLibdat"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            filled
            v-model="fileNameModel"
            use-input
            input-debounce="0"
            label="FILE"
            autofocus
            clearable
            :options="fileNamesOptions"
            @filter="filterFileNames"
            @update:model-value="onClickFilename"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>

          <div class="q-ml-lg">
            <q-toggle
              v-model="queryToggle"
              size="xl"
              icon="visibility"
              label="Query first 10000 Records"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-table
      v-if="!queryToggle"
      class="my-sticky-header-table"
      dense
      auto-width
      :grid="grid"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :loading="loading"
      boarderd
      :title="fileNameModel"
      separator="cell"
      :rowsPerPage="30"
      :rows-per-page-options="[0, 8, 18]"
      style="height: 640px"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
            <q-toggle v-model="grid" label="Grid" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-md"
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
    </q-table>

    <q-table
      v-if="queryToggle"
      :rows="queries"
      row-key="index"
      dense
      auto-width
      :grid="grid"
      :loading="loading"
      boarderd
      :title="fileNameModel"
      separator="cell"
      style="height: 640px"
      :filter="filter"
     :rowsPerPage="30"
      :rows-per-page-options="[0, 8, 18]"
    >
          <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
            <q-toggle v-model="grid" label="Grid" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { exportFile } from "quasar";

export default {
  data() {
    return {
      queries: [],
      queryToggle: false,

      pagination: {
        rowsPerPage: 0,
      },

      group: ref("WRK90MUL"),

      optionsGroup: [
        {
          label: "WRK90MUL",
          value: "WRK90MUL",
        },
        {
          label: "PTFJEXP",
          value: "PTFJEXP",
        },
        {
          label: "WRKJEXP",
          value: "WRKJEXP",
        },
        {
          label: "PTFSIAN",
          value: "PTFSIAN",
        },
        {
          label: "WRKSIAN",
          value: "WRKSIAN",
        },
      ],

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
    onGroupChange() {
      console.log(this.group);
      this.model = this.group;
      this.loadFilenames();
      this.fileNameModel = null;
    },

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

    onClickLibdat(rr) {
      console.log("onClickLibdat");
      this.loadFilenames();
      this.fileNameModel = null;
    },
    onClickFilename(rr) {
      console.log("onClickFilename");
      this.loadFiles();
      this.loadQueries();
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

    async loadFiles() {
      this.loading = true;
      try {
        const data = {
          lib: this.model,
          fileName: this.fileNameModel.split("-->")[0].trim(),
        };
        //  console.log(data)
        await this.$store.dispatch("files/getFilesAction", data);
        this.rows = this.$store.getters["files/getFilesGetter"];
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async loadQueries() {
      this.loading = true;
      try {
        const data = {
          lib: this.model,
          fileName: this.fileNameModel.split("-->")[0].trim(),
        };
        //  console.log(data)
        await this.$store.dispatch("queries/getQueriesAction", data);



        this.queries = (this.$store.getters["queries/getQueriesGetter"]);


        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async loadFilenames() {
      try {
        const data = {
          filename: this.model,
        };
        await this.$store.dispatch("filenames/getFilenamesAction", data);
        this.$store.getters["filenames/getFilenamesGetter"].forEach(
          (element) => {
            this.filenamesArray.push(
              element.TABLE_NAME + " --> " + element.TABLE_TEXT
            );
          }
        );
      } catch (error) {
        console.log(error);
      }
    },

    async loadUsers() {
      try {
        const data = {
          user: "",
        };
        await this.$store.dispatch("users/getUsersAction", data);

        this.$store.getters["users/getUsersGetter"].forEach((element) => {
          this.stringOptions.push(element.TABLE_SCHEMA);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    //this.loadFiles();
    this.loadUsers();
    this.model = this.group;
    this.loadFilenames();
  },
};
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #eeeeee
    color: #673BB6
    height: 52px

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
