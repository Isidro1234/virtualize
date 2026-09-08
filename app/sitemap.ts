import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap{
  return[
    {
      url: 'https://virtualize-bice.vercel.app',
      lastModified: new Date(),
      changeFrequency:'monthly',
      priority: 1,
    },{
      url: 'https://virtualize-bice.vercel.app/services',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.,
    },{
      url: 'https://virtualize-bice.vercel.app/register',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },{
      url: 'https://virtualize-bice.vercel.app/login',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },{
      url: 'https://virtualize-bice.vercel.app/universities',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://virtualize-bice.vercel.app/aboutus',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    }
  ]
}