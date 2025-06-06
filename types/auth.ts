export type FileType = {
  id: string;
  path: string;
};

export type Role = {
  id: number;
  name?: string;
};

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
