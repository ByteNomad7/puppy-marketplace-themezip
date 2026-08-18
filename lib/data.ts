// Placeholder theme data only. No real inventory, breeders, or claims.
// Used to demonstrate the marketplace theme and reusable components.

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
    slug: "willow",
    name: "Willow",
    breed: "Golden Retriever",
    breedSlug: "golden-retriever",
    sex: "Female",
    ageWeeks: 9,
    location: "Portland, OR",
    price: 2400,
    status: "Available",
    image: "/puppies/puppy-1.png",
    gallery: ["/puppies/puppy-1.png", "/puppies/puppy-1-alt.png", "/puppies/puppy-1-alt2.png"],
  },
  {
    slug: "hazel",
    name: "Hazel",
    breed: "Cavalier King Charles",
    breedSlug: "cavalier-king-charles",
    sex: "Female",
    ageWeeks: 10,
    location: "Austin, TX",
    price: 2100,
    status: "Available",
    image: "/puppies/puppy-2.png",
    gallery: ["/puppies/puppy-2.png"],
  },
  {
    slug: "cooper",
    name: "Cooper",
    breed: "Labrador Retriever",
    breedSlug: "labrador-retriever",
    sex: "Male",
    ageWeeks: 8,
    location: "Denver, CO",
    price: 1950,
    status: "Reserved",
    image: "/puppies/puppy-3.png",
    gallery: ["/puppies/puppy-3.png"],
  },
  {
    slug: "biscuit",
    name: "Biscuit",
    breed: "French Bulldog",
    breedSlug: "french-bulldog",
    sex: "Male",
    ageWeeks: 11,
    location: "Seattle, WA",
    price: 3200,
    status: "Available",
    image: "/puppies/puppy-4.png",
    gallery: ["/puppies/puppy-4.png"],
  },
  {
    slug: "sable",
    name: "Sable",
    breed: "Border Collie",
    breedSlug: "border-collie",
    sex: "Female",
    ageWeeks: 9,
    location: "Boise, ID",
    price: null,
    status: "Coming Soon",
    image: "/puppies/puppy-5.png",
    gallery: ["/puppies/puppy-5.png"],
  },
  {
    slug: "juniper",
    name: "Juniper",
    breed: "Poodle",
    breedSlug: "poodle",
    sex: "Female",
    ageWeeks: 10,
    location: "Madison, WI",
    price: 2600,
    status: "Available",
    image: "/puppies/puppy-6.png",
    gallery: ["/puppies/puppy-6.png"],
  },
]

export const breeds: Breed[] = [
  {
    slug: "golden-retriever",
    name: "Golden Retriever",
    group: "Sporting",
    image: "/breeds/golden-retriever.png",
    summary:
      "Friendly, intelligent, and devoted, Golden Retrievers are among the most popular family companions for their gentle nature and eagerness to please.",
    traits: [
      { label: "Size", value: "Large" },
      { label: "Energy", value: "High" },
      { label: "Coat", value: "Medium, double" },
      { label: "Lifespan", value: "10–12 years" },
    ],
    temperament: ["Gentle", "Affectionate", "Trainable", "Sociable"],
    care:
      "Golden Retrievers thrive with daily exercise, mental stimulation, and regular grooming to manage their double coat. Early socialisation and positive training help this eager breed flourish.",
  },
  {
    slug: "labrador-retriever",
    name: "Labrador Retriever",
    group: "Sporting",
    image: "/breeds/labrador.png",
    summary:
      "Outgoing and even-tempered, Labradors are versatile companions known for their loyalty and adaptability to active family life.",
    traits: [
      { label: "Size", value: "Large" },
      { label: "Energy", value: "High" },
      { label: "Coat", value: "Short, dense" },
      { label: "Lifespan", value: "11–13 years" },
    ],
    temperament: ["Loyal", "Playful", "Confident", "Friendly"],
    care:
      "Labradors need consistent activity and a balanced diet to stay healthy. Their short coat is low-maintenance, though they benefit from routine exercise and companionship.",
  },
  {
    slug: "cavalier-king-charles",
    name: "Cavalier King Charles",
    group: "Toy",
    image: "/breeds/cavalier.png",
    summary:
      "Gentle and affectionate lap companions, Cavaliers adapt beautifully to homes of all sizes and love being close to their people.",
    traits: [
      { label: "Size", value: "Small" },
      { label: "Energy", value: "Moderate" },
      { label: "Coat", value: "Silky, medium" },
      { label: "Lifespan", value: "12–15 years" },
    ],
    temperament: ["Gentle", "Adaptable", "Affectionate", "Calm"],
    care:
      "Cavaliers enjoy gentle daily walks and regular grooming of their silky coat. They form strong bonds and prefer not to be left alone for long periods.",
  },
  {
    slug: "french-bulldog",
    name: "French Bulldog",
    group: "Non-Sporting",
    image: "/breeds/french-bulldog.png",
    summary:
      "Charming and easygoing, French Bulldogs are compact companions well suited to apartment living and relaxed households.",
    traits: [
      { label: "Size", value: "Small" },
      { label: "Energy", value: "Moderate" },
      { label: "Coat", value: "Short, smooth" },
      { label: "Lifespan", value: "10–12 years" },
    ],
    temperament: ["Easygoing", "Playful", "Alert", "Affectionate"],
    care:
      "French Bulldogs prefer moderate exercise and cool conditions, as they can be sensitive to heat. Their short coat is easy to maintain with regular care.",
  },
  {
    slug: "border-collie",
    name: "Border Collie",
    group: "Herding",
    image: "/breeds/border-collie.png",
    summary:
      "Highly intelligent and energetic, Border Collies excel with active families who can provide plenty of exercise and mental challenges.",
    traits: [
      { label: "Size", value: "Medium" },
      { label: "Energy", value: "Very high" },
      { label: "Coat", value: "Medium, double" },
      { label: "Lifespan", value: "12–15 years" },
    ],
    temperament: ["Intelligent", "Energetic", "Focused", "Loyal"],
    care:
      "Border Collies need substantial daily exercise and mental engagement. They thrive with training, structured activity, and a job to do.",
  },
  {
    slug: "poodle",
    name: "Poodle",
    group: "Non-Sporting",
    image: "/breeds/poodle.png",
    summary:
      "Elegant and remarkably intelligent, Poodles are trainable, low-shedding companions available in several sizes to suit many homes.",
    traits: [
      { label: "Size", value: "Varies" },
      { label: "Energy", value: "Moderate–High" },
      { label: "Coat", value: "Curly, low-shed" },
      { label: "Lifespan", value: "12–15 years" },
    ],
    temperament: ["Intelligent", "Elegant", "Trainable", "Alert"],
    care:
      "Poodles require regular professional grooming to maintain their curly coat and benefit from consistent training and daily activity.",
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
  return `$${price.toLocaleString("en-US")}`
}
