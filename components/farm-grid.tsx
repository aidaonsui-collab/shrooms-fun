"use client"

import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit"
import { FarmCard } from "./farm-card"
import { CreateFarmCard } from "./create-farm-card"

export function FarmGrid() {
  const account = useCurrentAccount()

  const { data: ownedObjects } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address || "",
      filter: {
        StructType: `${process.env.NEXT_PUBLIC_PACKAGE_ID || "YOUR_PACKAGE_ID"}::shrooms_token::Farm`,
      },
      options: {
        showContent: true,
        showType: true,
      },
    },
    { enabled: !!account?.address },
  )

  const farms = ownedObjects?.data || []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CreateFarmCard />
      {farms.map((farm) => (
        <FarmCard key={farm.data?.objectId} farm={farm} />
      ))}
    </div>
  )
}
