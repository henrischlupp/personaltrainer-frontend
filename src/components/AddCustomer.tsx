import { useState } from "react";
import type { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import type { CustomerInput } from "../types/customer";

type AddCustomerProps = {
  saveCustomer: (customer: CustomerInput) => void;
};

export default function AddCustomer({ saveCustomer }: AddCustomerProps) {
  const [open, setOpen] = useState(false);

  const [customer, setCustomer] = useState<CustomerInput>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    saveCustomer(customer);

    setCustomer({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      streetaddress: "",
      postcode: "",
      city: "",
    });

    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add customer
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add customer</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            name="firstname"
            label="First name"
            value={customer.firstname}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="lastname"
            label="Last name"
            value={customer.lastname}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="email"
            label="Email"
            value={customer.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            value={customer.phone}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="streetaddress"
            label="Street address"
            value={customer.streetaddress}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="postcode"
            label="Postcode"
            value={customer.postcode}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="city"
            label="City"
            value={customer.city}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}