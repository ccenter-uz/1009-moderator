import { z } from "zod";

export const getZodRequiredKeys = (
  schema: z.ZodObject<z.ZodRawShape>,
): string[] => {
  const shape = schema._def.shape();
  return Object.keys(shape).filter((key) => {
    const field = shape[key];
    if (!(field instanceof z.ZodOptional)) return true;
  });
};
