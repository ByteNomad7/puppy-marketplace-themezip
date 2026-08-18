// Real puppy listings sourced from rollypupsofficial.com with permission.
// Imported for pottyregisteredpuppies.com — UK market.

export type Puppy = {
  slug: string
  name: string
  breed: string
  breedSlug: string
  sex: "Male" | "Female"
  ageWeeks: number
  location: string
  price: number | null
  status: "Available" | "Reserved" | "Coming Soon"
  image: string
  gallery: string[]
}

export type Breed = {
  slug: string
  name: string
  group: string
  image: string
  summary: string
  traits: { label: string; value: string }[]
  temperament: string[]
  care: string
}

export type Guide = {
  slug: string
  title: string
  category: string
  excerpt: string
  image: string
  readTime: string
}

export const puppies: Puppy[] = [
  {
    slug: "lulu-female-1",
    name: "Lulu",
    breed: "Maltipoo",
    breedSlug: "maltipoo",
    sex: "Female",
    ageWeeks: 12,
    location: "United Kingdom",
    price: 12000,
    status: "Available",
    image: "/puppies/lulu-female-1-1.jpg",
    gallery: [
      "/puppies/lulu-female-1-1.jpg",
      "/puppies/lulu-female-1-2.jpg",
      "/puppies/lulu-female-1-3.jpg",
      "/puppies/lulu-female-1-4.jpg",
    ],
  },
  {
    slug: "oscar-male-7",
    name: "Oscar",
    breed: "Pomsky",
    breedSlug: "pomsky",
    sex: "Male",
    ageWeeks: 12,
    location: "United Kingdom",
    price: 7800,
    status: "Available",
    image: "/puppies/oscar-male-7-1.jpg",
    gallery: [
      "/puppies/oscar-male-7-1.jpg",
      "/puppies/oscar-male-7-2.jpg",
      "/puppies/oscar-male-7-3.jpg",
      "/puppies/oscar-male-7-4.jpg",
      "/puppies/oscar-male-7-5.jpg",
      "/puppies/oscar-male-7-6.jpg",
    ],
  },
  {
    slug: "toffee-male-1",
    name: "Latte",
    breed: "Poodle",
    breedSlug: "poodle",
    sex: "Male",
    ageWeeks: 12,
    location: "United Kingdom",
    price: 6800,
    status: "Available",
    image: "/puppies/toffee-male-1-1.jpg",
    gallery: [
      "/puppies/toffee-male-1-1.jpg",
      "/puppies/toffee-male-1-2.jpg",
      "/puppies/toffee-male-1-3.jpg",
      "/puppies/toffee-male-1-4.jpg",
    ],
  },
  {
    slug: "theo-male-4",
    name: "Theo",
    breed: "Pomeranian",
    breedSlug: "pomeranian",
    sex: "Male",
    ageWeeks: 12,
    location: "United Kingdom",
    price: 7800,
    status: "Available",
    image: "/puppies/theo-male-4-1.jpg",
    gallery: [
      "/puppies/theo-male-4-1.jpg",
      "/puppies/theo-male-4-2.jpg",
      "/puppies/theo-male-4-3.jpg",
      "/puppies/theo-male-4-4.jpg",
    ],
  },
  {
    slug: "jessie-female-3",
    name: "Jessie",
    breed: "Maltipoo",
    breedSlug: "maltipoo",
    sex: "Female",
    ageWeeks: 12,
    location: "United Kingdom",
    price: 7800,
    status: "Available",
    image: "/puppies/jessie-female-3-1.jpg",
    gallery: [
      "/puppies/jessie-female-3-1.jpg",
      "/puppies/jessie-female-3-2.jpg",
      "/puppies/jessie-female-3-3.jpg",
      "/puppies/jessie-female-3-4.jpg",
    ],
  },
  {
    slug: "giselle-female-1",
    name: "Giselle",
    breed: "Maltipom",
    breedSlug: "maltipom",
    sex: "Female",
    ageWeeks: 12,
    location: "United Kingdom",
    price: 6400,
    status: "Available",
    image: "/puppies/giselle-female-1-1.jpg",
    gallery: [
      "/puppies/giselle-female-1-1.jpg",
      "/puppies/giselle-female-1-2.jpg",
      "/puppies/giselle-female-1-3.jpg",
      "/puppies/giselle-female-1-4.jpg",
      "/puppies/giselle-female-1-5.jpg",
    ],
  },
  {
    slug: "lily-female-1",
    name: "Lily",
    breed: "Yorkshire Terrier",
    breedSlug: "yorkie",
    sex: "Female",
    ageWeeks: 20,
    location: "United Kingdom",
    price: 8800,
    status: "Available",
    image: "/puppies/lily-female-1-1.jpg",
    gallery: [
      "/puppies/lily-female-1-1.jpg",
      "/puppies/lily-female-1-2.jpg",
      "/puppies/lily-female-1-3.jpg",
      "/puppies/lily-female-1-4.jpg",
    ],
  },
  {
    slug: "thor-male-3",
    name: "Thor",
    breed: "Pomeranian",
    breedSlug: "pomeranian",
    sex: "Male",
    ageWeeks: 12,
    location: "United Kingdom",
    price: 7800,
    status: "Available",
    image: "/puppies/thor-male-3-1.jpg",
    gallery: [
      "/puppies/thor-male-3-1.jpg",
      "/puppies/thor-male-3-2.jpg",
      "/puppies/thor-male-3-3.jpg",
      "/puppies/thor-male-3-4.jpg",
    ],
  },
  {
    slug: "toby-male-12",
    name: "Toby",
    breed: "Mauzer",
    breedSlug: "mauzer",
    sex: "Male",
    ageWeeks: 12,
    location: "United Kingdom",
    price: 6400,
    status: "Available",
    image: "/puppies/toby-male-12-1.jpg",
    gallery: [
      "/puppies/toby-male-12-1.jpg",
      "/puppies/toby-male-12-2.jpg",
      "/puppies/toby-male-12-3.jpg",
      "/puppies/toby-male-12-4.jpg",
      "/puppies/toby-male-12-5.jpg",
      "/puppies/toby-male-12-6.jpg",
    ],
  },
]

export const breeds: Breed[] = [
  {
    slug: "maltipoo",
    name: "Maltipoo",
    group: "Hybrid",
    image: "/breeds/maltipoo.jpg",
    summary:
      "A charming cross between the Maltese and Poodle, Maltipoos are affectionate, low-shedding companions perfectly suited to families and individuals across the UK.",
    traits: [
      { label: "Size", value: "Toy / Teacup" },
      { label: "Energy", value: "Moderate" },
      { label: "Coat", value: "Soft, wavy or curly" },
      { label: "Lifespan", value: "12–16 years" },
    ],
    temperament: ["Affectionate", "Playful", "Gentle", "Intelligent"],
    care:
      "Maltipoos thrive with daily gentle walks and interactive play. Their low-shedding coat requires regular brushing and professional grooming every 6–8 weeks. They bond deeply with their families and are well suited to apartment living.",
  },
  {
    slug: "pomsky",
    name: "Pomsky",
    group: "Hybrid",
    image: "/breeds/pomsky.jpg",
    summary:
      "A striking cross between the Pomeranian and Siberian Husky, Pomskies combine the Husky's beautiful markings with a compact, manageable size — ideal for UK homes.",
    traits: [
      { label: "Size", value: "Small–Medium" },
      { label: "Energy", value: "High" },
      { label: "Coat", value: "Thick, double" },
      { label: "Lifespan", value: "13–15 years" },
    ],
    temperament: ["Playful", "Intelligent", "Alert", "Loyal"],
    care:
      "Pomskies need daily exercise and consistent training from an early age. Their double coat requires regular brushing, especially during seasonal shedding. They are social dogs that enjoy being part of an active household.",
  },
  {
    slug: "poodle",
    name: "Poodle",
    group: "Non-Sporting",
    image: "/breeds/poodle-new.jpg",
    summary:
      "Elegant and remarkably intelligent, Poodles are trainable, low-shedding companions available in several sizes to suit many UK homes and lifestyles.",
    traits: [
      { label: "Size", value: "Toy / Teacup" },
      { label: "Energy", value: "Moderate–High" },
      { label: "Coat", value: "Curly, low-shed" },
      { label: "Lifespan", value: "12–15 years" },
    ],
    temperament: ["Intelligent", "Elegant", "Trainable", "Alert"],
    care:
      "Poodles require regular professional grooming to maintain their curly coat and benefit from consistent training and daily activity. They are highly adaptable and well suited to both city and country living.",
  },
  {
    slug: "pomeranian",
    name: "Pomeranian",
    group: "Toy",
    image: "/breeds/pomeranian.jpg",
    summary:
      "Bold, lively, and full of personality despite their tiny frame, Pomeranians are one of the most popular teacup breeds in the UK — devoted companions with a lion-like spirit.",
    traits: [
      { label: "Size", value: "Toy / Teacup" },
      { label: "Energy", value: "Moderate" },
      { label: "Coat", value: "Thick, double, fluffy" },
      { label: "Lifespan", value: "12–16 years" },
    ],
    temperament: ["Bold", "Curious", "Loyal", "Lively"],
    care:
      "Pomeranians need daily brushing to maintain their luxurious double coat and regular socialisation from puppyhood. Despite their small size, they enjoy brisk walks and interactive play. They respond well to positive reinforcement training.",
  },
  {
    slug: "maltipom",
    name: "Maltipom",
    group: "Hybrid",
    image: "/breeds/maltipom.jpg",
    summary:
      "A delightful blend of Maltese and Pomeranian, Maltipoms combine the Maltese's gentle temperament with the Pomeranian's playful confidence — a rare and sought-after companion breed.",
    traits: [
      { label: "Size", value: "Toy / Teacup" },
      { label: "Energy", value: "Moderate" },
      { label: "Coat", value: "Soft, fluffy" },
      { label: "Lifespan", value: "12–15 years" },
    ],
    temperament: ["Gentle", "Playful", "Affectionate", "Confident"],
    care:
      "Maltipoms require regular grooming to keep their soft coat tangle-free and gentle daily exercise to stay happy. They are adaptable to apartment life and form strong bonds with their owners.",
  },
  {
    slug: "yorkie",
    name: "Yorkshire Terrier",
    group: "Toy",
    image: "/breeds/yorkie.jpg",
    summary:
      "One of Britain's most beloved toy breeds, Yorkshire Terriers are spirited, affectionate companions with a silky coat and larger-than-life personality that wins hearts across the UK.",
    traits: [
      { label: "Size", value: "Toy / Teacup" },
      { label: "Energy", value: "Moderate" },
      { label: "Coat", value: "Fine, silky, low-shed" },
      { label: "Lifespan", value: "13–16 years" },
    ],
    temperament: ["Spirited", "Affectionate", "Curious", "Brave"],
    care:
      "Yorkshire Terriers need daily brushing to maintain their fine, silky coat and regular trimming by a professional groomer. They enjoy short daily walks and thrive with consistent, gentle training. Despite their size, they have a bold terrier spirit.",
  },
  {
    slug: "mauzer",
    name: "Mauzer",
    group: "Hybrid",
    image: "/breeds/mauzer.jpg",
    summary:
      "A spirited cross between the Maltese and Miniature Schnauzer, Mauzers inherit the Maltese's gentle nature and the Schnauzer's intelligence — an energetic, loyal companion well suited to UK family life.",
    traits: [
      { label: "Size", value: "Small" },
      { label: "Energy", value: "Moderate–High" },
      { label: "Coat", value: "Soft to wiry, low-shed" },
      { label: "Lifespan", value: "12–15 years" },
    ],
    temperament: ["Intelligent", "Loyal", "Energetic", "Friendly"],
    care:
      "Mauzers benefit from daily walks and mental stimulation through training and play. Their low-shedding coat needs regular brushing and occasional professional grooming. They are quick learners and thrive with positive, consistent training.",
  },
]

export const guides: Guide[] = [
  {
    slug: "choosing-the-right-breed",
    title: "Choosing the Right Breed for Your Family",
    category: "Getting Started",
    excerpt:
      "Understand how energy levels, living space, and lifestyle shape the right match between a breed and your household.",
    image: "/guides/choosing-breed.png",
    readTime: "6 min read",
  },
  {
    slug: "preparing-for-a-puppy",
    title: "Preparing Your Home for a New Puppy",
    category: "Preparation",
    excerpt:
      "A practical checklist for setting up a safe, comfortable space before your puppy arrives.",
    image: "/guides/preparing.png",
    readTime: "5 min read",
  },
  {
    slug: "questions-to-ask",
    title: "Questions to Ask Before You Commit",
    category: "Guidance",
    excerpt:
      "The important questions that help you make an informed, confident decision about a puppy.",
    image: "/guides/questions.png",
    readTime: "7 min read",
  },
  {
    slug: "health-and-care",
    title: "Health & Care in the First Months",
    category: "Health",
    excerpt:
      "What to expect from early veterinary care, nutrition, and everyday wellbeing.",
    image: "/guides/health-care.png",
    readTime: "8 min read",
  },
]

export const navLinks = [
  { label: "Puppies", href: "/puppies" },
  { label: "Breeds", href: "/breeds" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Buyer Guide", href: "/guides" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function formatPrice(price: number | null): string {
  if (price === null) return "Enquire for price"
  return `$${price.toLocaleString("en-GB")}`
}
