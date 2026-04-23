import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { format } from "date-fns";
import PageHeader from "../components/PageHeader";
import TrainingList from "../components/TrainingList";
import { getTrainings } from "../services/api";
import type {
  TrainingFromApi,
  TrainingsResponse,
  CustomerResponse,
  TrainingRow,
} from "../types/training";

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<TrainingRow[]>([]);
  const [search, setSearch] = useState("");

  const getTrainingsData = () => {
    getTrainings()
      .then(async (data: TrainingsResponse) => {
        const trainingList: TrainingFromApi[] = data._embedded?.trainings || [];

        const rows = await Promise.all(
          trainingList.map(async (training) => {
            let customerName = "";

            try {
              const response = await fetch(training._links.customer.href);
              const customer: CustomerResponse = await response.json();
              customerName = `${customer.firstname} ${customer.lastname}`;
            } catch (err) {
              console.error(err);
            }

            return {
              id: training._links.self.href,
              date: format(new Date(training.date), "dd.MM.yyyy HH:mm"),
              activity: training.activity,
              duration: training.duration,
              customer: customerName,
            };
          })
        );

        setTrainings(rows);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTrainingsData();
  }, []);

  const filteredTrainings = trainings.filter((training) => {
    const searchLower = search.toLowerCase();

    return (
      training.date.toLowerCase().includes(searchLower) ||
      training.activity.toLowerCase().includes(searchLower) ||
      training.duration.toString().includes(searchLower) ||
      training.customer.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Box sx={{ width: "100%", px: 2, py: 2 }}>
      <PageHeader
        title="Trainings"
        search={search}
        onSearchChange={setSearch}
      />

      <TrainingList trainings={filteredTrainings} />
    </Box>
  );
}