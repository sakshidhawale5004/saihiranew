import aboutImg from "@/assets/editorial/methi-khakhra-2.jpg";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal, Tilt } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SAIHIRA — Our Story & Team" },
      { name: "description", content: "Meet the team behind SAIHIRA, bringing over three decades of experience to handmade Khakhras and Bhakhris." },
      { property: "og:title", content: "About SAIHIRA" },
      { property: "og:description", content: "Our mentor, our story and the team behind SHM Asal." },
    ],
  }),
  component: About,
});

const team = [
  { name: "Reshma Udasi", bio: "A post-graduate in Science from Mumbai University with a strong foundation in research (4 years at IIT-Mumbai) and extensive leadership experience (22 years as Country Head in supply chain and administration)." },
  { name: "Ria Ahuja", bio: "A post-graduate Science degree from Mumbai University and a B.Ed. qualification. 11 years as a Chemistry Professor at a prestigious Mumbai college, with 20 years of success in HR management (over 600 employees), key retail accounts and PR initiatives." },
  { name: "Mahesh Ahuja", bio: "A Commerce graduate from Mumbai University with 40 years across finance, retail, exports, construction, and import & distribution. A proven track record managing procurement, logistics, distribution and retail — and a certified baker." },
];

const poem = [
  "HE, who has been our constant friend and guide",
  "HE, who has given us our pride",
  "In whatever we do",
  "HE, who has taught us to be right",
  "In the eyes of the ALMIGHTY",
  "HE is our Mentor, our Guru — SAIHIRA",
  "We strive to make this venture",
  "A part of HIS dream",
  "And of HIS Consort — Nanda",
];

function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-14">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <span className="eyebrow">About SAIHIRA</span>
          <h1 className="mt-4 text-6xl md:text-7xl">A venture <em>born of devotion</em></h1>
        </Reveal>
        <div className="overflow-hidden rounded-2xl border border-border/80 shadow-deep">
          <img src={aboutImg} alt="Paper-thin hand-roasted fenugreek khakhras" className="h-[360px] w-full object-cover transition-transform duration-700 hover:scale-105" />
        </div>
      </div>

      <section className="mx-auto max-w-2xl py-24 text-center">
        {poem.map((l, i) => (
          <Reveal key={i} delay={i * 80}>
            <p className={`font-display ${l.includes("SAIHIRA") ? "text-primary text-4xl font-semibold" : "text-2xl text-muted-foreground"} py-1 italic`}>{l}</p>
          </Reveal>
        ))}
      </section>

      <Reveal>
        <span className="eyebrow">About us</span>
        <h2 className="mt-4 max-w-2xl text-5xl">We bring over three decades of experience to the table.</h2>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {team.map((t, i) => (
          <Reveal key={t.name} delay={i * 150}>
            <Tilt className="h-full rounded-3xl border border-border bg-card p-8 shadow-deep">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-display text-2xl text-primary-foreground" style={{ transform: "translateZ(40px)" }}>
                {t.name.split(" ").map((w) => w[0]).join("")}
              </div>
              <h3 className="mt-6 text-2xl">{t.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
