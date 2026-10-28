import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useCart, shippingFor, SHIPPING_FREE_ABOVE } from "@/lib/cart";
import { formatINR } from "@/lib/products";
import HERO_IMG from "@/assets/editorial/khakhra-stack.jpg";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Snacking Bag | SAIHIRA" },
      { name: "description", content: "Review the Khakhras and Bhakhris in your cart." },
      { property: "og:title", content: "Your Cart | SAIHIRA" },
      { property: "og:description", content: "Review your handmade snack order." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { lines, subtotal, setQty, remove } = useCart();
  const ship = shippingFor(subtotal);

  return (
    <>
      <PageHero
        eyebrow="Your Order"
        title={
          <>
            Your Shopping <em>Cart</em>
          </>
        }
        subtitle="Freshly pressed batches ready to be packed and dispatched straight to your doorstep."
        image={HERO_IMG}
        badge="Free Shipping on Orders Above ₹499"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Cart" },
        ]}
      />

      <div className="mx-auto max-w-5xl px-6 py-14">
        {lines.length === 0 ? (
          <div className="rounded-2xl border border-border/80 bg-card p-12 text-center shadow-sm">
            <span className="font-serif text-5xl text-accent">🧺</span>
            <h3 className="mt-4 font-display text-2xl font-medium text-primary">Your cart is empty</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover our 19 handmade Gujarati flavours and treat yourself to authentic crunch.
            </p>
            <Link to="/products" className="btn-warm mt-6 inline-flex">
              Explore The Flavours →
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-3">
            <div className="space-y-4 md:col-span-2">
              {lines.map((l) => (
                <div
                  key={l.slug}
                  className="flex items-center gap-4 rounded-xl border border-border/80 bg-card p-4 shadow-sm transition-all hover:border-accent/40"
                >
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    className="h-20 w-20 rounded-lg object-contain bg-secondary/30 p-2"
                  />
                  <div className="flex-1">
                    <Link
                      to="/products/$slug"
                      params={{ slug: l.slug }}
                      className="font-display text-lg font-medium text-primary hover:text-accent"
                    >
                      {l.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {formatINR(l.product.price)} · {l.product.weight}
                    </p>
                  </div>
                  <div className="flex items-center rounded-full border border-border/80 bg-card">
                    <button
                      className="px-3 py-1 text-primary hover:text-accent font-semibold"
                      onClick={() => setQty(l.slug, l.qty - 1)}
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-xs font-semibold">{l.qty}</span>
                    <button
                      className="px-3 py-1 text-primary hover:text-accent font-semibold"
                      onClick={() => setQty(l.slug, l.qty + 1)}
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                  <span className="w-20 text-right font-display text-base font-semibold text-primary">
                    {formatINR(l.qty * l.product.price)}
                  </span>
                  <button
                    onClick={() => remove(l.slug)}
                    className="text-xs text-muted-foreground hover:text-destructive p-1"
                    aria-label="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <Summary subtotal={subtotal} ship={ship}>
              <Link to="/checkout" className="btn-warm mt-6 w-full justify-center">
                <span>Proceed to Checkout</span>
                <span>→</span>
              </Link>
            </Summary>
          </div>
        )}
      </div>
    </>
  );
}

export function Summary({
  subtotal,
  ship,
  children,
}: {
  subtotal: number;
  ship: number;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 pt-8 shadow-sm h-fit">
      <h2 className="font-display text-2xl font-medium text-primary">Order Summary</h2>
      <div className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-primary">{formatINR(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Delivery</span>
          <span className="font-medium text-primary">{ship === 0 ? "Free" : formatINR(ship)}</span>
        </div>
        {ship > 0 && (
          <p className="text-xs text-accent bg-accent/10 p-2 rounded-lg">
            Add {formatINR(SHIPPING_FREE_ABOVE - subtotal)} more for Free Pan-India Delivery!
          </p>
        )}
        <div className="flex justify-between border-t border-border/70 pt-3 text-lg font-semibold text-primary">
          <span>Total</span>
          <span className="font-display text-xl text-primary">{formatINR(subtotal + ship)}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
