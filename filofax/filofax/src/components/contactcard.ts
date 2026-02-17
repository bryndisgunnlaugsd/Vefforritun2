import { Contact } from "../types/Contact";
import { IndividualInfo } from "../types/IndividualInfo";
import { CompanyInfo } from "../types/CompanyInfo";
import { ContactType } from "../types/ContactType";


export function ContactCard(contact: Contact<IndividualInfo | CompanyInfo>): HTMLDivElement{
    const card = document.createElement('div');

    const thumbnail = document.createElement('div');
    thumbnail.textContent = contact.thumbnail;

    const name = document.createElement('h2');
    name.textContent = contact.name;

    const type = document.createElement('p');
    type.textContent = contact.type

    card.appendChild(thumbnail);
    card.appendChild(name);
    card.appendChild(type);


    // conditional details
    if (contact.type === ContactType.INDIVIDUAL) {
        const info = contact.info as IndividualInfo;
        
        const phoneNumber = document.createElement('p');
        phoneNumber.textContent = info.phoneNumber;

        const title = document.createElement('p');
        title.textContent = info.title;

        const email = document.createElement('p');
        email.textContent = info.email;

        const address = document.createElement('p');
        address.textContent = info.address;

        const website = document.createElement('p');
        website.textContent = info.website;

    } else {
        const info = contact.info as CompanyInfo;

        const phoneNumber = document.createElement('p');
        phoneNumber.textContent = info.phoneNumber;

        const industry = document.createElement('p');
        industry.textContent = info.industry;

        const email = document.createElement('p');
        email.textContent = info.email;

        const address = document.createElement('p');
        address.textContent = info.address;

        const website = document.createElement('p');
        website.textContent = info.website;

        info.keyContacts.forEach(keyContact => {
            const name = document.createElement('p');
            name.textContent = keyContact.name;

            const email = document.createElement('p');
            email.textContent = keyContact.email;

            card.appendChild(name);
            card.appendChild(email);
            });
    }

    return card;

}
