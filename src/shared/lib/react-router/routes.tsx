/* eslint-disable */
import { Link, redirect, useRouteError } from "react-router-dom";

import MainLayout from "@app/ui/layout";
import { FaRegNewspaper, FaUsers } from "react-icons/fa";
import { IoAnalytics } from "react-icons/io5";
import {
  MdAdd,
  MdListAlt,
  MdOutlineManageAccounts,
  MdOutlineMenu,
  MdOutlinePending,
  MdOutlineShoppingCart,
  MdPayments,
  MdRestore,
  MdSettings,
} from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { LuCircleDot } from "react-icons/lu";
import i18next from "i18next";
import { DashboardAsync } from "@pages/dashboard";
import { OrgAllAsync } from "@pages/organization-all";
import { OrgUnconfirmedAsync } from "@pages/organization-unconfirmed";
import { OrgAddAsync } from "@pages/organization-add";
import { ManageAreaAsync } from "@pages/manage-area";
import { ManageAvenueAsync } from "@pages/manage-avenue";
import { ManageCategoryAsync } from "@pages/manage-category";
import { ManageDistrictAsync } from "@pages/manage-district";
import { ManageImpasseAsync } from "@pages/manage-impasse";
import { ManageLaneAsync } from "@pages/manage-lane";
import { ManageMainOrgAsync } from "@pages/manage-main-org";
import { ManageNearbyAsync } from "@pages/manage-nearby";
import { ManageNearbyCategoryAsync } from "@pages/manage-nearby-category";
import { ManagePassageAsync } from "@pages/manage-passage";
import { ManagePhoneTypesAsync } from "@pages/manage-phone-types";
import { ManageProductServicesAsync } from "@pages/manage-product-services";
import { ManageResidentialAreaAsync } from "@pages/manage-residential-area";
import { ManageStreetAsync } from "@pages/manage-street";
import { ManageUsersAsync } from "@pages/manage-users";
import { ManageVillageAsync } from "@pages/manage-village";
import { OrgEditAsync } from "@pages/organization-edit";
import { AdditionalAsync } from "@pages/additional";
import { AdditionalAddAsync } from "@pages/additional-add";
import { AdditionalEditAsync } from "@pages/additional-edit";
import { LoginAsync } from "@pages/login";
import { AuthProtector } from "@shared/ui/auth-protector";
import { MonitoringUserAsync } from "@pages/monitoring-user";
import { MonitoringOrgsAsync } from "@pages/monitoring-orgs";
import { MonitoringTransactionsAsync } from "@pages/monitoring-transaction";
import { ManageRolesAsync } from "@pages/manage-roles";
import { operatorPermissionsByRole } from "./permissions-by-role";
import { getLocalStorage } from "../helpers";
import { ManageSegmentsAsync } from "@pages/manage-segments";
import { OrgWaitingsAsync } from "@pages/organization-waitings";

function BubbleError() {
  const error = useRouteError();

  if (error) throw error;
  return null;
}

const childRoutes = [
  {
    key: "/dashboard",
    name: "/dashboard",
    label: <Link to="/dashboard">{i18next.t("main")}</Link>,
    icon: <FaRegNewspaper />,
    path: "dashboard",
    element: <DashboardAsync />,
  },
  {
    key: "/monitoring",
    name: "/monitoring",
    label: i18next.t("monitoring"),
    icon: <IoAnalytics />,
    path: "monitoring",
    children: [
      {
        key: "/monitoring/user",
        name: "/monitoring/user",
        label: <Link to="/monitoring/user">{i18next.t("users")}</Link>,
        icon: <FaUsers />,
        path: "user",
        element: <MonitoringUserAsync />,
      },
      {
        key: "/monitoring/organization",
        name: "/monitoring/organization",
        label: <Link to="/monitoring/organization">{i18next.t("orgs")}</Link>,
        icon: <GoOrganization />,
        path: "organization",
        element: <MonitoringOrgsAsync />,
      },
      {
        key: "/monitoring/transactions",
        name: "/monitoring/transactions",
        label: (
          <Link to="/monitoring/transactions">{i18next.t("transactions")}</Link>
        ),
        icon: <MdPayments />,
        path: "transactions",
        element: <MonitoringTransactionsAsync />,
      },
    ],
  },
  {
    key: "/additional",
    name: "/additional",
    label: <Link to="/additional">{i18next.t("additional")}</Link>,
    icon: <MdOutlineMenu />,
    path: "additional",
    element: <AdditionalAsync />,
  },
  {
    key: "/additional/add",
    name: "/additional/add",
    path: "additional/add",
    private: "true",
    element: <AdditionalAddAsync />,
  },
  {
    key: "/additional/edit/:id",
    name: "/additional/edit/:id",
    path: "additional/edit/:id",
    private: "true",
    element: <AdditionalEditAsync />,
  },
  {
    key: "4",
    label: i18next.t("orgs"),
    icon: <GoOrganization />,
    path: "orgs",
    children: [
      {
        key: "/orgs/all",
        name: "/orgs/all",
        label: <Link to="/orgs/all">{i18next.t("all")}</Link>,
        icon: <MdListAlt />,
        path: "all",
        element: <OrgAllAsync />,
      },
      {
        key: "/orgs/unconfirmed",
        name: "/orgs/unconfirmed",
        label: <Link to="/orgs/unconfirmed">{i18next.t("unconfirmed")}</Link>,
        icon: <MdOutlinePending />,
        path: "unconfirmed",
        element: <OrgUnconfirmedAsync />,
      },
      {
        key: "/orgs/waitings",
        name: "/orgs/waitings",
        label: <Link to="/orgs/waitings">{i18next.t("waitings")}</Link>,
        icon: <MdRestore />,
        path: "waitings",
        element: <OrgWaitingsAsync />,
      },
      {
        key: "/orgs/add",
        name: "/orgs/add",
        label: <Link to="/orgs/add">{i18next.t("add")}</Link>,
        icon: <MdAdd />,
        path: "add",
        element: <OrgAddAsync />,
      },
      {
        key: "/orgs/edit",
        name: "/orgs/edit/:id",
        path: "edit/:id",
        private: "true",
        element: <OrgEditAsync />,
      },
    ],
  },
  {
    key: "5",
    label: i18next.t("manage"),
    icon: <MdSettings />,
    path: "manage",
    children: [
      {
        key: "/manage/users",
        name: "/manage/users",
        label: <Link to="/manage/users">{i18next.t("users")}</Link>,
        icon: <MdOutlineManageAccounts />,
        path: "users",
        element: <ManageUsersAsync />,
      },
      {
        key: "/manage/roles",
        name: "/manage/roles",
        label: <Link to="/manage/roles">{i18next.t("roles")}</Link>,
        icon: <MdOutlineManageAccounts />,
        path: "roles",
        element: <ManageRolesAsync />,
      },
      {
        key: "/manage/segment",
        name: "/manage/segment",
        label: <Link to="/manage/segment">{i18next.t("segments")}</Link>,
        icon: <MdOutlineManageAccounts />,
        path: "segment",
        element: <ManageSegmentsAsync />,
      },
      {
        key: "/manage/product-services",
        name: "/manage/product-services",
        label: (
          <Link to="/manage/product-services">
            {i18next.t("product-services")}
          </Link>
        ),
        icon: <MdOutlineShoppingCart />,
        path: "product-services",
        element: <ManageProductServicesAsync />,
      },
      {
        key: "/manage/category",
        name: "/manage/category",
        label: <Link to="/manage/category">{i18next.t("category")}</Link>,
        icon: <LuCircleDot />,
        path: "category",
        element: <ManageCategoryAsync />,
      },
      {
        key: "/manage/main-org",
        name: "/manage/main-org",
        label: <Link to="/manage/main-org">{i18next.t("main-org")}</Link>,
        icon: <LuCircleDot />,
        path: "main-org",
        element: <ManageMainOrgAsync />,
      },
      {
        key: "/manage/phone-types",
        name: "/manage/phone-types",
        label: <Link to="/manage/phone-types">{i18next.t("phone-types")}</Link>,
        icon: <LuCircleDot />,
        path: "phone-types",
        element: <ManagePhoneTypesAsync />,
      },
      {
        key: "/manage/nearby-category",
        name: "/manage/nearby-category",
        label: (
          <Link to="/manage/nearby-category">
            {i18next.t("nearby-category")}
          </Link>
        ),
        icon: <LuCircleDot />,
        path: "nearby-category",
        element: <ManageNearbyCategoryAsync />,
      },
      {
        key: "/manage/nearby",
        name: "/manage/nearby",
        label: <Link to="/manage/nearby">{i18next.t("nearby")}</Link>,
        icon: <LuCircleDot />,
        path: "nearby",
        element: <ManageNearbyAsync />,
      },
      {
        key: "/manage/street",
        name: "/manage/street",
        label: <Link to="/manage/street">{i18next.t("street")}</Link>,
        icon: <LuCircleDot />,
        path: "street",
        element: <ManageStreetAsync />,
      },
      {
        key: "/manage/area",
        name: "/manage/area",
        label: <Link to="/manage/area">{i18next.t("area")}</Link>,
        icon: <LuCircleDot />,
        path: "area",
        element: <ManageAreaAsync />,
      },
      {
        key: "/manage/lane",
        name: "/manage/lane",
        label: <Link to="/manage/lane">{i18next.t("lane")}</Link>,
        icon: <LuCircleDot />,
        path: "lane",
        element: <ManageLaneAsync />,
      },
      {
        key: "/manage/residential-area",
        name: "/manage/residential-area",
        label: (
          <Link to="/manage/residential-area">
            {i18next.t("residential-area")}
          </Link>
        ),
        icon: <LuCircleDot />,
        path: "residential-area",
        element: <ManageResidentialAreaAsync />,
      },
      {
        key: "/manage/impasse",
        name: "/manage/impasse",
        label: <Link to="/manage/impasse">{i18next.t("impasse")}</Link>,
        icon: <LuCircleDot />,
        path: "impasse",
        element: <ManageImpasseAsync />,
      },
      {
        key: "/manage/avenue",
        name: "/manage/avenue",
        label: <Link to="/manage/avenue">{i18next.t("avenue")}</Link>,
        icon: <LuCircleDot />,
        path: "avenue",
        element: <ManageAvenueAsync />,
      },
      {
        key: "/manage/passage",
        name: "/manage/passage",
        label: <Link to="/manage/passage">{i18next.t("passage")}</Link>,
        icon: <LuCircleDot />,
        path: "passage",
        element: <ManagePassageAsync />,
      },
      {
        key: "/manage/district",
        name: "/manage/district",
        label: <Link to="/manage/district">{i18next.t("district")}</Link>,
        icon: <LuCircleDot />,
        path: "district",
        element: <ManageDistrictAsync />,
      },
      {
        key: "/manage/village",
        name: "/manage/village",
        label: <Link to="/manage/village">{i18next.t("village")}</Link>,
        icon: <LuCircleDot />,
        path: "village",
        element: <ManageVillageAsync />,
      },
    ],
  },
];

const getAccessibleChildRoutes = (
  childRoutes: any[],
  userPermissions: any,
): any[] => {
  const accessibleRoutes = childRoutes.filter((route) => {
    const permission = route.path.split("/")[0];
    return userPermissions[permission];
  });

  return accessibleRoutes.map((route) => {
    if (route.children) {
      route.children = getAccessibleChildRoutes(
        route.children,
        userPermissions[route.path],
      );
    }

    return route;
  });
};

export const routesPath = [
  {
    path: "/",
    element: (
      <AuthProtector>
        <MainLayout />
      </AuthProtector>
    ),
    errorElement: <BubbleError />,
    children: getAccessibleChildRoutes(
      childRoutes,
      getLocalStorage("user")
        ? getLocalStorage("user")?.permissions_pathname
        : operatorPermissionsByRole,
    ),
  },
  {
    path: "*",
    loader: async () => redirect("/"),
  },
  {
    path: "/login",
    name: "Login",
    element: <LoginAsync />,
  },
];
