import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ZUSTAND_USER, ZUSTAND_USER_STORE } from "../../types/zustand_types";

const useUserStore = create<ZUSTAND_USER_STORE>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user: ZUSTAND_USER) =>
        set({
          user: user,
          isAuthenticated: true,
        }),

      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      getUser: () => {
        const state = get();
        if (!state.user) return null;
        return {
          ...state.user,
          isAuthenticated: state.isAuthenticated,
        };
      },
    }),
    { name: "user-storage" }
  )
);

export default useUserStore;
