export type ZUSTAND_USER = {
  id: string | undefined;
  username: string | undefined;
  email: string | undefined;
  image: string | undefined | null;
};

export type ZUSTAND_USER_STORE = {
  user: ZUSTAND_USER | null;
  isAuthenticated: boolean;
  setUser: (user: ZUSTAND_USER) => void;
  clearUser: () => void;
  getUser: () => (ZUSTAND_USER & { isAuthenticated: boolean }) | null;
};
