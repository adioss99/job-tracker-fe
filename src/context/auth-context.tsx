import { useContext, createContext, type ReactNode } from "react";

import { usePersistStore } from "@/stores/use-persist";

interface AuthProviderProps {
  children: ReactNode;
}
interface ProviderProps {
  id?: string;
  token?: string;
}
const AuthContext = createContext<ProviderProps>({
  id: undefined,
  token: undefined,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = usePersistStore((state) => state.auth);
  const id = auth?._user || undefined;
  const token = auth?.token || undefined;

  return (
    <AuthContext.Provider value={{ id, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
