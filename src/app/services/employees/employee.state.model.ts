export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    skills: Skills[];
    address: Address;
    isDeleting?: boolean;
}

export interface Skills {
  skillName: string;
  yearsOfExperince: number;
  seniorityRating: number;
}

export interface Address {
  street: string;
  city: string;
  postalCode: number;
  country: string;
}