import { FormInstance } from "antd";

export const resetFieldsValue = (form: FormInstance, fields: string[]) => {
  fields.forEach((field) => {
    form.setFieldsValue({ [field]: undefined });
  });
};
