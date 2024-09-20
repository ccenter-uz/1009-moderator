import { Button, Divider, Modal, Skeleton } from "antd";
import { FC } from "react";

type Props = {
  headerInputs: JSX.Element;
  ruInputs: JSX.Element;
  uzInputs: JSX.Element;
  uzCyrillicInputs: JSX.Element;
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
  } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      width={1020}
      title={"Добавить / Редактировать"}
      open={open}
      onCancel={handleClose}
      footer={[
        <Button
          key="submit"
          type="primary"
          form={formId}
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Сохранить
        </Button>,
      ]}
    >
      <div className="modal-header" aria-label="modal-header">
        {loading ? <Skeleton.Input active block /> : headerInputs}
      </div>
      <Divider style={{ margin: "8px 0" }} />
      <div className="modal-body" aria-label="modal-body">
        <div className="modal-body__inputs__ru">
          <h3>Русский</h3>
          {loading ? <Skeleton.Input active block /> : ruInputs}
        </div>
        <Divider style={{ margin: "8px 0" }} />
        <div className="modal-body__inputs__uz">
          <h3>Узбекский</h3>
          {loading ? <Skeleton.Input active block /> : uzInputs}
        </div>
        <Divider style={{ margin: "8px 0" }} />
        <div className="modal-body__inputs__uzcyrillic">
          <h3>Узбекский кирил</h3>
          {loading ? <Skeleton.Input active block /> : uzCyrillicInputs}
        </div>
      </div>
    </Modal>
  );
};
