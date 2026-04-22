const API_URL = "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

export async function getCustomers() {
  const response = await fetch(`${API_URL}/customers`);
  if (!response.ok) throw new Error("Failed trying to fetch customers");
  return response.json();
}

export async function getTrainings() {
  const response = await fetch(`${API_URL}/trainings`);
  if (!response.ok) throw new Error("Failed trying to fetch trainings");
  return response.json();
}