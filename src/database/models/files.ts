import { Schema, model, models } from "mongoose";

const filesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
});

const Files = models.files || model("files", filesSchema);

export default Files;
