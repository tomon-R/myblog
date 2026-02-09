import { wdxlLubrifontJPN } from "@/components/typography/fonts";
import { Typography } from "@/components/typography/Typography";
import Link from "next/link";

export interface NavigationItem {
  link: string;
  label: string;
}

export interface HeaderProps {
  appName: string;
  navigationItems: NavigationItem[];
}

export default function Header({ appName, navigationItems }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-auto flex h-16 w-[85%] items-center justify-between">
        <Link href="/">
          <Typography
            font={wdxlLubrifontJPN}
            className="text-4xl font-bold tracking-wide"
          >
            {appName}
          </Typography>
        </Link>

        <div className="flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className="text-base text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
