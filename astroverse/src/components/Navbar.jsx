import { useEffect, useState } from "react";

import {
  Home,
  Telescope,
  Moon,
  Rocket,
  ArrowUpRight,
  User,
  LogOut,
} from "lucide-react";

import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("astroverseUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [showUserMenu, setShowUserMenu] = useState(false);

  /*
    Listen for login/logout changes
    so the navbar updates immediately.
  */
  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const savedUser = localStorage.getItem("astroverseUser");
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener(
      "astroverseAuthChanged",
      handleAuthChange
    );

    return () => {
      window.removeEventListener(
        "astroverseAuthChanged",
        handleAuthChange
      );
    };
  }, []);

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

  const getUserName = () => {
    if (!user) return "";

    return (
      user.name ||
      user.username ||
      user.fullName ||
      user.email?.split("@")[0] ||
      "Explorer"
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("astroverseToken");
    localStorage.removeItem("astroverseUser");

    setUser(null);
    setShowUserMenu(false);

    window.dispatchEvent(
      new Event("astroverseAuthChanged")
    );
  };

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

        {/* ================= LOGO ================= */}

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
              <span className="text-white">
                Astro
              </span>

              <span className="text-purple-400">
                Verse
              </span>
            </div>

            <div className="mt-0.5 text-[9px] font-medium tracking-[0.35em] text-slate-500">
              EXPLORE BEYOND
            </div>
          </div>
        </Link>


        {/* ================= NAVIGATION ================= */}

        <div className="mx-auto hidden items-center gap-1 md:flex">

          {links.map((link) => {
            const Icon = link.icon;

            const active =
              location.pathname === link.path;

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

                <span>
                  {link.name}
                </span>

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


        {/* ================= RIGHT SIDE ================= */}

        <div className="ml-auto flex items-center">

          <div className="mr-4 hidden h-8 w-px bg-white/10 lg:block" />


          {/* ================= LOGGED IN ================= */}

          {user ? (

            <div className="relative">

              {/* USER BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setShowUserMenu((prev) => !prev)
                }
                className="
                  flex items-center gap-3
                  rounded-full
                  border border-white/10
                  bg-white/[0.05]
                  px-4 py-2.5
                  text-left
                  shadow-[0_0_25px_rgba(168,85,247,0.08)]
                  transition-all duration-300
                  hover:border-purple-400/20
                  hover:bg-white/[0.08]
                "
              >

                {/* User Icon */}

                <div
                  className="
                    flex h-8 w-8 items-center justify-center
                    rounded-full
                    bg-purple-500/15
                    text-purple-300
                    ring-1 ring-purple-400/20
                  "
                >
                  <User size={16} />
                </div>


                {/* User Name */}

                <div className="hidden sm:block">

                  <p className="max-w-[130px] truncate text-sm font-semibold text-white">
                    {getUserName()}
                  </p>

                  <p className="text-[9px] font-medium tracking-[0.15em] text-slate-500">
                    EXPLORER
                  </p>

                </div>

              </button>


              {/* ================= USER DROPDOWN ================= */}

              {showUserMenu && (

                <div
                  className="
                    absolute right-0 top-[calc(100%+10px)]
                    w-52
                    overflow-hidden
                    rounded-2xl
                    border border-white/10
                    bg-[#0b0d1c]/95
                    p-2
                    shadow-[0_15px_50px_rgba(0,0,0,0.45)]
                    backdrop-blur-2xl
                  "
                >

                  {/* Account information */}

                  <div className="px-3 py-2">

                    <p className="text-xs text-slate-500">
                      Signed in as
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-white">
                      {getUserName()}
                    </p>

                  </div>


                  {/* Divider */}

                  <div className="my-1 h-px bg-white/10" />


                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex w-full items-center gap-3
                      rounded-xl
                      px-3 py-2.5
                      text-sm font-medium
                      text-slate-300
                      transition
                      hover:bg-red-500/10
                      hover:text-red-300
                    "
                  >

                    <LogOut size={16} />

                    <span>
                      Logout
                    </span>

                  </button>

                </div>

              )}

            </div>

          ) : (

            /* ================= LOGGED OUT ================= */

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

              <span className="hidden sm:inline">
                Sign in
              </span>

              <ArrowUpRight
                size={17}
                strokeWidth={2.2}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />

            </Link>

          )}

        </div>

      </nav>
    </header>
  );
}

export default Navbar;