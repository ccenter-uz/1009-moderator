/* eslint-disable */
import { Link, redirect, useRouteError } from "react-router-dom";

import MainLayout from "@app/ui/layout";
import { FaRegNewspaper, FaRegUser } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import {
  MdAdd,
  MdListAlt,
  MdOutlineManageAccounts,
  MdOutlineMenu,
  MdOutlinePending,
  MdOutlineShoppingCart,
  MdSettings,
} from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { LuCircleDot } from "react-icons/lu";
import {
  DashboardAsync,
  ManageAreaAsync,
  ManageAvenueAsync,
  ManageCategoryAsync,
  ManageDistrictAsync,
  ManageImpasseAsync,
  ManageLaneAsync,
  ManageMainOrgAsync,
  ManageNearbyAsync,
  ManageNearbyCategoryAsync,
  ManagePassageAsync,
  ManagePhoneTypesAsync,
  ManageProductServicesAsync,
  ManageResidentialAreaAsync,
  ManageStreetAsync,
  ManageUsersAsync,
  ManageVillageAsync,
  OrgAddAsync,
  OrgAllAsync,
  OrgMineAsync,
  OrgUnconfirmedAsync,
} from "@pages/index";
import i18next from "i18next";

function BubbleError() {
  const error = useRouteError();

  if (error) throw error;
  return null;
}

export const routesPath = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <BubbleError />,
    children: [
      {
        key: "1",
        name: "/dashboard",
        label: <Link to="/dashboard">{i18next.t("main")}</Link>,
        icon: <FaRegNewspaper />,
        path: "dashboard",
        element: <DashboardAsync />,
      },
      {
        key: "2",
        name: "/statistics",
        label: <Link to="/statistics">{i18next.t("statistics")}</Link>,
        icon: <IoStatsChart />,
        path: "statistics",
        element: "Hello statistics",
      },
      {
        key: "3",
        name: "/additional",
        label: <Link to="/additional">{i18next.t("additional")}</Link>,
        icon: <MdOutlineMenu />,
        path: "additional",
        element: "Hello additional",
      },
      {
        key: "4",
        label: i18next.t("orgs"),
        icon: <GoOrganization />,
        path: "orgs",
        children: [
          {
            key: "4.1",
            name: "/orgs/all",
            label: <Link to="/orgs/all">{i18next.t("all")}</Link>,
            icon: <MdListAlt />,
            path: "all",
            element: <OrgAllAsync />,
          },
          {
            key: "4.2",
            name: "/orgs/mine",
            label: <Link to="/orgs/mine">{i18next.t("mine")}</Link>,
            icon: <FaRegUser />,
            path: "mine",
            element: <OrgMineAsync />,
          },
          {
            key: "4.3",
            name: "/orgs/unconfirmed",
            label: (
              <Link to="/orgs/unconfirmed">{i18next.t("unconfirmed")}</Link>
            ),
            icon: <MdOutlinePending />,
            path: "unconfirmed",
            element: <OrgUnconfirmedAsync />,
          },
          {
            key: "4.4",
            name: "/orgs/add",
            label: <Link to="/orgs/add">{i18next.t("add")}</Link>,
            icon: <MdAdd />,
            path: "add",
            element: <OrgAddAsync />,
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
            key: "5.1",
            name: "/manage/users",
            label: <Link to="/manage/users">{i18next.t("users")}</Link>,
            icon: <MdOutlineManageAccounts />,
            path: "users",
            element: <ManageUsersAsync />,
          },
          {
            key: "5.2",
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
            key: "5.3",
            name: "/manage/category",
            label: <Link to="/manage/category">{i18next.t("category")}</Link>,
            icon: <LuCircleDot />,
            path: "category",
            element: <ManageCategoryAsync />,
          },
          {
            key: "5.4",
            name: "/manage/main-org",
            label: <Link to="/manage/main-org">{i18next.t("main-org")}</Link>,
            icon: <LuCircleDot />,
            path: "main-org",
            element: <ManageMainOrgAsync />,
          },
          {
            key: "5.5",
            name: "/manage/phone-types",
            label: (
              <Link to="/manage/phone-types">{i18next.t("phone-types")}</Link>
            ),
            icon: <LuCircleDot />,
            path: "phone-types",
            element: <ManagePhoneTypesAsync />,
          },
          {
            key: "5.6",
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
            key: "5.7",
            name: "/manage/nearby",
            label: <Link to="/manage/nearby">{i18next.t("nearby")}</Link>,
            icon: <LuCircleDot />,
            path: "nearby",
            element: <ManageNearbyAsync />,
          },
          {
            key: "5.8",
            name: "/manage/street",
            label: <Link to="/manage/street">{i18next.t("street")}</Link>,
            icon: <LuCircleDot />,
            path: "street",
            element: <ManageStreetAsync />,
          },
          {
            key: "5.9",
            name: "/manage/area",
            label: <Link to="/manage/area">{i18next.t("area")}</Link>,
            icon: <LuCircleDot />,
            path: "area",
            element: <ManageAreaAsync />,
          },
          {
            key: "5.10",
            name: "/manage/lane",
            label: <Link to="/manage/lane">{i18next.t("lane")}</Link>,
            icon: <LuCircleDot />,
            path: "lane",
            element: <ManageLaneAsync />,
          },
          {
            key: "5.11",
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
            key: "5.12",
            name: "/manage/impasse",
            label: <Link to="/manage/impasse">{i18next.t("impasse")}</Link>,
            icon: <LuCircleDot />,
            path: "impasse",
            element: <ManageImpasseAsync />,
          },
          {
            key: "5.13",
            name: "/manage/avenue",
            label: <Link to="/manage/avenue">{i18next.t("avenue")}</Link>,
            icon: <LuCircleDot />,
            path: "avenue",
            element: <ManageAvenueAsync />,
          },
          {
            key: "5.14",
            name: "/manage/passage",
            label: <Link to="/manage/passage">{i18next.t("passage")}</Link>,
            icon: <LuCircleDot />,
            path: "passage",
            element: <ManagePassageAsync />,
          },
          {
            key: "5.15",
            name: "/manage/district",
            label: <Link to="/manage/district">{i18next.t("district")}</Link>,
            icon: <LuCircleDot />,
            path: "district",
            element: <ManageDistrictAsync />,
          },
          {
            key: "5.16",
            name: "/manage/village",
            label: <Link to="/manage/village">{i18next.t("village")}</Link>,
            icon: <LuCircleDot />,
            path: "village",
            element: <ManageVillageAsync />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    loader: async () => redirect("/"),
  },
  {
    path: "/login",
    name: "Login",
    element: "Hello login",
  },
];
