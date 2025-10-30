

export type User = {
    id: string;
    email: string | null;
    phone: string | null;
    password?: string;
    provider: string;
    socialId?: string | null;
    firstName: string | null;
    lastName: string | null;
    photo?: FileType | null;
    role?: Role | null;
    status?: Status;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }