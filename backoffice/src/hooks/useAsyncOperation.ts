import { useState } from "react";
import { useNotifications } from "../context/NotificationContext";
import { useTranslation } from "react-i18next";

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
    const err = error as {
      response?: {
        status?: number;
        data?: { error?: string; message?: string };
      };
      message?: string;
      request?: unknown;
    };
    // Handle different error types
    if (err.response) {
      // Axios error with response
      if (err.response.status === 404) {
        return t("notifications.messages.data_load_error");
      }
      if (err.response.status && err.response.status >= 500) {
        return t("notifications.messages.server_error");
      }
      if (err.response.data?.message) {
        return err.response.data.message;
      }
      if (err.response.data?.error) {
        return err.response.data.error;
      }
    } else if (err.request) {
      // Network error
      return t("notifications.messages.network_error");
    } else if (err.message) {
      return err.message;
    }

    return t("notifications.messages.data_load_error");
  };

  return {
    ...loadingState,
    execute,
  };
};
