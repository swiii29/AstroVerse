import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LogIn,
  Mail,
  Lock,
  Rocket,
  AlertCircle,
  ArrowRight,
  Orbit,
  Sparkles,
} from "lucide-react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);

      const response = await fetch(
        "http://localhost:5001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      /* ===============================
         SAVE LOGIN INFORMATION
      =============================== */

      localStorage.setItem(
        "astroverseToken",
        result.token
      );

      localStorage.setItem(
        "astroverseUser",
        JSON.stringify(result.user)
      );

      /* ===============================
         NOTIFY NAVBAR
         Navbar will immediately update
         from "Sign in" to user name.
      =============================== */

      window.dispatchEvent(
        new Event("astroverseAuthChanged")
      );

      setSuccess(true);

      setMessage(
        "Login successful! Welcome to AstroVerse."
      );

      /* Clear login form */

      setForm({
        email: "",
        password: "",
      });

    } catch (error) {
      console.error("Login error:", error);

      setSuccess(false);
      setMessage(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* ===============================
          BACKGROUND
      =============================== */}

      <div className="absolute inset-0">

        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2200&q=85"
          alt="Earth from space"
          className="h-full w-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-[#050816]/75" />

        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="absolute bottom-[-100px] right-[-80px] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      </div>


      {/* ===============================
          CONTENT
      =============================== */}

      <div className="relative z-10 flex min-h-screen items-center px-6 py-28">

        <div
          className="
            mx-auto grid w-full max-w-6xl
            overflow-hidden
            rounded-[2rem]
            border border-white/10
            bg-black/30
            shadow-2xl
            backdrop-blur-xl
            lg:grid-cols-2
          "
        >

          {/* ===============================
              LEFT VISUAL
          =============================== */}

          <div className="relative hidden min-h-[650px] overflow-hidden lg:block">

            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85"
              alt="Space exploration"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />

            <div className="relative flex h-full flex-col justify-between p-10">

              {/* Brand */}

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-full
                    border border-white/20
                    bg-white/10
                    backdrop-blur-md
                  "
                >
                  <Rocket size={20} />
                </div>

                <div>

                  <p className="font-semibold">
                    Astro
                    <span className="text-purple-300">
                      Verse
                    </span>
                  </p>

                  <p className="text-xs text-white/50">
                    Space Exploration Platform
                  </p>

                </div>

              </div>


              {/* Main text */}

              <div>

                <div className="mb-5 flex items-center gap-2 text-sm text-purple-200">

                  <Orbit size={16} />

                  <span>
                    EXPLORE THE UNKNOWN
                  </span>

                </div>

                <h2
                  className="
                    max-w-lg
                    text-5xl
                    font-semibold
                    leading-[1.05]
                    tracking-tight
                  "
                >
                  Your journey
                  <br />
                  beyond Earth
                  <br />

                  <span className="text-purple-300">
                    starts here.
                  </span>

                </h2>

                <p
                  className="
                    mt-6
                    max-w-md
                    text-sm
                    leading-7
                    text-white/60
                  "
                >
                  Explore celestial objects, observe the
                  cosmos, plan lunar missions and discover
                  what lies beyond our world.
                </p>

              </div>


              {/* Bottom */}

              <div className="flex items-center gap-2 text-xs text-white/40">

                <Sparkles size={14} />

                <span>
                  Discover • Observe • Explore
                </span>

              </div>

            </div>

          </div>


          {/* ===============================
              LOGIN PANEL
          =============================== */}

          <div
            className="
              flex items-center
              justify-center
              p-7
              sm:p-10
              lg:p-14
            "
          >

            <div className="w-full max-w-md">

              {/* Heading */}

              <div className="mb-9">

                <div
                  className="
                    mb-6
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    bg-purple-500/15
                    text-purple-300
                    ring-1 ring-purple-400/20
                  "
                >
                  <LogIn size={25} />
                </div>

                <p
                  className="
                    mb-2
                    text-sm
                    font-medium
                    uppercase
                    tracking-[0.25em]
                    text-purple-300
                  "
                >
                  Welcome back
                </p>

                <h1
                  className="
                    text-4xl
                    font-semibold
                    tracking-tight
                    sm:text-5xl
                  "
                >
                  Sign in to
                  <br />

                  <span className="gradient-text">
                    AstroVerse
                  </span>

                </h1>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Continue your exploration of the universe.
                </p>

              </div>


              {/* ===============================
                  MESSAGE
              =============================== */}

              {message && (
                <div
                  className={`
                    mb-6
                    flex items-start gap-3
                    rounded-2xl
                    border
                    p-4
                    text-sm

                    ${
                      success
                        ? "border-green-400/20 bg-green-500/10 text-green-300"
                        : "border-red-400/20 bg-red-500/10 text-red-300"
                    }
                  `}
                >

                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>
                    {message}
                  </span>

                </div>
              )}


              {/* ===============================
                  LOGIN FORM
              =============================== */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Email */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-slate-300
                    "
                  >
                    Email
                  </label>

                  <div className="group relative">

                    <Mail
                      size={18}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-500
                        transition
                        group-focus-within:text-purple-300
                      "
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        py-3.5
                        pl-11
                        pr-4
                        text-white
                        outline-none
                        transition

                        placeholder:text-slate-600

                        focus:border-purple-400/50
                        focus:bg-white/[0.06]
                        focus:ring-4
                        focus:ring-purple-500/10
                      "
                    />

                  </div>

                </div>


                {/* Password */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-slate-300
                    "
                  >
                    Password
                  </label>

                  <div className="group relative">

                    <Lock
                      size={18}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-500
                        transition
                        group-focus-within:text-purple-300
                      "
                    />

                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        py-3.5
                        pl-11
                        pr-4
                        text-white
                        outline-none
                        transition

                        placeholder:text-slate-600

                        focus:border-purple-400/50
                        focus:bg-white/[0.06]
                        focus:ring-4
                        focus:ring-purple-500/10
                      "
                    />

                  </div>

                </div>


                {/* Login button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    flex w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    bg-white
                    px-6
                    py-4
                    font-semibold
                    text-slate-950
                    transition

                    hover:bg-purple-100

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <span>
                        Enter AstroVerse
                      </span>

                      <ArrowRight
                        size={18}
                        className="
                          transition-transform
                          group-hover:translate-x-1
                        "
                      />
                    </>
                  )}

                </button>

              </form>


              {/* Divider */}

              <div className="my-8 h-px bg-white/10" />


              {/* Register */}

              <p className="text-center text-sm text-slate-500">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="
                    font-medium
                    text-purple-300
                    transition
                    hover:text-purple-200
                  "
                >
                  Create one
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Login;