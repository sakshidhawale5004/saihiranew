import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import HERO_IMG from "@/assets/editorial/methi-khakhra-2.jpg";

export const Route = createFileRoute("/return-policy")({
  head: () => ({
    meta: [
      { title: "Return & Refund Policy — SAIHIRA · SHM Asal" },
      {
        name: "description",
        content:
          "Learn about our freshness guarantee, replacement terms, and refund policy for handmade Khakhras and Bhakhris.",
      },
    ],
  }),
  component: ReturnPolicyPage,
});

function ReturnPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer Trust & Quality"
        title={
          <>
            Return & <em>Refund Policy</em>
          </>
        }
        subtitle="Our commitment to handmade freshness, safe food handling, and complete patron satisfaction."
        image={HERO_IMG}
        badge="Freshness Guaranteed · 48-Hour Resolution"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Return Policy" }]}
      />

      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="space-y-12">
          {/* Section 1 */}
          <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-accent">
              Section 01
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-primary">
              Freshness & Craftsmanship Guarantee
            </h2>
            <div className="mt-4 space-y-3 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>
                At SAIHIRA (SHM Asal), each Khakhra and Bhakhri is rolled by hand, slow-roasted on
                cast-iron tawas in small artisan batches, and vacuum-sealed immediately to ensure
                maximum crispness and aroma.
              </p>
              <p>
                Due to the perishable and culinary nature of our handmade food products, we do not
                accept routine returns or exchanges once an order has been successfully delivered
                and unsealed.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-accent">
              Section 02
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-primary">
              Damaged, Tampered, or Incorrect Shipments
            </h2>
            <div className="mt-4 space-y-3 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>
                We take utmost care with custom bubble cushioning and heavy-duty corrugated cartons
                to safeguard your crunch. However, if your parcel arrives in any of the following
                states:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Package visibly damaged, crushed, or tampered with during transit.</li>
                <li>Incorrect flavor or quantity received against your order invoice.</li>
                <li>Prematurely unsealed vacuum pouch compromising freshness upon arrival.</li>
              </ul>
              <p>
                We will immediately arrange a <strong>free replacement</strong> or issue a{" "}
                <strong>full refund</strong> to your original payment method.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-accent">
              Section 03
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-primary">
              How to Claim a Replacement or Refund
            </h2>
            <div className="mt-4 space-y-4 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Notify us within 48 hours:</strong> Send an email to{" "}
                  <a href="mailto:hello@saihira.com" className="text-accent underline">
                    hello@saihira.com
                  </a>{" "}
                  or WhatsApp our support line with your Order ID.
                </li>
                <li>
                  <strong>Attach clear photos or video:</strong> Include photographs showing the
                  outer parcel label, condition of the package, and the affected items.
                </li>
                <li>
                  <strong>Swift Evaluation:</strong> Our quality assurance team will inspect the
                  issue and confirm replacement dispatch or refund approval within 24 business
                  hours.
                </li>
              </ol>
            </div>
          </div>

          {/* Section 4 */}
          <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-accent">
              Section 04
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-primary">
              Order Cancellation
            </h2>
            <div className="mt-4 space-y-3 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>
                Orders can be cancelled free of charge if the request is received before the batch
                has been packed and handed over to our logistics courier partners (typically within
                4 hours of order placement).
              </p>
              <p>
                Once handed over for transit, orders cannot be cancelled mid-route. Approved refunds
                are credited back to the original source account within 3 to 5 banking days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
