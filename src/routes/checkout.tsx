import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle } from "@/components/site";
import { useCart, shippingFor } from "@/lib/cart";
import { formatINR } from "@/lib/products";
import { Summary } from "./cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | SAIHIRA" },
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
        <PageTitle eyebrow="Thank you" title="Order placed!" />
        <div className="mx-auto max-w-lg px-6 py-14 text-center">
          <p className="text-muted-foreground">Your order number is <strong className="text-primary">{orderId}</strong>. We'll call you shortly to confirm delivery.</p>
          <Link to="/products" className="btn-warm mt-8">Continue shopping</Link>
        </div>
      </>
    );

  return (
    <>
      <PageTitle eyebrow="Almost there" title="Checkout" />
      <div className="mx-auto max-w-5xl px-6 py-14">
        {lines.length === 0 ? (
          <div className="text-center"><p className="text-muted-foreground">Your cart is empty.</p><Link to="/products" className="btn-warm mt-6">Browse flavours</Link></div>
        ) : (
          <form
            className="grid gap-10 md:grid-cols-3"
            onSubmit={(e) => { e.preventDefault(); setOrderId(`SH${Date.now().toString().slice(-6)}`); clear(); }}
          >
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-2xl">Delivery details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Full name" className="field" />
                <input required type="tel" placeholder="Phone number" className="field" />
              </div>
              <input required type="email" placeholder="Email" className="field" />
              <input required placeholder="Address" className="field" />
              <div className="grid gap-4 sm:grid-cols-3">
                <input required placeholder="City" className="field" />
                <input required placeholder="State" className="field" />
                <input required placeholder="PIN code" pattern="[0-9]{6}" className="field" />
              </div>
              <h2 className="pt-4 text-2xl">Payment</h2>
              <label className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"><input type="radio" name="pay" defaultChecked /> Cash / UPI on delivery</label>
            </div>
            <Summary subtotal={subtotal} ship={ship}>
              <ul className="mt-4 space-y-1 border-t border-border pt-3 text-sm text-muted-foreground">
                {lines.map((l) => <li key={l.slug} className="flex justify-between"><span>{l.product.name} × {l.qty}</span><span>{formatINR(l.qty * l.product.price)}</span></li>)}
              </ul>
              <button className="btn-warm mt-6 w-full justify-center">Place order</button>
            </Summary>
          </form>
        )}
      </div>
    </>
  );
}
