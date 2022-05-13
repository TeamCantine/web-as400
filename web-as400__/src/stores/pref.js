import { defineStore } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const prefStore = defineStore("pref", {
    state: () => {
        return {
            userPref: [],
        };
    },
    getters: {
        getUserPref: (state) => state.userPref,
        getUserPrefAsObj: (state) => {
            if (state.userPref.length < 1) {
                return [];
            }

            var arr = [];

            arr.push({
                label: state.userPref[0].PREFL1,
                value: state.userPref[0].PREFL1,
            });
            arr.push({
                label: state.userPref[0].PREFL2,
                value: state.userPref[0].PREFL2,
            });

            arr.push({
                label: state.userPref[0].PREFL3,
                value: state.userPref[0].PREFL3,
            });

            arr.push({
                label: state.userPref[0].PREFL4,
                value: state.userPref[0].PREFL4,
            });

            arr.push({
                label: state.userPref[0].PREFL5,
                value: state.userPref[0].PREFL5,
            });
            return arr;
        },
    },
    actions: {
        async setUserPref(user) {
            // "http://localhost:3300/files/?library=wrkjexp&tablename=role_user"
            let url = "http://10.100.0.30:3300/files/USERPREF/?user=" + user;
            let url1 = "http://localhost:3300/files/USERPREF/?user=" + user;

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

            this.userPref = responseData;
        },
    },
});
