import Button from "../button/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginModalContext } from "../../contexts";
import { useAppSelector } from "../../hooks/redux-hooks";

export default function Header() {
  const { isLoginModalOpened, setIsLoginModalOpened } =
    useContext(LoginModalContext);


 
  const user = useAppSelector((state) => state.user);

  return (
    <div className="flex justify-center bg-slate-50">
      <div className="flex justify-between center items-center sm:h-[140px]  w-full max-w-[1440px] mx-4 pr-5">
        <div className="flex flex-raw items-center gap-10 pt-20">
          <Link to="/">
            <img className="w-32 h-32" src="/images/logo.jpg" alt="Logo" />
          </Link>
          <p className="sm:hidden lg:flex font-roboto font-semibold pt-2 text-purple-600 text-6xl">
            Прогноз погоды
          </p>
        </div>
        {user.email ? (
          <div className="flex items-center lg:gap-5">
            <div className="overflow-hidden">
              <img
                width={40}
                height={40}
                src="../public/icons/icon-profile.svg"
                alt="Иконка пользователя"
              />
            </div>
            <div className="text-2xl flex items-center relative cursor-pointer ">
              <span className="sm:hidden lg:block">{user.email}</span>
              <Button type="icon" classNames="w-3.5 px-0">
                <svg
                  width="14"
                  height="9"
                  viewBox="0 0 14 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.3553 1.03308L6.67773 6.7107L1.00012 1.03308"
                    stroke="black"
                    strokeWidth="2"
                  />
                </svg>
              </Button>
            </div>
          </div>
        ) : (
          <Button
            classNames="w-[103px]"
            type="primary"
            onClick={() => setIsLoginModalOpened(!isLoginModalOpened)}
          >
            Войти
          </Button>
        )}
      </div>
    </div>
  );
}
