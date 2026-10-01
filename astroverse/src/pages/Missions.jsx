import { useEffect, useState } from "react";
import {
  Rocket,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Target,
  Orbit,
  Sparkles,
} from "lucide-react";
import { getMissions } from "../services/api";

/* -------------------------------- */
/* OFFICIAL MISSION LINKS */
/* -------------------------------- */

const officialMissionLinks = {
  "artemis ii":
    "https://www.nasa.gov/mission/artemis-ii/",

  "chandrayaan-4":
    "https://www.isro.gov.in/ISRO_EN/UnionCabinetApprovesIndiasMission.html",

  "europa clipper":
    "https://science.nasa.gov/mission/europa-clipper/",

  "juice":
    "https://www.esa.int/Science_Exploration/Space_Science/Juice",
};

function Missions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMissions = async () => {
      try {
        setLoading(true);

        const data = await getMissions();

        setMissions(data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load missions.");
      } finally {
        setLoading(false);
      }
    };

    loadMissions();
  }, []);

  const activeCount = missions.filter(
    (mission) =>
      mission.status?.toLowerCase() === "active"
  ).length;

  const completedCount = missions.filter(
    (mission) =>
      mission.status?.toLowerCase() === "completed"
  ).length;

  const plannedCount = missions.filter(
    (mission) =>
      mission.status?.toLowerCase() === "planned"
  ).length;

  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* HERO */}

      <section className="px-5 pb-8 pt-28 md:px-8">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem]">

          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src="https://svs.gsfc.nasa.gov/vis/a010000/a014900/a014950/14950_Galaxies_FlyThrough_1080.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-black/65" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />

          <div className="relative z-10 flex min-h-[540px] items-end px-7 py-12 md:px-14 md:py-16">

            <div className="max-w-3xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">

                <Rocket size={15} />

                MISSION CONTROL

              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">

                Beyond
                <br />

                <span className="text-cyan-300">
                  Earth.
                </span>

              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 md:text-lg">
                Explore real space missions, their destinations,
                objectives, progress and current status.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="px-5 py-8 md:px-8">

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">

          <MissionStat
            number={activeCount}
            label="Active missions"
            icon={<Orbit size={20} />}
          />

          <MissionStat
            number={completedCount}
            label="Completed missions"
            icon={<Sparkles size={20} />}
          />

          <MissionStat
            number={plannedCount}
            label="Planned missions"
            icon={<Target size={20} />}
          />

        </div>

      </section>


      {/* MISSION LIST */}

      <section
        id="mission-list"
        className="px-5 py-10 md:px-8 md:py-16"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-8">

            <p className="text-xs font-semibold tracking-[0.3em] text-cyan-300">
              EXPLORE THE MISSIONS
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Journeys beyond Earth.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-500">
              From lunar exploration to distant planetary
              systems, discover the missions shaping space exploration.
            </p>

          </div>


          {/* LOADING */}

          {loading && (

            <div className="flex min-h-[300px] items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.03]">

              <div className="text-center">

                <Orbit
                  size={30}
                  className="mx-auto animate-spin text-cyan-300"
                />

                <p className="mt-4 text-sm text-slate-500">
                  Loading missions...
                </p>

              </div>

            </div>

          )}


          {/* ERROR */}

          {!loading && error && (

            <div className="rounded-[2rem] border border-red-400/20 bg-red-400/5 p-10 text-center">

              <p className="text-red-300">
                {error}
              </p>

            </div>

          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            missions.length === 0 && (

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-14 text-center">

                <Rocket
                  size={30}
                  className="mx-auto text-slate-600"
                />

                <h3 className="mt-5 text-xl font-semibold">
                  No missions available
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Mission data has not been added yet.
                </p>

              </div>

            )}


          {/* MISSIONS */}

          {!loading &&
            !error &&
            missions.length > 0 && (

              <div className="space-y-6">

                {missions.map((mission, index) => (

                  <MissionCard
                    key={mission._id}
                    mission={mission}
                    index={index}
                  />

                ))}

              </div>

            )}

        </div>

      </section>


      {/* -------------------------------- */}
      {/* NEW ASTROVERSE CTA */}
      {/* -------------------------------- */}

      <section className="px-5 py-10 md:px-8 md:py-16">

        <div className="mx-auto max-w-7xl">

          <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#080a18]">

            {/* PURPLE GLOW */}

            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-500/[0.10] blur-3xl" />

            {/* CYAN GLOW */}

            <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-500/[0.06] blur-3xl" />

            {/* TOP ACCENT */}

            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

            <div className="relative z-10 flex min-h-[390px] flex-col justify-between gap-12 p-8 md:p-14 lg:flex-row lg:items-end">

              {/* LEFT */}

              <div className="max-w-2xl">

                {/* LABEL */}

                <div className="mb-7 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-300/20 bg-purple-300/[0.06]">

                    <Rocket
                      size={19}
                      className="text-purple-300"
                    />

                  </div>

                  <div>

                    <p className="text-[10px] font-semibold tracking-[0.35em] text-purple-300">
                      MISSION CONTROL
                    </p>

                    <div className="mt-2 h-px w-10 bg-purple-300/30" />

                  </div>

                </div>


                {/* HEADING */}

                <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">

                  Your next
                  <br />

                  <span className="text-purple-300">
                    mission awaits.
                  </span>

                </h2>


                {/* DESCRIPTION */}

                <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 md:text-lg">

                  Explore destinations, mission objectives
                  and progress across humanity's journey
                  beyond Earth.

                </p>

              </div>


              {/* ROUND BUTTON */}

              <div className="flex shrink-0 justify-start lg:justify-end">

                <a
                  href="#mission-list"
                  aria-label="Explore missions"
                  className="
                    group/button
                    flex h-32 w-32
                    flex-col items-center justify-center
                    rounded-full
                    border border-white/10
                    bg-white/[0.03]
                    shadow-[0_0_40px_rgba(168,85,247,0.05)]
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:border-purple-300/40
                    hover:bg-purple-300/[0.08]
                    hover:shadow-[0_0_50px_rgba(168,85,247,0.15)]
                  "
                >

                  <ArrowUpRight
                    size={25}
                    className="
                      mb-2
                      text-purple-300
                      transition-transform duration-300
                      group-hover/button:-translate-y-1
                      group-hover/button:translate-x-1
                    "
                  />

                  <span className="text-xs font-semibold text-white">
                    Explore
                  </span>

                  <span className="mt-0.5 text-[11px] text-slate-500">
                    missions
                  </span>

                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="px-5 pb-10 pt-8 md:px-8">

        <div className="mx-auto flex max-w-7xl items-center justify-between border-t border-white/10 pt-8">

          <div className="flex items-center gap-2 text-lg font-bold">

            <Orbit
              size={19}
              className="text-cyan-300"
            />

            Astro
            <span className="text-purple-300">
              Verse
            </span>

          </div>

          <p className="text-xs text-slate-600">
            Mission Control
          </p>

        </div>

      </footer>

    </main>
  );
}


/* -------------------------------- */
/* MISSION STAT */
/* -------------------------------- */

function MissionStat({
  number,
  label,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/20 hover:bg-white/[0.055]">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
          {icon}
        </div>

        <span className="text-4xl font-black text-white">
          {number}
        </span>

      </div>

      <p className="mt-5 text-sm text-slate-500">
        {label}
      </p>

    </div>
  );
}


/* -------------------------------- */
/* MISSION CARD */
/* -------------------------------- */

function MissionCard({
  mission,
  index,
}) {
  const status = mission.status?.toLowerCase();

  const statusClasses = {
    active:
      "border-cyan-300/20 bg-cyan-300/10 text-cyan-300",

    completed:
      "border-emerald-300/20 bg-emerald-300/10 text-emerald-300",

    planned:
      "border-purple-300/20 bg-purple-300/10 text-purple-300",
  };

  const missionName =
    mission.name?.trim().toLowerCase();

  const officialLink =
    mission.officialUrl ||
    officialMissionLinks[missionName];

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20">

      <div className="grid lg:grid-cols-[280px_1fr]">

        {/* VISUAL */}

        <div className="relative min-h-[250px] overflow-hidden">

          <img
            src={
              index % 3 === 0
                ? "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=85"
                : index % 3 === 1
                ? "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1200&q=85"
                : "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=85"
            }
            alt={mission.name}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute left-5 top-5">

            <span
              className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                statusClasses[status] ||
                "border-white/10 bg-white/5 text-slate-300"
              }`}
            >
              {mission.status}
            </span>

          </div>

          <div className="absolute bottom-5 left-5">

            <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">
              MISSION {String(index + 1).padStart(2, "0")}
            </p>

          </div>

        </div>


        {/* CONTENT */}

        <div className="p-7 md:p-8">

          <div className="flex flex-col justify-between gap-5 md:flex-row">

            <div>

              <p className="text-xs font-semibold tracking-[0.2em] text-slate-600">
                {mission.agency}
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {mission.name}
              </h3>

            </div>


            {/* OFFICIAL WEBSITE BUTTON */}

            {officialLink ? (
              <a
                href={officialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open official website for ${mission.name}`}
                title={`Open official ${mission.name} information`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:bg-white hover:text-slate-950"
              >
                <ArrowUpRight size={19} />
              </a>
            ) : (
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-500"
                title="Official mission link not available"
              >
                <ArrowUpRight size={19} />
              </div>
            )}

          </div>


          {/* META */}

          <div className="mt-7 grid gap-4 sm:grid-cols-3">

            <MissionMeta
              icon={<MapPin size={16} />}
              label="Destination"
              value={mission.destination}
            />

            <MissionMeta
              icon={<CalendarDays size={16} />}
              label="Launch"
              value={mission.launchDate}
            />

            <MissionMeta
              icon={<Target size={16} />}
              label="Objective"
              value={mission.objective}
            />

          </div>


          {/* PROGRESS */}

          <div className="mt-8">

            <div className="flex items-center justify-between">

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">
                Mission progress
              </p>

              <p className="text-sm font-semibold">
                {mission.progress || 0}%
              </p>

            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">

              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-400 to-cyan-300 transition-all duration-700"
                style={{
                  width: `${mission.progress || 0}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </article>
  );
}


/* -------------------------------- */
/* MISSION META */
/* -------------------------------- */

function MissionMeta({
  icon,
  label,
  value,
}) {
  return (
    <div>

      <div className="flex items-center gap-2 text-slate-600">

        {icon}

        <span className="text-xs uppercase tracking-wider">
          {label}
        </span>

      </div>

      <p className="mt-2 line-clamp-2 text-sm font-medium text-slate-300">
        {value || "—"}
      </p>

    </div>
  );
}

export default Missions;