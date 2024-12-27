import { Row, Col, Input, Form, FormInstance } from "antd";
import i18next from "i18next";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ProductServiceSelect } from "@features/product-service-select";

import { useLazyGetMainOrgQuery } from "@entities/main-org";
import { useLazyGetPhoneTypeQuery } from "@entities/phone";

import { useDisclosure } from "@shared/lib/hooks";
import { SingleInputWithModalUI } from "@shared/ui/single-input-with-modal";

type Props = {
  form: FormInstance;
};

const phoneTypeColumns = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text[i18next.language],
  },
];

const mainOrgColumns = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: string) => text,
  },
];

export const PersonalSearchPartUI: FC<Props> = (props) => {
  const { form } = props;
  const { t } = useTranslation();
  const {
    isOpen: isOpenPhoneType,
    onOpen: onOpenPhoneType,
    onClose: onClosePhoneType,
  } = useDisclosure();
  const {
    isOpen: isOpenMainOrg,
    onOpen: onOpenMainOrg,
    onClose: onCloseMainOrg,
  } = useDisclosure();

  // FETCHERS
  const [
    triggerPhoneType,
    { data: dataPhoneType, isLoading: loadingPhoneType },
  ] = useLazyGetPhoneTypeQuery();
  const [triggerMainOrg, { data: dataMainOrg, isLoading: loadingMainOrg }] =
    useLazyGetMainOrgQuery();
  // PAGINATIONS
  const [phoneTypePagination, setPhoneTypePagination] = useState({
    page: 1,
    limit: 10,
  });
  const [mainOrgPagination, setMainOrgPagination] = useState({
    page: 1,
    limit: 10,
  });
  // SEARCH_VALUES
  const [searchValuePhoneType, setSearchValuePhoneType] = useState("");
  const [searchValueMainOrg, setSearchValueMainOrg] = useState("");

  useEffect(() => {
    if (isOpenPhoneType) {
      triggerPhoneType({
        page: phoneTypePagination.page,
        limit: phoneTypePagination.limit,
        search: searchValuePhoneType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneTypePagination, searchValuePhoneType, isOpenPhoneType]);
  useEffect(() => {
    if (isOpenMainOrg) {
      triggerMainOrg({
        page: mainOrgPagination.page,
        limit: mainOrgPagination.limit,
        search: searchValueMainOrg,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainOrgPagination, searchValueMainOrg, isOpenMainOrg]);

  return (
    <Row>
      <Col span={24}>
        <Form.Item
          name="name"
          label={t("abonent")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("abonent")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="address"
          label={t("address")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("address")} allowClear />
        </Form.Item>
      </Col>
      <ProductServiceSelect form={form} />

      <SingleInputWithModalUI
        columns={phoneTypeColumns}
        isOpen={isOpenPhoneType}
        onOpen={onOpenPhoneType}
        onClose={onClosePhoneType}
        loading={loadingPhoneType}
        totalItems={dataPhoneType?.total || 0}
        data={dataPhoneType?.data || []}
        form={form}
        label={"phone-type"}
        name={"phoneType"}
        pagination={phoneTypePagination}
        setPagination={setPhoneTypePagination}
        setSearchValue={setSearchValuePhoneType}
      />
      <SingleInputWithModalUI
        columns={mainOrgColumns}
        isOpen={isOpenMainOrg}
        onOpen={onOpenMainOrg}
        onClose={onCloseMainOrg}
        loading={loadingMainOrg}
        totalItems={dataMainOrg?.total || 0}
        data={dataMainOrg?.data || []}
        form={form}
        label="main-org"
        name="mainOrg"
        pagination={mainOrgPagination}
        setPagination={setMainOrgPagination}
        setSearchValue={setSearchValueMainOrg}
      />
    </Row>
  );
};
