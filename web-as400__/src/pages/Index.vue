<template>
<h3>Tomas table</h3>

<div class="q-pa-md">
    <q-table
      :rows="rows"
      row-key="name"
    />
  </div>



</template>

<script>


export default {
  data() {
    return {
      loading: false,
      fileName: "ROLE_USER",
      lib: "WRKJEXP",
      rows: [],
    };
  },
  methods: {
    async loadFiles() {
      this.loading = true;
      console.log(this.tableName);
      try {
       const data = {
          lib: this.lib,
          fileName: this.fileName
        }
        await this.$store.dispatch("files/getFilesAction", data);
        this.rows = this.$store.getters["files/getFilesGetter"];
        this.loading = false;
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
