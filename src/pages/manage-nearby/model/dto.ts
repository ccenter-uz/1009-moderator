import { t } from "i18next";
import { z } from "zod";

import {
  FormAddressFieldsSchema,
  FormLanguageFiledsSchema,
} from "@shared/types/zod-objects";

export const NearbyCreateFormDtoSchema = FormLanguageFiledsSchema.merge(
  FormAddressFieldsSchema,
).extend({
  ["nearby-category"]: z
    .number({
      invalid_type_error: t("form.invalid", { field: "" }),
      required_error: t("form.required", { field: "" }),
    })
    .int()
    .min(0),
});

export type NearbyCreateDto = z.infer<typeof NearbyCreateFormDtoSchema>;
