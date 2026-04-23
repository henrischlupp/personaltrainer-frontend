import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PageHeader from "../components/PageHeader";
import CustomerList from "../components/CustomerList";
import { getCustomers } from "../services/api";
import type { Customer, CustomersResponse } from "../types/customer";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  const getCustomersData = () => {
    getCustomers()
      .then((data: CustomersResponse) => {
        setCustomers(data._embedded?.customers || []);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCustomersData();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = search.toLowerCase();

    return (
      customer.firstname.toLowerCase().includes(searchLower) ||
      customer.lastname.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phone.toLowerCase().includes(searchLower) ||
      (customer.streetaddress || "").toLowerCase().includes(searchLower) ||
      (customer.postcode || "").toLowerCase().includes(searchLower) ||
      (customer.city || "").toLowerCase().includes(searchLower)
    );
  });

  return (
    <Box sx={{ width: "100%", px: 2, py: 2 }}>
      <PageHeader
        title="Customers"
        search={search}
        onSearchChange={setSearch}
      />

      <CustomerList customers={filteredCustomers} />
    </Box>
  );
}