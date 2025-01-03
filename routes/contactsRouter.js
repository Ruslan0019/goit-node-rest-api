import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import { checkcontactId } from "../midelwares/contactMidelwares.js";

const contactsRouter = express.Router();

// Используем миддлвару перед обработчиком маршрута
contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkcontactId, getOneContact);

contactsRouter.delete("/:id", checkcontactId, deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", checkcontactId, updateContact);

export default contactsRouter;
