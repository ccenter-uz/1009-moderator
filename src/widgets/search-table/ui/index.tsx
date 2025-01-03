import { Divider } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { SearchTopTable } from "@features/search-top-table";

import { SearchBottomTable } from "@entities/search-bottom-table";

import { useDisclosure } from "@shared/lib/hooks";

import { MoreModalUI } from "./modal";

interface Props {
  data: AnyObject[] | [];
  totalItems: number;
  isLoading: boolean;
  setRef: (ref: HTMLElement) => void;
}

export const SearchTableUI: FC<Props> = (props) => {
  const { data, totalItems, isLoading, setRef } = props;
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const tableRef = useRef<HTMLDivElement>(null);
  const [attrData, setAttrData] = useState<AnyObject[]>([]);
  const [phonesData, setPhonesData] = useState<AnyObject[]>([]);
  const [subCategoryData, setSubCategoryData] = useState<AnyObject[]>([]);

  useEffect(() => {
    if (attrData.length) {
      setPhonesData(
        attrData[0].Phone.map(
          (item: {
            phone: string;
            isSecret: boolean;
            PhoneTypes: { name: { [key: string]: string } };
          }) => ({
            phone: item?.phone,
            isSecret: item?.isSecret,
            phoneType: item?.PhoneTypes.name[i18next.language],
          }),
        ),
      );
      setSubCategoryData(
        attrData[0].ProductServices.map(
          (item: {
            ProductServiceSubCategory: { name: { [key: string]: string } };
          }) => ({
            ProductServiceSubCategory:
              item.ProductServiceSubCategory.name[i18next.language],
          }),
        ),
      );
    }
  }, [attrData]);

  useEffect(() => {
    setRef(tableRef.current as HTMLElement);
  }, [tableRef, setRef]);

  return (
    <>
      <div ref={tableRef}>
        <SearchTopTable
          data={data}
          totalItems={totalItems}
          isLoading={isLoading}
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
      </div>
    </>
  );
};
