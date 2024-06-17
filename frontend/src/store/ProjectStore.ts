import { create } from 'zustand';
import type { Project } from '@prisma/client';

interface ProjectStoreProps {
  project: Project | undefined,
  setProject: (project: Project) => void,
  resetProject: () => void
}

export const useProjectStore = create<ProjectStoreProps>()((set) => ({
  project: undefined,
  setProject: (project: Project) => {
    set({ project })
  },
  resetProject: () => { 
    set( { project: undefined  })
  }
}))