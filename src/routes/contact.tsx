import contactImg from "@/assets/editorial/methi-khakhra-3.jpg";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SAIHIRA — Order Khakhras & Bhakhris" },
      { name: "description", content: "Get in touch with SAIHIRA to order handmade Khakhras and Bhakhris or ask a question." },
      { property: "og:title", content: "Contact SAIHIRA" },
      { property: "og:description", content: "Order or enquire about our handmade snacks." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-2xl border border-input bg-card px-5 py-4 outline-none transition focus:border-primary";
  return (
    <div className="mx-auto grid max-w-6xl gap-14 px-6 pt-14 md:grid-cols-2">
      <div>
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h1 className="mt-4 text-6xl">Let's talk <em>crunch</em></h1>
          <p className="mt-6 text-muted-foreground">Orders, bulk enquiries or just a hello — we'd love to hear from you.</p>
          <div className="mt-8 space-y-2">
            <p>hello@saihira.com</p>
            <p className="text-muted-foreground">Mumbai, India</p>
          </div>
        </Reveal>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/80 shadow-deep">
          <img src={contactImg} alt="Artisanal Methi Khakhra tea spread" className="h-[300px] w-full object-cover transition-transform duration-700 hover:scale-105" />
        </div>
      </div>
      <Reveal>
        {sent ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-deep">
            <h2 className="text-3xl">Thank you!</h2>
            <p className="mt-3 text-muted-foreground">We'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4 rounded-3xl border border-border bg-card/60 p-8 shadow-deep">
            <input required placeholder="Your name" className={field} />
            <input required type="email" placeholder="Email" className={field} />
            <input placeholder="Phone" className={field} />
            <textarea required rows={5} placeholder="Which flavours are you craving?" className={field} />
            <button className="btn-warm w-full justify-center">Send message</button>
          </form>
        )}
      </Reveal>
    </div>
  );
}
