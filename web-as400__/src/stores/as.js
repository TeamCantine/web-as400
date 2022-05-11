import { defineStore } from 'pinia';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('as', {
    state: () => {
        return {

        currentUser: '',

       
            queries: [],
            files: [],
            users: [],
            filenames: []

        };
    },
    getters: {


       getCurrentUser: state => state.currentUser,

        //

        getQueries: state => state.queries,
        getFiles: state => state.files,
        getUsers: state => state.users,
        getFilenames: state => state.filenames

    },
    actions: {

        setCurrentUser(user) {  console.log(user); this.currentUser = user},


        async getQueriesAction(data) {

            // "http://localhost:3300/files/?library=wrkjexp&tablename=role_user"
            let url = "http://10.100.0.30:3300/files/?library=" + data.lib + "&tablename=" + data.fileName
            let url1 = "http://localhost:3300/files/?library=" + data.lib + "&tablename=" + data.fileName

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

            this.queries = responseData;

        },
        // Files
        async getFilesAction(data) {

            //"http://10.100.0.30:3300/files/PRTFFLD/?library=WRK90MUL&tablename=gcpro00f"
            let url = "http://10.100.0.30:3300/files/PRTFFLD1/?library=" + data.lib + "&tablename=" + data.fileName
            let url1 = "http://localhost:3300/files/PRTFFLD1/?library=" + data.lib + "&tablename=" + data.fileName


       

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

            this.files = responseData

        },
        //Users/libdat
        async getUsersAction(data) {

            // "http://10.100.0.30:3300/files/SCHEMA/?library=WRK"

            let url = "http://10.100.0.30:3300/files/SCHEMA/?library=" + data.user
            let url1 = "http://localhost:3300/files/SCHEMA/?library=" + data.user

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

            this.users = responseData

        },
        //Filenames
        async getFilenamesAction(data) {

            const url = "http://10.100.0.30:3300/files/FILENAMES/?library=" + data.filename

            const url1 = "http://localhost:3300/files/FILENAMES/?library=" + data.filename



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

            this.filenames = responseData

        }



    },
});

