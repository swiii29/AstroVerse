import {
  ArrowUpRight,
  Orbit,
  Telescope,
  Rocket,
  Moon,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* HERO */}

      <section className="px-5 pb-8 pt-28 md:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem]">

          <img
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2200&q=90"
            alt="Earth from space"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/10" />

          <div className="relative z-10 flex min-h-[650px] items-end px-7 py-12 md:px-14 md:py-16">

            <div className="max-w-3xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                <Orbit size={15} />
                ASTROVERSE
              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-tight md:text-7xl lg:text-8xl">
                Explore
                <br />
                <span className="text-cyan-300">
                  beyond
                </span>
                <br />
                our world.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-slate-200 md:text-lg">
                Explore celestial objects, record what you observe,
                discover real space missions, and experience the
                universe through AstroVerse.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  to="/astroatlas"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  Start exploring

                  <ArrowUpRight
                    size={18}
                    className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>

                <Link
                  to="/missions"
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-semibold backdrop-blur-md transition hover:bg-white/20"
                >
                  Mission control
                  <Rocket size={18} />
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* INTRO STRIP */}

      <section className="px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">

          <InfoCard
            number="09+"
            title="Celestial Objects"
            text="Explore planets, moons, stars and exoplanets."
          />

          <InfoCard
            number="04"
            title="Space Missions"
            text="Track major missions across our solar system."
          />

          <InfoCard
            number="01"
            title="Mission Control"
            text="Experience a simulated lunar-base environment."
          />

        </div>
      </section>


      {/* ASTROATLAS */}

      <section className="px-5 py-10 md:px-8 md:py-16">

        <div className="mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="01 / ASTROATLAS"
            title="Meet the worlds around us."
            description="Browse planets, moons, stars and exoplanets and discover what makes each one unique."
            link="/astroatlas"
            linkText="Explore Atlas"
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">

            {/* MARS */}

            <SpaceCard
              image="https://assets.science.nasa.gov/dynamicimage/assets/science/missions/hubble/releases/1999/02/STScI-01EVVFMYKG85KG9GRMW37MWW9M_color.jpg?crop=faces%2Cfocalpoint&fit=clip&h=2400&w=3000"
              title="Mars"
              label="PLANET"
              text="The red world and one of humanity's most studied neighbours."
              link="/astroatlas"
            />

            {/* JUPITER */}

            <SpaceCard
              image="https://images.unsplash.com/photo-1630839437035-dac17da580d0?auto=format&fit=crop&w=1200&q=85"
              title="Jupiter"
              label="PLANET"
              text="A massive gas giant surrounded by a fascinating family of moons."
              link="/astroatlas"
            />

            {/* DEEP SPACE */}

            <SpaceCard
              image="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=85"
              title="Deep Space"
              label="EXPLORE"
              text="Look beyond familiar worlds and discover the objects of our universe."
              link="/astroatlas"
            />

          </div>

        </div>

      </section>


      {/* COSMOSCOPE */}

      <section className="px-5 py-10 md:px-8 md:py-16">

        <div className="mx-auto max-w-7xl">

          <div className="relative min-h-[500px] overflow-hidden rounded-[2rem]">

            <img
              src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2200&q=90"
              alt="Deep space"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/55" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

            <div className="relative z-10 flex min-h-[500px] items-center px-7 py-12 md:px-14">

              <div className="max-w-2xl">

                <div className="mb-5 flex items-center gap-3 text-cyan-300">

                  <Telescope size={22} />

                  <span className="text-sm font-semibold tracking-[0.25em]">
                    COSMOSCOPE
                  </span>

                </div>

                <h2 className="text-4xl font-bold leading-tight md:text-6xl">

                  Look up.

                  <br />

                  <span className="text-cyan-300">
                    Record what you see.
                  </span>

                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 md:text-lg">
                  Build your own astronomical observation journal
                  and explore observations shared by other explorers.
                </p>

                <Link
                  to="/cosmoscope"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-semibold text-slate-950"
                >
                  Open CosmoScope

                  <ChevronRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* LUNABASE */}

      <section className="px-5 py-10 md:px-8 md:py-16">

        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a1020] lg:grid-cols-2">

          <div className="relative min-h-[430px]">

            <img
              src="https://images.unsplash.com/photo-1447433819943-74a20887a81e?auto=format&fit=crop&w=1600&q=85"
              alt="Moon surface"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-7 left-7 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                <Moon size={22} />
              </div>

              <span className="font-semibold">
                Lunar Base
              </span>

            </div>

          </div>

          <div className="flex items-center p-8 md:p-12">

            <div>

              <p className="text-sm font-semibold tracking-[0.25em] text-purple-300">
                LUNABASE
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">

                A base on the

                <span className="text-purple-300">
                  {" "}Moon.
                </span>

              </h2>

              <p className="mt-6 leading-7 text-slate-400">
                Step into a simulated lunar mission-control
                environment. Monitor crew, resources, systems,
                mission progress and daily operations.
              </p>

              <Link
                to="/lunabase"
                className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold transition hover:bg-white/10"
              >
                Enter LunaBase

                <ArrowUpRight
                  size={18}
                  className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* MISSIONS — REDESIGNED */}

      <section className="px-5 py-10 md:px-8 md:py-16">

        <div className="mx-auto max-w-7xl">

          <div className="group relative min-h-[430px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#080a18]">

            {/* PURPLE GLOW */}

            <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[120px]" />

            {/* CYAN GLOW */}

            <div className="absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[110px]" />

            {/* ORBIT RINGS */}

            <div className="absolute -right-[120px] -top-[120px] h-[520px] w-[520px] rounded-full border border-purple-400/10" />

            <div className="absolute -right-[60px] -top-[60px] h-[400px] w-[400px] rounded-full border border-cyan-300/10" />

            <div className="absolute right-[30px] top-[30px] h-[260px] w-[260px] rounded-full border border-white/[0.04]" />


            {/* CONTENT */}

            <div className="relative z-10 flex min-h-[430px] flex-col justify-between p-8 md:p-12 lg:p-16">

              {/* TOP */}

              <div className="flex items-center justify-between">

                <div className="inline-flex items-center gap-3 rounded-full border border-purple-300/20 bg-purple-400/[0.06] px-4 py-2.5 backdrop-blur-md">

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-400/10 text-purple-300">

                    <Rocket size={15} />

                  </div>

                  <span className="text-[11px] font-bold tracking-[0.3em] text-purple-200">
                    MISSION CONTROL
                  </span>

                </div>


                <div className="hidden items-center gap-2 text-xs text-slate-600 md:flex">

                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />

                  SPACE EXPLORATION

                </div>

              </div>


              {/* MAIN */}

              <div className="mt-16 max-w-3xl">

                <p className="mb-4 text-sm font-medium tracking-[0.2em] text-slate-500">
                  THE JOURNEY CONTINUES
                </p>

                <h2 className="text-5xl font-black leading-[0.92] tracking-tight text-white md:text-7xl lg:text-8xl">

                  Go beyond

                  <br />

                  <span className="bg-gradient-to-r from-purple-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                    Earth.
                  </span>

                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 md:text-lg">
                  Follow humanity's most ambitious missions,
                  discover distant worlds, and see where exploration
                  takes us next.
                </p>

              </div>


              {/* BOTTOM */}

              <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                <div className="flex gap-8">

                  <div>

                    <p className="text-2xl font-bold text-white">
                      04
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-600">
                      Missions
                    </p>

                  </div>


                  <div>

                    <p className="text-2xl font-bold text-white">
                      ∞
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-600">
                      Possibilities
                    </p>

                  </div>

                </div>


                <Link
                  to="/missions"
                  className="group/button inline-flex w-fit items-center gap-4 rounded-full border border-white/10 bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(168,85,247,0.18)]"
                >

                  Explore missions

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white transition-transform duration-300 group-hover/button:translate-x-1">

                    <ArrowUpRight size={16} />

                  </span>

                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="px-5 pb-10 pt-16 md:px-8">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center">

          <div>

            <div className="flex items-center gap-2 text-xl font-bold">

              <Orbit
                size={20}
                className="text-cyan-300"
              />

              Astro<span className="text-purple-300">
                Verse
              </span>

            </div>

            <p className="mt-2 text-sm text-slate-600">
              Explore. Observe. Discover.
            </p>

          </div>


          <div className="flex items-center gap-2 text-sm text-slate-500">

            <span>✦</span>

            <span>
              Crafted for the cosmos ·{" "}

              <span className="font-semibold text-purple-300">
                swiii29
              </span>

            </span>

          </div>

        </div>

      </footer>

    </main>
  );
}


/* ----------------------------- */
/* INFO CARD */
/* ----------------------------- */

function InfoCard({
  number,
  title,
  text,
}) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/20 hover:bg-white/[0.055]">

      <p className="text-3xl font-black text-cyan-300">
        {number}
      </p>

      <h3 className="mt-3 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>

  );
}


/* ----------------------------- */
/* SECTION HEADING */
/* ----------------------------- */

function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  linkText,
}) {

  return (

    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

      <div className="max-w-2xl">

        <p className="text-xs font-semibold tracking-[0.3em] text-cyan-300">
          {eyebrow}
        </p>

        <h2 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
          {title}
        </h2>

        <p className="mt-4 leading-7 text-slate-500">
          {description}
        </p>

      </div>

      <Link
        to={link}
        className="group flex w-fit items-center gap-2 text-sm font-semibold text-slate-300"
      >

        {linkText}

        <ArrowUpRight
          size={17}
          className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
        />

      </Link>

    </div>

  );
}


/* ----------------------------- */
/* SPACE CARD */
/* ----------------------------- */

function SpaceCard({
  image,
  title,
  label,
  text,
  link,
}) {

  return (

    <Link
      to={link}
      className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20"
    >

      <div className="relative h-72 overflow-hidden">

        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute bottom-5 left-5">

          <p className="text-xs font-semibold tracking-[0.25em] text-cyan-300">
            {label}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {title}
          </h3>

        </div>

      </div>

      <div className="p-5">

        <p className="text-sm leading-6 text-slate-500">
          {text}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-300">

          Explore

          <ArrowUpRight
            size={16}
            className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
          />

        </div>

      </div>

    </Link>

  );
}

export default Home;