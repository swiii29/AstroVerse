import { useEffect, useState } from "react";
import {
  Telescope,
  MapPin,
  CalendarDays,
  Eye,
  Plus,
  Trash2,
  ArrowUpRight,
  Sparkles,
  X,
  Orbit,
} from "lucide-react";

import {
  getObservations,
  getPublicObservations,
  createObservation,
  deleteObservation,
} from "../services/api";

function CosmoScope() {
  const [publicObservations, setPublicObservations] = useState([]);
  const [myObservations, setMyObservations] = useState([]);

  const [loadingPublic, setLoadingPublic] = useState(true);
  const [loadingMine, setLoadingMine] = useState(false);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    objectName: "",
    objectType: "Planet",
    observationDate: "",
    location: "",
    notes: "",
    visibility: "Good",
  });

  const token = localStorage.getItem("astroverseToken");

  useEffect(() => {
    loadPublicObservations();

    if (token) {
      loadMyObservations();
    }
  }, [token]);

  const loadPublicObservations = async () => {
    try {
      setLoadingPublic(true);

      const data = await getPublicObservations();

      setPublicObservations(data || []);
    } catch (error) {
      console.error(error);
      setError("Unable to load observations.");
    } finally {
      setLoadingPublic(false);
    }
  };

  const loadMyObservations = async () => {
    try {
      setLoadingMine(true);

      const data = await getObservations();

      setMyObservations(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMine(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await createObservation(form);

      setForm({
        objectName: "",
        objectType: "Planet",
        observationDate: "",
        location: "",
        notes: "",
        visibility: "Good",
      });

      setShowForm(false);

      await loadMyObservations();
      await loadPublicObservations();
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Unable to create observation."
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteObservation(id);

      await loadMyObservations();
      await loadPublicObservations();
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Unable to delete observation."
      );
    }
  };

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
    src="https://svs.gsfc.nasa.gov/vis/a030000/a030700/a030782/bubble_fly-b-3840x2160p30.mp4"
    type="video/mp4"
  />
</video>

          <div className="absolute inset-0 bg-black/65" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />

          <div className="relative z-10 flex min-h-[500px] items-end px-7 py-12 md:px-14 md:py-16">

            <div className="max-w-3xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">

                <Telescope size={15} />

                COSMOSCOPE

              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">

                Look
                <br />

                <span className="text-cyan-300">
                  beyond.
                </span>

              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 md:text-lg">
                Observe the universe, record your discoveries,
                and explore observations from fellow space explorers.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                {token ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:scale-[1.02]"
                  >
                    <Plus size={18} />
                    Record observation
                  </button>
                ) : (
                  <a
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:scale-[1.02]"
                  >
                    Login to observe
                    <ArrowUpRight size={18} />
                  </a>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* INTRO */}

      <section className="px-5 py-8 md:px-8">

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">

          <StatCard
            icon={<Telescope size={20} />}
            title="Observe"
            text="Record celestial objects you discover."
          />

          <StatCard
            icon={<Orbit size={20} />}
            title="Explore"
            text="See what other explorers have observed."
          />

          <StatCard
            icon={<Sparkles size={20} />}
            title="Discover"
            text="Build your own astronomical journal."
          />

        </div>

      </section>


      {/* COMMUNITY OBSERVATIONS */}

      <section className="px-5 py-10 md:px-8 md:py-16">

        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-semibold tracking-[0.3em] text-cyan-300">
                COMMUNITY SKY
              </p>

              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                What explorers are seeing.
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-slate-500">
                A collection of observations shared through AstroVerse.
              </p>

            </div>

            <div className="text-sm text-slate-600">
              {publicObservations.length} observations
            </div>

          </div>


          {loadingPublic ? (

            <LoadingBox text="Loading observations..." />

          ) : publicObservations.length === 0 ? (

            <EmptyBox
              title="The sky is waiting."
              text="No public observations have been recorded yet."
            />

          ) : (

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {publicObservations.map((observation) => (

                <ObservationCard
                  key={observation._id}
                  observation={observation}
                />

              ))}

            </div>

          )}

        </div>

      </section>


      {/* PERSONAL LOG */}

      {token && (

        <section className="px-5 py-10 md:px-8 md:py-16">

          <div className="mx-auto max-w-7xl">

            <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>

                <div className="flex items-center gap-3">
                  <span
                    className="
                      h-2 w-2 rounded-full
                      bg-purple-300
                      shadow-[0_0_12px_rgba(216,180,254,0.9)]
                    "
                  />

                  <p className="text-xs font-semibold tracking-[0.3em] text-purple-300">
                    MY OBSERVATION LOG
                  </p>
                </div>

                <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                  Your discoveries.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
                  Keep track of the celestial objects you've personally observed.
                </p>

              </div>

              <button
                onClick={() => setShowForm(true)}
                className="
                  group inline-flex w-fit items-center gap-2
                  rounded-full border border-white/10 bg-white
                  px-6 py-3.5 font-semibold text-slate-950
                  shadow-[0_0_30px_rgba(255,255,255,0.05)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_0_35px_rgba(168,85,247,0.2)]
                "
              >
                <Plus
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
                New observation
              </button>

            </div>

            {loadingMine ? (

              <LoadingBox text="Loading your observations..." />

            ) : myObservations.length === 0 ? (

              <div
                className="
                  relative overflow-hidden rounded-[2rem]
                  border border-white/10 bg-white/[0.025]
                  px-6 py-12
                  shadow-[0_0_60px_rgba(139,92,246,0.04)]
                  backdrop-blur-xl
                  md:px-12 md:py-14
                "
              >

                <div
                  className="
                    absolute -right-24 -top-24 h-72 w-72
                    rounded-full bg-purple-500/10 blur-3xl
                  "
                />

                <div
                  className="
                    absolute -bottom-28 left-1/4 h-64 w-64
                    rounded-full bg-cyan-400/5 blur-3xl
                  "
                />

                <div
                  className="
                    absolute right-8 top-1/2 hidden h-52 w-52
                    -translate-y-1/2 md:block
                  "
                >
                  <div className="absolute inset-0 rounded-full border border-purple-300/10" />
                  <div className="absolute inset-7 rotate-12 rounded-full border border-cyan-300/10" />
                  <div className="absolute inset-14 -rotate-12 rounded-full border border-white/[0.07]" />

                  <div
                    className="
                      absolute left-1/2 top-1/2 h-3 w-3
                      -translate-x-1/2 -translate-y-1/2
                      rounded-full bg-purple-300
                      shadow-[0_0_25px_rgba(216,180,254,0.8)]
                    "
                  />

                  <div
                    className="
                      absolute left-[18%] top-[24%] h-1.5 w-1.5
                      rounded-full bg-cyan-300
                      shadow-[0_0_12px_rgba(103,232,249,0.8)]
                    "
                  />
                </div>

                <div className="relative z-10 max-w-2xl">

                  <div
                    className="
                      flex h-14 w-14 items-center justify-center
                      rounded-2xl border border-purple-300/10
                      bg-purple-400/10 text-purple-300
                      shadow-[0_0_25px_rgba(168,85,247,0.08)]
                    "
                  >
                    <Telescope size={24} />
                  </div>

                  <p className="mt-6 text-xs font-semibold tracking-[0.25em] text-slate-500">
                    PERSONAL SKY JOURNAL
                  </p>

                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                    Nothing recorded yet.
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-slate-500 md:text-base">
                    Your astronomical discoveries will appear here once you record
                    your first observation.
                  </p>

                  <button
                    onClick={() => setShowForm(true)}
                    className="
                      group mt-7 inline-flex items-center gap-2
                      rounded-full border border-white/10
                      bg-white/[0.06] px-6 py-3.5
                      text-sm font-semibold text-white
                      backdrop-blur-xl
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:border-purple-300/20
                      hover:bg-white/10
                      hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]
                    "
                  >
                    <Plus
                      size={17}
                      className="transition-transform duration-300 group-hover:rotate-90"
                    />
                    Record first observation
                  </button>

                </div>
              </div>

            ) : (

              <div className="space-y-4">

                {myObservations.map((observation) => (

                  <PersonalObservation
                    key={observation._id}
                    observation={observation}
                    onDelete={() =>
                      handleDelete(observation._id)
                    }
                  />

                ))}

              </div>

            )}

          </div>

        </section>

      )}

{!token && (
  <section className="px-5 py-10 md:px-8 md:py-16">
    <div className="mx-auto max-w-7xl">
      <div
        className="
          relative overflow-hidden rounded-[2rem]
          border border-white/10
          bg-white/[0.035]
          px-8 py-10
          shadow-[0_0_60px_rgba(139,92,246,0.08)]
          backdrop-blur-2xl
          md:px-14 md:py-14
        "
      >
        {/* PURPLE GLOW */}
        <div
          className="
            absolute -right-24 -top-24
            h-80 w-80 rounded-full
            bg-purple-500/15 blur-3xl
          "
        />

        {/* CYAN GLOW */}
        <div
          className="
            absolute -bottom-28 right-1/3
            h-64 w-64 rounded-full
            bg-cyan-400/10 blur-3xl
          "
        />

        {/* ORBIT DECORATION */}
        <div className="absolute right-10 top-1/2 hidden h-48 w-48 -translate-y-1/2 md:block">
          <div className="absolute inset-0 rounded-full border border-purple-300/10" />

          <div className="absolute inset-6 rounded-full border border-cyan-300/10 rotate-12" />

          <div className="absolute inset-12 rounded-full border border-white/10 -rotate-12" />

          <div
            className="
              absolute left-1/2 top-1/2
              h-3 w-3
              -translate-x-1/2 -translate-y-1/2
              rounded-full
              bg-purple-300
              shadow-[0_0_25px_rgba(216,180,254,0.9)]
            "
          />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3">
            <span
              className="
                h-2 w-2 rounded-full
                bg-purple-300
                shadow-[0_0_12px_rgba(216,180,254,0.9)]
              "
            />

            <p className="text-xs font-semibold tracking-[0.3em] text-purple-300">
              YOUR ASTRONOMICAL JOURNAL
            </p>
          </div>

          <h2
            className="
              mt-5 text-4xl font-bold
              leading-[1.05]
              tracking-tight
              text-white
              md:text-5xl
            "
          >
            Your next discovery
            <br />
            <span className="text-purple-300">
              starts here.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
            Login to record observations and create your own personal
            space journal.
          </p>

          <a
            href="/login"
            className="
              group mt-8
              inline-flex items-center gap-2
              rounded-full
              border border-white/10
              bg-white
              px-6 py-3.5
              font-semibold
              text-slate-950
              shadow-[0_0_30px_rgba(255,255,255,0.06)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_0_35px_rgba(168,85,247,0.2)]
            "
          >
            Login to continue

            <ArrowUpRight
              size={18}
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>
        </div>
      </div>
    </div>
  </section>
)}

      {/* ERROR */}

      {error && (

        <div className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm text-red-300 backdrop-blur-xl">

          {error}

        </div>

      )}


      {/* OBSERVATION FORM MODAL */}

      {showForm && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-md"
          onClick={() => setShowForm(false)}
        >

          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0a1020] p-7 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setShowForm(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:bg-white/10"
            >
              <X size={19} />
            </button>


            <div className="mb-8">

              <div className="flex items-center gap-2 text-cyan-300">

                <Telescope size={19} />

                <span className="text-xs font-semibold tracking-[0.25em]">
                  NEW OBSERVATION
                </span>

              </div>

              <h2 className="mt-3 text-3xl font-bold">
                Record what you saw.
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add the details of your astronomical observation.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* OBJECT NAME */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Object name
                </label>

                <input
                  type="text"
                  name="objectName"
                  value={form.objectName}
                  onChange={handleChange}
                  placeholder="e.g. Mars"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-700 focus:border-cyan-300/40"
                />

              </div>


              {/* TYPE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Object type
                </label>

                <select
                  name="objectType"
                  value={form.objectType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3.5 text-sm outline-none focus:border-cyan-300/40"
                >
                  <option value="Planet">
                    Planet
                  </option>

                  <option value="Moon">
                    Moon
                  </option>

                  <option value="Star">
                    Star
                  </option>

                  <option value="Exoplanet">
                    Exoplanet
                  </option>
                </select>

              </div>


              <div className="grid gap-5 md:grid-cols-2">

                {/* DATE */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Observation date
                  </label>

                  <input
                    type="date"
                    name="observationDate"
                    value={form.observationDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none focus:border-cyan-300/40"
                  />

                </div>


                {/* LOCATION */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Surat, India"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none placeholder:text-slate-700 focus:border-cyan-300/40"
                  />

                </div>

              </div>


              {/* VISIBILITY */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Visibility
                </label>

                <select
                  name="visibility"
                  value={form.visibility}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3.5 text-sm outline-none focus:border-cyan-300/40"
                >

                  <option value="Excellent">
                    Excellent
                  </option>

                  <option value="Good">
                    Good
                  </option>

                  <option value="Fair">
                    Fair
                  </option>

                  <option value="Poor">
                    Poor
                  </option>

                </select>

              </div>


              {/* NOTES */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Notes
                </label>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="What did you notice?"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none placeholder:text-slate-700 focus:border-cyan-300/40"
                />

              </div>


              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100"
              >

                <Telescope size={18} />

                Save observation

              </button>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}


/* -------------------------------- */
/* STAT CARD */
/* -------------------------------- */

function StatCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/20 hover:bg-white/[0.055]">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}


/* -------------------------------- */
/* OBSERVATION CARD */
/* -------------------------------- */

function ObservationCard({
  observation,
}) {
  return (
    <div className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20">

      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">
            {observation.objectType}
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {observation.objectName}
          </h3>

        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-slate-400 transition group-hover:text-cyan-300">
          <ArrowUpRight size={18} />
        </div>

      </div>


      <div className="mt-6 space-y-3">

        <InfoRow
          icon={<CalendarDays size={15} />}
          text={formatDate(observation.observationDate)}
        />

        <InfoRow
          icon={<MapPin size={15} />}
          text={observation.location}
        />

        <InfoRow
          icon={<Eye size={15} />}
          text={observation.visibility}
        />

      </div>


      {observation.notes && (

        <div className="mt-6 border-t border-white/10 pt-5">

          <p className="text-sm leading-6 text-slate-500">
            {observation.notes}
          </p>

        </div>

      )}

    </div>
  );
}


/* -------------------------------- */
/* PERSONAL OBSERVATION */
/* -------------------------------- */

function PersonalObservation({
  observation,
  onDelete,
}) {
  return (
    <div className="flex flex-col gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 md:flex-row md:items-center md:justify-between">

      <div className="flex items-start gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-400/10 text-purple-300">
          <Telescope size={20} />
        </div>

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="text-lg font-semibold">
              {observation.objectName}
            </h3>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {observation.objectType}
            </span>

          </div>

          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">

            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} />
              {formatDate(observation.observationDate)}
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin size={13} />
              {observation.location}
            </span>

            <span className="flex items-center gap-1.5">
              <Eye size={13} />
              {observation.visibility}
            </span>

          </div>

          {observation.notes && (

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              {observation.notes}
            </p>

          )}

        </div>

      </div>


      <button
        onClick={onDelete}
        className="flex w-fit items-center gap-2 rounded-full border border-red-400/10 bg-red-400/5 px-4 py-2.5 text-sm text-red-300 transition hover:bg-red-400/10"
      >

        <Trash2 size={15} />

        Delete

      </button>

    </div>
  );
}


/* -------------------------------- */
/* INFO ROW */
/* -------------------------------- */

function InfoRow({
  icon,
  text,
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-500">

      <span className="text-slate-600">
        {icon}
      </span>

      {text}

    </div>
  );
}


/* -------------------------------- */
/* LOADING */
/* -------------------------------- */

function LoadingBox({
  text,
}) {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.03]">

      <div className="text-center">

        <Orbit
          size={30}
          className="mx-auto animate-spin text-cyan-300"
        />

        <p className="mt-4 text-sm text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}


/* -------------------------------- */
/* EMPTY */
/* -------------------------------- */

function EmptyBox({
  title,
  text,
  action,
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-14 text-center">

      <Sparkles
        size={30}
        className="mx-auto text-slate-600"
      />

      <h3 className="mt-5 text-xl font-semibold">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {text}
      </p>

      {action}

    </div>
  );
}


/* -------------------------------- */
/* DATE FORMAT */
/* -------------------------------- */

function formatDate(date) {
  if (!date) return "Unknown date";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

export default CosmoScope;