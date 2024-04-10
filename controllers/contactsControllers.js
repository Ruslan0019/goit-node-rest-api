import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    let contact = await removeContact(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createContact = (req, res) => {
  const schema = createContactSchema;

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, phone } = req.body;

  try {
    const user = addContact(name, email, phone);
    if (!user) {
      return res.status(400).json({ message: "Failed to add contact" });
    }

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(req.body);
  const { error } = updateContactSchema.validate(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedContact = await updateContacts(id, body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
