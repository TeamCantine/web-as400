<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Librerie preferite</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Scegliere 5 librerie che usi più frequentemente in modo da permettere
        una ricerca più veloce.
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="q-pa-md row items-start q-gutter-md">
          <q-select
            filled
            v-model="model1"
            use-input
            input-debounce="0"
            label="LIBDAT 1"
            clearable
            :options="options"
            @filter="filterFn"
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
            v-model="model2"
            use-input
            input-debounce="0"
            label="LIBDAT 2"
            clearable
            :options="options"
            @filter="filterFn"
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
            v-model="model3"
            use-input
            input-debounce="0"
            label="LIBDAT 3 "
            clearable
            :options="options"
            @filter="filterFn"
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
            v-model="model4"
            use-input
            input-debounce="0"
            label="LIBDAT 4"
            clearable
            :options="options"
            @filter="filterFn"
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
            v-model="model5"
            use-input
            input-debounce="0"
            label="LIBDAT 5"
            clearable
            :options="options"
            @filter="filterFn"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat @click="savePref">Save</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>




<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { prefStore } from "../stores/pref";
import { useStore } from "../stores/as";

const model1 = ref(null);
const model2 = ref(null);
const model3 = ref(null);
const model4 = ref(null);
const model5 = ref(null);

const stringOptions = ref([]);

const options = ref([]);

const pref = prefStore();

const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      options.value = stringOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const as = useStore();
const loadUsers = async () => {
  try {
    const data = {
      user: "",
    };
    await as.getUsersAction(data);

    as.getUsers.forEach((element) => {
      stringOptions.value.push(element.TABLE_SCHEMA);
    });
  } catch (error) {
    console.log(error);
  }
};

const q = useQuasar();

const setPrefs = async () => {
  await pref.setUserPref(q.localStorage.getItem("currentUser"));

  console.log(q.localStorage.getItem("currentUser"));
  console.log(pref.getUserPrefAsObj);

  if (pref.getUserPrefAsObj.length) {
    model1.value = pref.getUserPrefAsObj[0].value;
    model2.value = pref.getUserPrefAsObj[1] != undefined ? pref.getUserPrefAsObj[1].value: "";
    model3.value = pref.getUserPrefAsObj[2] != undefined ? pref.getUserPrefAsObj[2].value : "";
    model4.value = pref.getUserPrefAsObj[3] != undefined ? pref.getUserPrefAsObj[3].value: "";
    model5.value = pref.getUserPrefAsObj[4] != undefined ? pref.getUserPrefAsObj[4].value: "";
  }
};

const savePref = async () => {


if(model1.value == null && model2.value == null && model3.value == null && model4.value==null && model5.value == null){
      q.dialog({
        title: 'Attenzione',
        message: 'Selezionare almeno una libreria preferita!'
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
}



  await pref.insertOrUpdateUserPrefs({
    user: q.localStorage.getItem("currentUser"),
    prefl1: model1.value,
    prefl2: model2.value,
    prefl3: model3.value,
    prefl4: model4.value,
    prefl5: model5.value,
  });


    q.notify({
              color: "primary",
              textColor: "white",
              icon: "save",
              message: "Preferenza salvata con successo",
              actions: [
            { label: 'Dismiss', color: 'white', handler: () => {} }
          ]
            });

  setPrefs()
};

onMounted(() => {
  console.log("mounted!");
  loadUsers();

  setPrefs();
});
</script>



