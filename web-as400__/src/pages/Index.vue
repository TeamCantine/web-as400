<template>
  <h3>Tomas table</h3>

  <div class="q-pa-md">
    <q-table
      dense
      :rows="rows"
      :columns="columns"
      :rows-per-page-options="[0, 8, 18]"
      boarderd
      :title="fileName"
      row-key="indexs"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      separator: ref("vertical"),
      loading: false,
      fileName: "ROLE_USER",
      lib: "WRKJEXP",
      rows: [],
      indexs:[],
      columns: [
        {
          name: "index",
          label: "#",
          field: "indexs",
        },
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
    async loadFiles() {
      this.loading = true;
      console.log(this.tableName);
      try {
        const data = {
          lib: this.lib,
          fileName: this.fileName,
        };
        await this.$store.dispatch("files/getFilesAction", data);
        this.rows = this.$store.getters["files/getFilesGetter"];
        this.loading = false;

        this.rows.forEach((row, index) => {
          this.indexs[index] = index
        });
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
  created() {
    this.loadFiles();
  },
};
</script>
