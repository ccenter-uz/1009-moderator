import { Row, FormInstance } from "antd";
import i18next from "i18next";
import { FC, useEffect, useState } from "react";

import { useLazyGetNearbyQuery } from "@entities/nearby";
import { useLazyGetStreetsQuery } from "@entities/street";
import { useLazyGetVillagesQuery } from "@entities/village";

import { useDisclosure } from "@shared/lib/hooks";
import { SingleInputWithModalUI } from "@shared/ui/single-input-with-modal";

import { AddressThreeSearchPartUI } from "./address";

type Props = {
  form: FormInstance;
  regionId: number | null;
  cityId: number | null;
};

const columns = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text[i18next.language],
  },
];

export const AddressSearchPartUI: FC<Props> = (props) => {
  const { form, regionId, cityId } = props;
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
  const {
    isOpen: isOpenStreet,
    onOpen: onOpenStreet,
    onClose: onCloseStreet,
  } = useDisclosure();

  // FETCHERS
  const [triggerVillage, { data: dataVillage, isLoading: loadingVillage }] =
    useLazyGetVillagesQuery();
  const [triggerNearby, { data: dataNearby, isLoading: loadingNearby }] =
    useLazyGetNearbyQuery();
  const [triggerStreet, { data: dataStreet, isLoading: loadingStreet }] =
    useLazyGetStreetsQuery();
  // PAGINATIONS
  const [villagePagination, setVillagePagination] = useState({
    page: 1,
    limit: 10,
  });
  const [nearbyPagination, setNearbyPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [streetPagination, setStreetPagination] = useState({
    page: 1,
    limit: 10,
  });
  // SEARCH_VALUES
  const [searchValueVillage, setSearchValueVillage] = useState("");
  const [searchValueNearby, setSearchValueNearby] = useState("");
  const [searchValueStreet, setSearchValueStreet] = useState("");

  useEffect(() => {
    if ((isOpenVillage && cityId) || (isOpenVillage && regionId)) {
      triggerVillage({
        regionId,
        cityId,
        page: villagePagination.page,
        limit: villagePagination.limit,
        search: searchValueVillage,
      });
    }
    if (!regionId && !cityId && isOpenVillage) {
      triggerVillage({
        page: villagePagination.page,
        limit: villagePagination.limit,
        search: searchValueVillage,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [villagePagination, searchValueVillage, isOpenVillage]);

  useEffect(() => {
    if ((isOpenNearby && cityId) || (isOpenNearby && regionId)) {
      triggerNearby({
        regionId,
        cityId,
        page: nearbyPagination.page,
        limit: nearbyPagination.limit,
        search: searchValueNearby,
      });
    }
    if (!regionId && !cityId && isOpenNearby) {
      triggerNearby({
        page: nearbyPagination.page,
        limit: nearbyPagination.limit,
        search: searchValueNearby,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearbyPagination, searchValueNearby, isOpenNearby]);

  useEffect(() => {
    if ((isOpenStreet && cityId) || (isOpenStreet && regionId)) {
      triggerStreet({
        regionId,
        cityId,
        page: streetPagination.page,
        limit: streetPagination.limit,
        search: searchValueStreet,
      });
    }
    if (!regionId && !cityId && isOpenStreet) {
      triggerStreet({
        page: streetPagination.page,
        limit: streetPagination.limit,
        search: searchValueStreet,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streetPagination, searchValueStreet, isOpenStreet]);

  return (
    <Row>
      <AddressThreeSearchPartUI form={form} />

      <SingleInputWithModalUI
        columns={columns}
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
        columns={columns}
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
      <SingleInputWithModalUI
        columns={columns}
        isOpen={isOpenStreet}
        onOpen={onOpenStreet}
        onClose={onCloseStreet}
        loading={loadingStreet}
        totalItems={dataStreet?.total || 0}
        data={dataStreet?.data || []}
        form={form}
        name={"streetId"}
        label={"street"}
        pagination={streetPagination}
        setPagination={setStreetPagination}
        setSearchValue={setSearchValueStreet}
      />
    </Row>
  );
};
