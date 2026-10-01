<script setup>
import { ref, onMounted } from "vue";
import {
  Moon,
  Rocket,
  Users,
  HeartPulse,
  BatteryCharging,
  Droplets,
  Wind,
  ShieldCheck,
  Radio,
  Activity,
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Orbit,
  Sparkles,
} from "lucide-vue-next";

const bases = ref([]);
const loading = ref(true);
const error = ref("");

const loadBases = async () => {
  try {
    loading.value = true;

    const response = await fetch(
      "http://localhost:5001/api/lunar-bases"
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to load lunar base"
      );
    }

    bases.value = result.data || [];
  } catch (err) {
    console.error(err);
    error.value = "Unable to load lunar base data.";
  } finally {
    loading.value = false;
  }
};

onMounted(loadBases);

const base = () => {
  return bases.value[0] || {};
};

const getValue = (key, fallback) => {
  const value = base()[key];
  return value !== undefined && value !== null
    ? value
    : fallback;
};

const openMissions = () => {
  window.location.href = "http://localhost:5175/missions";
};
</script>

<template>
  <main class="min-h-screen bg-[#050816] text-white">

    <!-- HERO -->
    <section class="relative min-h-[760px] overflow-hidden">

      <!-- Moon image -->
      <img
        src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2200&q=90"
        alt="Moon and Earth from space"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <!-- cinematic overlays -->
      <div class="absolute inset-0 bg-[#050816]/45"></div>

      <div
        class="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/75 to-transparent"
      ></div>

      <div
        class="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#050816]/20"
      ></div>

      <!-- Content -->
      <div
        class="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-end px-6 pb-20 pt-32 lg:px-10"
      >

        <div class="max-w-4xl">

          <div class="mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-purple-300">
            <Moon :size="17" />
            <span>LunaBase</span>
          </div>

          <h1
            class="max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl"
          >
            Build humanity's
            <span
              class="block bg-gradient-to-r from-purple-300 via-violet-400 to-cyan-400 bg-clip-text text-transparent"
            >
              lunar future.
            </span>
          </h1>

          <p
            class="mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            Design and manage a simulated lunar settlement while
            monitoring essential resources, habitats and mission
            operations.
          </p>

          <div class="mt-9 flex flex-wrap gap-4">

            <button
              @click="openMissions"
              class="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-purple-100"
            >
              Mission control

              <ArrowUpRight
                :size="18"
                class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>

            <div
              class="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm text-white backdrop-blur-md"
            >
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
              Artemis Habitat Alpha
            </div>

          </div>

        </div>
      </div>
    </section>

    <!-- LOADING -->
    <section
      v-if="loading"
      class="mx-auto max-w-7xl px-6 py-24 text-center"
    >
      <div class="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-purple-400"></div>

      <p class="text-slate-400">
        Loading lunar systems...
      </p>
    </section>

    <!-- ERROR -->
    <section
      v-else-if="error"
      class="mx-auto max-w-7xl px-6 py-24"
    >
      <div
        class="rounded-3xl border border-red-400/20 bg-red-500/10 p-8 text-center"
      >
        <p class="text-red-300">
          {{ error }}
        </p>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <section
      v-else
      class="relative mx-auto max-w-7xl px-6 pb-28 lg:px-10"
    >

      <!-- OVERVIEW -->
      <div class="relative -mt-10 z-20">

        <div
          class="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0f22]/90 shadow-2xl backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
        >

          <div class="border-b border-white/10 p-7 sm:border-r lg:border-b-0">
            <p class="text-sm text-slate-500">
              Mission day
            </p>

            <p class="mt-3 text-4xl font-semibold">
              {{ getValue("missionDay", "148") }}
            </p>

            <p class="mt-2 text-xs text-emerald-400">
              Mission active
            </p>
          </div>

          <div class="border-b border-white/10 p-7 lg:border-b-0 lg:border-r">
            <p class="text-sm text-slate-500">
              Crew
            </p>

            <p class="mt-3 text-4xl font-semibold">
              {{ getValue("crew", "6") }}
            </p>

            <p class="mt-2 text-xs text-slate-500">
              Active personnel
            </p>
          </div>

          <div class="border-b border-white/10 p-7 sm:border-r lg:border-b-0">
            <p class="text-sm text-slate-500">
              Base health
            </p>

            <p class="mt-3 text-4xl font-semibold">
              {{ getValue("health", "94") }}%
            </p>

            <p class="mt-2 text-xs text-emerald-400">
              Systems operational
            </p>
          </div>

          <div class="p-7">
            <p class="text-sm text-slate-500">
              Current phase
            </p>

            <p class="mt-3 text-2xl font-semibold">
              {{ getValue("currentPhase", "Expansion") }}
            </p>

            <p class="mt-2 text-xs text-purple-300">
              Settlement development
            </p>
          </div>

        </div>
      </div>

      <!-- RESOURCE SECTION -->
      <div class="mt-28">

        <div class="mb-10 max-w-2xl">

          <div class="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-purple-300">
            <Orbit :size="16" />
            <span>Settlement systems</span>
          </div>

          <h2 class="text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything needed
            <span class="text-slate-500">
              to survive beyond Earth.
            </span>
          </h2>

        </div>

        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <!-- Water -->
          <div
            class="group rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
          >
            <div class="flex items-start justify-between">

              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300"
              >
                <Droplets :size="22" />
              </div>

              <span class="text-xs text-emerald-400">
                Stable
              </span>

            </div>

            <p class="mt-10 text-sm text-slate-500">
              Water
            </p>

            <p class="mt-2 text-4xl font-semibold">
              {{ getValue("water", "78") }}%
            </p>

            <div class="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                class="h-full rounded-full bg-cyan-400"
                :style="{ width: `${getValue('water', 78)}%` }"
              ></div>
            </div>
          </div>

          <!-- Oxygen -->
          <div
            class="group rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
          >
            <div class="flex items-start justify-between">

              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-300"
              >
                <Wind :size="22" />
              </div>

              <span class="text-xs text-emerald-400">
                Stable
              </span>

            </div>

            <p class="mt-10 text-sm text-slate-500">
              Oxygen
            </p>

            <p class="mt-2 text-4xl font-semibold">
              {{ getValue("oxygen", "91") }}%
            </p>

            <div class="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                class="h-full rounded-full bg-purple-400"
                :style="{ width: `${getValue('oxygen', 91)}%` }"
              ></div>
            </div>
          </div>

          <!-- Energy -->
          <div
            class="group rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
          >
            <div class="flex items-start justify-between">

              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-300"
              >
                <BatteryCharging :size="22" />
              </div>

              <span class="text-xs text-yellow-300">
                Monitoring
              </span>

            </div>

            <p class="mt-10 text-sm text-slate-500">
              Energy
            </p>

            <p class="mt-2 text-4xl font-semibold">
              {{ getValue("energy", "64") }}%
            </p>

            <div class="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                class="h-full rounded-full bg-yellow-300"
                :style="{ width: `${getValue('energy', 64)}%` }"
              ></div>
            </div>
          </div>

          <!-- Supplies -->
          <div
            class="group rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
          >
            <div class="flex items-start justify-between">

              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300"
              >
                <Rocket :size="22" />
              </div>

              <span class="text-xs text-emerald-400">
                Stable
              </span>

            </div>

            <p class="mt-10 text-sm text-slate-500">
              Supplies
            </p>

            <p class="mt-2 text-4xl font-semibold">
              {{ getValue("supplies", "82") }}%
            </p>

            <div class="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                class="h-full rounded-full bg-orange-300"
                :style="{ width: `${getValue('supplies', 82)}%` }"
              ></div>
            </div>
          </div>

        </div>
      </div>

      <!-- MISSION PROGRESS -->
      <div class="mt-28 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">

        <div
          class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-950/70 via-[#11132c] to-[#070a18] p-8 sm:p-10"
        >

          <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>

          <div class="relative">

            <div class="flex items-center justify-between">

              <div>
                <p class="text-sm uppercase tracking-[0.2em] text-purple-300">
                  Mission progress
                </p>

                <h3 class="mt-3 text-3xl font-semibold">
                  Artemis Habitat Alpha
                </h3>
              </div>

              <div class="hidden h-14 w-14 items-center justify-center rounded-full border border-purple-300/20 bg-purple-400/10 text-purple-300 sm:flex">
                <Moon :size="24" />
              </div>

            </div>

            <p class="mt-6 max-w-2xl leading-7 text-slate-400">
              Building a sustainable lunar settlement capable of
              supporting long-duration human presence on the Moon.
            </p>

            <div class="mt-10">

              <div class="mb-3 flex justify-between text-sm">
                <span class="text-slate-400">
                  Overall completion
                </span>

                <span class="font-medium text-white">
                  {{ getValue("progress", "72") }}%
                </span>
              </div>

              <div class="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
                  :style="{
                    width: `${getValue('progress', 72)}%`,
                  }"
                ></div>
              </div>

            </div>

          </div>
        </div>

        <!-- BASE ACTIVITY -->
        <div
          class="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8"
        >

          <div class="flex items-center gap-3">

            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300"
            >
              <Activity :size="21" />
            </div>

            <div>
              <p class="font-semibold">
                Base activity
              </p>

              <p class="text-xs text-slate-500">
                Live systems
              </p>
            </div>

          </div>

          <div class="mt-8 space-y-6">

            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">
                Oxygen systems
              </span>

              <span class="text-sm text-emerald-400">
                Operational
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">
                Power grid
              </span>

              <span class="text-sm text-emerald-400">
                Stable
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">
                Communications
              </span>

              <span class="text-sm text-emerald-400">
                Online
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">
                Life support
              </span>

              <span class="text-sm text-emerald-400">
                Normal
              </span>
            </div>

          </div>

        </div>

      </div>

      <!-- SYSTEMS -->
      <div class="mt-28">

        <div class="mb-10">

          <p class="text-sm uppercase tracking-[0.25em] text-purple-300">
            Infrastructure
          </p>

          <h2 class="mt-3 text-4xl font-semibold tracking-tight">
            Built for the
            <span class="text-slate-500">
              long journey.
            </span>
          </h2>

        </div>

        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          <div class="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7">
            <ShieldCheck class="text-purple-300" :size="24" />

            <h3 class="mt-6 text-xl font-semibold">
              Habitat protection
            </h3>

            <p class="mt-3 text-sm leading-6 text-slate-500">
              Protective systems designed to maintain safe
              living conditions in the lunar environment.
            </p>
          </div>

          <div class="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7">
            <Radio class="text-cyan-300" :size="24" />

            <h3 class="mt-6 text-xl font-semibold">
              Deep-space communications
            </h3>

            <p class="mt-3 text-sm leading-6 text-slate-500">
              Maintain reliable communication between the
              settlement and mission control.
            </p>
          </div>

          <div class="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7">
            <HeartPulse class="text-pink-300" :size="24" />

            <h3 class="mt-6 text-xl font-semibold">
              Crew wellbeing
            </h3>

            <p class="mt-3 text-sm leading-6 text-slate-500">
              Monitor crew health and ensure sustainable
              long-duration operations.
            </p>
          </div>

        </div>
      </div>

      <!-- CTA -->
      <div
        class="relative mt-28 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-purple-950 via-indigo-950 to-[#07101e] px-8 py-16 text-center sm:px-12"
      >

        <div class="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl"></div>

        <div class="relative">

          <Sparkles
            class="mx-auto text-purple-300"
            :size="28"
          />

          <h2 class="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            The Moon is only
            <span class="text-purple-300">
              the beginning.
            </span>
          </h2>

          <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400">
            Continue your exploration through AstroVerse and
            discover the missions taking humanity further.
          </p>

          <button
            @click="openMissions"
            class="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-purple-100"
          >
            Explore missions
            <ArrowUpRight :size="18" />
          </button>

        </div>
      </div>

    </section>

    <!-- FOOTER -->
    <footer class="border-t border-white/10 bg-[#03050d]">

      <div
        class="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-10"
      >

        <div class="flex items-center gap-3">

          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300"
          >
            <Rocket :size="17" />
          </div>

          <span>
            Astro<span class="text-purple-300">Verse</span>
          </span>

        </div>

        <p>
          Interactive space exploration & lunar mission planning.
        </p>

        <p>
          © 2026 AstroVerse
        </p>

      </div>

    </footer>

  </main>
</template>