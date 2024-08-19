import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/main/MainPage";
import { appRoutes } from "./route/appRoutes";
import ProtectedRoute from "./route/protectedRoute";
import Layout from "./components/layout/Layout";

import { useState } from "react";
import { LoginModalContext, UserModalContext } from "./contexts";
import { ModalLogin } from "./components/modalItem/Modal";
import UpdatePasswordModal from "./components/updatePasswordModal/UpdatePasswordModal";

export default function App() {
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  return (
    <UserModalContext.Provider value={{ isUserModalOpen, setIsUserModalOpen }}>
      <LoginModalContext.Provider
        value={{ isLoginModalOpened, setIsLoginModalOpened }}
      >
        <Routes>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
                <Route
                  path={appRoutes.CHANGE_PASSWORD}
                  element={<UpdatePasswordModal />}
                />
              </Route>
            </Route>
            <Route path={appRoutes.MAIN} element={<MainPage />}></Route>
        </Routes>
        {isLoginModalOpened && <ModalLogin />}
      </LoginModalContext.Provider>
    </UserModalContext.Provider>
  );
}
