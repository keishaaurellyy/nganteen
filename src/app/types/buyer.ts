export enum UniversityName {
  BINUS_ALAM_SUTERA = "BINUS_ALAM_SUTERA",
  BINUS_KEMANGGISAN = "BINUS_KEMANGGISAN",
}

export type Buyer = {
  buyer_id: number;
  first_name: string;
  last_name?: string;
  phone_number: string;
  student_id_number?: string;
  university_name: UniversityName;
  university_email: string;
  password: string;
};
