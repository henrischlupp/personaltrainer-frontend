import { useState } from "react";
import type { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import type { Customer, CustomerInput } from "../types/customer";

type EditCustomerProps = {
  customer: Customer;
  updateCustomer: (url: string, customer: CustomerInput) => void;
};

export default function EditCustomer({
  customer,
  updateCustomer,
}: EditCustomerProps) {
  const [open, setOpen] = useState(false);

  const [editedCustomer, setEditedCustomer] = useState<CustomerInput>({
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
    phone: customer.phone,
    streetaddress: customer.streetaddress || "",
    postcode: customer.postcode || "",
    city: customer.city || "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedCustomer({
      ...editedCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    updateCustomer(customer._links.self.href, editedCustomer);
    setOpen(false);
  };

  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Edit
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Edit customer</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            name="firstname"
            label="First name"
            value={editedCustomer.firstname}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="lastname"
            label="Last name"
            value={editedCustomer.lastname}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="email"
            label="Email"
            value={editedCustomer.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            value={editedCustomer.phone}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="streetaddress"
            label="Street address"
            value={editedCustomer.streetaddress}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="postcode"
            label="Postcode"
            value={editedCustomer.postcode}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="city"
            label="City"
            value={editedCustomer.city}
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