import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseType } from "../../types";

type CourseStateType = {
  courses: CourseType[];
  chosenCourse: CourseType | null;
  isChosenCourse: boolean;
};

const initialState: CourseStateType = {
  courses: [],
  chosenCourse: null,
  isChosenCourse: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<{courses: CourseType[]}>) => {
      state.courses = action.payload.courses;
    },
  },
});

export const { setCourses } = courseSlice.actions;
export const courseReducer = courseSlice.reducer;


