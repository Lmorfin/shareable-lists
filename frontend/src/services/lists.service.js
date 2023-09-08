import * as env from "../config/env";

const headers = { "Content-Type": "application/json" };
const baseUrl = `${env.url}/api/lists`;

export const postList = async (data) => {
  const response = await fetch(`${baseUrl}/create-list`, {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  });
  return response.json();
};

export const fetchList = async (uuid) => {
  const response = await fetch(`${baseUrl}/${uuid}`,  {
    method: "GET",
    headers,
  });
  return response.json();
};

export const updateList = async (data) => {
  const response = await fetch(`${baseUrl}/update-list`, {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  });
  return response.json();
};


