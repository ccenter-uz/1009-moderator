import { AnyObject } from "antd/es/_util/type";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.css";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { ImageWithDelete } from "@entities/image-with-delete";

/**
 * UploadUI
 *
 * This component is used to upload images in the Manage pages.
 *
 * It has the following functionality:
 *
 * - Displays all images that were uploaded.
 * - Allows the user to upload new images.
 * - Allows the user to delete existing images.
 *
 * It takes the following props:
 *
 * - `setData`: The function from the redux to set the data.
 * - `data`: The array of images that were already uploaded.
 *
 * @param {Object} props - The props of the component.
 * @param {function} props.setData - The function from the redux to set the data.
 * @param {Array} props.data - The array of images that were already uploaded.
 *
 * @returns {JSX.Element} - The JSX element of the component.
 */
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
