import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import HERO_IMG from "@/assets/editorial/methi-khakhra-1.jpg";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | SAIHIRA · SHM Asal" },
      { name: "description", content: "Answers about SAIHIRA Khakhras and Bhakhris: ingredients, shelf life, delivery, payment and bulk orders." },
      { property: "og:title", content: "Frequently Asked Questions | SAIHIRA" },
      { property: "og:description", content: "Everything you need to know about ordering our handmade snacks." },
    ],
  }),
  component: Faq,
});

const faqs = [
  ["Are your Khakhras and Bhakhris 100% handmade?", "Yes! Every single piece is hand-rolled and slow-roasted on seasoned iron tawas by trained culinary artisans in small batches."],
  ["Are any of your snacks deep fried?", "Never. SAIHIRA snacks are 100% roasted and baked on cast-iron tawas with minimal cold-pressed oil — giving you clean crunch with zero oily heaviness."],
  ["Do you have Jain and Sattvik options (no onion, no garlic)?", "Yes, many of our 19 signature flavours are made without onion or garlic in strict accordance with pure sattvik traditions. Look for the Jain-friendly badge on each product."],
  ["Which products are suitable for Upvas (fasting)?", "Our Farali Khakhra and Farali Bhakhri are prepared specifically for vrat, made with rajgira, moraiyo, rock salt (sendha namak), and authentic spices."],
  ["What is the shelf life and storage recommendation?", "Our vacuum pouches keep snacks fresh and crisp for up to 3 months from packing. Once opened, simply transfer to an airtight stainless steel or glass tin."],
  ["How much does shipping cost?", "We offer Free Shipping across India on all orders above ₹499. For smaller trial orders, a nominal flat delivery charge of ₹50 applies."],
  ["How long does delivery take?", "Fresh batches are packed and dispatched from Mumbai within 24–48 hours. Most metropolitan locations receive delivery within 3 to 5 business days."],
  ["What payment modes do you accept?", "We accept all major UPI apps (Google Pay, PhonePe, Paytm), Debit/Credit cards, Net Banking, and Cash on Delivery."],
  ["Do you curate custom festive and corporate gifting hampers?", "Absolutely! We specialize in custom festive hampers (Diwali, Paryushan, New Year, weddings) with branded boxes and customized flavor assortments."],
];

function Faq() {
  return (
    <>
      <PageHero
        eyebrow="Help & Answers"
        title={
          <>
            Frequently Asked <em>Questions</em>
          </>
        }
        subtitle="Clear details about our ingredients, slow-roast craft, shelf-life, shipping timelines, and custom gifting."
        image={HERO_IMG}
        badge="Zero Preservatives · Pan-India Dispatch"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "FAQ" },
        ]}
      />

      <div className="mx-auto max-w-3xl space-y-4 px-6 py-16 sm:py-20">
        {faqs.map(([q, a]) => (
          <details
            key={q}
            className="group rounded-2xl border border-border/80 bg-card p-6 transition-all duration-300 open:border-accent/40 open:shadow-deep"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-xl font-medium text-primary">
              <span>{q}</span>
              <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground border-t border-border/60 pt-4">
              {a}
            </p>
          </details>
        ))}
      </div>
    </>
  );
}
