export enum KitchenStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type Kitchen = {
  kitchen_id: number;
  kitchen_email: string;
  kitchen_password: string;
  kitchen_name: string;
  admin_name: string;
  admin_phone: string;
  location: string;
  status: KitchenStatus;
};
