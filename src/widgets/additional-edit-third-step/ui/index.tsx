import { FC } from "react";

import { AdditionalEditor } from "@shared/ui";

import { SunEditorOptions } from "../model/options";

export const AdditionalEditThirdStepUI: FC = () => {
  return (
    <AdditionalEditor
      className="editor-style"
      localName="additionalEditThirdStep"
      editorOptions={SunEditorOptions}
    />
  );
};
