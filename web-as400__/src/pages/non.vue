<template>
  <div class="q-pa-md">
    <h3>Tomas table</h3>

    <q-table
      class="my-sticky-header-table"
      dense
      :rows="rows"
      row-key="name"
      boarderd
    >
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();



    const data = {
        lib: "WRKJEXP",
        fileName: "ROLE_USER",
      };
    //  console.log(data);
    const checkout = () => store.dispatch("files/getFilesAction", data);
   const rows =  computed(() => {store.getters["files/getFilesGetter"]});


    onMounted(() => {
      console.log(store);

    });

    return {
      rows

    };
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
