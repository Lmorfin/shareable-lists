const getUrlEndpoint = () => {
  let url = "";
  if (env === "local") {
    url = "http://localhost:4000";
  } else {
    url = "http://54.193.34.31:4000";
  }
  return url;
};

export const env = "production";
export const url = getUrlEndpoint();
