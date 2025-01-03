import { t } from "i18next";
import { z } from "zod";

export const UserCreateSchema = z.object({
  fullName: z.string({
    invalid_type_error: t("form.invalid", { field: "" }),
    required_error: t("form.required", { field: "" }),
  }),
  phoneNumber: z
    .string({
      invalid_type_error: t("form.invalid", { field: "" }),
      required_error: t("form.required", { field: "" }),
    })
    .min(13)
    .max(13)
    .regex(/^\+998\d{9}$/, { message: t("phone-regex-error") }),
  password: z
    .string({
      invalid_type_error: t("form.invalid", { field: "" }),
      required_error: t("form.required", { field: "" }),
    })
    .min(8)
    .max(20)
    // eslint-disable-next-line no-useless-escape
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_\(\)])/, {
      message: t("password-regex-error"),
    }),
  roleId: z
    .number({
      invalid_type_error: t("form.invalid", { field: "" }),
      required_error: t("form.required", { field: "" }),
    })
    .nonnegative(),
  numericId: z.string().optional(),
});

// Example usage
export type UserCreate = z.infer<typeof UserCreateSchema>;
