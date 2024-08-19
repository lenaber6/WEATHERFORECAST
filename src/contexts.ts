import { createContext, Dispatch, SetStateAction } from "react";

interface LoginModalContextType {
  isLoginModalOpened: boolean;
  setIsLoginModalOpened: Dispatch<SetStateAction<boolean>>;
}

export const LoginModalContext = createContext<LoginModalContextType>({
  isLoginModalOpened: false,
  setIsLoginModalOpened: () => {},
});

interface UserModalContextType {
  isUserModalOpen: boolean;
  setIsUserModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const UserModalContext = createContext<UserModalContextType>({
  isUserModalOpen: false,
  setIsUserModalOpen: () => {},
});
