import { z } from "zod";

import {
  FormAddressFieldsSchema,
  FormLanguageFiledsSchema,
} from "@shared/types/zod-objects";

export const ImpasseCreateFormDtoSchema = FormLanguageFiledsSchema.merge(
  FormAddressFieldsSchema,
);

export type ImpasseCreateDto = z.infer<typeof ImpasseCreateFormDtoSchema>;
