import { z } from "zod";

import {
  FormAddressFieldsSchema,
  FormLanguageFiledsSchema,
} from "@shared/types";

export const VillageCreateFormDtoSchema = FormLanguageFiledsSchema.merge(
  FormAddressFieldsSchema,
);

export type VillageCreateDto = z.infer<typeof VillageCreateFormDtoSchema>;
