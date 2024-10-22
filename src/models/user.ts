enum UserStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: UserStatus;
}

interface UserRegister {
  name: string;
  username: string;
  email: string;
  password: string;
}

const UserRegisterInitial: UserRegister = {
  name: '',
  username: '',
  email: '',
  password: '',
};

export type { User, UserRegister };
export { UserRegisterInitial, UserStatus };