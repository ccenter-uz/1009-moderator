import { z } from "zod";

import {
  FormAddressFieldsSchema,
  FormLanguageFiledsSchema,
} from "@shared/types/zod-objects";

export const DistrictCreateFormDtoSchema = FormLanguageFiledsSchema.merge(
  FormAddressFieldsSchema,
);

export type DistrictCreateDto = z.infer<typeof DistrictCreateFormDtoSchema>;
