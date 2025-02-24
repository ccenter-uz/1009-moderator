import { Divider } from "antd";
import i18next from "i18next";
import { FC, useEffect, useRef, useState } from "react";

import { SearchTopTable, TAttr, TPhone } from "@features/search-top-table";

import { SearchBottomTable } from "@entities/search-bottom-table";

interface Props {
  data: { status: number; id: number | string }[] | [];
  totalItems: number;
  isLoading: boolean;
  setRef: (ref: HTMLElement) => void;
}
type TSubCategory = {
  ProductServiceSubCategory: string;
};

export const SearchTableUI: FC<Props> = (props) => {
  const { data, totalItems, isLoading, setRef } = props;
  const tableRef = useRef<HTMLDivElement>(null);
  const [attrData, setAttrData] = useState<TAttr[] | []>([]);
  const [phonesData, setPhonesData] = useState<TPhone[]>([]);
  const [subCategoryData, setSubCategoryData] = useState<TSubCategory[]>([]);

  useEffect(() => {
    if (attrData.length) {
      setPhonesData(
        attrData[0].Phone.map((item) => ({
          phone: item?.phone,
          isSecret: item?.isSecret,
          phoneType: item?.PhoneTypes?.name[i18next.language],
        })),
      );
      setSubCategoryData(
        attrData[0].ProductServices.map(
          (item: {
            ProductServiceSubCategory: { name: { [key: string]: string } };
          }) => ({
            ProductServiceSubCategory:
              item.ProductServiceSubCategory?.name[i18next.language],
          }),
        ),
      );
    }
  }, [attrData]);

  useEffect(() => {
    if (data.length === 0) {
      setAttrData([]);
      setSubCategoryData([]);
      setPhonesData([]);
    }
  }, [data]);

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
        />
        <Divider style={{ margin: "0.5rem 0" }} />
        <SearchBottomTable
          isLoading={isLoading}
          attrData={attrData}
          subCategoryData={subCategoryData}
        />
      </div>
    </>
  );
};
