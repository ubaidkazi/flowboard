import { API_BASE_URL } from "./config";

export async function fetchDashboardData() {
  console.log("fetchDashboardData called");

  const token = localStorage.getItem("token");

  console.log("Dashboard URL:", `${API_BASE_URL}/api/dashboard`);
  console.log("Token exists:", Boolean(token));

  const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  console.log("Dashboard response status:", response.status);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(
      `Failed to load dashboard: ${response.status} ${responseText}`
    );
  }

  const data = await response.json();

  console.log("Dashboard API data:", data);

  return data;
}