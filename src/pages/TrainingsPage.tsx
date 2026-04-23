import { useEffect, useState } from "react";
import { getTrainings } from "../services/api";

type Training = {
  activity: string;
  duration: number;
  date: string;
  customer?: {
    firstname?: string;
    lastname?: string;
  };
};

type TrainingsResponse = {
  _embedded?: {
    trainings?: Training[];
  };
};

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrainings() {
      try {
        const data: TrainingsResponse = await getTrainings();
        console.log("trainings response:", data);
        setTrainings(data._embedded?.trainings ?? []);
      } catch (error) {
        console.error("Error fetching trainings:", error);
        setTrainings([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTrainings();
  }, []);

  if (loading) {
    return <p>Loading trainings...</p>;
  }

  return (
    <div>
      <h2>Trainings</h2>
      {trainings.map((training, index) => (
        <div key={index}>
          {training.activity} | {training.duration} min |{" "}
          {new Date(training.date).toLocaleString("fi-FI")} |{" "}
          {training.customer?.firstname} {training.customer?.lastname}
        </div>
      ))}
    </div>
  );
}