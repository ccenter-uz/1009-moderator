import { AnyObject } from "antd/es/_util/type";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.css";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { ImageWithDelete } from "@entities/image-with-delete";

type Props = {
  setData: any;
  data: AnyObject[];
  setPictures?: any;
};

export const UploadUI: FC<Props> = (props) => {
  const { setData, data, setPictures } = props;
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
    if (file.link) {
      const filteredData = fileList.filter((f) => f.id !== file.id);
      dispatch(setData(filteredData));
      dispatch(setPictures(filteredData));
    } else {
      const filteredData = fileList.filter((f) => f !== file);
      dispatch(setData(filteredData));
    }
  };

  useEffect(() => {
    setFileList(data);
  }, [data]);

  return (
    <div className="upload">
      {fileList?.map((file: AnyObject) => (
        <ImageWithDelete
          key={file?.name}
          src={
            file.link
              ? file.link
              : URL?.createObjectURL(new Blob([file as Blob]))
          }
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
