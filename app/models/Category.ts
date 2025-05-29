import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  shownName:{
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  }
});

const Category = models.Category || model("Category", categorySchema);
export default Category;
