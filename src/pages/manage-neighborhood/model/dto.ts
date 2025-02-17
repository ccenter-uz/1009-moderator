import { z } from "zod";

import {
  FormAddressFieldsSchema,
  FormLanguageFiledsSchema,
} from "@shared/types/zod-objects";

export const NeighborhoodCreateFormDtoSchema = FormLanguageFiledsSchema.merge(
  FormAddressFieldsSchema,
);

export type NeighborhoodCreateDto = z.infer<
  typeof NeighborhoodCreateFormDtoSchema
>;
