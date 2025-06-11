export enum UniversityName {
  BINUS_ALAM_SUTERA = "BINUS_ALAM_SUTERA",
  BINUS_KEMANGGISAN = "BINUS_KEMANGGISAN",
}

export type Buyer = {
  buyerId: number;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  studentIdNumber?: string;
  universityName: UniversityName;
  universityEmail: string;
  password: string;
};
