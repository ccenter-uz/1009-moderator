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
        label: <Link to="/dashboard">Главная</Link>,
        icon: <FaRegNewspaper />,
        path: "dashboard",
        element: <DashboardAsync />,
      },
      {
        key: "2",
        name: "/statistics",
        label: <Link to="/statistics">Статистика</Link>,
        icon: <IoStatsChart />,
        path: "statistics",
        element: "Hello statistics",
      },
      {
        key: "3",
        name: "/additional",
        label: <Link to="/additional">Дополнительно</Link>,
        icon: <MdOutlineMenu />,
        path: "additional",
        element: "Hello additional",
      },
      {
        key: "4",
        label: "Организации",
        icon: <GoOrganization />,
        path: "orgs",
        children: [
          {
            key: "4.1",
            name: "/orgs/all",
            label: <Link to="/orgs/all">Все</Link>,
            icon: <MdListAlt />,
            path: "all",
            element: <OrgAllAsync />,
          },
          {
            key: "4.2",
            name: "/orgs/mine",
            label: <Link to="/orgs/mine">Мои</Link>,
            icon: <FaRegUser />,
            path: "mine",
            element: <OrgMineAsync />,
          },
          {
            key: "4.3",
            name: "/orgs/unconfirmed",
            label: <Link to="/orgs/unconfirmed">Не подтвержденные</Link>,
            icon: <MdOutlinePending />,
            path: "unconfirmed",
            element: <OrgUnconfirmedAsync />,
          },
          {
            key: "4.4",
            name: "/orgs/add",
            label: <Link to="/orgs/add">Добавить</Link>,
            icon: <MdAdd />,
            path: "add",
            element: <OrgAddAsync />,
          },
        ],
      },
      {
        key: "5",
        label: "Управление",
        icon: <MdSettings />,
        path: "manage",
        children: [
          {
            key: "5.1",
            name: "/manage/users",
            label: <Link to="/manage/users">Пользователи</Link>,
            icon: <MdOutlineManageAccounts />,
            path: "users",
            element: <ManageUsersAsync />,
          },
          {
            key: "5.2",
            name: "/manage/product-services",
            label: <Link to="/manage/product-services">Товары и Услуги</Link>,
            icon: <MdOutlineShoppingCart />,
            path: "product-services",
            element: <ManageProductServicesAsync />,
          },
          {
            key: "5.3",
            name: "/manage/category",
            label: <Link to="/manage/category">Раздел</Link>,
            icon: <LuCircleDot />,
            path: "category",
            element: <ManageCategoryAsync />,
          },
          {
            key: "5.4",
            name: "/manage/main-org",
            label: <Link to="/manage/main-org">Головая организация</Link>,
            icon: <LuCircleDot />,
            path: "main-org",
            element: <ManageMainOrgAsync />,
          },
          {
            key: "5.5",
            name: "/manage/phone-types",
            label: <Link to="/manage/phone-types">Виды телефонов</Link>,
            icon: <LuCircleDot />,
            path: "phone-types",
            element: <ManagePhoneTypesAsync />,
          },
          {
            key: "5.6",
            name: "/manage/nearby-category",
            label: (
              <Link to="/manage/nearby-category">Категории Ориентира</Link>
            ),
            icon: <LuCircleDot />,
            path: "nearby-category",
            element: <ManageNearbyCategoryAsync />,
          },
          {
            key: "5.7",
            name: "/manage/nearby",
            label: <Link to="/manage/nearby">Ориентир</Link>,
            icon: <LuCircleDot />,
            path: "nearby",
            element: <ManageNearbyAsync />,
          },
          {
            key: "5.8",
            name: "/manage/street",
            label: <Link to="/manage/street">Улица</Link>,
            icon: <LuCircleDot />,
            path: "street",
            element: <ManageStreetAsync />,
          },
          {
            key: "5.9",
            name: "/manage/area",
            label: <Link to="/manage/area">Плошадь</Link>,
            icon: <LuCircleDot />,
            path: "area",
            element: <ManageAreaAsync />,
          },
          {
            key: "5.10",
            name: "/manage/lane",
            label: <Link to="/manage/lane">Переулок</Link>,
            icon: <LuCircleDot />,
            path: "lane",
            element: <ManageLaneAsync />,
          },
          {
            key: "5.11",
            name: "/manage/residential-area",
            label: <Link to="/manage/residential-area">Массив/Махалля</Link>,
            icon: <LuCircleDot />,
            path: "residential-area",
            element: <ManageResidentialAreaAsync />,
          },
          {
            key: "5.12",
            name: "/manage/impasse",
            label: <Link to="/manage/impasse">Тупик</Link>,
            icon: <LuCircleDot />,
            path: "impasse",
            element: <ManageImpasseAsync />,
          },
          {
            key: "5.13",
            name: "/manage/avenue",
            label: <Link to="/manage/avenue">Проспект</Link>,
            icon: <LuCircleDot />,
            path: "avenue",
            element: <ManageAvenueAsync />,
          },
          {
            key: "5.14",
            name: "/manage/passage",
            label: <Link to="/manage/passage">Проезд</Link>,
            icon: <LuCircleDot />,
            path: "passage",
            element: <ManagePassageAsync />,
          },
          {
            key: "5.15",
            name: "/manage/district",
            label: <Link to="/manage/district">Район</Link>,
            icon: <LuCircleDot />,
            path: "district",
            element: <ManageDistrictAsync />,
          },
          {
            key: "5.16",
            name: "/manage/village",
            label: <Link to="/manage/village">Поселок</Link>,
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
