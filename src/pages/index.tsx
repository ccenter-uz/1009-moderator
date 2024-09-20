import { lazy } from "react";

// DASHBOARD
export const DashboardAsync = lazy(() =>
  import("./dashboard/ui").then((module) => ({ default: module.Dashboard })),
);

// STATISTICS

// ORGANIZATIONS
// add
export const OrgAddAsync = lazy(() =>
  import("./organizations/add/ui").then((module) => ({
    default: module.OrgAdd,
  })),
);
// mine
export const OrgMineAsync = lazy(() =>
  import("./organizations/mine/ui").then((module) => ({
    default: module.OrgMine,
  })),
);
// all
export const OrgAllAsync = lazy(() =>
  import("./organizations/all/ui").then((module) => ({
    default: module.OrgAll,
  })),
);
// unconfirmed
export const OrgUnconfirmedAsync = lazy(() =>
  import("./organizations/unconfirmed/ui").then((module) => ({
    default: module.OrgUnconfirmed,
  })),
);

// ADDITIONAL

// MANAGE
// area
export const ManageAreaAsync = lazy(() =>
  import("./manage/area/ui").then((module) => ({
    default: module.ManageArea,
  })),
);
// main-org
export const ManageMainOrgAsync = lazy(() =>
  import("./manage/main-org/ui").then((module) => ({
    default: module.ManageMainOrg,
  })),
);
// passage
export const ManagePassageAsync = lazy(() =>
  import("./manage/passage/ui").then((module) => ({
    default: module.ManagePassage,
  })),
);
// product-services
export const ManageProductServicesAsync = lazy(() =>
  import("./manage/product-services/ui").then((module) => ({
    default: module.ManageProductServices,
  })),
);
// users
export const ManageUsersAsync = lazy(() =>
  import("./manage/users/ui").then((module) => ({
    default: module.ManageUsers,
  })),
);

// nearby
export const ManageNearbyAsync = lazy(() =>
  import("./manage/nearby/ui").then((module) => ({
    default: module.ManageNearby,
  })),
);

// nearby-category
export const ManageNearbyCategoryAsync = lazy(() =>
  import("./manage/nearby-category/ui").then((module) => ({
    default: module.ManageNearbyCategory,
  })),
);

// street
export const ManageStreetAsync = lazy(() =>
  import("./manage/street/ui").then((module) => ({
    default: module.ManageStreet,
  })),
);

// village
export const ManageVillageAsync = lazy(() =>
  import("./manage/village/ui").then((module) => ({
    default: module.ManageVillage,
  })),
);

// residential-area
export const ManageResidentialAreaAsync = lazy(() =>
  import("./manage/residential-area/ui").then((module) => ({
    default: module.ManageResidentialArea,
  })),
);

// phone-types
export const ManagePhoneTypesAsync = lazy(() =>
  import("./manage/phone-types/ui").then((module) => ({
    default: module.ManagePhoneTypes,
  })),
);

// category
export const ManageCategoryAsync = lazy(() =>
  import("./manage/category/ui").then((module) => ({
    default: module.ManageCategory,
  })),
);

// lane
export const ManageLaneAsync = lazy(() =>
  import("./manage/lane/ui").then((module) => ({
    default: module.ManageLane,
  })),
);

// impasse
export const ManageImpasseAsync = lazy(() =>
  import("./manage/impasse/ui").then((module) => ({
    default: module.ManageImpasse,
  })),
);

// avenue
export const ManageAvenueAsync = lazy(() =>
  import("./manage/avenue/ui").then((module) => ({
    default: module.ManageAvenue,
  })),
);

// district
export const ManageDistrictAsync = lazy(() =>
  import("./manage/district/ui").then((module) => ({
    default: module.ManageDistrict,
  })),
);
