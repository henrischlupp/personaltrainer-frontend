export type Customer = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress?: string;
  postcode?: string;
  city?: string;
  _links: {
    self: {
      href: string;
    };
  };
};

export type CustomerInput = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
};

export type CustomersResponse = {
  _embedded?: {
    customers?: Customer[];
  };
};