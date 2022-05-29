<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="q-py-sm">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Powered by Team Cantine </q-toolbar-title>

        <q-select
          style="max-width: 250px"
          class="q-mr-xl"
          v-model="model"
          use-input
          input-debounce="0"
          label="PROFILO"
          label-color="white"
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

          <template v-slot:append>
            <q-icon name="lock" color="white" />
          </template>
        </q-select>

        <div class="q-ml-md">
          Dark mode
          <q-toggle color="red" v-model="dark" @click="toggleDark" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    caption: "home",
    icon: "home",
    to: "/home",
  },
  /*
    {
    title: "Query",
    caption: "query",
    icon: "search",
    to: "/query",
  },
  */
];

import { defineComponent, ref } from "vue";
import { useStore } from "../stores/as";
import { prefStore } from "../stores/pref";

import { useQuasar } from "quasar";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const q = useQuasar();
    const router = useRouter();

    const leftDrawerOpen = ref(false);
    const dark = ref(false);

    const model = ref(null);
    const stringOptions = ref([]);
    const options = ref([]);
    const as = useStore();
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

    const onClickLibdat = (rr) => {
      //  this.loadFilenames();
      as.setCurrentUser(model.value);
      q.localStorage.set("currentUser", model.value);
      pref.setUserPref(model.value);
      // q.$router.push({name: 'myPath'})

      //q.$router.push({name: '/home'})
      //router.push('/home')
      if (q.localStorage.getItem("currentUser") != "null") location.reload();
      else q.localStorage.remove("currentUser");
    };

    const loadUserPrefs = () => {
      if (
        q.localStorage.getItem("currentUser") !== "" &&
        q.localStorage.getItem("currentUser") !== "null" &&
        q.localStorage.getItem("currentUser") !== null
      ) {
        model.value = q.localStorage.getItem("currentUser");

        linksList.push({
          title: "Preferenze",
          caption: "pref",
          icon: "settings ",
          to: "/preference",
        });

        linksList.push({
          title: "Query",
          caption: "Le mie query",
          icon: "search",
          to: "/query",
        });

              linksList.push({
          title: "Test",
          caption: "Only for test",
          icon: "manage_accounts",
          to: "/test",
        });
      }

      pref.setUserPref(model.value);
    };

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




    const toggleDark = () => {
      q.dark.toggle()
      q.localStorage.set("darkMode", q.dark.isActive)
    }

    const loadDarkMode = () =>  {
      console.log("dark mode:")
      console.log(q.localStorage.getItem("darkMode"))
      dark.value = q.localStorage.getItem("darkMode")
      q.dark.set(dark.value)
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      dark,
      toggleDark,
      loadDarkMode,
      filterFn,
      model,
      options,
      stringOptions,
      onClickLibdat,
      loadUsers,
      loadUserPrefs,
      as,
      pref,
      q,
    };
  },

  mounted() {
    this.loadDarkMode()
    this.loadUserPrefs();
    this.loadUsers();

  },
});
</script>

<style scoped></style>
