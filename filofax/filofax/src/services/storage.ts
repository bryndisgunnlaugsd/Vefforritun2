import contactsData from '../data/prepopulation.json';
import { Contact } from '../types/Contact';
import { ContactType } from '../types/ContactType';
import { IndividualInfo } from '../types/IndividualInfo';
import { CompanyInfo } from '../types/CompanyInfo';

function saveContacts(contacts: Contact<IndividualInfo | CompanyInfo>[]) {
    localStorage.setItem('filofax-contacts', JSON.stringify(contacts))
}

function loadContacts(): Contact<IndividualInfo | CompanyInfo>[] {
    const stored = localStorage.getItem('filofax-contacts');

    if (stored) {
        return JSON.parse(stored)
    }else {
        const contacts = contactsData.contacts.map((rawContact) => {
            const thumbnail = rawContact.name.split(' ').map((word: string) => word[0]).join('');

            if (rawContact.type === "individual") {
                return {
                    name: rawContact.name,
                    thumbnail: thumbnail,
                    type:ContactType.INDIVIDUAL,
                    info: {
                        phoneNumber: rawContact.phoneNumber,
                        title: rawContact.title,
                        email: rawContact.email,
                        address: rawContact.address,
                        website: rawContact.website
                    }
                } as Contact<IndividualInfo>
            }else {
                return {
                    name: rawContact.name,
                    thumbnail: thumbnail,
                    type: ContactType.COMPANY,
                    info: {
                        phoneNumber: rawContact.phoneNumber,
                        industry: rawContact.industry,
                        email: rawContact.email,
                        address: rawContact.address,
                        website: rawContact.website,
                        keyContacts: rawContact.keyContacts
                    }
                } as Contact<CompanyInfo>
            }
        });

        saveContacts(contacts);
        return contacts;
    }
}