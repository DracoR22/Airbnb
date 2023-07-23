import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'
import ListingReservation from '@/components/listings/ListingReservation'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()
    if(!currentUser) {
        return new NextResponse('Unauthorized', {status: 401})
    }

    const body = await request.json()

    const {listingId, startDate, totalPrice, endDate} = body

    if(!listingId || !startDate || !totalPrice || !endDate) {
      return NextResponse.error()
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })
   
    return NextResponse.json(listingAndReservation)
}