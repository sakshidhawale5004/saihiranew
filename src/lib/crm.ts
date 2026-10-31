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

// Initial realistic seed data for Sai Hira
const INITIAL_ORDERS: Order[] = [
  {
    id: "SH-849201",
    customer: "Kavita Shah",
    email: "kavita.shah@gmail.com",
    phone: "+91 98201 44552",
    city: "Mumbai, MH",
    address: "B-402, Sea Pearl Apts, Worli Sea Face, Mumbai 400030",
    items: "Methi Khakhra (200g) × 2, Jaggery Bhakhri (200g) × 2",
    total: 520,
    status: "Completed",
    date: "2026-10-30",
    time: "14:22",
    note: "Crisp packaging requested for festive tea party",
    source: "Store Checkout",
  },
  {
    id: "SH-849202",
    customer: "Rajesh Parekh",
    email: "r.parekh@parekhtrading.in",
    phone: "+91 98210 99881",
    city: "Ahmedabad, GJ",
    address: "12, Shanti Kunj, Navrangpura, Ahmedabad 380009",
    items: "Jeera Khakhra × 3, Masala Khakhra × 3, Bajri Bhakhri × 2",
    total: 1000,
    status: "Processing",
    date: "2026-10-30",
    time: "17:45",
    note: "100% Jain preparation required (No onion, no garlic)",
    source: "WhatsApp Checkout",
  },
  {
    id: "SH-849203",
    customer: "Meera Doshi",
    email: "meera.doshi@outlook.com",
    phone: "+91 99304 12389",
    city: "Surat, GJ",
    address: "C-11, Riverfront Heights, Adajan, Surat 395009",
    items: "Pani Puri Khakhra × 2, Chilli Garlic Khakhra × 2",
    total: 480,
    status: "Shipped",
    date: "2026-10-29",
    time: "11:10",
    note: "Air-sealed shipment for outstation travel",
    source: "Store Checkout",
  },
  {
    id: "SH-849204",
    customer: "Anand Singhania",
    email: "anand@singhaniacorp.com",
    phone: "+91 98110 56743",
    city: "Delhi, DL",
    address: "44, Friends Colony West, New Delhi 110065",
    items: "Farali Khakhra × 4, Farali Bhakhri × 4, Jaggery Bhakhri × 2",
    total: 1320,
    status: "Pending",
    date: "2026-10-31",
    time: "09:30",
    note: "Diwali Corporate Sample Box with greeting label",
    source: "Direct Concierge",
  },
];

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "CUST-1001",
    name: "Kavita Shah",
    email: "kavita.shah@gmail.com",
    phone: "+91 98201 44552",
    city: "Mumbai, MH",
    segment: "VIP Reserve",
    ordersCount: 8,
    totalSpend: 4680,
    lastOrder: "2026-10-30",
  },
  {
    id: "CUST-1002",
    name: "Rajesh Parekh",
    email: "r.parekh@parekhtrading.in",
    phone: "+91 98210 99881",
    city: "Ahmedabad, GJ",
    segment: "Regular Patron",
    ordersCount: 5,
    totalSpend: 3850,
    lastOrder: "2026-10-30",
  },
  {
    id: "CUST-1003",
    name: "Anand Singhania",
    email: "anand@singhaniacorp.com",
    phone: "+91 98110 56743",
    city: "Delhi, DL",
    segment: "Festive Corporate",
    ordersCount: 3,
    totalSpend: 14200,
    lastOrder: "2026-10-31",
  },
  {
    id: "CUST-1004",
    name: "Meera Doshi",
    email: "meera.doshi@outlook.com",
    phone: "+91 99304 12389",
    city: "Surat, GJ",
    segment: "Regular Patron",
    ordersCount: 4,
    totalSpend: 2360,
    lastOrder: "2026-10-29",
  },
  {
    id: "CUST-1005",
    name: "Vikramaditya Mehta",
    email: "vikram@mehtas.org",
    phone: "+91 98200 11223",
    city: "Pune, MH",
    segment: "VIP Reserve",
    ordersCount: 6,
    totalSpend: 5400,
    lastOrder: "2026-10-25",
  },
];

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "INQ-201",
    name: "Pooja Vora",
    email: "pooja.vora@gmail.com",
    phone: "+91 98205 77661",
    interest: "Festive / Corporate Gifting (Bulk)",
    message:
      "Looking for 250 customized boxes of Methi and Jeera Khakhra with Jaggery Bhakhri for corporate Diwali hampers. Please share bulk price slab.",
    date: "2026-10-31",
    time: "10:15",
    status: "New",
  },
  {
    id: "INQ-202",
    name: "Dr. Hemant Merchant",
    email: "dr.merchant@wellness.in",
    phone: "+91 98330 44221",
    interest: "Wholesale & Retail Stockist",
    message:
      "Interested in stocking your Bajri, Barley, and Ragi diet khakhras at our Mumbai wellness clinic counters.",
    date: "2026-10-30",
    time: "15:40",
    status: "Contacted",
  },
];

/* ---------------- Orders API ---------------- */

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
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

  const updated = [created, ...orders];
  saveStoredOrders(updated);

  // Also register or update customer record
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

/* ---------------- Customers CRM API ---------------- */

export function getStoredCustomers(): Customer[] {
  if (typeof window === "undefined") return INITIAL_CUSTOMERS;
  try {
    const raw = localStorage.getItem(CUSTOMERS_KEY);
    if (!raw) {
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(INITIAL_CUSTOMERS));
      return INITIAL_CUSTOMERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CUSTOMERS;
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
  const existingIndex = customers.findIndex(
    (c) => c.email.toLowerCase() === order.email.toLowerCase() || c.phone === order.phone,
  );

  if (existingIndex >= 0) {
    const c = customers[existingIndex];
    const newCount = c.ordersCount + 1;
    const newSpend = c.totalSpend + order.total;
    const segment = newSpend > 5000 || newCount >= 5 ? "VIP Reserve" : c.segment;

    customers[existingIndex] = {
      ...c,
      name: order.customer || c.name,
      ordersCount: newCount,
      totalSpend: newSpend,
      lastOrder: order.date,
      city: order.city || c.city,
      segment,
    };
  } else {
    const newCust: Customer = {
      id: `CUST-${(1000 + customers.length + 1).toString()}`,
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

/* ---------------- Inquiries API ---------------- */

export function getStoredInquiries(): Inquiry[] {
  if (typeof window === "undefined") return INITIAL_INQUIRIES;
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INQUIRIES;
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

/* ---------------- CSV Exporters (Artisan Scent Reference Pattern) ---------------- */

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
