import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mangatsu",
    short_name: "Mangatsu",
    description: "A Progressive Web App for manga",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo-small.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-large.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
