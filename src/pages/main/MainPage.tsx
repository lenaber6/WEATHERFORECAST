import { ChangeEvent, useState } from "react";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { appRoutes } from "../../route/appRoutes";
import Button from "../../components/button/Button";

export default function MainPage() {
  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { ref } = useOutsideClick(() => navigate(appRoutes.USER_PAGE));

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function onClick() {
    if (!formData.password.trim() || !formData.repeatPassword.trim()) {
      setError("Заполните все поля!");
      return;
    }
    if (formData.password !== formData.repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }
    // changePassword(formData.password)
  }

  return (
    <>
      <Header />
      <div className="font-roboto bg-slate-50 grid place-content-center">
        <div className="ml-2 md:mx-[140px] max-w-[1440px]">
          <div className="flex justify-between my-[50px] relative">
            <div className="font-semibold text-fuchsia-500 text-[30px] lg:text-[60px] h-[120px] text-pretty inline-block align-middle text-left min-w-[280px]">
              Welcome to our weatherforecast!
            </div>
            <div className="mt-6 ml-12 p-4 text-[28px] 2xl:text-[32px] bg-custom-green text-purple-800 max-h-[125px] rounded-md hidden lg:flex">
              ` What`s the weather like today?`
            </div>
            <div className="absolute top-[124px] 2xl:top-[134px] right-[150px] hidden lg:flex">
              <img src="images/polygon.png" alt="polygon" />
            </div>
            <div className="absolute top-[124px] 2xl:top-[104px] right-[140px] hidden lg:flex">
              <img src="images/girl_with_umbrella.png" alt="девушка с зонтом" />
            </div>
         
          </div>
          <div className="absolute bottom-50 left-30 z-10 w-[1440px] h-[950px] p-10 bg-black bg-opacity-10 rounded-3xl flex flex-raw items-center justify-start ml-50">
              <div
                ref={ref}
                className="bg-white p-10 ml-64 mt-72 rounded-3xl flex flex-col gap-5 items-center"
              >
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  placeholder="Новый пароль"
                  onChange={onChange}
                  className="py-4 px-5 outline-none border-solid border-[rgba(208,206,206,1)] border-2 rounded-lg text-lg w-[280px] h-[55px]"
                />
                <input
                  name="repeatPassword"
                  type="password"
                  value={formData.repeatPassword}
                  onChange={onChange}
                  placeholder="Повторите пароль"
                  className="py-4 px-5 outline-none border-[rgba(208,206,206,1)] border-2 rounded-lg text-lg w-[280px] h-[55px]"
                />
                <div className="text-red-500">{error}</div>
                <Button onClick={onClick} classNames="w-[280px]" type="primary">
                  Подтвердить
                </Button>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
