import mongoose from "mongoose";

export const mongooseValidateId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid contact ID");
  }
};
