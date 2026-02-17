import { IndividualInfo } from "./IndividualInfo";

export type CompanyInfo = {
    phoneNumber: string;
    industry: string;
    email: string;
    address: string;
    website: string;
    keyContacts: IndividualInfo[];
}