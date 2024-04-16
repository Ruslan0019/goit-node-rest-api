import {
  Contact,
  createContactSchema,
  patchContactSchema,
  updateContactSchema,
} from "../models/contactModel.js";
import { mongooseValidateId } from "../utils/mangooseValidation.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  try {
    mongooseValidateId(id);
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    mongooseValidateId(id);
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }

  try {
    mongooseValidateId(id);
    const updatedContact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    const { error } = updateContactSchema.validate(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateStatusContact = async (req, res) => {
  const { Id } = req.params;
  const { favorite } = req.body;

  try {
    mongooseValidateId(Id);

    const { error } = patchContactSchema.validate({ favorite });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      Id,
      { favorite },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
