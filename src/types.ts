export interface CourseType {
  duration: number;
  level: string;
  nameRU: string;
  order: number;
  timeaday: string;
  src: string;
  src_laptop: string;
  _id: string;
  fitting: string;
  directions: string[];
}

export interface WorkoutType {
  name: string;
  _id: string;
  exercises: ExerciseType[];
  video: string;
}

export type ProgressWorkoutType = {
  name: string;
  progress: number;
  id: string;
};

export interface ExerciseType {
  name: string;
  id: string;
  progress: number;
  quantity: number;
}

export interface CourseIDType {
  _id: string;
}

export interface CourseIDType {
  courseId: string;
}
