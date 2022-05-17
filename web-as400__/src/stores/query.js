import { defineStore } from "pinia";
import { ref } from "vue";
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const queryStore = defineStore("query", {
    state: () => {
        return {
            queries: ref([]),
            gError: ref(null),
            queriesSaved: ref([]),
            queriesSavedStatus: null,
            loaderUserQuery: false,
            loadingTable: false,
            dialog: ref(false),
            title: ref(''),
            sqlQuery: ref(''),
            note: ref(''),
            // taable
            filter: ref(""),
            grid: false
        };
    },
    getters: {
        getQueryresult: (state) => state.queries,
        getQueriesSaved: (state) => state.queriesSaved


    },
    actions: {
        async excecQuery(query) {
            // "http://localhost:3300/files/?library=wrkjexp&tablename=role_user"
            let url = "http://10.100.0.30:3300/files/?str=" + query;
            let url1 = "http://localhost:3300/files/?str=" + query;

            const response = await fetch(url, {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                enctype: "mutipart/form-data",
            });

            const responseData = await response.json();
            /*
                        if (!response.ok) {
                            if (responseData.code === 409) {
                                throw new Error(responseData.message);
                            } else
                                throw new Error("Request failed with error code: " + response.status);
                        }
            */
            if (!responseData.error) {
                this.gError = null
                this.queries = responseData;
            } else {
                this.gError = responseData
            }
        },





        async insertUserQuery(queryObj) {
            let url = "http://10.100.0.30:3300/files/inserOrUpdateUserQuery/?libdat=" + queryObj.user + "&title=" + queryObj.title + "&sqlstr=" + queryObj.sqlstr + "&note=" + queryObj.note;
            let url1 = "http://localhost:3300/files/inserOrUpdateUserQuery/?libdat=" + queryObj.user + "&title=" + queryObj.title + "&sqlstr=" + queryObj.sqlstr + "&note=" + queryObj.note;

            const response = await fetch(url, {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                enctype: "mutipart/form-data",
            });

            const responseData = await response.json();

            if (!response.ok) {
                if (responseData.code === 409) {
                    throw new Error(responseData.message);
                } else
                    throw new Error("Request failed with error code: " + response.status);
            }

            if (responseData.code !== 500) {
                this.queriesSavedStatus = responseData;
                await this.selectUserQuery(queryObj.user)
            }
        },

        async selectUserQuery(user) {
            let url = "http://10.100.0.30:3300/files/selectUserQuery/?libdat=" + user;
            let url1 = "http://localhost:3300/files/selectUserQuery/?libdat=" + user;

            const response = await fetch(url, {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                enctype: "mutipart/form-data",
            });

            const responseData = await response.json();

            if (!response.ok) {
                if (responseData.code === 409) {
                    throw new Error(responseData.message);
                } else
                    throw new Error("Request failed with error code: " + response.status);
            }

            if (responseData.code !== 500)
            // this.queriesSaved = responseData;
                this.queriesSaved = responseData.map(obj => {
                if (obj.SQLSTR.includes("`")) {
                    return {...obj, SQLSTR: obj.SQLSTR.replace(new RegExp("`", 'g'), "'") };
                }

                return obj;
            });


        },

        async deleteUserQuery(user, title) {
            let url = "http://10.100.0.30:3300/files/deleteUserQuery/?libdat=" + user + "&title=" + title;
            let url1 = "http://localhost:3300/files/deleteUserQuery/?libdat=" + user + "&title=" + title;

            const response = await fetch(url, {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                enctype: "mutipart/form-data",
            });

            const responseData = await response.json();

            if (!response.ok) {
                if (responseData.code === 409) {
                    throw new Error(responseData.message);
                } else
                    throw new Error("Request failed with error code: " + response.status);
            }

            if (responseData.code !== 500) {

                this.selectUserQuery(user);
                await this.selectUserQuery(queryObj.user)
            }

        },

    },
});
