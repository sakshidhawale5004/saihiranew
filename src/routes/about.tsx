import aboutImg from "@/assets/editorial/methi-khakhra-2.jpg";
import heroImg from "@/assets/editorial/khakhra-platter.jpg";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal, Tilt } from "@/components/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SAIHIRA — Our Heritage Story & Leadership" },
      { name: "description", content: "Meet the team behind SAIHIRA, bringing over three decades of experience to handmade Khakhras and Bhakhris." },
      { property: "og:title", content: "About SAIHIRA · SHM Asal" },
      { property: "og:description", content: "Our mentor, our story and the team behind SHM Asal." },
    ],
  }),
  component: About,
});

const team = [
  {
    name: "Reshma Udasi",
    role: "Co-Founder & Quality Head",
    bio: "A post-graduate in Science from Mumbai University with a strong foundation in research (4 years at IIT-Mumbai) and extensive leadership experience (22 years as Country Head in supply chain and administration).",
  },
  {
    name: "Ria Ahuja",
    role: "Co-Founder & Operations",
    bio: "A post-graduate Science degree from Mumbai University and B.Ed. qualification. 11 years as a Chemistry Professor at a prestigious Mumbai college, with 20 years of success in HR management (over 600 employees) and key retail accounts.",
  },
  {
    name: "Mahesh Ahuja",
    role: "Master Baker & Distribution",
    bio: "A Commerce graduate from Mumbai University with 40 years across finance, retail, exports, construction, and distribution. A proven track record managing procurement and retail — and a certified master baker.",
  },
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
    <>
      <PageHero
        eyebrow="Our Heritage & Philosophy"
        title={
          <>
            A Venture Born of <em>Devotion</em>
          </>
        }
        subtitle="Bringing over three decades of authentic Gujarati culinary expertise and uncompromising purity to every batch."
        image={heroImg}
        badge="Guided by Saihira · 100% Sattvik Integrity"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "About Us" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">The Craft Behind Every Crunch</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-medium text-primary leading-tight">
              Honouring Gujarati Kitchen Traditions
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-muted-foreground">
              <p>
                In an era dominated by automated factories and industrial extrusion, SAIHIRA remains steadfastly faithful to the age-old art of the tawa roast.
              </p>
              <p>
                Every morning, fresh dough is kneaded with stone-ground flours, toasted jeera, fragrant kasuri methi, and cold-pressed oils. Our artisans roll each disc paper-thin before pressing it over seasoned iron tawas with wooden blocks until golden and crisp.
              </p>
            </div>
          </Reveal>
          <div className="overflow-hidden rounded-2xl border-2 border-border/80 shadow-luxury">
            <img
              src={aboutImg}
              alt="Paper-thin hand-roasted fenugreek khakhras"
              className="h-[380px] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Guru Devotion Inscription */}
        <section className="relative my-20 overflow-hidden rounded-3xl border border-accent/30 bg-card p-10 sm:p-16 text-center shadow-deep">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
            <span className="font-serif text-xl">ॐ</span>
          </div>
          <span className="eyebrow mb-4">Dedicated to our Mentor</span>
          <div className="mx-auto max-w-2xl space-y-2">
            {poem.map((l, i) => (
              <Reveal key={i} delay={i * 60}>
                <p
                  className={`font-display ${
                    l.includes("SAIHIRA")
                      ? "text-primary text-3xl sm:text-4xl font-semibold"
                      : "text-xl sm:text-2xl text-muted-foreground"
                  } py-1 italic`}
                >
                  {l}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <div className="text-center">
          <span className="eyebrow">Guiding Hands</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-primary">
            Decades of Leadership
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            A harmonious combination of scientific research, university pedagogy, and master commercial baking.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {team.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <Tilt className="h-full rounded-2xl border border-border/80 bg-card p-8 shadow-sm transition-all hover:border-accent/40 hover:shadow-deep">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-display text-2xl text-primary-foreground shadow-sm"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {t.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium text-primary">{t.name}</h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">{t.role}</span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
