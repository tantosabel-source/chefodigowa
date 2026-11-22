import { instagram, photos, references } from "@/lib/photo-stories";

export const site = {
  chef: "Chefodigowa",
  fullName: "Odondise Gowa Omotto",
  role: "Chef · Food and nutrition advocate · Culinary storyteller",
  tagline: "African ingredients. Global technique. A place for everyone at the table.",
  email: process.env.NEXT_PUBLIC_CHEF_EMAIL?.trim() ?? "",
  phone: process.env.NEXT_PUBLIC_CHEF_PHONE?.trim() ?? "",
  phoneHref: (process.env.NEXT_PUBLIC_CHEF_PHONE ?? "").replace(/[^+\d]/g, ""),
  location: "Addis Ababa, Ethiopia",
  handle: "@chefodigowa",
  socials: [
    { label: "Instagram", handle: "@chefodigowa", href: instagram.profile, icon: "instagram" as const },
    { label: "TikTok", handle: "@chefodigowa", href: "https://www.tiktok.com/@chefodigowa", icon: "tiktok" as const },
    { label: "Facebook", handle: "@chefodigowa", href: "https://www.facebook.com/chefodigowa", icon: "facebook" as const },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Recipes & Journal", href: "/recipes" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  places: ["Kenya", "Qatar", "Bahrain", "Bermuda", "The Bahamas", "United States", "Ethiopia"],
} as const;

export const imageBank = {
  heroPortrait: photos.portrait.src,
  chefStory: photos.atThePass.src,
  chefCooking: photos.testKitchen.src,
  tableSpread: photos.colourfulPlate.src,
  chefDemo: photos.demo.src,
  kinche: photos.kinche.src,
  nilePerch: photos.perch.src,
  jollof:
    "https://images.pexels.com/photos/13915043/pexels-photo-13915043.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1100",
  fish:
    "https://images.pexels.com/photos/16627892/pexels-photo-16627892.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1100",
  spices:
    "https://images.pexels.com/photos/5769805/pexels-photo-5769805.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1100",
  grainBowl:
    "https://images.pexels.com/photos/2741448/pexels-photo-2741448.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1100",
  salad:
    "https://images.pexels.com/photos/5156052/pexels-photo-5156052.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1100",
  dessert:
    "https://images.pexels.com/photos/33523067/pexels-photo-33523067.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1100",
  coffee:
    "https://images.pexels.com/photos/12884335/pexels-photo-12884335.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1100",
} as const;

export const services = [
  { number: "01", title: "Recipe & menu development", description: "Build a menu around ingredients with a story, from the first tasting to a recipe your team can put into service." },
  { number: "02", title: "Dining & collaborations", description: "Private dinners, pop-ups and guest-chef projects that bring an African perspective to the table." },
  { number: "03", title: "Workshops & live demos", description: "Hands-on cooking with heritage grains, legumes and seasonal produce, for teams and communities." },
  { number: "04", title: "Food & nutrition advocacy", description: "Talks and culinary storytelling that connect growers, kitchens and the people we cook for." },
];

export const timeline = [
  { marker: "The starting point", title: "Homa Bay, Kenya", description: "A scholarship to study culinary arts opened a path from Homa Bay into professional kitchens.", source: references.homaBay },
  { marker: "Beyond borders", title: "The Gulf, the Caribbean and the US", description: "Kitchens in Qatar, Bahrain, Bermuda, the Bahamas and the United States shaped Odi’s craft, from the discipline of service to the ingredients that make each place distinct." },
  { marker: "Since 2017", title: "Alongside Marcus Samuelsson", description: "The collaboration continues in Addis Ababa, with dishes such as their hand-cut teff tagliatelle at Marcus Addis.", source: references.marcusAddis },
  { marker: "Today", title: "Addis Ababa, Ethiopia", description: "Odi leads the kitchen at Marcus Addis and works with the Chefs’ Manifesto to bring African crops and the people who grow them into the spotlight.", source: references.biodiversity },
];

export const advocacy = [
  { date: "Addis Ababa · 2025", title: "Biodiversity Bites", description: "A breakfast at the UN Food Systems Summit +4 put locally grown ingredients, from zebra beans to teff injera, at the centre of the conversation.", source: references.biodiversity, publisher: "SDG2 Advocacy Hub" },
  { date: "Kigali · 2026", title: "Culinary Village", description: "Odi turned sorghum, millet and teff into crisp croquettes with isombe, showing what resilient crops can do in a contemporary kitchen.", source: references.culinaryVillage, publisher: "Chefs’ Manifesto" },
  { date: "Ethiopia · 2026", title: "The next generation of bakers", description: "As a judge at the Cake Decoration Festival, Odi met young bakers making creative use of local grains like teff, barley, sorghum and millet.", source: instagram.bakers, publisher: "@chefodigowa" },
];
