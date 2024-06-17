import { create } from 'zustand';
import type { User } from '@prisma/client';

interface UserStoreType {
  user: User | undefined,
  setUser: (user: User) => void,
  logout: () => void,
}

export const useUserStore = create<UserStoreType>()((set) => ({
  user: undefined,
  setUser: (user: User) => {
    set({ user })
  },
  logout: () => {
    set( { user: undefined  })
  }
}))