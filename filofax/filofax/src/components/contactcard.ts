import { Contact } from "../types/Contact";
import { IndividualInfo } from "../types/IndividualInfo";
import { CompanyInfo } from "../types/CompanyInfo";
import { ContactType } from "../types/ContactType";
import { KeyContact } from "../types/KeyContact";
import "./styles.css";

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

            const kcName = document.createElement('p');
            kcName.textContent = keyContact.name;
            kcName.className = 'key-contact-name';

            const kcEmail = document.createElement('p');
            kcEmail.textContent = keyContact.email;
            kcEmail.className = 'key-contact-email';

            item.appendChild(kcName);
            item.appendChild(kcEmail);
            details.appendChild(item);
            });
        }
    
    const iconsRow = document.createElement('div');
    iconsRow.className = 'icons-row';

    const iconSymbols = ['📞', '✉️', '💬', '📅'];
    iconSymbols.forEach((symbol) => {
        const btn = document.createElement('button');
        btn.className = 'icon-btn';
        btn.textContent = symbol;
        iconsRow.appendChild(btn);
    });

    const chevron = document.createElement('button');
    chevron.className = 'chevron';
    chevron.textContent = '∨';

    chevron.addEventListener('click', () => {
        const isHidden = details.classList.contains('hidden');
        details.classList.toggle('hidden', !isHidden);
        chevron.textContent = isHidden ? '∧' : '∨';
    });

    card.appendChild(thumbnail);
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(details);
    card.appendChild(iconsRow);
    card.appendChild(chevron);

    return card;
}