import { z } from "zod";

import {
  FormAddressFieldsSchema,
  FormLanguageFiledsSchema,
} from "@shared/types/zod-objects";

export const ResidentialAreaCreateFormDtoSchema =
  FormLanguageFiledsSchema.merge(FormAddressFieldsSchema);

export type ResidentialAreaCreateDto = z.infer<
  typeof ResidentialAreaCreateFormDtoSchema
>;
