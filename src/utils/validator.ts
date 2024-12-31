// utils/validation.ts
import Joi from "joi";

export const postSchema = Joi.object({
  title: Joi.string().min(3).max(10).required(),
  desc: Joi.string().min(3).max(20).required(),
  content: Joi.string().min(10).required(),
  catSlug: Joi.string().max(10).required(),

});
