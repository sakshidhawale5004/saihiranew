import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { useCart, shippingFor } from "@/lib/cart";
import { formatINR } from "@/lib/products";
import { Summary } from "./cart";
import HERO_IMG from "@/assets/editorial/khakhra-platter.jpg";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | SAIHIRA · SHM Asal" },
      { name: "description", content: "Enter your delivery details to place your SAIHIRA order." },
      { property: "og:title", content: "Checkout | SAIHIRA" },
      { property: "og:description", content: "Place your order for handmade Khakhras and Bhakhris." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);
  const ship = shippingFor(subtotal);

  if (orderId)
    return (
      <>
        <PageHero
          eyebrow="Order Confirmed"
          title={
            <>
              Thank You for Your <em>Order!</em>
            </>
          }
          subtitle={`Order #${orderId} is being freshly packed at our kitchen and prepared for dispatch.`}
          image={HERO_IMG}
          badge="Order Placed Successfully"
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Order Confirmed" },
          ]}
        />
        <div className="mx-auto max-w-lg px-6 py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600 shadow-sm">
            ✓
          </div>
          <h2 className="font-display text-3xl font-medium text-primary">Your crunch is on the way!</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Your tracking ID will be sent via SMS & Email. Our Mumbai team will connect if any delivery verification is required.
          </p>
          <Link to="/products" className="btn-warm mt-8">
            Continue Shopping →
          </Link>
        </div>
      </>
    );

  return (
    <>
      <PageHero
        eyebrow="Final Step"
        title={
          <>
            Complete Your <em>Order</em>
          </>
        }
        subtitle="Provide your shipping destination for safe, insulated doorstep delivery across India."
        image={HERO_IMG}
        badge="Secure Checkout · Direct Kitchen Dispatch"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Cart", to: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <div className="mx-auto max-w-5xl px-6 py-14">
        {lines.length === 0 ? (
          <div className="rounded-2xl border border-border/80 bg-card p-12 text-center shadow-sm">
            <p className="text-muted-foreground">Your shopping bag is empty.</p>
            <Link to="/products" className="btn-warm mt-6">
              Browse Flavours →
            </Link>
          </div>
        ) : (
          <form
            className="grid gap-10 md:grid-cols-3"
            onSubmit={(e) => {
              e.preventDefault();
              setOrderId(`SH${Date.now().toString().slice(-6)}`);
              clear();
            }}
          >
            <div className="space-y-6 md:col-span-2">
              <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
                <h3 className="font-display text-2xl font-medium text-primary mb-4">Delivery Details</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Full Name *
                      </label>
                      <input required placeholder="Full name" className="field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Phone Number *
                      </label>
                      <input required type="tel" placeholder="10-digit mobile number" className="field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Email Address *
                    </label>
                    <input required type="email" placeholder="For order tracking & invoice" className="field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Complete Address *
                    </label>
                    <input required placeholder="Flat/House no., building, street" className="field" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        City *
                      </label>
                      <input required placeholder="City" className="field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        State *
                      </label>
                      <input required placeholder="State" className="field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        PIN Code *
                      </label>
                      <input required placeholder="6-digit PIN" pattern="[0-9]{6}" className="field" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
                <h3 className="font-display text-2xl font-medium text-primary mb-4">Payment Method</h3>
                <label className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-4 cursor-pointer">
                  <input type="radio" name="pay" defaultChecked className="text-accent" />
                  <div>
                    <span className="font-semibold text-primary block">UPI / Cash on Delivery</span>
                    <span className="text-xs text-muted-foreground">Pay safely via GooglePay, PhonePe, Paytm, or Cash upon delivery</span>
                  </div>
                </label>
              </div>
            </div>

            <Summary subtotal={subtotal} ship={ship}>
              <ul className="mt-4 space-y-2 border-t border-border/70 pt-3 text-xs text-muted-foreground">
                {lines.map((l) => (
                  <li key={l.slug} className="flex justify-between">
                    <span>
                      {l.product.name} × {l.qty}
                    </span>
                    <span className="font-medium text-primary">{formatINR(l.qty * l.product.price)}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-warm mt-6 w-full justify-center">
                <span>Place Order Now</span>
                <span>→</span>
              </button>
            </Summary>
          </form>
        )}
      </div>
    </>
  );
}
