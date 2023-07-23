import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

export async function DELETE(req: Request, {params}: {params: {listingId: string}}) {

    const currentUser = await getCurrentUser()
    if(!currentUser) {
        return new NextResponse('Unauthorized', {status: 400})
    }

    if(!params.listingId || typeof params.listingId !== 'string') {
        return new NextResponse('Listing ID is required', {status: 401})
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: params.listingId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
}