// utils/validation.ts
import Joi from "joi";

export const postSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  desc: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(10).required(),
  catSlug: Joi.string().max(10).required(),

});
