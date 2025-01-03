import { catchAsync } from "../utils/catchAsync.js";
import { Contact } from "../models/contactModel.js";

export const checkcontactId = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({
      msg: "Not found",
    });
  }
  req.contact = contact;
  next();
});
