import { AnyObject } from "antd/es/_util/type";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.css";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { ImageWithDelete } from "@entities/image-with-delete";
type Props = {
  setData: any;
  data: AnyObject[];
};

export const UploadUI: FC<Props> = (props) => {
  const { setData, data } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<Blob[] | AnyObject[]>(data || []);

  const onUpload = (e: AnyObject) => {
    const { files } = e.target;
    if (files.length === 0) return null;
    const newData = [...fileList, files[0]];
    setFileList(newData);
    dispatch(setData(newData));
  };

  const onRemove = (file: AnyObject) => {
    setFileList(fileList.filter((f) => f !== file));
  };

  return (
    <div className="upload">
      {fileList?.map((file) => (
        <ImageWithDelete
          key={file?.name}
          src={URL?.createObjectURL(new Blob([file as Blob]))}
          alt={file.name}
          onDelete={() => onRemove(file)}
        />
      ))}
      <label htmlFor="file" id="upload-content">
        <FaPlus fontSize={18} />
        {t("upload")}
      </label>

      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        onChange={onUpload}
      />
    </div>
  );
};
