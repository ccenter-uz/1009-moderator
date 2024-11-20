import { FC } from "react";

import { AdditionalEditor } from "@shared/ui";

import { SunEditorOptions } from "../model/options";

export const AdditionalAddThirdStepUI: FC = () => {
  return (
    <AdditionalEditor
      className="editor-style"
      localName="additionalAddThirdStep"
      editorOptions={SunEditorOptions}
    />
  );
};
