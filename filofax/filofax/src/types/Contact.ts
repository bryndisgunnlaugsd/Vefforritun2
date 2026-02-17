import { ContactType } from "./ContactType";

export type Contact<T> = {
    name: string;
    thumbnail: string;
    type: ContactType;
    info: T;
}