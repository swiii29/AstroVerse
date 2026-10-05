import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Rocket,
  AlertCircle,
  ArrowRight,
  Orbit,
  Sparkles,
} from "lucide-react";

function Register() {
  const [form, setForm] = useState({
    name: "",
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
        "https://astroverse-9h7i.onrender.com/api/auth/register",
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
        throw new Error(
          result.message || "Registration failed"
        );
      }

      setSuccess(true);
      setMessage(
        "Account created successfully! You can now sign in."
      );

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration error:", error);

      setSuccess(false);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background */}
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

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center px-6 py-28">

        <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-2xl backdrop-blur-xl lg:grid-cols-2">

          {/* Left Visual */}
          <div className="relative hidden min-h-[700px] overflow-hidden lg:block">

            <img
              src="https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1400&q=85"
              alt="Rocket launch"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/35 to-transparent" />

            <div className="relative flex h-full flex-col justify-between p-10">

              {/* Brand */}
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                  <Rocket size={20} />
                </div>

                <div>
                  <p className="font-semibold">
                    Astro<span className="text-purple-300">Verse</span>
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
                  <span>BEGIN YOUR JOURNEY</span>
                </div>

                <h2 className="max-w-lg text-5xl font-semibold leading-[1.05] tracking-tight">
                  Discover
                  <br />
                  what lies
                  <br />
                  <span className="text-purple-300">
                    beyond.
                  </span>
                </h2>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
                  Create your AstroVerse account and unlock
                  a personalized space exploration experience.
                  Explore celestial objects, record observations
                  and manage your missions.
                </p>

              </div>

              {/* Bottom */}
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Sparkles size={14} />
                <span>Explore • Observe • Plan</span>
              </div>

            </div>
          </div>

          {/* Register Panel */}
          <div className="flex items-center justify-center p-7 sm:p-10 lg:p-14">

            <div className="w-full max-w-md">

              {/* Heading */}
              <div className="mb-8">

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300 ring-1 ring-purple-400/20">
                  <UserPlus size={25} />
                </div>

                <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-purple-300">
                  New explorer
                </p>

                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Join
                  <br />
                  <span className="gradient-text">
                    AstroVerse
                  </span>
                </h1>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Create your account and start exploring
                  the universe.
                </p>

              </div>

              {/* Message */}
              {message && (
                <div
                  className={`mb-6 flex items-start gap-3 rounded-2xl border p-4 text-sm ${
                    success
                      ? "border-green-400/20 bg-green-500/10 text-green-300"
                      : "border-red-400/20 bg-red-500/10 text-red-300"
                  }`}
                >
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{message}</span>
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Name
                  </label>

                  <div className="group relative">

                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-purple-300"
                    />

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-purple-500/10"
                    />

                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Email
                  </label>

                  <div className="group relative">

                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-purple-300"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-purple-500/10"
                    />

                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Password
                  </label>

                  <div className="group relative">

                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-purple-300"
                    />

                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      minLength={6}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-purple-500/10"
                    />

                  </div>

                  <p className="mt-2 text-xs text-slate-600">
                    Minimum 6 characters.
                  </p>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    "Creating account..."
                  ) : (
                    <>
                      <span>Create your account</span>

                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

              </form>

              {/* Divider */}
              <div className="my-8 h-px bg-white/10" />

              {/* Login link */}
              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-purple-300 transition hover:text-purple-200"
                >
                  Sign in
                </Link>
              </p>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Register;