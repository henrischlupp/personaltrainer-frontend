import { useEffect, useState } from "react";
import { getCustomers } from "../services/api";

type Customer = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

type CustomersResponse = {
  _embedded?: {
    customers?: Customer[];
  };
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("firstname");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data: CustomersResponse = await getCustomers();
        setCustomers(data._embedded?.customers || []);
      } catch (error) {
        console.error("Error trying to fetching customers:", error);
      }
    }

    fetchCustomers();
  }, []);

  function handleSort(field: string) {
    if (sortField === field) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortOrder("asc");
      }
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
      customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const aValue = a[sortField as keyof Customer].toLowerCase();
    const bValue = b[sortField as keyof Customer].toLowerCase();

    if (aValue < bValue) {
      if (sortOrder === "asc") {
        return -1;
      } else {
        return 1;
      }
    }

    if (aValue > bValue) {
      if (sortOrder === "asc") {
        return 1;
      } else {
        return -1;
      }
    }

    return 0;
  });

  return (
    <div>
      <h2>Customers</h2>

      <input
        type="text"
        placeholder="Search customers"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("firstname")}>First name</th>
            <th onClick={() => handleSort("lastname")}>Last name</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("phone")}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {sortedCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.firstname}</td>
              <td>{customer.lastname}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
