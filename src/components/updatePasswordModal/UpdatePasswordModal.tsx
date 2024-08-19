import { ChangeEvent, useState } from "react";
import { changePassword } from "../../api/api";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../route/appRoutes";
import { useOutsideClick } from "../../hooks/use-outside-click";

const UpdatePasswordModal = () => {
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
    changePassword(formData.password)
      .then(() => {
        navigate(appRoutes.USER_PAGE);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className="absolute z-50  top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
      <div
        ref={ref}
        className="bg-white p-10 rounded-3xl flex flex-col gap-5 items-center"
      >
        <img src="/images/logo.svg" alt="Logo" className="pb-5" />
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
  );
};

export default UpdatePasswordModal;
