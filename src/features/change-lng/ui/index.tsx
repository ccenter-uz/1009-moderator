import { Select } from "antd";
import i18next from "i18next";
import { FC } from "react";

export const ChangeLng: FC = () => {
  const locale = i18next.language;

  return (
    <Select
      defaultValue={locale}
      onChange={(value: string) => i18next.changeLanguage(value)}
      options={[
        {
          value: "ru",
          label: "Рус",
        },
        {
          value: "uz",
          label: "Uzb",
        },
        {
          value: "cy",
          label: "Узб",
        },
      ]}
    />
  );
};
