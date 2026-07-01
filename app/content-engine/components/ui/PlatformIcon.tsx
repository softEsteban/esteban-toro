import {
  Linkedin,
  Instagram,
  Youtube,
  Music2,
  type LucideIcon,
} from "lucide-react";

// Lucide has no TikTok glyph — Music2 reads as the closest.
export const PLATFORM_ICON: Record<string, LucideIcon> = {
  TikTok: Music2,
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Reels: Instagram,
  "YouTube Shorts": Youtube,
  Shorts: Youtube,
  YouTube: Youtube,
};

export function PlatformIcon({
  platform,
  className = "h-4 w-4",
}: {
  platform: string;
  className?: string;
}) {
  const Icon = PLATFORM_ICON[platform] ?? Music2;
  return <Icon className={className} />;
}
