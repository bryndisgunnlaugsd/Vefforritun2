import { Contact } from "../types/Contact";
import { IndividualInfo } from "../types/IndividualInfo";
import { CompanyInfo } from "../types/CompanyInfo";
import { ContactType } from "../types/ContactType";
import { KeyContact } from "../types/KeyContact";


export function ContactCard(contact: Contact<IndividualInfo | CompanyInfo>): HTMLDivElement{
    const card = document.createElement('div');
    card.className = 'card';

    const thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail';
    thumbnail.textContent = contact.thumbnail;

    const name = document.createElement('h2');
    name.className = 'contact-name';
    name.textContent = contact.name;

    const type = document.createElement('p');
    type.className = 'contact-type';
    type.textContent = contact.type === ContactType.INDIVIDUAL
        ? (contact.info as IndividualInfo).title
        : (contact.info as CompanyInfo).industry;

    const details = document.createElement('div');
    details.className = 'details hidden';

    // conditional details
    if (contact.type === ContactType.INDIVIDUAL) {
        const info = contact.info as IndividualInfo;
        
        const phoneNumber = document.createElement('p');
        phoneNumber.className = 'detail-item';
        phoneNumber.textContent = info.phoneNumber;

        const title = document.createElement('p');
        title.textContent = info.title;
        title.className = 'title';

        const email = document.createElement('p');
        email.className = 'detail-item';
        email.textContent = info.email;

        const address = document.createElement('p');
        address.className = 'detail-item';
        address.textContent = info.address;

        const website = document.createElement('p');
        website.className = 'website';
        website.textContent = info.website;

        details.appendChild(phoneNumber);
        details.appendChild(email);
        details.appendChild(address);
        details.appendChild(website);

    } else {
        const info = contact.info as CompanyInfo;

        const phoneNumber = document.createElement('p');
        phoneNumber.textContent = info.phoneNumber;
        phoneNumber.className = 'detail-item';

        const industry = document.createElement('p');
        industry.textContent = info.industry;
        industry.className = 'industry';    //ATHUGA í CSS

        const email = document.createElement('p');
        email.textContent = info.email;
        email.className = 'detail-item';

        const address = document.createElement('p');
        address.textContent = info.address;
        address.className = 'detail-item';

        const website = document.createElement('p');
        website.textContent = info.website;
        website.className = 'detail-item';

        details.appendChild(phoneNumber);
        details.appendChild(email);
        details.appendChild(address);
        details.appendChild(website);

        const keyContactsLabel = document.createElement('p');
        keyContactsLabel.className = 'key-contacts-label';
        keyContactsLabel.textContent = 'Key contacts';
        details.appendChild(keyContactsLabel);

        info.keyContacts.forEach(keyContact => {

            const item = document.createElement('div');
            item.className = 'key-contact-item';
            
            const name = document.createElement('p');
            name.textContent = keyContact.name;
            name.className = 'key-contact-name';

            const email = document.createElement('p');
            email.textContent = keyContact.email;

            card.appendChild(name);
            card.appendChild(email);
            });
    }

    return card;

}
