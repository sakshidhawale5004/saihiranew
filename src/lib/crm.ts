import type { Product } from "./products";

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Completed";

export interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  items: string;
  total: number;
  status: OrderStatus;
  date: string;
  time?: string;
  note?: string;
  source?: "Store Checkout" | "WhatsApp Checkout" | "Direct Concierge";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  segment: "VIP Reserve" | "Regular Patron" | "Festive Corporate" | "Wholesale Partner";
  ordersCount: number;
  totalSpend: number;
  lastOrder: string;
}

export type InquiryStatus = "New" | "Contacted" | "In Discussion" | "Resolved";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  date: string;
  time?: string;
  status: InquiryStatus;
}

const ORDERS_KEY = "saihira_crm_orders";
const CUSTOMERS_KEY = "saihira_crm_customers";
const INQUIRIES_KEY = "saihira_crm_inquiries";

// IDs of any dummy/mock records that should never appear as duplicate info
const DUMMY_ORDER_IDS = new Set(["SH-849201", "SH-849202", "SH-849203", "SH-849204"]);
const DUMMY_INQUIRY_IDS = new Set(["INQ-201", "INQ-202"]);
const DUMMY_CUSTOMER_IDS = new Set([
  "CUST-1001",
  "CUST-1002",
  "CUST-1003",
  "CUST-1004",
  "CUST-1005",
]);

/* ---------------- Orders API ---------------- */

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed: Order[] = JSON.parse(raw);
    // Filter out any legacy dummy/mock orders to avoid duplicate fake info
    const clean = parsed.filter((o) => !DUMMY_ORDER_IDS.has(o.id));
    if (clean.length !== parsed.length) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(clean));
    }
    return clean;
  } catch {
    return [];
  }
}

export function saveStoredOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent("saihira:orders-updated", { detail: orders }));
  } catch (e) {
    console.error("Failed to save orders:", e);
  }
}

export function addOrder(
  newOrder: Omit<Order, "id" | "date"> & { id?: string; date?: string },
): Order {
  const orders = getStoredOrders();
  const id = newOrder.id || `SH-${Date.now().toString().slice(-6)}`;
  const date = newOrder.date || new Date().toISOString().slice(0, 10);
  const time =
    newOrder.time || new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const created: Order = {
    ...newOrder,
    id,
    date,
    time,
  };

  // Prevent duplicate insertion
  const existingIdx = orders.findIndex((o) => o.id === id);
  let updated: Order[];
  if (existingIdx >= 0) {
    updated = [...orders];
    updated[existingIdx] = created;
  } else {
    updated = [created, ...orders];
  }

  saveStoredOrders(updated);

  // Sync customer record without duplication
  syncCustomerFromOrder(created);

  return created;
}

export function updateOrderStatus(id: string, status: OrderStatus): void {
  const orders = getStoredOrders();
  const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
  saveStoredOrders(updated);
}

export function deleteOrder(id: string): void {
  const orders = getStoredOrders();
  const updated = orders.filter((o) => o.id !== id);
  saveStoredOrders(updated);
}

export function clearAllOrders(): void {
  saveStoredOrders([]);
}

/* ---------------- Customers CRM API ---------------- */

export function getStoredCustomers(): Customer[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOMERS_KEY);
    if (!raw) return [];
    const parsed: Customer[] = JSON.parse(raw);
    const clean = parsed.filter((c) => !DUMMY_CUSTOMER_IDS.has(c.id));
    if (clean.length !== parsed.length) {
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(clean));
    }
    return clean;
  } catch {
    return [];
  }
}

export function saveStoredCustomers(customers: Customer[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
    window.dispatchEvent(new CustomEvent("saihira:customers-updated", { detail: customers }));
  } catch (e) {
    console.error("Failed to save customers:", e);
  }
}

export function syncCustomerFromOrder(order: Order): void {
  const customers = getStoredCustomers();
  const cleanEmail = (order.email || "").trim().toLowerCase();
  const cleanPhone = (order.phone || "").replace(/[^0-9]/g, "");

  // Prevent duplicate customer profiles: match by email or phone
  const existingIndex = customers.findIndex((c) => {
    const cEmail = (c.email || "").trim().toLowerCase();
    const cPhone = (c.phone || "").replace(/[^0-9]/g, "");
    const matchEmail = cleanEmail && cEmail && cleanEmail === cEmail;
    const matchPhone = cleanPhone && cPhone && cleanPhone === cPhone;
    return matchEmail || matchPhone;
  });

  if (existingIndex >= 0) {
    const c = customers[existingIndex];
    const newCount = c.ordersCount + 1;
    const newSpend = c.totalSpend + order.total;
    const segment = newSpend > 5000 || newCount >= 5 ? "VIP Reserve" : c.segment;

    customers[existingIndex] = {
      ...c,
      name: order.customer || c.name,
      phone: order.phone || c.phone,
      ordersCount: newCount,
      totalSpend: newSpend,
      lastOrder: order.date,
      city: order.city || c.city,
      segment,
    };
  } else {
    const newCust: Customer = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      name: order.customer,
      email: order.email,
      phone: order.phone,
      city: order.city || "Mumbai, MH",
      segment: order.total > 2000 ? "VIP Reserve" : "Regular Patron",
      ordersCount: 1,
      totalSpend: order.total,
      lastOrder: order.date,
    };
    customers.unshift(newCust);
  }

  saveStoredCustomers(customers);
}

export function clearAllCustomers(): void {
  saveStoredCustomers([]);
}

/* ---------------- Inquiries API ---------------- */

export function getStoredInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) return [];
    const parsed: Inquiry[] = JSON.parse(raw);
    const clean = parsed.filter((i) => !DUMMY_INQUIRY_IDS.has(i.id));
    if (clean.length !== parsed.length) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(clean));
    }
    return clean;
  } catch {
    return [];
  }
}

export function saveStoredInquiries(inquiries: Inquiry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    window.dispatchEvent(new CustomEvent("saihira:inquiries-updated", { detail: inquiries }));
  } catch (e) {
    console.error("Failed to save inquiries:", e);
  }
}

export function addInquiry(
  newInq: Omit<Inquiry, "id" | "date" | "status"> & {
    id?: string;
    date?: string;
    status?: InquiryStatus;
  },
): Inquiry {
  const inquiries = getStoredInquiries();
  const id = newInq.id || `INQ-${Date.now().toString().slice(-4)}`;
  const date = newInq.date || new Date().toISOString().slice(0, 10);
  const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const created: Inquiry = {
    id,
    date,
    time,
    status: newInq.status || "New",
    name: newInq.name,
    email: newInq.email,
    phone: newInq.phone,
    interest: newInq.interest,
    message: newInq.message,
  };

  const updated = [created, ...inquiries];
  saveStoredInquiries(updated);
  return created;
}

export function updateInquiryStatus(id: string, status: InquiryStatus): void {
  const inquiries = getStoredInquiries();
  const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
  saveStoredInquiries(updated);
}

export function deleteInquiry(id: string): void {
  const inquiries = getStoredInquiries();
  const updated = inquiries.filter((inq) => inq.id !== id);
  saveStoredInquiries(updated);
}

export function clearAllInquiries(): void {
  saveStoredInquiries([]);
}

/* ---------------- CSV Exporters ---------------- */

export function exportProductsCSV(productsList: Product[]): void {
  const headers = [
    "ID",
    "Name",
    "Category",
    "Price",
    "SalePrice",
    "Rating",
    "Image",
    "Tagline",
    "Notes",
    "Weight",
    "Badge",
    "Stock",
    "Description",
  ];
  const rows = productsList.map((p) => [
    `"${p.slug || p.id || ""}"`,
    `"${(p.name || "").replace(/"/g, '""')}"`,
    `"${p.category || ""}"`,
    p.price || 0,
    p.salePrice || "",
    p.rating || 4.9,
    `"${p.image || ""}"`,
    `"${(p.tagline || "").replace(/"/g, '""')}"`,
    `"${(Array.isArray(p.notes) ? p.notes.join(" · ") : p.notes || "").replace(/"/g, '""')}"`,
    `"${p.weight || "200 g"}"`,
    `"${p.badge || ""}"`,
    p.stock || 30,
    `"${(p.description || "").replace(/"/g, '""')}"`,
  ]);

  const csv =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encoded = encodeURI(csv);
  const link = document.createElement("a");
  link.setAttribute("href", encoded);
  link.setAttribute(
    "download",
    `saihira_products_catalog_${new Date().toISOString().slice(0, 10)}.csv`,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportOrdersCSV(orders: Order[]): void {
  const headers = [
    "OrderID",
    "Customer",
    "Email",
    "Phone",
    "Items",
    "TotalINR",
    "Status",
    "Date",
    "City",
  ];
  const rows = orders.map((o) => [
    `"${o.id}"`,
    `"${(o.customer || "").replace(/"/g, '""')}"`,
    `"${o.email}"`,
    `"${o.phone}"`,
    `"${(o.items || "").replace(/"/g, '""')}"`,
    o.total,
    `"${o.status}"`,
    `"${o.date}"`,
    `"${o.city || ""}"`,
  ]);

  const csv =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encoded = encodeURI(csv);
  const link = document.createElement("a");
  link.setAttribute("href", encoded);
  link.setAttribute("download", `saihira_orders_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportCustomersCSV(customers: Customer[]): void {
  const headers = [
    "CustomerID",
    "Name",
    "Email",
    "Phone",
    "Segment",
    "OrdersCount",
    "TotalSpendINR",
    "LastOrderDate",
    "City",
  ];
  const rows = customers.map((c) => [
    `"${c.id}"`,
    `"${(c.name || "").replace(/"/g, '""')}"`,
    `"${c.email}"`,
    `"${c.phone}"`,
    `"${c.segment}"`,
    c.ordersCount,
    c.totalSpend,
    `"${c.lastOrder}"`,
    `"${c.city || ""}"`,
  ]);

  const csv =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encoded = encodeURI(csv);
  const link = document.createElement("a");
  link.setAttribute("href", encoded);
  link.setAttribute("download", `saihira_crm_patrons_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportInquiriesCSV(inquiries: Inquiry[]): void {
  const headers = ["ID", "Name", "Email", "Phone", "Interest", "Message", "Date", "Time", "Status"];
  const rows = inquiries.map((i) => [
    `"${i.id}"`,
    `"${(i.name || "").replace(/"/g, '""')}"`,
    `"${i.email}"`,
    `"${i.phone}"`,
    `"${i.interest}"`,
    `"${(i.message || "").replace(/"/g, '""')}"`,
    `"${i.date}"`,
    `"${i.time || ""}"`,
    `"${i.status}"`,
  ]);

  const csv =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encoded = encodeURI(csv);
  const link = document.createElement("a");
  link.setAttribute("href", encoded);
  link.setAttribute("download", `saihira_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
