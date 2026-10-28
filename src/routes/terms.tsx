import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import HERO_IMG from "@/assets/editorial/khakhra-platter.jpg";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — SAIHIRA · SHM Asal" },
      { name: "description", content: "Terms of service, usage guidelines, ordering policies, and conditions for purchasing from SAIHIRA." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Commercial Terms"
        title={
          <>
            Terms & <em>Conditions</em>
          </>
        }
        subtitle="Transparent terms governing orders, packaging, shipping, and purchases from SAIHIRA (SHM Asal)."
        image={HERO_IMG}
        badge="Estd. 1994 · Handcrafted Excellence"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Terms & Conditions" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="space-y-12">
          {/* Section 1 */}
          <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-accent">Article 01</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-primary">
              Acceptance of Terms
            </h2>
            <div className="mt-4 space-y-3 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>
                By accessing, browsing, or purchasing from SAIHIRA (operating under the brand <strong>SHM Asal</strong>), you agree to be bound by these Terms and Conditions and our Privacy Policy.
              </p>
              <p>
                If you do not agree with any part of these terms, please refrain from using our online store and services.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-accent">Article 02</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-primary">
              Handmade Product Variations & Descriptions
            </h2>
            <div className="mt-4 space-y-3 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>
                All our Khakhras and Bhakhris are authentically rolled, pressed, and roasted by human hands. Because our snacks are genuinely artisanal and not machine-extruded:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Slight variations in thickness, circumference, roasting shade, and surface blisters are natural characteristics of authentic tawa baking.</li>
                <li>Product weights mentioned (typically 200g pouches) represent standard minimum quantities.</li>
                <li>Product imagery on our website represents actual batches produced in our kitchens.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-accent">Article 03</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-primary">
              Pricing, Payment & Taxation
            </h2>
            <div className="mt-4 space-y-3 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>
                All prices are stated in Indian National Rupees (INR ₹) and are inclusive of applicable GST taxes.
              </p>
              <p>
                We reserve the right to revise product prices or launch promotional seasonal pricing at our discretion. Payment must be successfully authorized via UPI, debit/credit cards, net banking, or approved wallets before orders are dispatched.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-accent">Article 04</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-primary">
              Domestic Shipping & Delivery Timelines
            </h2>
            <div className="mt-4 space-y-3 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>
                Orders are freshly packed and dispatched within 24 to 48 hours from Mumbai, Maharashtra. Standard courier transit takes 3 to 7 business days depending on delivery pincodes across India.
              </p>
              <p>
                While we partner with reputable courier networks (BlueDart, Delhivery, DTDC), delays caused by weather conditions, regional holidays, or festive delivery surges are beyond our direct operational control.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
