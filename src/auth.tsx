function getJwtToken() {
  return sessionStorage.get("jwt");
}

function setJwtToken(token: string) {
  return sessionStorage.setItem("jwt", token);
}

function deleteJwtToken() {
  return sessionStorage.removeItem("jwt");
}

async function getCurrentUser() {
  const token = sessionStorage.getItem("jwt");
  const response = await fetch("http://localhost:3000/api/v1/user", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  });
  const data = await response.json();
  return data;
}

export { getJwtToken, setJwtToken, deleteJwtToken, getCurrentUser };
