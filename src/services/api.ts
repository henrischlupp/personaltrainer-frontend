const API_URL = "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

export async function getCustomers() {
  const response = await fetch(`${API_URL}/customers`);

  if (!response.ok) {
    throw new Error("Failed trying to fetch customers");
  }

  return response.json();
}

export async function getTrainings() {
  const response = await fetch(`${API_URL}/trainings`);

  if (!response.ok) {
    throw new Error("Failed trying to fetch trainings");
  }

  return response.json();
}

export async function addCustomer(customer: object) {
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Failed trying to add customer");
  }

  return response.json();
}

export async function updateCustomer(url: string, customer: object) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Failed trying to update customer");
  }

  return response.json();
}

export async function deleteCustomer(url: string) {
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed trying to delete customer");
  }
}

export async function addTraining(training: object) {
  const response = await fetch(`${API_URL}/trainings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(training),
  });

  if (!response.ok) {
    throw new Error("Failed trying to add training");
  }

  return response.json();
}

export async function deleteTraining(url: string) {
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed trying to delete training");
  }
}