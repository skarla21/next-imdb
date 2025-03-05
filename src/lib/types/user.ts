export interface EmailAddress {
  id: string;
  email_address: string;
  verification: {
    status: string;
    strategy: string;
  };
  created_at: number;
  updated_at: number;
}

export interface UserParams {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string;
  email_addresses: EmailAddress[];
}
