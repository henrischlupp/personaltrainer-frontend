import { useState } from "react";
import type { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import type { Customer } from "../types/customer";
import type { TrainingInput } from "../types/training";

type AddTrainingProps = {
  customers: Customer[];
  saveTraining: (training: TrainingInput) => void;
};

type TrainingForm = {
  date: string;
  duration: string;
  activity: string;
  customer: string;
};

export default function AddTraining({
  customers,
  saveTraining,
}: AddTrainingProps) {
  const [open, setOpen] = useState(false);

  const [training, setTraining] = useState<TrainingForm>({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTraining({
      ...training,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    const newTraining: TrainingInput = {
      date: new Date(training.date).toISOString(),
      duration: Number(training.duration),
      activity: training.activity,
      customer: training.customer,
    };

    saveTraining(newTraining);

    setTraining({
      date: "",
      duration: "",
      activity: "",
      customer: "",
    });

    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add training
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add training</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="datetime-local"
            value={training.date}
            onChange={handleChange}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            margin="dense"
            name="duration"
            label="Duration"
            type="number"
            value={training.duration}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="customer"
            label="Customer"
            value={training.customer}
            onChange={handleChange}
            select
            fullWidth
          >
            {customers.map((customer) => (
              <MenuItem
                key={customer._links.self.href}
                value={customer._links.self.href}
              >
                {customer.firstname} {customer.lastname}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
