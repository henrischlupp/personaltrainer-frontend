import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Calendar, momentLocalizer } from "react-big-calendar";
import type { View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getTrainings } from "../services/api";
import type {
  TrainingFromApi,
  TrainingsResponse,
  CustomerResponse,
} from "../types/training";

const localizer = momentLocalizer(moment);

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("week");

  const getCalendarData = () => {
    getTrainings()
      .then(async (data: TrainingsResponse) => {
        const trainings: TrainingFromApi[] = data._embedded?.trainings || [];

        const calendarEvents = await Promise.all(
          trainings.map(async (training) => {
            let customerName = "";

            try {
              const response = await fetch(training._links.customer.href);
              const customer: CustomerResponse = await response.json();
              customerName = `${customer.firstname} ${customer.lastname}`;
            } catch (err) {
              console.error(err);
            }

            const startTime = new Date(training.date);
            const endTime = new Date(
              startTime.getTime() + training.duration * 60000
            );

            return {
              title: `${training.activity} / ${customerName}`,
              start: startTime,
              end: endTime,
            };
          })
        );

        setEvents(calendarEvents);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCalendarData();
  }, []);

  return (
    <Box sx={{ width: "100%", px: 2, py: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Training Calendar
      </Typography>

      <Box sx={{ height: 700 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={date}
          view={view}
          onNavigate={(newDate) => setDate(newDate)}
          onView={(newView) => setView(newView)}
          views={["month", "week", "day", "agenda"]}
        />
      </Box>
    </Box>
  );
}