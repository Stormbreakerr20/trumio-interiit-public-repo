interface MasterAIChat {
  id: string,
  type: 'user' | 'system' | 'resource' | 'milestone' | 'payment',
  data: string,
  user: {
    name: string, 
    profilePicture: string
  }
  created_at: string
}

interface UpdateChat {
  meeting_name: string,
  data: {
    id: string,
    agenda: string,
    key_points: string[],
    action_items: {
      text: string,
      completed: boolean
    }[]
  }[],
}

export type {
  MasterAIChat,
  UpdateChat
}