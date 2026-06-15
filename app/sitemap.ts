import type { MetadataRoute } from "next"
import { LEARNING_HUBS, TRADING_COURSES } from "@/lib/constants"

const BASE_URL = "https://tradeversecity.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const learningRoutes = LEARNING_HUBS.map((hub) => ({
    url: `${BASE_URL}/learning/${hub.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const courseRoutes = TRADING_COURSES.map((course) => ({
    url: `${BASE_URL}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...learningRoutes,
    ...courseRoutes,
  ]
}
