import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

export async function POST(request: Request) {

  const currentUser = await getCurrentUser()
  const body = await request.json()
  const {title, description, imageSrc, category, roomCount,
 bathroomCount, guestCount, location, price} = body

  if(!currentUser) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  if(!title) {
    return new NextResponse('Missing title', { status: 400 })
  }

  if(!description) {
    return new NextResponse('Missing description', { status: 400 })
  }

  if(!imageSrc) {
    return new NextResponse('Missing image', { status: 400 })
  }

  if(!category) {
    return new NextResponse('Missing category', { status: 400 })
  }

  if(!roomCount) {
    return new NextResponse('Missing rooms', { status: 400 })
  }

  if(!bathroomCount) {
    return new NextResponse('Missing bathrooms', { status: 400 })
  }

  if(!guestCount) {
    return new NextResponse('Missing guests', { status: 400 })
  }

  if(!location) {
    return new NextResponse('Missing location', { status: 400 })
  }

  if(!price) {
    return new NextResponse('Missing price', { status: 400 })
  }

  const listing = await prisma.listing.create({
    data: {
        title, description, imageSrc, category, roomCount,
        bathroomCount, guestCount, locationValue: location.value, price: parseInt(price, 10),
        userId: currentUser.id
    }
  })

  return NextResponse.json(listing)
}