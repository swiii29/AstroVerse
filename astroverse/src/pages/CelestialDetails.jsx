import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Telescope,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { getCelestialObjects } from "../services/api";

function CelestialDetails() {
  const { name } = useParams();

  const [object, setObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadObject = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCelestialObjects();

        const objectName = decodeURIComponent(name);

        const foundObject = data.find(
          (item) =>
            item.name.toLowerCase() ===
            objectName.toLowerCase()
        );

        if (!foundObject) {
          throw new Error("Celestial object not found");
        }

        setObject(foundObject);
      } catch (err) {
        console.error("Celestial details error:", err);
        setError("Unable to load celestial object.");
      } finally {
        setLoading(false);
      }
    };

    loadObject();
  }, [name]);

  if (loading) {
    return (
      <main className="space-bg flex min-h-screen items-center justify-center px-6">
        <div className="flex items-center gap-3 text-slate-400">
          <Loader2
            size={26}
            className="animate-spin text-purple-400"
          />
          Loading celestial object...
        </div>
      </main>
    );
  }

  if (error || !object) {
    return (
      <main className="space-bg min-h-screen px-6 pb-20 pt-32">
        <div className="mx-auto max-w-6xl">

          <Link
            to="/astroatlas"
            className="inline-flex items-center gap-2 text-lg text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={22} />
            Back to AstroAtlas
          </Link>

          <div className="mt-12 flex items-center gap-4 rounded-3xl border border-red-400/30 bg-red-500/[0.05] p-8 text-red-300">

            <AlertCircle size={28} />

            <div>
              <p className="text-xl font-semibold">
                {error || "Celestial object not found."}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Requested object: {name}
              </p>
            </div>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="space-bg min-h-screen px-6 pb-20 pt-32">

      <div className="mx-auto max-w-6xl">

        {/* BACK BUTTON */}

        <Link
          to="/astroatlas"
          className="mb-8 inline-flex items-center gap-2 text-lg text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={22} />
          Back to AstroAtlas
        </Link>

        {/* MAIN CARD */}

        <section className="overflow-hidden rounded-[2rem] border border-purple-400/20 bg-slate-950/60">

          {/* IMAGE */}

          <div className="relative h-[430px] overflow-hidden md:h-[560px]">

            <img
              src={object.image}
              alt={object.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            {/* TYPE */}

            <div className="absolute left-7 top-7 flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/20 px-5 py-3 text-base font-semibold text-purple-100 backdrop-blur-md">
              <Sparkles size={19} />
              {object.type}
            </div>

            {/* TITLE */}

            <div className="absolute bottom-8 left-8">

              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-300">
                Celestial Object
              </p>

              <h1 className="text-5xl font-bold text-white md:text-7xl">
                {object.name}
              </h1>

            </div>

          </div>

          {/* CONTENT */}

          <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-[1.4fr_0.8fr]">

            {/* LEFT */}

            <div>

              <p className="text-xl leading-9 text-slate-300">
                {object.description}
              </p>

              {/* QUICK FACTS */}

              <div className="mt-10">

                <div className="flex items-center gap-3">

                  <Telescope
                    size={21}
                    className="text-purple-400"
                  />

                  <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Quick Facts
                  </h2>

                </div>

                <div className="mt-6 space-y-4">

                  {object.facts?.map((fact, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                    >

                      <span className="mt-1 text-lg text-purple-400">
                        •
                      </span>

                      <p className="text-lg leading-7 text-slate-300">
                        {fact}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div>

              {/* DISTANCE */}

              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Distance
                </p>

                <p className="mt-4 text-2xl font-semibold text-white">
                  {object.distance}
                </p>

              </div>

              {/* EXPLORE */}

              <div className="mt-5 rounded-3xl border border-purple-400/20 bg-purple-500/[0.05] p-7">

                <div className="flex items-center gap-3">

                  <Sparkles
                    size={21}
                    className="text-purple-400"
                  />

                  <h3 className="text-lg font-semibold text-white">
                    Explore more
                  </h3>

                </div>

                <p className="mt-3 leading-6 text-slate-400">
                  Continue exploring planets, moons,
                  stars and exoplanets across AstroVerse.
                </p>

                <Link
                  to="/astroatlas"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-3 font-semibold text-white transition hover:bg-purple-400"
                >
                  <ArrowLeft size={17} />
                  Back to Atlas
                </Link>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

export default CelestialDetails;