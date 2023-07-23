import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request, {params}: {params: {reservationId: string}}) {

   const currentUser = await getCurrentUser()
   if(!currentUser) {
    return new NextResponse('Unauthorized', {status: 400})
   }

   if(!params.reservationId || typeof params.reservationId !== 'string') {
    throw new Error('Invalid ID')
   }

   const reservation = await prisma.reservation.deleteMany({
    where: {
        id: params.reservationId,
        OR: [
            {userId: currentUser.id},
            {listing: {userId: currentUser.id}}
        ]
    }
   })

   return NextResponse.json(reservation)
}