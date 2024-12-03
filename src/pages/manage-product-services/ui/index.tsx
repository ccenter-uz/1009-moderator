import { Divider, Flex } from "antd";
import { FC, useEffect, useState } from "react";

import { useLazyGetSubCategoryQuery } from "@entities/product-services";

import { returnAllParams } from "@shared/lib/helpers";
import { ItableBasicData } from "@shared/types";

import { Product } from "./product";
import { Service } from "./service";

export const ManageProductServicesPage: FC = () => {
  const [subData, setSubData] = useState<ItableBasicData[] | null>(null);
  const [triggerFetch, { data, isLoading }] = useLazyGetSubCategoryQuery({
    ...returnAllParams(),
  });

  useEffect(() => {
    triggerFetch({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subData]);

  return (
    <Flex vertical>
      <div style={{ flex: 1 }}>
        <Product setSubData={setSubData} />
      </div>
      <Divider />
      <div style={{ flex: 1 }}>
        <Service data={data} isLoading={isLoading} />
      </div>
    </Flex>
  );
};
