export type EditorialPhoto = {
  src: string;
  alt: string;
  position?: string;
  credit: string;
  source: string;
};

export const instagram = {
  profile: "https://www.instagram.com/chefodigowa/",
  team: "https://www.instagram.com/p/DfX2ZY6CaTM/",
  perch: "https://www.instagram.com/p/Df1c4bdjIQq/",
  plate: "https://www.instagram.com/p/DfkyoBLxFzS/",
  bakers: "https://www.instagram.com/p/DfcdiRDlxpG/",
} as const;

export const references = {
  biodiversity: "https://sdg2advocacyhub.org/latest/fueling-the-future-sdg2-advocacy-hub-at-unfss4/",
  culinaryVillage: "https://sdg2advocacyhub.org/latest/at-afsf-chefs-manifesto-showscased-what-africas-food-future-tastes-like/",
  profile: "https://sdg2advocacyhub.org/latest/chefs-on-a-mission-connecting-convening-and-catalysing-change-from-the-farm-to-the-plate/",
  homaBay: "https://www.tuko.co.ke/people/family/630937-how-a-scholarship-changed-a-kenyan-mans-life-led-serve-heads-state/",
  marcusAddis: "https://www.bonappetit.com/story/marcus-samuelsson-comes-home-ethiopia-restaurant-legacy",
  kinche: "https://sdg2advocacyhub.org/latest/ethiopian-kinche-cracked-barley-porridge/",
} as const;

export const photos = {
  portrait: {
    src: "/images/odi/portrait.webp",
    alt: "Chef Odi holding a colourful platter and smiling at Marcus Addis",
    position: "center 68%",
    credit: "Chefs’ Manifesto / SDG2 Advocacy Hub",
    source: references.biodiversity,
  },
  atThePass: {
    src: "/images/odi/at-the-pass.webp",
    alt: "Chef Odi and the Marcus Addis team tasting dishes together during service preparation",
    position: "50% 60%",
    credit: "@chefodigowa on Instagram",
    source: instagram.team,
  },
  testKitchen: {
    src: "/images/odi/test-kitchen.webp",
    alt: "Chef Odi and Marcus Samuelsson working together at a counter in the Marcus Addis kitchen",
    position: "50% 65%",
    credit: "@chefodigowa on Instagram",
    source: instagram.team,
  },
  team: {
    src: "/images/odi/marcus-addis-team.webp",
    alt: "The Marcus Addis kitchen team together in front of a brightly painted mural",
    position: "50% 52%",
    credit: "@chefodigowa on Instagram",
    source: instagram.team,
  },
  demo: {
    src: "/images/odi/culinary-village.webp",
    alt: "Chef Odi in his red jacket demonstrating ingredients at the Culinary Village in Kigali",
    position: "50% 63%",
    credit: "Chefs’ Manifesto / SDG2 Advocacy Hub",
    source: references.culinaryVillage,
  },
  perch: {
    src: "/images/odi/nile-perch.webp",
    alt: "Chef Odi’s plated Nile perch with greens and vegetables in a shallow rose-coloured bowl",
    position: "50% 58%",
    credit: "@chefodigowa on Instagram",
    source: instagram.perch,
  },
  colourfulPlate: {
    src: "/images/odi/colourful-plate.webp",
    alt: "Colourful Ethiopian dishes, greens, grains and vegetables on a shared platter",
    position: "50% 50%",
    credit: "@chefodigowa on Instagram",
    source: instagram.plate,
  },
  bakers: {
    src: "/images/odi/young-bakers.webp",
    alt: "Chef Odi with fellow judges and speakers at Ethiopia’s Cake Decoration Festival",
    position: "50% 56%",
    credit: "@chefodigowa on Instagram",
    source: instagram.bakers,
  },
  biodiversity: {
    src: "/images/odi/biodiversity-bites.webp",
    alt: "A shared platter of heritage crops prepared for the Biodiversity Bites breakfast in Addis Ababa",
    credit: "Chefs’ Manifesto / SDG2 Advocacy Hub",
    source: references.biodiversity,
    position: "50% 60%",
  },
  kinche: {
    src: "/images/odi/kinche.webp",
    alt: "A bowl of cracked-barley kinche with green chilli and coriander",
    credit: "Chefs’ Manifesto / SDG2 Advocacy Hub",
    source: references.kinche,
    position: "65% 50%",
  },
} as const satisfies Record<string, EditorialPhoto>;

export type FieldStory = {
  label: string;
  title: string;
  description: string;
  photo: EditorialPhoto;
};

export const fieldStories = [
  {
    label: "01 / In the kitchen",
    title: "At the pass in Addis",
    description: "Cooking, tasting and trading ideas with Marcus Samuelsson and the Marcus Addis team.",
    photo: photos.atThePass,
  },
  {
    label: "02 / On the plate",
    title: "Local ingredients, new ways",
    description: "Nile perch, gomen, kinche and tamarind: ingredients with a place and a story behind them.",
    photo: photos.perch,
  },
  {
    label: "03 / In the community",
    title: "Cooking for the future",
    description: "At Kigali’s Culinary Village, Odi demonstrated what teff, sorghum and millet can do on a contemporary plate.",
    photo: photos.demo,
  },
] satisfies FieldStory[];
