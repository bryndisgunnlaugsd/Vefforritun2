import contactsData from './data/prepopulation.json';
import { CompanyInfo } from './types/CompanyInfo';
import { Contact } from './types/Contact';
import { IndividualInfo } from './types/IndividualInfo';

function saveContacts(contacts: Contact<IndividualInfo | CompanyInfo>[]) {
    localStorage.setItem('filofax-contacts', JSON.stringify(contacts))
}

function loadContacts(): Contact<IndividualInfo | CompanyInfo>[] {
    const stored = localStorage.getItem('filofax-contacts');

    if (stored) {
        return JSON.parse(stored)
    }else {

    }
}