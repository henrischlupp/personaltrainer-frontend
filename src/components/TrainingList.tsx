import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { TrainingRow } from "../types/training";

type TrainingListProps = {
  trainings: TrainingRow[];
  deleteTraining: (url: string) => void;
};

export default function TrainingList({
  trainings,
  deleteTraining,
}: TrainingListProps) {
  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 180 },
    { field: "activity", headerName: "Activity", width: 180 },
    { field: "duration", headerName: "Duration (min)", width: 140 },
    { field: "customer", headerName: "Customer", width: 200 },
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
          onClick={() => deleteTraining(params.row.id)}
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
        rows={trainings}
        getRowId={(row) => row.id}
        autoPageSize
        rowSelection={false}
      />
    </Box>
  );
}