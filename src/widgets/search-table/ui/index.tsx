import { Divider } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SearchTopTable } from "@features/search-top-table";

import { SearchBottomTable } from "@entities/search-bottom-table";

import { useDisclosure } from "@shared/lib/hooks";

import { MoreModalUI } from "./modal";

// MOCK-DATA
const data = [
  {
    id: 1,
    key: 1,
    code: "123456",
    abonent: "Иванов Иван Иванович",
    address: "ул. Строителей 1",
    phones: [
      { title: "+4 (52135) 525-55-55", type: "mobile", secret: 123 },
      { title: "+4 (555213) 515-55-55", type: "home", secret: 123 },
      { title: "+4 (51235) 5435-55-55", type: "mobile", secret: 123 },
      { title: "+4 (51235) 554-55-55", type: "home", secret: 123 },
      { title: "+4 (5512) 551-55-55", type: "mobile", secret: 123 },
    ],
    category: "ЯША   компания агентство центр  управление  ЧФ  ЧП  АО   ООО",
    "sub-category": "ПАПЕР СТАР",
    "main-org": "",
    region: "ТАШКЕНТ",
    city: "ТАШКЕНТ",
    district: "ЯНГИ ХАЕТСКИЙ",
    description: "+",
    "sub-category-tu": [
      { title: "ГАЗОНЫ укладка,продажа" },
      { title: "ГАЗОНЫ выращивание" },
      { title: "БРУСЧАТКА выпуск продажа" },
      { title: "АРХИТЕКТУРНЫЕ изделия производство скульптура" },
    ],
  },
  {
    id: 2,
    key: 2,
    code: "234567",
    abonent: "Christopher Alexander",
    address: "Baker Street 221B",
    phones: [
      { title: "+4 (509815) 555-55-55", type: "home", secret: 221 },
      { title: "+4 (509815) 555-55-55", type: "mobile", secret: 221 },
      { title: "+4 (509815) 555-55-55", type: "home", secret: 221 },
      { title: "+4 (509815) 555-55-55", type: "mobile", secret: 221 },
      { title: "+4 (509815) 555-55-55", type: "home", secret: 221 },
    ],
    category: "ЯША   компания агентство центр  управление  ЧФ  ЧП  АО   ООО",
    "sub-category": "ООО  ХЕЛС ЛАЙН",
    "main-org": "",
    region: "ТАШКЕНТ",
    city: "ТАШКЕНТ",
    district: "ЧИЛАНЗАРСКИЙ",
    description: "+можно обращаться через телеграм по номеру : 90 9020721",
    "sub-category-tu": [
      { title: "ВЕНГРИЯ" },
      {
        title:
          "ФАРМАЦЕВТИЧЕСКИЕ компании организации предприятия ассоциации представительства ИП СП",
      },
    ],
  },
];

export const SearchTableUI: FC = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [attrData, setAttrData] = useState<AnyObject[]>([]);
  const [phonesData, setPhonesData] = useState<AnyObject[]>([]);
  const [subCategoryData, setSubCategoryData] = useState<AnyObject[]>([]);

  useEffect(() => {
    if (attrData.length) {
      setPhonesData(
        attrData[0]["phones"]?.map(
          (value: {
            title: string;
            secret: number | string;
            type: string | number;
          }) => ({
            phone: value.title,
            secret: value.secret,
            "phone-type": value.type,
          }),
        ),
      );
      setSubCategoryData(
        attrData[0]["sub-category-tu"]?.map((value: { title: string }) => ({
          "sub-category-tu": value.title,
        })),
      );
    }
  }, [attrData]);

  return (
    <>
      <SearchTopTable
        data={data}
        setAttrData={setAttrData}
        phonesData={phonesData}
        onOpen={onOpen}
      />
      <Divider />
      <SearchBottomTable
        attrData={attrData}
        subCategoryData={subCategoryData}
      />
      <MoreModalUI open={isOpen} onClose={onClose} title={t("abonent")} />
    </>
  );
};
