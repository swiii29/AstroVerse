import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ArrowUpRight,
  X,
  Orbit,
  Sparkles,
  MapPin,
  Telescope,
} from "lucide-react";
import { getCelestialObjects } from "../services/api";

function AstroAtlas() {
  const [objects, setObjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedObject, setSelectedObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadObjects = async () => {
      try {
        setLoading(true);

        const data = await getCelestialObjects();

        setObjects(data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load celestial objects.");
      } finally {
        setLoading(false);
      }
    };

    loadObjects();
  }, []);

  const categories = [
    "All",
    "Planet",
    "Moon",
    "Star",
    "Exoplanet",
  ];

  const filteredObjects = useMemo(() => {
    return objects.filter((object) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        object.name?.toLowerCase().includes(searchText) ||
        object.description?.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || object.type === category;

      return matchesSearch && matchesCategory;
    });
  }, [objects, search, category]);

  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* ================= HERO ================= */}
      <section className="px-6 pb-12 pt-28">

        <div className="relative mx-auto min-h-[600px] max-w-7xl overflow-hidden rounded-[2rem]">

          {/* NASA VIDEO BACKGROUND */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
           <source
  src="https://svs.gsfc.nasa.gov/vis/a020000/a020300/a020391/SolarSystemFlythrough_1080.mp4"
  type="video/mp4"
/>
          </video>

          {/* VIDEO OVERLAYS */}
          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-black/20" />


          {/* HERO CONTENT */}
          <div className="relative flex min-h-[600px] items-end px-8 pb-16 sm:px-12 lg:px-16">

            <div className="max-w-5xl">

              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm uppercase tracking-[0.2em] text-white backdrop-blur-md">

                <Orbit size={18} />

                AstroAtlas

              </div>


              <h1 className="text-6xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">

                Explore

                <br />

                <span className="text-cyan-400">
                  the universe.
                </span>

              </h1>


              <p className="mt-8 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">

                Explore planets, moons, stars and exoplanets through the
                AstroVerse celestial database.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SEARCH ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-12">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* SEARCH */}
          <div className="relative w-full max-w-xl">

            <Search
              size={21}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search celestial objects..."
              className="w-full rounded-full border border-white/10 bg-white/[0.035] py-4 pl-14 pr-5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.05]"
            />

          </div>


          {/* CATEGORIES */}
          <div className="flex gap-2 overflow-x-auto pb-1">

            {categories.map((item) => (

              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full border px-6 py-3 text-sm font-medium transition ${
                  category === item
                    ? "border-white bg-white text-slate-950"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      </section>


      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-24">

        {/* ERROR */}
        {error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-sm text-red-300">
            {error}
          </div>
        )}


        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="h-[390px] animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]"
              />

            ))}

          </div>
        )}


        {/* EMPTY */}
        {!loading && !error && filteredObjects.length === 0 && (

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">

            <Sparkles
              size={35}
              className="mx-auto text-cyan-400"
            />

            <h2 className="mt-5 text-2xl font-semibold">
              No celestial objects found
            </h2>

            <p className="mt-3 text-slate-500">
              Try another search or select a different category.
            </p>

          </div>

        )}


        {/* CARDS */}
        {!loading && !error && filteredObjects.length > 0 && (

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {filteredObjects.map((object) => (

              <CelestialCard
                key={object._id}
                object={object}
                onOpen={() => setSelectedObject(object)}
              />

            ))}

          </div>

        )}

      </section>


      {/* ================= MODAL ================= */}
      {selectedObject && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-5 py-10 backdrop-blur-md"
          onClick={() => setSelectedObject(null)}
        >

          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#090d1c] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}
            <button
              onClick={() => setSelectedObject(null)}
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition hover:bg-white/10"
            >
              <X size={20} />
            </button>


            {/* IMAGE */}
            <div className="relative h-[300px] overflow-hidden sm:h-[420px]">

              <img
                src={selectedObject.image}
                alt={selectedObject.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#090d1c] via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">

                <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-md">
                  {selectedObject.type}
                </span>

                <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                  {selectedObject.name}
                </h2>

              </div>

            </div>


            {/* DETAILS */}
            <div className="grid gap-8 p-8 lg:grid-cols-3">

              <div className="lg:col-span-2">

                <p className="text-lg leading-8 text-slate-300">
                  {selectedObject.description}
                </p>


                <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">

                  <MapPin
                    size={18}
                    className="text-cyan-400"
                  />

                  Distance:
                  <span className="text-white">
                    {selectedObject.distance || "Unknown"}
                  </span>

                </div>

              </div>


              {/* FACTS */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                <div className="flex items-center gap-3">

                  <Telescope
                    size={20}
                    className="text-cyan-400"
                  />

                  <h3 className="font-semibold">
                    Key facts
                  </h3>

                </div>


                <div className="mt-5 space-y-3">

                  {selectedObject.facts?.map((fact, index) => (

                    <div
                      key={index}
                      className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm leading-6 text-slate-400"
                    >
                      {fact}
                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}


/* ================= CELESTIAL CARD ================= */

function CelestialCard({ object, onOpen }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] transition duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.06]">

      {/* IMAGE */}
      <div className="relative h-[220px] overflow-hidden">

        <img
          src={object.image}
          alt={object.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />


        {/* TYPE */}
        <div className="absolute left-4 top-4">

          <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {object.type}
          </span>

        </div>


        {/* ARROW */}
        <button
          onClick={onOpen}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-950"
          aria-label={`View ${object.name}`}
        >
          <ArrowUpRight size={18} />
        </button>

      </div>


      {/* CONTENT */}
      <div className="p-5">

        <h3 className="text-xl font-semibold">
          {object.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {object.description}
        </p>


        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">

          <span className="text-xs uppercase tracking-[0.15em] text-slate-600">
            Distance
          </span>

          <span className="text-xs text-slate-400">
            {object.distance || "Unknown"}
          </span>

        </div>

      </div>

    </article>
  );
}


export default AstroAtlas;