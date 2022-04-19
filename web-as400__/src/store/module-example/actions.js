


export async function getQueriesAction(context, data) {

    const url1 = "http://localhost:3300/files/?library=wrkjexp&tablename=role_user"
    let url = "http://10.100.0.30:3300/files/?library=" + data.lib + "&tablename=" + data.fileName

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

    context.commit("setQueriesMutation", {
        obj: responseData,
    });

}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 export async function getFilesAction(context, data) {

     const url1 = "http://10.100.0.30:3300/files/PRTFFLD/?library=WRK90MUL&tablename=gcpro00f"
     let url = "http://10.100.0.30:3300/files/PRTFFLD/?library=" + data.lib + "&tablename=" + data.fileName

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

     context.commit("setFilesMutation", {
         obj: responseData,
     });

 }




 export async function getUsersAction(context, data) {
     console.log("Tomas")

     const url_all = "http://10.100.0.30:3300/files/SCHEMA/?library=WRK"

     let url = "http://10.100.0.30:3300/files/SCHEMA/?library=" + data.user

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

     context.commit("setUsersMutation", {
         obj: responseData,
     });

 }


 export async function getFilenamesAction(context, data) {

  console.log(data.filename)

  const url = "http://10.100.0.30:3300/files/FILENAMES/?library=" + data.filename



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

  context.commit("setFilenamesMutation", {
      obj: responseData,
  });

}
