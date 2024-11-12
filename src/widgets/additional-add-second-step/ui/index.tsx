import { FC } from "react";

import { AdditionalEditor } from "@shared/ui";

import { SunEditorOptions } from "../model/options";

export const AdditionalAddSecondStepUI: FC = () => {
  return (
    <AdditionalEditor
      className="rendered-html-container"
      localName="additionalAddSecondStep"
      editorOptions={SunEditorOptions}
    />
  );
};
