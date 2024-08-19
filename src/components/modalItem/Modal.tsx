import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useState } from "react";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { LoginModalContext } from "../../contexts";

const ModalLogin = () => {
  const [isReg, setIsReg] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setIsLoginModalOpened } = useContext(LoginModalContext);

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        setIsLoginModalOpened(false);
        navigate("/");
        console.log(user);
      })
      .catch(() => alert("Invalid user!"));
  };

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        setIsLoginModalOpened(false);
        navigate("/");
      })
      .catch(console.error);
  };
  return (
    <div className="fixed z-50  top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl flex flex-col gap-5 items-center">
        <img src="/images/logo.svg" alt="Logo" className="pb-5" />
        {!isReg ? (
          <>
            <input
              type="email"
              value={email}
              placeholder="Логин"
              onChange={(e) => setEmail(e.target.value)}
              className="py-4 px-5 outline-none border-solid border-[rgba(208,206,206,1)] border-2 rounded-lg text-lg w-[280px] h-[55px]"
            />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Пароль"
              className="py-4 px-5 outline-none border-[rgba(208,206,206,1)] border-2 rounded-lg text-lg w-[280px] h-[55px]"
            />
            <button
              onClick={() => handleLogin(email, pass)}
              className="mt-8 rounded-3xl bg-custom-green text-xl border-none w-[280px] h-[52px]"
            >
              Войти
            </button>
            <button
              onClick={() => setIsReg(!isReg)}
              className="rounded-3xl border-2 text-xl w-[280px] h-[52px]"
            >
              Зарегистрироваться
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Эл. почта"
              className="py-4 px-5 outline-none border-solid border-[rgba(208,206,206,1)] border-2 rounded-lg text-lg w-[280px] h-[55px]"
            />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Пароль"
              className="py-4 px-5 outline-none border-[rgba(208,206,206,1)] border-2 rounded-lg text-lg w-[280px] h-[55px]"
            />
            <input
              type="password"
              name="password"
              placeholder="Повторите пароль"
              className="py-4 px-5 outline-none border-[rgba(208,206,206,1)] border-2 rounded-lg text-lg w-[280px] h-[55px]"
            />
            <button
              onClick={() => handleRegister(email, pass)}
              className="mt-8 rounded-3xl bg-custom-green text-xl border-none w-[280px] h-[52px]"
            >
              Зарегистрироваться
            </button>
            <button
              className="rounded-3xl border-2 text-xl w-[280px] h-[52px]"
              onClick={() => setIsReg(!isReg)}
            >
              Войти
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export { ModalLogin };
