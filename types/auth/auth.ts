import { FileType } from "../media/fileType";
import { Role } from "./role";


export type Status = {
  id: number | string;
  name?: string;
};

export type Personnel = {
  id: string;
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  photo?: FileType | null;
  role: Role;
  status?: Status;
  cinemaId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type LoginData = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  personnel: Personnel;
};
