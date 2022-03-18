 export async function getFilesAction(context, data) {

     const url = "http://10.100.0.30:3300/files/PRTFFLD/?library=WRK90MUL&tablename=gcpro00f"
     let url_2 = "http://10.100.0.30:3300/files/?library=" + data.lib + "&tablename=" + data.fileName

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
     //  console.log(responseData)
     //  tabname = tabname.toUpperCase()


     context.commit("setFilesMutation", {
         obj: responseData,
     });


 }