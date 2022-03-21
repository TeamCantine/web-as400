<template>
  <div class="q-pa-md">
  <h3>Tomas table</h3>



  <q-select
        filled
        v-model="model"
        use-input
        input-debounce="0"
        label="Simple filter"
        clearable
        :options="options"
        @filter="filterFn"
        @update:model-value="showMe"
        style="width: 250px"
        behavior="menu"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>


  <q-toggle v-model="grid" label="Grid" class="q-mb-md" />

    <q-table
    class="my-sticky-header-table"
      dense
      :grid="grid"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :loading="loading"
      boarderd
      :title="fileName"
      separator="cell"
      :rowsPerPage="30"
      :rows-per-page-options="[0, 8, 18]"
      style="height: 500px"
      :table-header-style="{ backgroundColor: '#ff0000' }"
      :filter="filter"
    >



    <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>





    </q-table>

  </div>
</template>

<script>
import { ref } from "vue";

export default {

  data() {
    return {
      model: null,
      stringOptions: [
      ],
      options:  this.stringOptions,


      separator: "vertical",
      filter: '',
      grid:false,
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

    showMe(rr){
      this.loadFiles()
    },
    filterFn (val, update) {
        if (val === '') {
          update(() => {
            this.options = this.stringOptions
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          this.options = this.stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)

        })
      },



    async loadFiles() {
      this.loading = true;
      try {
        const data = {
          lib: this.model,
          fileName: "GCPRO00F",
        };
        console.log(data)
      ;
        await this.$store.dispatch("files/getFilesAction", data);
        this.rows = this.$store.getters["files/getFilesGetter"];
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async loadUsers() {
      try {
        const data = {
          user: "",
        };
        await this.$store.dispatch("users/getUsersAction", data);


         (this.$store.getters["users/getUsersGetter"]).forEach(element => {
          this.stringOptions.push(element.TABLE_SCHEMA)
         });
      } catch (error) {
        console.log(error);
      }
    },


  },
  created() {
    //this.loadFiles();
   this.loadUsers()
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
    height: 40px

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
