import {
  Moon,
  Droplets,
  Wind,
  Zap,
  Package,
  Activity,
  ArrowUpRight,
  Shield,
  Radio,
  BatteryCharging,
  Users,
} from "lucide-react";

function LunaBase() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[720px] overflow-hidden">

        {/* External NASA Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://svs.gsfc.nasa.gov/vis/a000000/a005100/a005127/lola_sp_natural_1080p30.mp4"
            type="video/mp4"
          />
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/10" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-black/20" />

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-end px-6 pb-20 pt-40">

          <div className="max-w-4xl">

            <div className="mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-purple-300">
              <Moon size={18} />
              LunaBase Mission Control
            </div>

            <h1 className="text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-9xl">
              Build
              <br />
              humanity's
              <br />
              <span className="text-purple-300">
                lunar future.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Design and manage a simulated lunar settlement while monitoring
              habitats, resources, infrastructure and mission operations.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <button
                onClick={() => {
                  window.location.href = "/missions";
                }}
                className="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-purple-100"
              >
                Open Mission Control

                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById("resources")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-medium backdrop-blur-md transition hover:bg-white/15"
              >
                View Base Status
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= OVERVIEW ================= */}
      <section className="border-y border-white/10 bg-[#050816]">

        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">

          <Stat
            icon={<Moon size={19} />}
            value="LUNA-01"
            label="Settlement"
          />

          <Stat
            icon={<Users size={19} />}
            value="06"
            label="Crew members"
          />

          <Stat
            icon={<Activity size={19} />}
            value="98.4%"
            label="System health"
          />

          <Stat
            icon={<Radio size={19} />}
            value="ONLINE"
            label="Communication"
          />

        </div>

      </section>


      {/* ================= RESOURCES ================= */}
      <section
        id="resources"
        className="mx-auto max-w-7xl px-6 py-24"
      >

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="text-sm uppercase tracking-[0.25em] text-purple-400">
              Life support
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Resource systems
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-slate-400">
              Monitor the resources that keep the lunar settlement operational
              and support the crew's daily activities.
            </p>

          </div>

          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            All critical systems operational
          </div>

        </div>


        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <ResourceCard
            icon={<Droplets />}
            title="Water"
            value="78%"
            status="Stable"
            description="Recycling & extraction"
          />

          <ResourceCard
            icon={<Wind />}
            title="Oxygen"
            value="91%"
            status="Stable"
            description="Life support systems"
          />

          <ResourceCard
            icon={<Zap />}
            title="Energy"
            value="64%"
            status="Monitoring"
            description="Solar generation"
          />

          <ResourceCard
            icon={<Package />}
            title="Supplies"
            value="82%"
            status="Stable"
            description="Mission inventory"
          />

        </div>

      </section>


      {/* ================= HABITAT ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1020] lg:grid-cols-2">

          <div className="relative min-h-[500px] overflow-hidden">

            <img
              src="https://science.nasa.gov/wp-content/uploads/2024/09/cabeus-crater-lro.png"
              alt="NASA lunar terrain"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8">

              <p className="text-sm uppercase tracking-[0.25em] text-purple-300">
                Habitat zone
              </p>

              <h3 className="mt-3 text-4xl font-semibold">
                LunaBase Alpha
              </h3>

            </div>

          </div>


          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">

            <div className="flex items-center gap-3 text-purple-300">

              <Shield size={21} />

              <span className="text-sm uppercase tracking-[0.2em]">
                Settlement status
              </span>

            </div>


            <h2 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
              A new home
              <br />
              beyond Earth.
            </h2>


            <p className="mt-6 leading-7 text-slate-400">
              LunaBase Alpha represents a simulated permanent lunar
              settlement. Monitor infrastructure, crew systems and essential
              resources as the base expands.
            </p>


            <div className="mt-10 space-y-5">

              <ActivityItem
                icon={<Activity size={18} />}
                title="Habitat systems"
                status="Operational"
              />

              <ActivityItem
                icon={<BatteryCharging size={18} />}
                title="Solar array"
                status="Operational"
              />

              <ActivityItem
                icon={<Radio size={18} />}
                title="Deep-space communication"
                status="Connected"
              />

              <ActivityItem
                icon={<Moon size={18} />}
                title="Rover Alpha"
                status="Exploring"
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================= INFRASTRUCTURE ================= */}
      <section className="border-y border-white/10 bg-[#080c19]">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-2xl">

            <p className="text-sm uppercase tracking-[0.25em] text-purple-400">
              Infrastructure
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Everything the base needs.
            </h2>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <FeatureCard
              icon={<Droplets />}
              title="Water Extraction"
              text="Extract and recycle lunar water resources for long-term settlement operations."
            />

            <FeatureCard
              icon={<Zap />}
              title="Solar Energy"
              text="Generate and distribute renewable energy across habitats and mission systems."
            />

            <FeatureCard
              icon={<Radio />}
              title="Mission Network"
              text="Maintain communication between lunar infrastructure and Earth-based control."
            />

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-950/70 via-[#11152a] to-[#050816] p-8 sm:p-12 lg:p-16">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative max-w-3xl">

            <p className="text-sm uppercase tracking-[0.25em] text-purple-300">
              Mission control
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              Ready to plan the next mission?
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-slate-400">
              Continue your exploration by reviewing active missions,
              destinations and lunar operations.
            </p>

            <button
              onClick={() => {
                window.location.href = "/missions";
              }}
              className="mt-8 flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-purple-100"
            >
              Explore Missions
              <ArrowUpRight size={18} />
            </button>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row">

          <p>
            AstroVerse · LunaBase
          </p>

          <p>
            Simulating humanity's next giant leap.
          </p>

        </div>

      </footer>

    </main>
  );
}


/* ================= STAT ================= */

function Stat({ icon, value, label }) {
  return (
    <div className="flex flex-col gap-3 px-6 py-7 sm:px-8">

      <div className="text-purple-300">
        {icon}
      </div>

      <div className="text-2xl font-semibold">
        {value}
      </div>

      <div className="text-xs uppercase tracking-[0.15em] text-slate-500">
        {label}
      </div>

    </div>
  );
}


/* ================= RESOURCE CARD ================= */

function ResourceCard({
  icon,
  title,
  value,
  status,
  description,
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/[0.06]">

      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
          {icon}
        </div>

        <span className="flex items-center gap-2 text-xs text-emerald-400">

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          {status}

        </span>

      </div>


      <div className="mt-8">

        <p className="text-sm text-slate-400">
          {title}
        </p>

        <div className="mt-2 text-4xl font-semibold">
          {value}
        </div>

        <p className="mt-2 text-xs text-slate-500">
          {description}
        </p>

      </div>


      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">

        <div
          className="h-full rounded-full bg-purple-400"
          style={{
            width: value,
          }}
        />

      </div>

    </div>
  );
}


/* ================= ACTIVITY ITEM ================= */

function ActivityItem({ icon, title, status }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-5 last:border-0 last:pb-0">

      <div className="flex items-center gap-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-purple-300">
          {icon}
        </div>

        <span className="text-sm font-medium">
          {title}
        </span>

      </div>

      <span className="text-xs text-emerald-400">
        {status}
      </span>

    </div>
  );
}


/* ================= FEATURE CARD ================= */

function FeatureCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:border-purple-400/30">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
        {icon}
      </div>

      <h3 className="mt-7 text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {text}
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm text-purple-300">
        System active
        <ArrowUpRight size={15} />
      </div>

    </div>
  );
}


export default LunaBase;