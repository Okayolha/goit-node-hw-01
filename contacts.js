const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex((c) => c.id === contactId);
    if (contactIndex === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = {
      id: generateId(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
