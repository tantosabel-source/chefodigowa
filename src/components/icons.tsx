import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5h2.2l1.5 4-2 1.4a12 12 0 0 0 6.9 6.9l1.4-2 4 1.5v2.2a2.5 2.5 0 0 1-2.7 2.5C10.6 19.4 4.6 13.4 4 6.2A2.5 2.5 0 0 1 6.5 3.5Z" />
    </Svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function Users(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16.5 6.2a3 3 0 0 1 0 5.6" />
      <path d="M18 20a5 5 0 0 0-2-4" />
    </Svg>
  );
}

export function Flame(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5c3 3 5 5.2 5 8.4a5 5 0 0 1-10 0c0-2 .8-3.6 2.2-5.2.4 1.5 1.3 2.3 2.3 2.5.6-2 .4-3.9.5-5.7Z" />
    </Svg>
  );
}

export function Leaf(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 4c-8 0-13 3.4-13 9a4 4 0 0 0 4 4c5.6 0 9-5 9-13Z" />
      <path d="M4 20c1.5-5 4-8 9-10" />
    </Svg>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 13.7 9l5.3 1.7-5.3 1.8L12 18l-1.7-5.5L5 10.7 10.3 9 12 3.5Z" />
      <path d="M18.5 16.5 19 18l1.5.5-1.5.5-.5 1.5-.5-1.5L17 18.5l1.5-.5.5-1.5Z" />
    </Svg>
  );
}

export function ChefHat(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 12a3.5 3.5 0 0 1-1-6.8 4 4 0 0 1 7.5-1.2 4 4 0 0 1 6.5 3.3A3.5 3.5 0 0 1 18 12" />
      <path d="M6 12v7.5h12V12" />
      <path d="M6 16.5h12" />
    </Svg>
  );
}

export function Search(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Svg>
  );
}

export function Check(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </Svg>
  );
}

export function Close(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function Trash(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13" />
      <path d="M10.5 11v5.5M13.5 11v5.5" />
    </Svg>
  );
}

export function Pencil(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20h4l10-10-4-4L4 16v4Z" />
      <path d="m13.5 5.5 4 4" />
    </Svg>
  );
}

export function Eye(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </Svg>
  );
}

export function EyeOff(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 4l16 16" />
      <path d="M9.8 6A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.7 3.5" />
      <path d="M6.2 7.9A17 17 0 0 0 2.5 12S6 18.5 12 18.5a9 9 0 0 0 3.4-.7" />
    </Svg>
  );
}

export function Lock(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    </Svg>
  );
}

export function LogOut(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 4.5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3" />
      <path d="M15 8l4 4-4 4M19 12H9" />
    </Svg>
  );
}

export function Grid(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </Svg>
  );
}

export function Book(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5.5A2 2 0 0 1 6 3.5h13V19H6a2 2 0 0 0-2 2V5.5Z" />
      <path d="M19 19v1.5H6" />
    </Svg>
  );
}

export function Inbox(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 13.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7.5" />
      <path d="M4 13.5h4l1.5 2.5h5L16 13.5h4V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4.5Z" />
    </Svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function LinkedIn(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <path d="M8 10.5V17M8 7.5v.5M12 17v-3.6a2.4 2.4 0 0 1 4.8 0V17" />
    </Svg>
  );
}

export function YouTube(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="m10.5 9.5 4.5 2.5-4.5 2.5v-5Z" />
    </Svg>
  );
}

export function TikTok(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 3.5v10.2a3.8 3.8 0 1 1-3.8-3.8" />
      <path d="M14 3.5c.4 2.4 2 4 4.5 4.2" />
    </Svg>
  );
}

export function Facebook(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14.5 21v-7h2.6l.5-3h-3.1V9.2c0-.9.3-1.5 1.6-1.5h1.6V5.1A21 21 0 0 0 15.4 5c-2.4 0-4 1.4-4 4.1V11H8.7v3h2.7v7" />
    </Svg>
  );
}

export const socialIcons = {
  instagram: Instagram,
  linkedin: LinkedIn,
  facebook: Facebook,
  youtube: YouTube,
  tiktok: TikTok,
} as const;
