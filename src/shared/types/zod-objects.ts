import { t } from "i18next";
import { z } from "zod";

export const FormLanguageFiledsSchema = z.object({
  name_ru: z.string({
    invalid_type_error: t("form.invalid", { field: "" }),
    required_error: t("form.required", { field: "" }),
  }),
  name_uz: z.string({
    invalid_type_error: t("form.invalid", { field: "" }),
    required_error: t("form.required", { field: "" }),
  }),
  name_uzcyrill: z.string({
    invalid_type_error: t("form.invalid", { field: "" }),
    required_error: t("form.required", { field: "" }),
  }),
  new_name_ru: z.string().optional(),
  new_name_uz: z.string().optional(),
  new_name_uzcyrill: z.string().optional(),
  old_name_ru: z.string().optional(),
  old_name_uz: z.string().optional(),
  old_name_uzcyrill: z.string().optional(),
});

export const FormAddressFieldsSchema = z.object({
  region: z
    .number({
      invalid_type_error: t("form.invalid", { field: "" }),
      required_error: t("form.required", { field: "" }),
    })
    .int()
    .min(0),
  city: z
    .number({
      invalid_type_error: t("form.invalid", { field: "" }),
      required_error: t("form.required", { field: "" }),
    })
    .int()
    .min(0),
  index: z
    .string({
      invalid_type_error: t("form.invalid", { field: "" }),
      required_error: t("form.required", { field: "" }),
    })
    .min(0),
  district: z
    .number({
      invalid_type_error: t("form.invalid", { field: "" }),
      required_error: t("form.required", { field: "" }),
    })
    .int()
    .optional()
    .nullish(),
});

export const FormSingleFieldSchema = z.object({
  name: z.string({
    invalid_type_error: t("form.invalid", { field: "" }),
    required_error: t("form.required", { field: "" }),
  }),
});
