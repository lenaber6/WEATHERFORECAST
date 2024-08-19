import Course from "../../components/course/Course";
import {
  fetchAddFavoriteCourseToUser,
  getCourses,
  getFavoriteCourseOfUser,
} from "../../api/api";

import { CourseIDType } from "../../types";

import { SetStateAction, useContext, useEffect, useState } from "react";

import { LoginModalContext } from "../../contexts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import Button from "../../components/button/Button";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCourses } from "../../store/slices/courseSlice";

export default function MainPage() {
  const [addedCourses, setAddedCourses] = useState<CourseIDType[]>([]);
  const dispatch = useAppDispatch();
  const { setIsLoginModalOpened } = useContext(LoginModalContext);
  const user = useAppSelector((state) => state.user);

  const courses = useAppSelector((state) => state.course.courses);
  console.log(courses);
  useEffect(() => {
    getCourses().then((data) => {
      dispatch(
        setCourses({
          courses: data,
        })
      );
    });
  }, []);

  useEffect(() => {
    getFavoriteCourseOfUser(user.id).then(
      (data: SetStateAction<CourseIDType[]>) => {
        setAddedCourses(data);
      }
    );
  }, [user.id]);

  const addCourse = (courseId: string) => {
    if (user.id) {
      console.log("сейчас кликаем на этот курс", courseId);

      getFavoriteCourseOfUser(user.id).then((data: any[]) => {
        const element = data?.some(function (el) {
          return el.courseId == courseId;
        });
        console.log(element);

        if (!element) {
          console.log("элемента нет");
          // // делаем запрос на добавление курса юзеру
          fetchAddFavoriteCourseToUser(user.id, courseId).then(() => {
            toast("Курс добавлен!");
            getFavoriteCourseOfUser(user.id).then(
              (data: SetStateAction<CourseIDType[]>) => {
                console.log(data);
                setAddedCourses(data);
              }
            );
          });
        } else {
          console.log("вот он уже добавлен был и нашелся в массиве", element);
        }
      });
    } else {
      setIsLoginModalOpened(true);
    }
  };

  return (
    <>
      <div className="font-roboto bg-slate-50 grid place-content-center">
        <div className="ml-2 md:mx-[140px] max-w-[1440px]">
          <div className="flex justify-between my-[50px] relative">
            <div className="font-semibold text-[30px] lg:text-[60px] h-[120px] text-pretty inline-block align-middle text-left min-w-[280px]">
              Начните заниматься спортом и улучшите качество жизни
            </div>
            <div className="mt-6  p-4 text-[28px] 2xl:text-[32px] bg-custom-green max-h-[125px] rounded-md hidden lg:flex">
              Измени своё тело за полгода!
            </div>
            <div className="absolute top-[124px] 2xl:top-[134px] right-[150px] hidden lg:flex">
              <img src="images/polygon.png" alt="polygon" />
            </div>
          </div>
          <div className="grid place-content-center md:grid-cols-2 md:gap-6 lg:grid-cols-3  sm:grid-cols-1 -mr-10">
            {courses?.map((course) => (
              <Course
                setAddedCourses={setAddedCourses}
                courses={courses}
                course={course}
                addedCourses={addedCourses}
                key={course._id}
                onAddCourse={addCourse}
                isChosenCourse={false}
              />
            ))}
            <ToastContainer
              style={{ width: "300px" }}
              bodyClassName={() => "text-[26px]"}
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              transition={Bounce}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
          <div
            className="flex justify-center mt-6 mb-20"
            x-data="{ isVisible: false }"
            x-init="window.addEventListener('scroll', () => { isVisible = window.scrollY > 100; })"
            x-show="isVisible"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 transform translate-y-2"
            x-transition:enter-end="opacity-100 transform translate-y-0"
            x-transition:leave="transition ease-in duration-300"
            x-transition:leave-start="opacity-100 transform translate-y-0"
            x-transition:leave-end="opacity-0 transform translate-y-2 "
          >
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              type="primary"
            >
              Наверх ↑
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
