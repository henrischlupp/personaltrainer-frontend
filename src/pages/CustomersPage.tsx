import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PageHeader from "../components/PageHeader";
import CustomerList from "../components/CustomerList";
import AddCustomer from "../components/AddCustomer";

import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/api";
import type {
  Customer,
  CustomersResponse,
  CustomerInput,
} from "../types/customer";

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

  const saveCustomer = (customer: CustomerInput) => {
    addCustomer(customer)
      .then(() => getCustomersData())
      .catch((err) => console.error(err));
  };

  const editCustomer = (url: string, customer: CustomerInput) => {
    updateCustomer(url, customer)
      .then(() => getCustomersData())
      .catch((err) => console.error(err));
  };

  const removeCustomer = (url: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(url)
        .then(() => getCustomersData())
        .catch((err) => console.error(err));
    }
  };
  const exportCustomers = () => {
    const csvRows = [
      [
        "Firstname",
        "Lastname",
        "Email",
        "Phone",
        "Streetaddress",
        "Postcode",
        "City",
      ],
      ...customers.map((customer) => [
        customer.firstname,
        customer.lastname,
        customer.email,
        customer.phone,
        customer.streetaddress || "",
        customer.postcode || "",
        customer.city || "",
      ]),
    ];

    const csvContent = csvRows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <AddCustomer saveCustomer={saveCustomer} />

        <Button variant="outlined" onClick={exportCustomers}>
          Export CSV
        </Button>
      </Box>

      <CustomerList
        customers={filteredCustomers}
        deleteCustomer={removeCustomer}
        updateCustomer={editCustomer}
      />
    </Box>
  );
}
