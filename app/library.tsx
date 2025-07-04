"use client"
import { useState } from "react"
import useSWRInfinite from "swr/infinite"
import Filters from "../components/Filters"
import { LibraryLayout } from "../components/Filters/LayoutSelect"
import GalleryGrid from "../components/GalleryGrid"
import withAuth from "../components/HOC/WithAuth"
import { fetchLibrary } from "../lib/api/library"
import { Role } from "../lib/helpers"
import useCategories from "../lib/hooks/data/useCategories"
import useFavorites from "../lib/hooks/data/useFavorites"
import useDebounce from "../lib/hooks/useDebounce"
import { LocalPreferences, getValue } from "../lib/localStorage"
import { GalleriesOrGrouped, LibraryFilters } from "../types/api"

type FetcherKey = [number, LibraryFilters] // offset, query
const gFetcher = (key: FetcherKey) => fetchLibrary(...key)

function Library() {
  const [query, setQuery] = useState<LibraryFilters>({
    nsfwHidden: getValue(LocalPreferences.NSFWPref),
    seed: Math.floor(Math.random() * 2147483648),
  })

  const [grouped, setGrouped] = useState(false)
  const debouncedFilters = useDebounce(query, 100)

  const [layout, setLayout] = useState(LibraryLayout.Detailed)
  const nativeTitles = getValue(LocalPreferences.LanguagePref)

  const { categories } = useCategories()
  const { favorites } = useFavorites()

  const getGKey = (pageIndex: number, previousPageData: unknown[]) => {
    if (previousPageData && previousPageData.length === 0) return null
    return [pageIndex, debouncedFilters]
  }

  const {
    data: gData,
    size: gSize,
    setSize: setGSize,
  } = useSWRInfinite(getGKey, gFetcher, {
    keepPreviousData: true,
  })

  const libraryPageExists = gData && gData.length > 0
  const validated = (libraryPageExists ? gData.filter((result) => result !== null) : []) as GalleriesOrGrouped[]

  const hasMoreGalleries =
    validated.length > 0 &&
    validated[validated.length - 1].TotalCount > validated.reduce((acc, result) => acc + result.Count, 0)

  // TODO: Grid masonry when major browsers support it (https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Masonry_Layout)
  return (
    <>
      <Filters
        query={query}
        setQuery={setQuery}
        grouped={grouped}
        setGrouped={setGrouped}
        categories={categories}
        favorites={favorites}
        setLayout={setLayout}
      />
      {validated && validated.length > 0 && validated[0] && validated[0].Count > 0 ? (
        <GalleryGrid galleries={validated} layout={layout} nativeTitles={nativeTitles} />
      ) : (
        <div className="flex items-center justify-center text-2xl text-slate-200">No galleries found</div>
      )}
      {hasMoreGalleries && (
        <button className="mb-8 bg-slate-600 w-1/2 mx-auto" onClick={() => setGSize(gSize + 1)}>
          Load More
        </button>
      )}
    </>
  )
}

export default withAuth(Library, false, Role.NoRole)
