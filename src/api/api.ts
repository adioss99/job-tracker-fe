import { usePersistStore } from "@/stores/use-persist"; // your Zustand store
import type { RefreshTokenResponse } from "@/types/auth-interface";
import { getAuthId } from "@/utils/code-roles";

export async function apiFetch<T>(
  endpoint: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const token = usePersistStore.getState().auth.token;

  const doFetch = async (accessToken?: string): Promise<Response> => {
    const res = await fetch(endpoint, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
      credentials: "include", // send cookies for refresh token
    });
    return res;
  };

  let res = await doFetch(token || undefined);
  const resJson = await res.json();

  if (res.status === 401 && resJson.message === "Token invalid") {
    const { setAuthToken, reset } = usePersistStore.getState();
    // try refresh
    try {
      const refreshRes = await getRefreshToken(); // will use cookies
      if (refreshRes.success) {
        // update Zustand with new token
        setAuthToken({
          token: refreshRes.accessToken,
          _user: getAuthId(refreshRes.data.id),
        });
        // retry original request with new token
        res = await doFetch(refreshRes.accessToken);
      } else {
        // refresh failed, logout
        reset();
        throw new Error("Unauthorized - refresh failed");
      }
    } catch (err) {
      reset();
      throw new Error("Fetch error: " + err);
    }
  }

  return resJson;
}

const getRefreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await fetch(`/api/refresh-token`, {
    method: "GET",
    credentials: "include",
  });
  const resData = await response.json();
  return resData;
};
