import { FC } from "react";

import { AdditionalEditor } from "@shared/ui";

import { SunEditorOptions } from "../model/options";

export const AdditionalEditSecondStepUI: FC = () => {
  return (
    <AdditionalEditor
      className="rendered-html-container"
      localName="additionalEditSecondStep"
      editorOptions={SunEditorOptions}
    />
  );
};
