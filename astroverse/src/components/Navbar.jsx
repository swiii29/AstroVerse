import {
  Home,
  Telescope,
  Moon,
  Rocket,
  ArrowUpRight,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const logo = "/logo.png";

function Navbar() {
  const location = useLocation();

  const links = [
    {
      name: "Explore",
      path: "/",
      icon: Home,
    },
    {
      name: "CosmoScope",
      path: "/cosmoscope",
      icon: Telescope,
    },
    {
      name: "LunaBase",
      path: "/lunabase",
      icon: Moon,
    },
    {
      name: "Missions",
      path: "/missions",
      icon: Rocket,
    },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-6">
      <nav
        className="
          mx-auto flex max-w-[1900px] items-center
          rounded-[24px]
          border border-white/[0.10]
          bg-[#050816]/80
          px-4 py-3
          shadow-[0_0_40px_rgba(139,92,246,0.08)]
          backdrop-blur-2xl
          md:px-7
        "
      >
        {/* LOGO */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3"
        >
          <div
            className="
              relative flex h-12 w-12 items-center justify-center
              overflow-hidden rounded-[16px]
              border border-white/10
              bg-white/[0.04]
              shadow-[0_0_25px_rgba(168,85,247,0.12)]
              transition duration-300
              group-hover:border-purple-400/30
              group-hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]
            "
          >
            <img
              src={logo}
              alt="AstroVerse"
              className="h-10 w-10 object-contain"
            />
          </div>

          <div className="hidden sm:block">
            <div className="text-[21px] font-bold tracking-tight">
              <span className="text-white">Astro</span>
              <span className="text-purple-400">Verse</span>
            </div>

            <div className="mt-0.5 text-[9px] font-medium tracking-[0.35em] text-slate-500">
              EXPLORE BEYOND
            </div>
          </div>
        </Link>

        {/* NAVIGATION */}
        <div className="mx-auto hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  group relative flex items-center gap-2
                  rounded-full px-5 py-3
                  text-sm font-medium
                  transition-all duration-300
                  ${
                    active
                      ? "bg-purple-500/15 text-white shadow-[0_0_25px_rgba(168,85,247,0.10)]"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }
                `}
              >
                <Icon
                  size={17}
                  strokeWidth={1.8}
                  className={`
                    transition duration-300
                    ${
                      active
                        ? "text-purple-300"
                        : "text-slate-500 group-hover:text-purple-300"
                    }
                  `}
                />

                <span>{link.name}</span>

                {active && (
                  <span
                    className="
                      absolute -bottom-1 left-1/2
                      h-1 w-1
                      -translate-x-1/2
                      rounded-full
                      bg-purple-300
                      shadow-[0_0_10px_rgba(216,180,254,1)]
                    "
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* SIGN IN */}
        <div className="ml-auto flex items-center">
          <div className="mr-4 hidden h-8 w-px bg-white/10 lg:block" />

          <Link
            to="/login"
            className="
              group flex items-center gap-2
              rounded-full
              bg-white
              px-5 py-3
              text-sm font-semibold
              text-slate-950
              shadow-[0_0_25px_rgba(255,255,255,0.08)]
              transition-all duration-300
              hover:scale-[1.03]
              hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]
            "
          >
            <span className="hidden sm:inline">Sign in</span>

            <ArrowUpRight
              size={17}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;