import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap{
  return[
    {
      url: 'https://virtualize-bice.vercel.app/',
      lastModified: new Date(),
      changeFrequency:'always',
      priority: 1,
    },{
      url: 'https://virtualize-bice.vercel.app/services',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },{
      url: 'https://virtualize-bice.vercel.app/register',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },{
      url: 'https://virtualize-bice.vercel.app/login',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },{
      url: 'https://virtualize-bice.vercel.app/universities',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://virtualize-bice.vercel.app/aboutus',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ]
}