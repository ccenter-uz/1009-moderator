import {
  Button,
  ColorPicker,
  Divider,
  Drawer,
  Radio,
  RadioChangeEvent,
  Slider,
} from "antd";
import { AggregationColor } from "antd/es/color-picker/color";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { enableVerticalDrag, setLocalStorage } from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { RootState } from "@shared/types";

import { setUiSettings } from "./model/Slicer";

export const CustomizeUI: FC = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { uiSettings } = useSelector(
    ({ CustomizeUISlicer }: RootState) => CustomizeUISlicer,
  );
  const dispatch = useDispatch();
  const [currentColor, setCurrentColor] = useState<string>(
    uiSettings.currentColor,
  );
  const [fontSize, setFontSize] = useState<number>(uiSettings.fontSize);
  const [fontWeight, setFontWeight] = useState<number>(uiSettings.fontWeight);
  const [componentSize, setComponentSize] = useState<string>(
    uiSettings.componentSize,
  );
  const [borderWidth, setBorderWidth] = useState<number>(
    uiSettings.borderWidth,
  );
  const draggableElement = useRef<HTMLDivElement>(null);

  const handleFontSize = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setFontSize(value);
  };

  const handleFontWeight = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setFontWeight(value);
  };

  const handleComponentSize = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setComponentSize(value);
  };

  const handleBorderWidth = (value: number) => {
    setBorderWidth(value);
  };

  const handleCurrentColor = (value: AggregationColor, css: string) => {
    setCurrentColor(css);
  };

  const handleResetSettings = () => {
    setComponentSize("middle");
    setFontSize(14);
    setFontWeight(600);
    setBorderWidth(1);
    setCurrentColor("#1677ff");
    onClose();
  };

  // DRAG-TOP-BOTTOM
  useEffect(() => {
    if (draggableElement.current) {
      enableVerticalDrag(draggableElement.current);
    }
  }, []);

  useEffect(() => {
    const newSettings = {
      fontSize,
      fontWeight,
      componentSize,
      borderWidth,
      currentColor,
    };
    dispatch(setUiSettings(newSettings));
    setLocalStorage("ui-settings", newSettings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentColor, fontSize, fontWeight, componentSize, borderWidth]);

  return (
    <div
      ref={draggableElement}
      style={{
        position: "fixed",
        right: 0,
        top: "30%",
      }}
    >
      <Button
        style={{
          width: 40,
          height: 40,
        }}
        title={t("customize-ui")}
        onClick={onOpen}
        icon={<FaCog size={20} />}
      />
      <Drawer
        width={"auto"}
        open={isOpen}
        onClose={onClose}
        title={t("customize-ui")}
        footer={<Button onClick={handleResetSettings}>{t("reset")}</Button>}
      >
        <div>
          <h3>{t("font-size")}</h3>
          <Radio.Group
            value={fontSize}
            onChange={handleFontSize}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <Radio value={14} style={{ fontSize: "14px" }}>
              {t("small")}
            </Radio>
            <Radio value={16} style={{ fontSize: "16px" }}>
              {t("medium")}
            </Radio>
            <Radio value={18} style={{ fontSize: "18px" }}>
              {t("large")}
            </Radio>
          </Radio.Group>
        </div>
        <Divider />
        <div>
          <h3>{t("font-weight")}</h3>
          <Radio.Group
            value={fontWeight}
            onChange={handleFontWeight}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <Radio value={400} style={{ fontWeight: 400 }}>
              {t("light")}
            </Radio>
            <Radio value={600} style={{ fontWeight: 600 }}>
              {t("normal")}
            </Radio>
            <Radio value={700} style={{ fontWeight: 700 }}>
              {t("bold")}
            </Radio>
          </Radio.Group>
        </div>
        <Divider />
        <div>
          <h3>{t("component-size")}</h3>
          <Radio.Group
            value={componentSize}
            onChange={handleComponentSize}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <Radio value={"small"}>{t("small")}</Radio>
            <Radio value={"middle"}>{t("medium")}</Radio>
            <Radio value={"large"}>{t("large")}</Radio>
          </Radio.Group>
        </div>
        <Divider />
        <div>
          <h3>{t("border-width")}</h3>
          <Slider
            value={borderWidth}
            min={1}
            max={5}
            onChange={handleBorderWidth}
          />
        </div>
        <Divider />
        <div>
          <h3>{t("theme")}</h3>
          <ColorPicker value={currentColor} onChange={handleCurrentColor} />
          <p>
            {t("current-color")}:{" "}
            <span style={{ color: currentColor }}>{currentColor}</span>
          </p>
        </div>
      </Drawer>
    </div>
  );
};
