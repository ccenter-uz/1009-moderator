import { Button, Col, Row } from "antd";
import { FC } from "react";
import { FaMap, FaRegNewspaper, FaWikipediaW } from "react-icons/fa";
import { LuDollarSign } from "react-icons/lu";
import { RxFrame } from "react-icons/rx";
import { TiWeatherPartlySunny } from "react-icons/ti";

import "./style.css";
import { LogoutUI } from "@features/index";

const links = [
  {
    href: "https://www.gismeteo.ru/",
    target: "_blank",
    title: "Погода",
    type: "default",
    icon: <TiWeatherPartlySunny fontSize={20} />,
  },
  {
    href: "https://cbu.uz/oz/",
    target: "_blank",
    title: "Курс валют",
    type: "default",
    icon: <LuDollarSign fontSize={20} />,
  },
  {
    href: "https://immo.uz/",
    target: "_blank",
    title: "Мой город",
    type: "default",
    icon: <FaMap fontSize={20} />,
  },
  {
    href: "https://www.afisha.uz/ru",
    target: "_blank",
    title: "Афиша",
    type: "default",
    icon: <FaRegNewspaper fontSize={20} />,
  },
  {
    href: "https://wikipedia.org/",
    target: "_blank",
    title: "Википедия",
    type: "default",
    icon: <FaWikipediaW fontSize={20} />,
  },
];

export const HeaderUI: FC = () => {
  return (
    <header>
      <div className="sic" aria-label="Sic" title="Sic">
        {/* LOGO */}
        <div className="sic__logo">
          <RxFrame fontSize={22} />
          <h1>Sic page</h1>
        </div>
        {/* USEFUL LINKS */}
        <div className="sic__useful-links">
          <Row gutter={[16, 0]}>
            {links.map(
              ({
                href,
                target,
                title,
                icon,
              }: {
                href: string;
                target: string;
                title: string;
                icon: JSX.Element;
              }) => (
                <Col key={title}>
                  <Button href={href} target={target} title={title} icon={icon}>
                    {title}
                  </Button>
                </Col>
              ),
            )}
          </Row>
        </div>
      </div>
      {/* LOGOUT */}
      <LogoutUI />
    </header>
  );
};
