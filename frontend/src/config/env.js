const getUrlEndpoint = () => {
    let url = "";
    if (env === "local") {
      url = "http://localhost:4000";
    } else {
      url = "test.....com";
    }
    return url;
  };
  
  export const env = "local";
  export const url = getUrlEndpoint();
  