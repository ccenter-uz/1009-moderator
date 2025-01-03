import { z } from "zod";

import { FormSingleFieldSchema } from "@shared/types/zod-objects";

export const MainOrgCreateFormDtoSchema = FormSingleFieldSchema;

export type MainOrgCreateDto = z.infer<typeof MainOrgCreateFormDtoSchema>;
