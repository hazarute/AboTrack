export interface Subscription {
  id: string;
  name: string;
  price: number;
  renewalDate: Date;
}

export interface SubscriptionFormData {
  name: string;
  price: string;
  renewalDate: Date | undefined;
}
