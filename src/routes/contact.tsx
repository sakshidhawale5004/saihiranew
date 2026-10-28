import contactImg from "@/assets/editorial/methi-khakhra-3.jpg";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SAIHIRA — Orders, Corporate Gifting & Support" },
      { name: "description", content: "Get in touch with SAIHIRA for festive gifting, corporate orders, wholesale, or questions about our handmade snacks." },
      { property: "og:title", content: "Contact SAIHIRA · SHM Asal" },
      { property: "og:description", content: "Order or enquire about our handmade snacks." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-xl border border-input bg-card px-5 py-3.5 font-sans text-sm outline-none transition duration-200 focus:border-accent focus:ring-1 focus:ring-accent";

  return (
    <>
      <PageHero
        eyebrow="Say Hello · Corporate & Gifting"
        title={
          <>
            Let's Talk <em>Crunch</em>
          </>
        }
        subtitle="Custom festive gift boxes, pan-India wholesale distribution, and friendly customer care for every tea-time crunch."
        image={contactImg}
        badge="Direct Kitchen Support · Rapid Dispatch"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Contact Us" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal>
              <span className="eyebrow">Get in touch</span>
              <h2 className="mt-3 font-display text-4xl font-medium text-primary">
                We'd love to hear from you.
              </h2>
              <p className="mt-4 font-sans text-muted-foreground leading-relaxed">
                Whether you're curating 500 bespoke festive hampers for Diwali, looking for Jain or Farali snack options, or simply reordering your family favourites.
              </p>
            </Reveal>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-border/80 bg-card p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent text-lg">
                  ✉
                </div>
                <div>
                  <h4 className="font-display text-lg font-medium text-primary">Email Support</h4>
                  <p className="text-xs text-muted-foreground">General enquiries, quotes & orders</p>
                  <a href="mailto:hello@saihira.com" className="mt-1 block font-medium text-accent hover:underline">
                    hello@saihira.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-border/80 bg-card p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent text-lg">
                  📍
                </div>
                <div>
                  <h4 className="font-display text-lg font-medium text-primary">Artisan Kitchen & Offices</h4>
                  <p className="text-xs text-muted-foreground">Mumbai, Maharashtra, India</p>
                  <p className="mt-1 text-xs text-muted-foreground">Express pan-India courier delivery</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-border/80 bg-card p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent text-lg">
                  🎁
                </div>
                <div>
                  <h4 className="font-display text-lg font-medium text-primary">Festive & Corporate Gifting</h4>
                  <p className="text-xs text-muted-foreground">Branded packaging & custom assortments</p>
                  <span className="mt-1 inline-block text-xs font-semibold text-accent uppercase tracking-wider">
                    Bulk Discounts Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact / Inquiry Form */}
          <div className="lg:col-span-7">
            <Reveal>
              {sent ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-deep">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
                    ✓
                  </div>
                  <h3 className="font-display text-3xl font-medium text-primary">Thank you for writing to us!</h3>
                  <p className="mt-3 font-sans text-muted-foreground max-w-md mx-auto">
                    We have received your message and our team will get back to you with all details within 24 business hours.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-warm mt-8">
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-5 rounded-2xl border border-border/80 bg-card p-8 sm:p-10 shadow-deep"
                >
                  <h3 className="font-display text-2xl font-medium text-primary">Send us an inquiry</h3>
                  <p className="text-xs text-muted-foreground">Fill in the details below and we'll reply promptly.</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Your Name *
                      </label>
                      <input required placeholder="e.g. Priya Shah" className={field} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Phone Number
                      </label>
                      <input placeholder="+91 98765 43210" className={field} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email Address *
                    </label>
                    <input required type="email" placeholder="priya@example.com" className={field} />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Purpose of Enquiry
                    </label>
                    <select className={field}>
                      <option>Festive / Corporate Gifting (Bulk)</option>
                      <option>Personal Order Question</option>
                      <option>Wholesale & Retail Stockist</option>
                      <option>General Feedback / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Message & Preferred Flavours *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your requirement, quantities, or which flavours you are craving..."
                      className={field}
                    />
                  </div>

                  <button className="btn-warm w-full justify-center">
                    <span>Submit Inquiry</span>
                    <span>→</span>
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
