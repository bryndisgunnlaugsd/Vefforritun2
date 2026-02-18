import { ContactCard } from "./components/contactcard";
import { loadContacts } from "./services/storage";
import "./base.css"


const app = document.querySelector<HTMLDivElement>('#app')!;

const contacts = loadContacts();

const contactsContainer = document.createElement('div');
contactsContainer.className = "contacts";

contacts.forEach(contact => {
  contactsContainer.appendChild(ContactCard(contact));
});

app.appendChild(contactsContainer);
