import {
  Form,
  Col,
  Row,
  Checkbox,
  Input,
  Typography,
  Upload,
  UploadFile,
  Image,
  UploadProps,
} from "antd";
import { GetProp } from "antd/es/_util/type";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const OrgAddFourthStepUI: FC = () => {
  const { t } = useTranslation();
  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList.map((file) => ({ ...file, status: "done" })));
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item
            name="payment_type"
            label={t("payment_type")}
            valuePropName="checked"
          >
            <Checkbox.Group>
              <Checkbox
                value="all_type"
                onChange={(e) => setAllCheck(e.target.checked)}
              >
                {t("all_type")}
              </Checkbox>
              <Checkbox disabled={allCheck} value="terminal">
                {t("terminal")}
              </Checkbox>
              <Checkbox disabled={allCheck} value="cash">
                {t("cash")}
              </Checkbox>
              <Checkbox disabled={allCheck} value="transfer">
                {t("transfer")}
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"description"} label={t("description")}>
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title aria-level={4} level={4} style={{ margin: 0 }}>
        {t("images")}
      </Typography.Title>
      <div style={{ marginTop: 10 }}>
        <Upload
          customRequest={() => null}
          onChange={handleUpload}
          onPreview={handlePreview}
          multiple
          listType="picture-card"
          fileList={fileList}
        >
          <div>
            <FaPlus />
            <div style={{ marginTop: 8 }}>{t("upload")}</div>
          </div>
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>
    </>
  );
};
