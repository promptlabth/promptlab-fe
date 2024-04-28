export type LoginUser = {
  id?: number;
  firebase_id?: string;
  name?: string;
  email: string;
  profilepic: string;
  plan_id?: number;
  planType: string;
  maxMessages?: number;
  start_date?: Date;
  end_date?: Date;
  access_token?: string;
  platform?: string;
  stripe_id?: string;
};
