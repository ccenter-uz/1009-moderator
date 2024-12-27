import { Row, FormInstance } from "antd";
import i18next from "i18next";
import { FC, useEffect, useState } from "react";

import { useLazyGetNearbyQuery } from "@entities/nearby";
import { useLazyGetVillagesQuery } from "@entities/village";

import { useDisclosure } from "@shared/lib/hooks";
import { SingleInputWithModalUI } from "@shared/ui/single-input-with-modal";

import { AddressThreeSearchPartUI } from "./address";

type Props = {
  form: FormInstance;
};

const villageColumns = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text[i18next.language],
  },
];

const nearbyColumns = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text[i18next.language],
  },
];

export const AddressSearchPartUI: FC<Props> = (props) => {
  const { form } = props;
  const {
    isOpen: isOpenVillage,
    onOpen: onOpenVillage,
    onClose: onCloseVillage,
  } = useDisclosure();
  const {
    isOpen: isOpenNearby,
    onOpen: onOpenNearby,
    onClose: onCloseNearby,
  } = useDisclosure();

  // FETCHERS
  const [triggerVillage, { data: dataVillage, isLoading: loadingVillage }] =
    useLazyGetVillagesQuery();
  const [triggerNearby, { data: dataNearby, isLoading: loadingNearby }] =
    useLazyGetNearbyQuery();
  // PAGINATIONS
  const [villagePagination, setVillagePagination] = useState({
    page: 1,
    limit: 10,
  });
  const [nearbyPagination, setNearbyPagination] = useState({
    page: 1,
    limit: 10,
  });
  // SEARCH_VALUES
  const [searchValueVillage, setSearchValueVillage] = useState("");
  const [searchValueNearby, setSearchValueNearby] = useState("");

  useEffect(() => {
    if (isOpenVillage) {
      triggerVillage({
        page: villagePagination.page,
        limit: villagePagination.limit,
        search: searchValueVillage,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [villagePagination, searchValueVillage, isOpenVillage]);

  useEffect(() => {
    if (isOpenNearby) {
      triggerNearby({
        page: nearbyPagination.page,
        limit: nearbyPagination.limit,
        search: searchValueNearby,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearbyPagination, searchValueNearby, isOpenNearby]);

  return (
    <Row>
      <AddressThreeSearchPartUI form={form} />

      <SingleInputWithModalUI
        columns={villageColumns}
        isOpen={isOpenVillage}
        onOpen={onOpenVillage}
        onClose={onCloseVillage}
        loading={loadingVillage}
        totalItems={dataVillage?.total || 0}
        data={dataVillage?.data || []}
        form={form}
        name={"villageId"}
        label={"village"}
        pagination={villagePagination}
        setPagination={setVillagePagination}
        setSearchValue={setSearchValueVillage}
      />
      <SingleInputWithModalUI
        columns={nearbyColumns}
        isOpen={isOpenNearby}
        onOpen={onOpenNearby}
        onClose={onCloseNearby}
        loading={loadingNearby}
        totalItems={dataNearby?.total || 0}
        data={dataNearby?.data || []}
        form={form}
        name={"nearbyId"}
        label={"nearby"}
        pagination={nearbyPagination}
        setPagination={setNearbyPagination}
        setSearchValue={setSearchValueNearby}
      />
    </Row>
  );
};
