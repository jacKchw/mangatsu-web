"use client"
import { useParams } from "next/navigation"
import useSWR from "swr"
import GalleryInfoBox from "../../../components/GalleryInfoBox"
import withAuth from "../../../components/HOC/WithAuth"
import { APIPathsV1, swrFetcher } from "../../../lib/api/other"
import { Role } from "../../../lib/helpers"
import useUser from "../../../lib/hooks/data/useUser"
import { GalleryMeta, GenericDataResponse } from "../../../types/api"
import NotFound from "../../not-found"

const fetcher = (id: string) => swrFetcher<GenericDataResponse<GalleryMeta[]>>(id)

function SeriesPage() {
  const params = useParams()
  const { access } = useUser()
  const { data: galleries, error } = useSWR(
    access && params?.slug ? `${APIPathsV1.Galleries}?series=${params.slug}` : null,
    fetcher,
  )

  if (error) {
    return <NotFound />
  }

  if (!galleries?.Data || galleries.Data.length === 0) {
    // better no data state
    return null
  }

  const series = galleries?.Data ? galleries.Data[0].Series : ""
  return (
    <div>
      <h2 className="mb-4 font-bold">
        {series} ({galleries.Count})
      </h2>
      <div className="grid lg:grid-cols-2">
        {galleries.Data.map((gallery) => (
          <GalleryInfoBox key={gallery.UUID} gallery={gallery} />
        ))}
      </div>
    </div>
  )
}

export default withAuth(SeriesPage, true, Role.NoRole)
