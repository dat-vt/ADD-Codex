import axios from "axios";

export type Post = {
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
};

export type ShopItem = {
  title: string;
  subtitle: string;
  price: number;
  tag: string;
  image: string;
};

export type ContentPayload = {
  featured: Post[];
  latest: Post[];
  trending: Post[];
  categories: string[];
  shop: ShopItem[];
};

const fallbackDestinations = [
  {
    title: "Kyoto in layers",
    author: "Mila Park",
    date: "Oct 17",
    category: "Japan",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Lisbon light",
    author: "Theo Cruz",
    date: "Oct 12",
    category: "Portugal",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Nordic contrast",
    author: "Jane White",
    date: "Oct 9",
    category: "Iceland",
    image: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Pacific North Glow",
    author: "Mike Smith",
    date: "Oct 4",
    category: "USA",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  }
];

const fallbackShop: ShopItem[] = [
  {
    title: "Ultralight Daypack",
    subtitle: "18L packable for city and trail",
    price: 89,
    tag: "Gear",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Travel Journal",
    subtitle: "Layflat notebook with waterproof cover",
    price: 24,
    tag: "Stationery",
    image: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Compact Tripod",
    subtitle: "Carbon fiber, 1kg carry",
    price: 129,
    tag: "Photo",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80"
  }
];

let cache: ContentPayload | null = null;

export const fetchContent = async (): Promise<ContentPayload> => {
  if (cache) return cache;

  try {
    const { data } = await axios.get<{ items: any[] }>("/api/destinations");
    const mapped: Post[] = (data.items || []).map((item, idx) => ({
      title: item.name || item.title || `Destination ${idx + 1}`,
      author: item.country || "Contributor",
      date: item.duration || "This month",
      category: item.country || "Travel",
      image:
        item.image ||
        fallbackDestinations[idx % fallbackDestinations.length].image
    }));

    cache = {
      featured: mapped.slice(0, 2).length ? mapped.slice(0, 2) : fallbackDestinations.slice(0, 2),
      latest: mapped.slice(0, 3).length ? mapped.slice(0, 3) : fallbackDestinations.slice(0, 3),
      trending: mapped.slice(1, 4).length ? mapped.slice(1, 4) : fallbackDestinations.slice(1, 4),
      categories: Array.from(new Set(mapped.map((m) => m.category))).length
        ? Array.from(new Set(mapped.map((m) => m.category)))
        : ["All", "Food", "Activities", "Nature", "Tips", "Culture", "Outdoors"],
      shop: fallbackShop
    };
  } catch {
    cache = {
      featured: fallbackDestinations.slice(0, 2),
      latest: fallbackDestinations.slice(0, 3),
      trending: fallbackDestinations.slice(1, 4),
      categories: ["All", "Food", "Activities", "Nature", "Tips", "Culture", "Outdoors"],
      shop: fallbackShop
    };
  }

  return cache;
};
