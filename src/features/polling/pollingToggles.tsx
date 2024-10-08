import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectGlobalPollingEnabled,
  selectPollingConfigByApp,
  toggleGlobalPolling,
  updatePolling,
} from "./pollingSlice";

const PollingToggleButton = ({
  enabled,
  onClick,
  children,
}: {
  onClick: () => void;
  enabled: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      style={enabled ? { background: "lightgreen" } : {}}
    >
      {children}
    </button>
  );
};

export const PollingToggles = () => {
  const dispatch = useDispatch();
  const globalPolling = useSelector(selectGlobalPollingEnabled);

  const timesPolling = useSelector((state: any) =>
    selectPollingConfigByApp(state, "times"),
  );

  return (
    <div>
      <small>Global Polling Configs</small>
      <div>
        <PollingToggleButton
          enabled={globalPolling}
          onClick={() => dispatch(toggleGlobalPolling())}
        >
          Global
        </PollingToggleButton>
        <PollingToggleButton
          enabled={timesPolling.enabled}
          onClick={() =>
            dispatch(
              updatePolling({ app: "times", enabled: !timesPolling.enabled }),
            )
          }
        >
          Times
        </PollingToggleButton>
      </div>
    </div>
  );
};
