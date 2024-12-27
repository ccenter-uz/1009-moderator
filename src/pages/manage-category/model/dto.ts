import { t } from "i18next";
import { z } from "zod";

import {
  FormAddressFieldsSchema,
  FormLanguageFiledsSchema,
} from "@shared/types/zod-objects";

export const CategoryCreateFormDtoSchema = FormLanguageFiledsSchema.merge(
  FormAddressFieldsSchema,
).extend({
  name_cyrill: z.string({
    invalid_type_error: t("form.invalid", { field: "" }),
    required_error: t("form.required", { field: "" }),
  }),
});

export type CategoryCreateDto = z.infer<typeof CategoryCreateFormDtoSchema>;
