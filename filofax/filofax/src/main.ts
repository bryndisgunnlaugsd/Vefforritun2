import { ContactCard } from "./components/contactcard";
import { loadContacts } from "./services/storage";
import "./base.css"

const app = document.querySelector<HTMLDivElement>('#app')!;

import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);

// Header
const header = document.createElement('header');

const title = document.createElement('h1');
title.className = 'page-title';
title.textContent = "ADDRESS BOOK";

const subtitle = document.createElement('p');
subtitle.className = 'page-subtitle';
subtitle.textContent = "You can see all stored contacts in the list seen below. Each contact is either an individual or a company account.";

header.appendChild(title);
header.appendChild(subtitle);

// Contacts
const contacts = loadContacts();

const contactsContainer = document.createElement('div');
contactsContainer.className = "contacts";

contacts.forEach(contact => {
  contactsContainer.appendChild(ContactCard(contact));
});

app.appendChild(header);
app.appendChild(contactsContainer);