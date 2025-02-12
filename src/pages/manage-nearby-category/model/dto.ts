import { z } from "zod";

import { FormSingleFieldSchema } from "@shared/types/zod-objects";

export const NearbyCategoryCreateFormDtoSchema = FormSingleFieldSchema;

export type NearbyCategoryCreateDto = z.infer<
  typeof NearbyCategoryCreateFormDtoSchema
>;
