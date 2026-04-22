import { useEffect, useState } from "react";
import { getCustomers } from "../services/api";

type Customer = {
  firstname: string;
  lastname: string;
  email?: string;
  phone?: string;
};

type CustomerResponse = {
  _embedded?: {
    customers?: Customer[];
  };
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data: CustomerResponse = await getCustomers();
        console.log("customers response:", data);
        setCustomers(data._embedded?.customers ?? []);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  if (loading) {
    return <p>Loading customers...</p>;
  }

  return (
    <div>
      <h2>Customers</h2>
      {customers.map((customer, index) => (
        <div key={index}>
          {customer.firstname} {customer.lastname}
        </div>
      ))}
    </div>
  );
}