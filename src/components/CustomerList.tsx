import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditCustomer from "./EditCustomer";
import type { Customer, CustomerInput } from "../types/customer";

type CustomerListProps = {
  customers: Customer[];
  deleteCustomer: (url: string) => void;
  updateCustomer: (url: string, customer: CustomerInput) => void;
};

export default function CustomerList({
  customers,
  deleteCustomer,
  updateCustomer,
}: CustomerListProps) {
  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First name", width: 140 },
    { field: "lastname", headerName: "Last name", width: 140 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "streetaddress", headerName: "Address", width: 180 },
    { field: "postcode", headerName: "Postcode", width: 120 },
    { field: "city", headerName: "City", width: 140 },
    {
      field: "edit",
      headerName: "",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <EditCustomer
          customer={params.row}
          updateCustomer={updateCustomer}
        />
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          color="error"
          size="small"
          onClick={() => deleteCustomer(params.row._links.self.href)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", height: 520 }}>
      <DataGrid
        columns={columns}
        rows={customers}
        getRowId={(row) => row._links.self.href}
        autoPageSize
        rowSelection={false}
      />
    </Box>
  );
}