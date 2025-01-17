import { Button, Divider, Form, Input, Modal, Skeleton } from "antd";
import { FC, useRef, useState } from "react";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";

type Props = {
  headerInputs?: JSX.Element;
  ruInputs?: JSX.Element;
  uzInputs?: JSX.Element;
  uzCyrillicInputs?: JSX.Element;
  singleInputs?: JSX.Element;
  formId: string;
  open: boolean;
  loading: boolean;
  onClose: () => void;
};

export const ModalAddEdit: FC<Props> = (props) => {
  const {
    open,
    onClose,
    headerInputs,
    ruInputs,
    uzInputs,
    uzCyrillicInputs,
    formId,
    loading,
    singleInputs,
  } = props;
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    onClose();
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Modal
      width={1020}
      title={
        <div
          style={{ width: "100%", cursor: "move" }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          onFocus={() => null}
          onBlur={() => null}
        >
          {t("add-edit")}
        </div>
      }
      open={open}
      onCancel={handleClose}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          nodeRef={draggleRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
      footer={[
        <Button
          key="submit"
          type="primary"
          form={formId}
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          {t("save")}
        </Button>,
      ]}
    >
      <div className="modal-header" aria-label="modal-header">
        {loading ? <Skeleton.Input active block /> : headerInputs}
      </div>
      <Divider style={{ margin: "8px 0" }} />
      {singleInputs ? (
        loading ? (
          <Skeleton.Input active block />
        ) : (
          singleInputs
        )
      ) : (
        <div className="modal-body" aria-label="modal-body">
          <div className="modal-body__inputs__ru">
            <h3>{t("russian")}</h3>
            {loading ? <Skeleton.Input active block /> : ruInputs}
          </div>
          <Divider style={{ margin: "8px 0" }} />
          <div className="modal-body__inputs__uz">
            <h3>{t("uzbek")}</h3>
            {loading ? <Skeleton.Input active block /> : uzInputs}
          </div>
          <Divider style={{ margin: "8px 0" }} />
          <div className="modal-body__inputs__uzcyrillic">
            <h3>{t("uzbek-cyrill")}</h3>
            {loading ? <Skeleton.Input active block /> : uzCyrillicInputs}
          </div>
        </div>
      )}
      <Form.Item
        name="order-number"
        label={t("order-number")}
        layout="vertical"
      >
        <Input type="number" placeholder={t("order-number")} />
      </Form.Item>
    </Modal>
  );
};
