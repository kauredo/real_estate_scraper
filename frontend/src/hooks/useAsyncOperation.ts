import { useState } from "react";
import { useNotifications } from "./useNotifications";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export const useAsyncOperation = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });
  const { showError, showSuccess } = useNotifications();
  const { t } = useTranslation();

  const execute = async <T>(
    operation: () => Promise<T>,
    options: {
      successMessage?: string;
      errorMessage?: string;
      showSuccessNotification?: boolean;
      showErrorNotification?: boolean;
    } = {},
  ): Promise<T | null> => {
    const {
      successMessage,
      errorMessage,
      showSuccessNotification = false,
      showErrorNotification = true,
    } = options;

    setLoadingState({ isLoading: true, error: null });

    try {
      const result = await operation();

      setLoadingState({ isLoading: false, error: null });

      if (showSuccessNotification && successMessage) {
        showSuccess(successMessage);
      }

      return result;
    } catch (error) {
      const errorMsg = errorMessage || getErrorMessage(error);

      setLoadingState({ isLoading: false, error: errorMsg });

      if (showErrorNotification) {
        showError(errorMsg);
      }

      return null;
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (isAxiosError(error)) {
      if (error.response) {
        // Axios error with response
        if (error.response.status === 404) {
          return t("notifications.messages.data_load_error");
        }
        if (error.response.status >= 500) {
          return t("notifications.messages.server_error");
        }
        if (error.response.data?.message) {
          return error.response.data.message;
        }
        if (error.response.data?.error) {
          return error.response.data.error;
        }
      } else if (error.request) {
        // Network error
        return t("notifications.messages.network_error");
      }
    } else if (error instanceof Error) {
      return error.message;
    }

    return t("notifications.messages.data_load_error");
  };

  function isAxiosError(error: unknown): error is AxiosError<{
    message?: string;
    error?: string;
  }> {
    return (error as AxiosError).isAxiosError !== undefined;
  }

  return {
    ...loadingState,
    execute,
  };
};
