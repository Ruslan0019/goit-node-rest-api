import { Contact } from "../models/contactModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    msg: "success",
    contacts,
  });
});

export const getOneContact = catchAsync(async (req, res) => {
  const id = req.contact;
  const contact = await Contact.findById(id);

  res.status(200).json({
    msg: "success",
    contact,
  });
});

export const deleteContact = catchAsync(async (req, res) => {
  const id = req.contact;
  const deleteContact = await Contact.findByIdAndDelete(id);

  res.status(200).json({
    msg: "success deleted",
    deleteContact,
  });
});

export const createContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json({
    msg: "success created contact",
    newContact,
  });
});

export const updateContact = catchAsync(async (req, res) => {
  const id = req.contact;
  const update = req.body;
  if (Object.keys(update).length === 0) {
    return res.status(400).json({
      message: "Body must have at least one field",
    });
  }

  const updateContact = await Contact.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    msg: "success update contact",
    updateContact,
  });
});
