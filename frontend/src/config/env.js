const getUrlEndpoint = () => {
  let url = "";
  if (env === "local") {
    url = "http://localhost:4000";
  } else {
    url = "https://sharelist-backend.onrender.com";
  }
  return url;
};

export const env = "production";
export const url = getUrlEndpoint();
