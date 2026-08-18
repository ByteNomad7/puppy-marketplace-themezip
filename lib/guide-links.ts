import type { Breed, Guide, Puppy } from "@/lib/data"

export type ContextualGuideLink = {
  slug: string
  reason: string
  contextualRelevance: "high" | "medium"
}

const breedGuideRules: Record<string, ContextualGuideLink[]> = {
  Toy: [
    {
      slug: "choosing-the-right-breed",
      reason: "breed selection and lifestyle fit",
      contextualRelevance: "high",
    },
    {
      slug: "questions-to-ask",
      reason: "questions to ask before viewing or committing",
      contextualRelevance: "high",
    },
    {
      slug: "preparing-for-a-puppy",
      reason: "practical preparation for bringing home a puppy",
      contextualRelevance: "medium",
    },
  ],
  Hybrid: [
    {
      slug: "choosing-the-right-breed",
      reason: "comparing temperament, energy, and coat commitments",
      contextualRelevance: "high",
    },
    {
      slug: "puppy-training-basics",
      reason: "early training and socialisation foundations",
      contextualRelevance: "medium",
    },
    {
      slug: "questions-to-ask",
      reason: "questions to ask about parents and early life",
      contextualRelevance: "high",
    },
  ],
  "Non-Sporting": [
    {
      slug: "choosing-the-right-breed",
      reason: "matching a companion breed to the household",
      contextualRelevance: "high",
    },
    {
      slug: "health-and-care",
      reason: "early veterinary care and everyday wellbeing",
      contextualRelevance: "medium",
    },
    {
      slug: "questions-to-ask",
      reason: "evidence and documentation questions",
      contextualRelevance: "high",
    },
  ],
  Terrier: [
    {
      slug: "questions-to-ask",
      reason: "questions to ask before committing",
      contextualRelevance: "high",
    },
    {
      slug: "puppy-training-basics",
      reason: "reward-based training and recall foundations",
      contextualRelevance: "medium",
    },
    {
      slug: "preparing-for-a-puppy",
      reason: "setting up a safe home before collection",
      contextualRelevance: "medium",
    },
  ],
  Hound: [
    {
      slug: "choosing-the-right-breed",
      reason: "understanding exercise and lifestyle fit",
      contextualRelevance: "high",
    },
    {
      slug: "questions-to-ask",
      reason: "questions about parents and health documentation",
      contextualRelevance: "high",
    },
    {
      slug: "health-and-care",
      reason: "early care, feeding, and veterinary routines",
      contextualRelevance: "medium",
    },
  ],
}

const defaultBreedGuides: ContextualGuideLink[] = [
  {
    slug: "choosing-the-right-breed",
    reason: "breed selection and household fit",
    contextualRelevance: "high",
  },
  {
    slug: "questions-to-ask",
    reason: "questions to ask before committing",
    contextualRelevance: "high",
  },
  {
    slug: "preparing-for-a-puppy",
    reason: "practical preparation before collection",
    contextualRelevance: "medium",
  },
]

export function getBreedGuideLinks(breed: Breed): ContextualGuideLink[] {
  return breedGuideRules[breed.group] ?? defaultBreedGuides
}

export function getPuppyGuideLinks(puppy: Puppy): ContextualGuideLink[] {
  const contextGuide =
    puppy.ageWeeks <= 12
      ? {
          slug: "preparing-for-a-puppy",
          reason: "preparing for a young puppy joining the household",
          contextualRelevance: "high" as const,
        }
      : {
          slug: "puppy-training-basics",
          reason: "building training habits with an older puppy",
          contextualRelevance: "high" as const,
        }

  return [
    {
      slug: "questions-to-ask",
      reason: "questions to ask before viewing or committing",
      contextualRelevance: "high",
    },
    {
      slug: "health-and-care",
      reason: "early care and veterinary routines",
      contextualRelevance: "high",
    },
    contextGuide,
  ]
}

export function resolveGuideLinks(
  guides: Guide[],
  links: ContextualGuideLink[],
): Guide[] {
  return links
    .map((link) => guides.find((guide) => guide.slug === link.slug))
    .filter((guide): guide is Guide => Boolean(guide))
}

const relatedGuideSlugs: Record<string, string[]> = {
  "choosing-the-right-breed": ["preparing-for-a-puppy", "questions-to-ask", "puppy-training-basics"],
  "preparing-for-a-puppy": ["choosing-the-right-breed", "puppy-training-basics", "health-and-care"],
  "questions-to-ask": ["choosing-the-right-breed", "health-and-care", "pet-insurance-guide"],
  "puppy-training-basics": ["preparing-for-a-puppy", "health-and-care", "questions-to-ask"],
  "pet-insurance-guide": ["health-and-care", "questions-to-ask", "travelling-with-your-puppy"],
  "travelling-with-your-puppy": ["preparing-for-a-puppy", "health-and-care", "pet-insurance-guide"],
  "health-and-care": ["pet-insurance-guide", "puppy-training-basics", "questions-to-ask"],
}

export function getRelatedGuideSlugs(slug: string): string[] {
  return relatedGuideSlugs[slug] ?? []
}

// Only the questions guide explicitly names a breed currently represented in
// the commercial library. Other guides link to the breed hub rather than
// forcing an unsupported breed-specific relationship.
const guideBreedSlugs: Record<string, string[]> = {
  "questions-to-ask": ["king-charles"],
}

export function getGuideBreedSlugs(slug: string): string[] {
  return guideBreedSlugs[slug] ?? []
}

export function getRelatedBreeds(breed: Breed, breeds: Breed[]): Breed[] {
  return breeds
    .filter((candidate) => candidate.slug !== breed.slug && candidate.group === breed.group)
    .slice(0, 3)
}