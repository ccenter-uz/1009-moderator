import { z } from "zod";

import {
  FormAddressFieldsSchema,
  FormLanguageFiledsSchema,
} from "@shared/types";

export const AvenueCreateFormDtoSchema = FormLanguageFiledsSchema.merge(
  FormAddressFieldsSchema,
);

export type AvenueCreateDto = z.infer<typeof AvenueCreateFormDtoSchema>;
