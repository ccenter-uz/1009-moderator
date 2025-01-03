import { Button, Flex, Form, Input, Modal, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import i18next from "i18next";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

type Props = {
  loading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  columns: ColumnsType<AnyObject> | undefined;
  data: AnyObject[] | null;
  setSelectedData: Dispatch<
    SetStateAction<{ id: number; name: string } | null>
  >;
  handleClickRow?: (id: string | number) => void;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setPagination: Dispatch<SetStateAction<{ page: number; limit: number }>>;
  pagination: { page: number; limit: number };
  totalItems: number;
};

export const SearchModal: FC<Props> = (props) => {
  const {
    loading,
    isOpen,
    onClose,
    title,
    columns = [],
    data,
    setSelectedData,
    handleClickRow,
    setSearchValue,
    setPagination,
    pagination,
    totalItems,
  } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const handleSubmitSearch = ({ search }: { search: string }) => {
    setSearchValue(search);
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
      <Form form={form} id="search-modal" onFinish={handleSubmitSearch}>
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
        loading={loading}
        style={{ userSelect: "none", cursor: "pointer" }}
        size="small"
        bordered
        columns={columns}
        dataSource={data || []}
        scroll={{ y: 300 }}
        onRow={(record) => ({
          onClick: () => (
            setSelectedData({
              id: record.id,
              name: record.name?.ru
                ? record.name[i18next.language]
                : record.name,
            }),
            onClose(),
            handleClickRow && handleClickRow(record?.id)
          ),
        })}
        pagination={{
          current: pagination?.page,
          pageSize: pagination?.limit,
          total: totalItems,
          showSizeChanger: true,
          showTotal: (total) => `${total} ${t("piece")}`,
          onChange: (page, limit) => setPagination({ page, limit }),
          onShowSizeChange: (page, limit) => setPagination({ page, limit }),
        }}
      />
    </Modal>
  );
};
