import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle } from "@/components/site";
import { useCart, shippingFor, SHIPPING_FREE_ABOVE } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | SAIHIRA" },
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
      <PageTitle eyebrow="Shopping" title="Your Cart" />
      <div className="mx-auto max-w-5xl px-6 py-14">
        {lines.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/products" className="btn-warm mt-6">Browse flavours</Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-3">
            <div className="space-y-4 md:col-span-2">
              {lines.map((l) => (
                <div key={l.slug} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                  <img src={l.product.image} alt={l.product.name} className="h-20 w-20 rounded-md object-contain" />
                  <div className="flex-1">
                    <Link to="/products/$slug" params={{ slug: l.slug }} className="font-display text-lg text-primary">{l.product.name}</Link>
                    <p className="text-sm text-muted-foreground">{formatINR(l.product.price)} · {l.product.weight}</p>
                  </div>
                  <div className="flex items-center rounded-full border border-border">
                    <button className="px-3 py-1" onClick={() => setQty(l.slug, l.qty - 1)} aria-label="Decrease">−</button>
                    <span className="w-6 text-center">{l.qty}</span>
                    <button className="px-3 py-1" onClick={() => setQty(l.slug, l.qty + 1)} aria-label="Increase">+</button>
                  </div>
                  <span className="w-20 text-right font-semibold">{formatINR(l.qty * l.product.price)}</span>
                  <button onClick={() => remove(l.slug)} className="text-sm text-muted-foreground hover:text-destructive" aria-label="Remove">✕</button>
                </div>
              ))}
            </div>
            <Summary subtotal={subtotal} ship={ship}>
              <Link to="/checkout" className="btn-warm mt-6 w-full justify-center">Proceed to checkout</Link>
            </Summary>
          </div>
        )}
      </div>
    </>
  );
}

export function Summary({ subtotal, ship, children }: { subtotal: number; ship: number; children?: React.ReactNode }) {
  return (
    <div className="frame h-fit p-6 pt-10">
      <h2 className="text-2xl">Order summary</h2>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
        <div className="flex justify-between"><span>Delivery</span><span>{ship === 0 ? "Free" : formatINR(ship)}</span></div>
        {ship > 0 && <p className="text-xs text-muted-foreground">Add {formatINR(SHIPPING_FREE_ABOVE - subtotal)} more for free delivery.</p>}
        <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-primary"><span>Total</span><span>{formatINR(subtotal + ship)}</span></div>
      </div>
      {children}
    </div>
  );
}
