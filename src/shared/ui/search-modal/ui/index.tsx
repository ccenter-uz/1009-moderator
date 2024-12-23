import { Button, Flex, Form, Input, Modal, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  columns: ColumnsType<AnyObject> | undefined;
  data: AnyObject[] | null;
  setSelectedData: Dispatch<SetStateAction<AnyObject>>;
  onClickSubCategory?: () => void;
  searchFetcher?: (values: AnyObject) => void;
};

export const SearchModal: FC<Props> = (props) => {
  const {
    isOpen,
    onClose,
    title,
    columns = [],
    data,
    setSelectedData,
    onClickSubCategory,
    searchFetcher,
  } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onSubmit = (values: AnyObject) => {
    searchFetcher && searchFetcher(values);
  };

  return (
    <Modal
      width={800}
      centered
      open={isOpen}
      onCancel={onClose}
      title={title}
      footer={<Button onClick={onClose}>{t("cancel")}</Button>}
    >
      <Form form={form} id="search-modal" onFinish={onSubmit}>
        <Flex align="start" gap={8} justify="center" className="header-part">
          <Form.Item name="search" label={t("search")} style={{ flex: 0.7 }}>
            <Input placeholder={t("search")} allowClear />
          </Form.Item>
          <Button htmlType="submit" type="primary" icon={<FaSearch />}>
            {t("search")}
          </Button>
        </Flex>
      </Form>
      <Table
        style={{ userSelect: "none", cursor: "pointer" }}
        size="small"
        bordered
        columns={columns}
        dataSource={data || []}
        pagination={false}
        scroll={{ y: 300 }}
        onRow={(record) => ({
          onClick: () => (
            setSelectedData(record),
            onClose(),
            onClickSubCategory && onClickSubCategory()
          ),
        })}
      />
    </Modal>
  );
};
