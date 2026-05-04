export type TrainingFromApi = {
  activity: string;
  duration: number;
  date: string;
  _links: {
    self: {
      href: string;
    };
    customer: {
      href: string;
    };
  };
};

export type TrainingsResponse = {
  _embedded?: {
    trainings?: TrainingFromApi[];
  };
};

export type CustomerResponse = {
  firstname: string;
  lastname: string;
};

export type TrainingRow = {
  id: string;
  date: string;
  activity: string;
  duration: number;
  customer: string;
};

export type TrainingInput = {
  date: string;
  duration: number;
  activity: string;
  customer: string;
};