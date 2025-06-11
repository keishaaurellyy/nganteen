export enum KitchenStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type Kitchen = {
  kitchenId: number;
  kitchenEmail: string;
  kitchenPassword: string;
  kitchenName: string;
  kitchenDescription: string;
  adminName: string;
  adminPhone: string;
  location: string;
  status: KitchenStatus;
};
