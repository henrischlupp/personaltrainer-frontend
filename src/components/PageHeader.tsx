import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

type PageHeaderProps = {
  title: string;
  search: string;
  onSearchChange: (value: string) => void;
};

export default function PageHeader({
  title,
  search,
  onSearchChange,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h5">{title}</Typography>

      <Box sx={{ marginLeft: "auto" }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ width: 250 }}
        />
      </Box>
    </Box>
  );
}