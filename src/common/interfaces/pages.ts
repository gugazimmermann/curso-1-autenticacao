import {type AlertProps} from "./components";

export interface IBlogPost {
  id: string;
  genres: IBlogApiGenre[];
  title: string;
  image: string;
  description: string;
  date: string;
}

export interface BlogPostProps {
  post: IBlogPost;
}

export interface IBlogApiGenre {
  id: number;
  name: string;
}

export interface IBlogApiPost {
  id: number;
  genre_ids?: number[];
  genres?: IBlogApiGenre[];
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

export interface AuthLayoutProps {
  title: string;
  children: React.ReactElement;
}

interface AuthInputProps<T> {
  required: boolean;
  autocomplete?: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  value: keyof T;
}

export interface AuthFormProps<T> {
  loading: boolean;
  alert?: AlertProps;
  submitText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  inputs: Array<AuthInputProps<T>>;
  extraButton?: React.ReactNode;
  children: React.ReactNode;
}
