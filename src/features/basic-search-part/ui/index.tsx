import { Button, Flex, Form, Input } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

/**
 * BasicSearchPartUI
 *
 * This component is used to display the basic search part with input and button.
 *
 * It has the following functionality:
 *
 * - Displays a text input with a placeholder.
 * - Displays a search button with a loading indicator.
 * - Submits the form when the search button is clicked.
 * - Calls the function passed to the `handleSearch` prop with the form values.
 * - Disables the search button and input when the component is in the loading state.
 *
 * It takes the following props:
 *
 * - `handleSearch`: The function to call when the form is submitted.
 * - `loading`: The loading state of the component. If true, the search button and input will be disabled.
 * - `additionalSearch`: An additional JSX element to display in the search part.
 *
 * @param {Object} props - The props of the component.
 * @param {Function} props.handleSearch - The function to call when the form is submitted.
 * @param {boolean} props.loading - The loading state of the component. If true, the search button and input will be disabled.
 * @param {JSX.Element} props.additionalSearch - An additional JSX element to display in the search part.
 *
 * @returns {JSX.Element} - The JSX element of the component.
 */

type Props = {
  handleSearch: (values: any) => void;
  loading?: boolean;
  additionalSearch?: JSX.Element;
  id?: string;
};

export const BasicSearchPartUI: FC<Props> = (props) => {
  const {
    handleSearch,
    loading,
    additionalSearch,
    id = "basic-search",
  } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();

  return (
    <Form form={form} id={id} onFinish={handleSearch}>
      <Flex gap={8} align="center" wrap="wrap">
        {additionalSearch}
        <Form.Item name="search" style={{ marginBottom: 0, flex: 1 }}>
          <Input
            type="text"
            placeholder={t("search")}
            allowClear
            disabled={loading}
          />
        </Form.Item>
        <Button
          loading={loading}
          disabled={loading}
          htmlType="submit"
          form={id}
          type="primary"
          icon={<FaSearch />}
        >
          {t("search")}
        </Button>
      </Flex>
    </Form>
  );
};
