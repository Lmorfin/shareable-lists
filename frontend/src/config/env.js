const getUrlEndpoint = () => {
  let url = "";
  if (env === "local") {
    url = "http://localhost:4000";
  } else {
    url = "shareablelists-backend-production.up.railway.app";
  }
  return url;
};

export const env = "production";
export const url = getUrlEndpoint();
