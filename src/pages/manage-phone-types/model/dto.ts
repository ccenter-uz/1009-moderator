import { t } from "i18next";
import { z } from "zod";

import { FormLanguageFiledsSchema } from "@shared/types/zod-objects";

export const PhoneTypeCreateFormDtoSchema = FormLanguageFiledsSchema.extend({
  name_cyrill: z.string({
    invalid_type_error: t("form.invalid", { field: "" }),
    required_error: t("form.required", { field: "" }),
  }),
});

export type PhoneTypeCreateDto = z.infer<typeof PhoneTypeCreateFormDtoSchema>;
