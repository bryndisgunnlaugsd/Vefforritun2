import { ContactCard } from "./components/contactcard";
import { loadContacts } from "./services/storage";



const app = document.querySelector<HTMLDivElement>('#app')!;

const contacts = loadContacts();

contacts.forEach(contact => {
  app.appendChild(ContactCard(contact));
});