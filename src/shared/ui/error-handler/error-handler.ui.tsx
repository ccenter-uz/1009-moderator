import { useTranslation } from "react-i18next";

type ErrorHandlerProps = {
  error: Error;
  resetErrorBoundary?: (...args: any[]) => void;
};

const isDevelopment = import.meta.env.DEV;

export function ErrorHandler(props: ErrorHandlerProps) {
  const { error, resetErrorBoundary } = props;
  const { t } = useTranslation();

  return (
    <div>
      <h3>{t("something-went-wrong")}</h3>
      {isDevelopment && (
        <>
          <ul className="error-messages">
            <li key={error.message}>{error.message}</li>
          </ul>
          <pre>{error.stack}</pre>
        </>
      )}
      <button type="button" onClick={resetErrorBoundary}>
        {t("try-again")}
      </button>
    </div>
  );
}
