import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getTrainings } from "../services/api";
import type {
  TrainingFromApi,
  TrainingsResponse,
  TrainingStatistic,
} from "../types/training";

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<TrainingStatistic[]>([]);

  const getStatisticsData = () => {
    getTrainings()
      .then((data: TrainingsResponse) => {
        const trainings: TrainingFromApi[] = data._embedded?.trainings || [];

        const groupedTrainings: { [key: string]: number } = {};

        trainings.forEach((training) => {
          if (groupedTrainings[training.activity]) {
            groupedTrainings[training.activity] += training.duration;
          } else {
            groupedTrainings[training.activity] = training.duration;
          }
        });

        const chartData: TrainingStatistic[] = Object.keys(groupedTrainings).map(
          (activity) => {
            return {
              activity: activity,
              minutes: groupedTrainings[activity],
            };
          }
        );

        setStatistics(chartData);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getStatisticsData();
  }, []);

  return (
    <Box sx={{ width: "100%", px: 2, py: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Training Statistics
      </Typography>

      <Typography sx={{ mb: 2 }}>
        Total training minutes by activity
      </Typography>

      <Box sx={{ width: "100%", height: 500 }}>
        <ResponsiveContainer>
          <BarChart data={statistics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="activity" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="minutes" fill="#2f4fb3" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}