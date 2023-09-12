const getUrlEndpoint = () => {
  let url = "";
  if (env === "local") {
    url = "http://localhost:4000";
  } else {
    url = "https://morfincloud.xyz";
  }
  return url;
};

export const env = "production";
export const url = getUrlEndpoint();
