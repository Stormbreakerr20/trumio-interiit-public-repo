import { onSnapshot, query } from 'firebase/firestore'
import { firestore } from './config'
import type { MasterAIChat, UpdateChat } from '~/components/chat/types'

export const subscribeToFirestore = (projectId: string, userId: string, pushToMaster: (new_chat: MasterAIChat) => void, pushToUpdates: (new_chat: UpdateChat) => void) => {
  const queryMaster = query(firestore.master(projectId, userId))
  const unsubscribeMaster =  onSnapshot(queryMaster, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if(change.type === 'added') {
        pushToMaster(change.doc.data() as MasterAIChat)
      }
    })
  })

  const queryUpdates = query(firestore.updates(projectId))
  const unsubscribeUpdates =  onSnapshot(queryUpdates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if(change.type === 'added') {
        pushToUpdates(change.doc.data() as UpdateChat)
      }
    })
  })

  return () => {
    unsubscribeMaster()
    unsubscribeUpdates()
  }

}