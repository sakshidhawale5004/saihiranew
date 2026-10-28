import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Orders, Delivery & Ingredients | SAIHIRA" },
      { name: "description", content: "Answers about SAIHIRA Khakhras and Bhakhris: ingredients, shelf life, delivery, payment and bulk orders." },
      { property: "og:title", content: "Frequently Asked Questions | SAIHIRA" },
      { property: "og:description", content: "Everything you need to know about ordering our handmade snacks." },
    ],
  }),
  component: Faq,
});

const faqs = [
  ["Are your Khakhras and Bhakhris handmade?", "Yes. Every piece is rolled and roasted by hand in small batches."],
  ["Are they fried?", "No. Our snacks are roasted and baked, never deep fried."],
  ["Do you have options without onion and garlic?", "Yes, many of our flavours are free of onion and garlic. Check each product's notes."],
  ["Which products are suitable for fasting?", "Our Farali Khakhra and Farali Bhakhri are made for vrat and fasting days."],
  ["What is the shelf life?", "Best enjoyed within 2–3 months of packing. Store in an airtight container after opening."],
  ["How much is delivery?", "Delivery is free on orders above ₹499. Smaller orders have a flat ₹50 fee."],
  ["How long does delivery take?", "Orders usually reach you in 3–7 working days, depending on your city."],
  ["How can I pay?", "Currently we accept Cash on Delivery and UPI on delivery."],
  ["Do you take bulk or gifting orders?", "Yes! Contact us for festive hampers, corporate gifting and bulk orders."],
];

function Faq() {
  return (
    <>
      <PageTitle eyebrow="Help" title="Frequently Asked Questions" sub="Can't find your answer? Write to us on the contact page." />
      <div className="mx-auto max-w-3xl space-y-4 px-6 py-16">
        {faqs.map(([q, a]) => (
          <details key={q} className="group rounded-xl border border-border bg-card p-5 open:shadow-deep">
            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg text-primary">
              {q}<span className="text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
