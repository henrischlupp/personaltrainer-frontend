import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import type { Customer } from "../types/customer";

type CustomerListProps = {
  customers: Customer[];
};

export default function CustomerList({ customers }: CustomerListProps) {
  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First name", width: 140 },
    { field: "lastname", headerName: "Last name", width: 140 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "streetaddress", headerName: "Address", width: 180 },
    { field: "postcode", headerName: "Postcode", width: 120 },
    { field: "city", headerName: "City", width: 140 },
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