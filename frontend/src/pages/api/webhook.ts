import { type WebhookEvent } from '@clerk/nextjs/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '~/server/db'
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if(req.method === 'POST') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if(!req.body?.data?.id) res.status(400).json({ message: 'Id not found.' })

    const event = req.body as WebhookEvent
    switch(event.type) {
      case 'user.created':
        try {
          await db.user.create({ data: { id: event.data.id } })
        } catch (e) {
          console.log('Failed to add User because: ', e)
        }
        break
      default:
        res.status(400).json({ message: `Wrong Event Received: ${JSON.stringify(req.body)}` })
    }
    res.status(200).json({ message: `User created: ${event.data.id}` })
  } else {
    res.status(405).json({ message: 'Method Not Allowed.' })
  }
}