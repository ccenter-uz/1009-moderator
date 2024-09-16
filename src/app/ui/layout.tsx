import { Counter } from "@features/counter";
import { PollingToggles } from "@features/polling";

const MainLayout = () => {
  return (
    <div>
      <Counter />
      <PollingToggles />
    </div>
  );
};

export default MainLayout;
