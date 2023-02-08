import { CurrentUser } from "./types";

function getJwtToken() {
  return sessionStorage.getItem("jwt");
}

function setJwtToken(token: string) {
  return sessionStorage.setItem("jwt", token);
}

function deleteJwtToken() {
  return sessionStorage.removeItem("jwt");
}

async function getCurrentUser(): Promise<CurrentUser> {
  const token = sessionStorage.getItem("jwt");
  const response = await fetch(import.meta.env.VITE_API_URL + "user", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  });
  const data: CurrentUser = await response.json();
  return data;
}

export { getJwtToken, setJwtToken, deleteJwtToken, getCurrentUser };
