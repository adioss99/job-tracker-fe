import { useMutation, useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/api/api";
import { getAuthId } from "@/helper/code-roles";
import { usePersistStore } from "@/stores/use-persist";
import type {
  LoginRequest,
  RegisterRequest,
  RefreshTokenResponse,
  UserProfileResponse,
  LoginResponse,
  RegisterResponse,
} from "@/types/auth-interface";

export const useLogin = () => {
  const setAuthToken = usePersistStore((state) => state.setAuthToken);
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: LoginRequest) =>
      apiFetch<LoginResponse>("/api/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: (res) => {
      if (res.success) {
        setAuthToken({
          token: res.accessToken,
          _user: getAuthId(res.data.id),
        });
      }
    },
    retry: false,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (payload: RegisterRequest) =>
      apiFetch<RegisterResponse>("/api/register", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    retry: false,
  });
};

export const useLogout = () => {
  const { reset } = usePersistStore();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () =>
      apiFetch<{ success: boolean }>("/api/logout", { method: "DELETE" }),
    retry: false,
    onSuccess: () => {
      reset();
    },
  });
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["getUserProfile"],
    queryFn: () =>
      apiFetch<UserProfileResponse>("/api/profile", { method: "GET" }),
    retry: false,
    staleTime: 1000 * 10,
  });
};

export const useGetRefreshToken = () => {
  const { setAuthToken, reset } = usePersistStore();
  return useMutation<RefreshTokenResponse>({
    mutationKey: ["getRefreshToken"],
    mutationFn: () =>
      apiFetch<RefreshTokenResponse>("/api/refresh-token", { method: "GET" }),
    onSuccess: (res) => {
      if (res.success) {
        setAuthToken({
          token: res.accessToken,
          _user: getAuthId(res.data.id),
        });
      } else {
        reset();
      }
    },
    retry: false,
  });
};
