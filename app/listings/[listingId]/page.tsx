import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'
import getReservations from '@/app/actions/getReservations'

const ListingPage = async ({params}: {params: {listingId?: string}}) => {

  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if(!listing) {
    return (
        <ClientOnly>
            <EmptyState/>
        </ClientOnly>
    )
  }

  return (
    <ClientOnly>
        <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>
    </ClientOnly>
  )
}

export default ListingPage