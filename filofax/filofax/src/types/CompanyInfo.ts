import { KeyContact } from "./KeyContact";

export type CompanyInfo = {
    phoneNumber: string;
    industry: string;
    email: string;
    address: string;
    website: string;
    keyContacts: KeyContact[];
}