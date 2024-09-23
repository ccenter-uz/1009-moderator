import { lazy } from "react";

// DASHBOARD
export const DashboardAsync = lazy(() =>
  import("./dashboard").then((module) => ({ default: module.DashboardPage })),
);

// STATISTICS

// ORGANIZATIONS
// add
export const OrgAddAsync = lazy(() =>
  import("./organizations/add").then((module) => ({
    default: module.OrgAddPage,
  })),
);
// mine
export const OrgMineAsync = lazy(() =>
  import("./organizations/mine").then((module) => ({
    default: module.OrgMinePage,
  })),
);
// all
export const OrgAllAsync = lazy(() =>
  import("./organizations/all").then((module) => ({
    default: module.OrgAllPage,
  })),
);
// unconfirmed
export const OrgUnconfirmedAsync = lazy(() =>
  import("./organizations/unconfirmed").then((module) => ({
    default: module.OrgUnconfirmedPage,
  })),
);

// ADDITIONAL

// MANAGE
// area
export const ManageAreaAsync = lazy(() =>
  import("./manage/area/").then((module) => ({
    default: module.ManageAreaPage,
  })),
);
// main-org
export const ManageMainOrgAsync = lazy(() =>
  import("./manage/main-org/").then((module) => ({
    default: module.ManageMainOrgPage,
  })),
);
// passage
export const ManagePassageAsync = lazy(() =>
  import("./manage/passage/").then((module) => ({
    default: module.ManagePassagePage,
  })),
);
// product-services
export const ManageProductServicesAsync = lazy(() =>
  import("./manage/product-services/").then((module) => ({
    default: module.ManageProductServicesPage,
  })),
);
// users
export const ManageUsersAsync = lazy(() =>
  import("./manage/users/").then((module) => ({
    default: module.ManageUsersPage,
  })),
);

// nearby
export const ManageNearbyAsync = lazy(() =>
  import("./manage/nearby/").then((module) => ({
    default: module.ManageNearbyPage,
  })),
);

// nearby-category
export const ManageNearbyCategoryAsync = lazy(() =>
  import("./manage/nearby-category/").then((module) => ({
    default: module.ManageNearbyCategoryPage,
  })),
);

// street
export const ManageStreetAsync = lazy(() =>
  import("./manage/street/").then((module) => ({
    default: module.ManageStreetPage,
  })),
);

// village
export const ManageVillageAsync = lazy(() =>
  import("./manage/village/").then((module) => ({
    default: module.ManageVillagePage,
  })),
);

// residential-area
export const ManageResidentialAreaAsync = lazy(() =>
  import("./manage/residential-area/").then((module) => ({
    default: module.ManageResidentialAreaPage,
  })),
);

// phone-types
export const ManagePhoneTypesAsync = lazy(() =>
  import("./manage/phone-types/").then((module) => ({
    default: module.ManagePhoneTypesPage,
  })),
);

// category
export const ManageCategoryAsync = lazy(() =>
  import("./manage/category/").then((module) => ({
    default: module.ManageCategoryPage,
  })),
);

// lane
export const ManageLaneAsync = lazy(() =>
  import("./manage/lane/").then((module) => ({
    default: module.ManageLanePage,
  })),
);

// impasse
export const ManageImpasseAsync = lazy(() =>
  import("./manage/impasse/").then((module) => ({
    default: module.ManageImpassePage,
  })),
);

// avenue
export const ManageAvenueAsync = lazy(() =>
  import("./manage/avenue/").then((module) => ({
    default: module.ManageAvenuePage,
  })),
);

// district
export const ManageDistrictAsync = lazy(() =>
  import("./manage/district/").then((module) => ({
    default: module.ManageDistrictPage,
  })),
);
