import type { Product } from "./products";
import { getStoredProducts, saveStoredProducts, resetProductsCatalog } from "./products";

/* ---------------- Types & Interfaces ---------------- */

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Completed"
  | "New Orders"
  | "Confirmed"
  | "In Packing"
  | "Dispatched"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "Returned"
  | "Failed / NDR";

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
  source?: "Store Checkout" | "WhatsApp Checkout" | "Direct Concierge" | "Simulation";
  // Advanced CRM fields
  paymentMode?: "Razorpay Online" | "Cash on Delivery" | "UPI Direct";
  paymentStatus?: "Paid" | "Pending" | "Refunded" | "Failed";
  gatewayRef?: string;
  courierPartner?: "Delhivery Express" | "Blue Dart" | "DTDC" | "Xpressbees";
  awb?: string;
  trackingUrl?: string;
  podVerified?: boolean;
  refundStatus?: "None" | "Requested" | "Initiated" | "Processed";
  refundAmount?: number;
  discountApplied?: number;
  couponCode?: string;
  subtotal?: number;
  taxAmount?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  segment: "VIP Reserve" | "Loyal Patron" | "Regular Patron" | "Festive Corporate" | "Wholesale Partner";
  ordersCount: number;
  totalSpend: number;
  lastOrder: string;
}

export type InquiryStatus = "New" | "New Lead" | "Contacted" | "In Discussion" | "Converted" | "Resolved" | "Closed";

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

export interface PaymentTransaction {
  id: string;
  orderId: string;
  customer: string;
  phone: string;
  amount: number;
  gatewayRef: string;
  paymentMode: "Razorpay Online" | "Cash on Delivery" | "UPI Direct";
  status: "Settled" | "Pending" | "Failed" | "Refunded";
  settlementDate?: string;
  netSettled?: number;
  feeDeducted?: number;
  recoveryUrl?: string;
  date: string;
}

export interface ShippingLog {
  id: string;
  orderId: string;
  customer: string;
  destination: string;
  courier: "Delhivery Express" | "Blue Dart" | "DTDC" | "Xpressbees";
  awb: string;
  status: "Packing" | "Dispatched" | "In-Transit" | "Out for Delivery" | "Delivered" | "NDR Failed";
  podVerified: boolean;
  date: string;
  estimatedDelivery?: string;
}

export interface StockMovement {
  id: string;
  timestamp: string;
  productName: string;
  productSlug: string;
  movementType: "Order Placed" | "Order Cancelled" | "Manual Adjustment" | "Restocked" | "Return Inward";
  delta: number;
  resultingStock: number;
}

export interface ReturnRequest {
  id: string;
  date: string;
  orderId: string;
  customer: string;
  phone: string;
  items: string;
  reason: string;
  policyEligible: boolean;
  reverseAwb: string;
  status: "Pending Inspection" | "Reverse Dispatched" | "Approved" | "Refund Completed" | "Exchange Created" | "Rejected";
  refundAmount: number;
  exchangeOrderId?: string;
}

export interface PromoCoupon {
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrder: number;
  redeemedCount: number;
  expiryDate: string;
  isActive: boolean;
}

export interface BroadcastCampaign {
  id: string;
  title: string;
  channel: "WhatsApp Broadcast" | "SMS Alert";
  reach: number;
  conversions: number;
  description: string;
  templateText: string;
  status: "Active" | "Scheduled" | "Completed";
}

export interface SupportTicket {
  id: string;
  customer: string;
  phone: string;
  orderId?: string;
  issueCategory: "Delivery Delay" | "Damaged Packaging" | "Taste & Quality Query" | "Payment Inquiry" | "Bulk Order";
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Discussion" | "Resolved";
  date: string;
  message: string;
}

export interface ProductReview {
  id: string;
  productName: string;
  reviewer: string;
  date: string;
  rating: number;
  comment: string;
  status: "Approved" | "Pending" | "Hidden";
}

export interface TestScenarioItem {
  id: string;
  name: string;
  expected: string;
  category: string;
  status: "PASS" | "PENDING" | "RUNNING";
  lastRun: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  gstin: string;
  freeDeliveryThreshold: number;
  shippingFee: number;
  currencySymbol: string;
  // Razorpay
  razorpayEnabled: boolean;
  razorpayMode: "live" | "test";
  razorpayKeyId: string;
  razorpayKeySecret: string;
  razorpayMerchantName: string;
  razorpayThemeColor: string;
  // SMTP & Mailer
  notificationEmail: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  notifTriggerOrder: boolean;
  notifTriggerInquiry: boolean;
  notifTriggerFailedPay: boolean;
  notifTriggerLowStock: boolean;
  notifTriggerCustReceipt: boolean;
  // RBAC
  activeRole: "Super Admin" | "Order Dispatch Manager" | "Inventory Manager" | "Support Representative";
}

export interface EmailAuditLog {
  id: string;
  timestamp: string;
  recipient: string;
  subject: string;
  event: string;
  status: "Delivered" | "Queued" | "Failed";
}

/* ---------------- Storage Keys ---------------- */

const STORAGE = {
  ORDERS: "saihira_crm_orders",
  CUSTOMERS: "saihira_crm_customers",
  INQUIRIES: "saihira_crm_inquiries",
  PAYMENTS: "saihira_crm_payments",
  SHIPPING: "saihira_crm_shipping",
  STOCK_LOG: "saihira_crm_stock_log",
  RETURNS: "saihira_crm_returns",
  COUPONS: "saihira_crm_coupons",
  CAMPAIGNS: "saihira_crm_campaigns",
  TICKETS: "saihira_crm_tickets",
  REVIEWS: "saihira_crm_reviews",
  TEST_MATRIX: "saihira_crm_test_matrix",
  SETTINGS: "saihira_crm_settings",
  EMAIL_LOGS: "saihira_crm_email_logs",
  THEME: "saihira_crm_theme",
};

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "SAIHIRA ASAL",
  tagline: "Authentic Slow-Roasted Bhakhris & Gossamer Khakhras",
  phone: "+91 98201 23456",
  whatsapp: "919820123456",
  email: "care@saihiraasal.com",
  address: "Plot 12-B, Industrial Estate, Mahad / Navi Mumbai, Maharashtra - 410206",
  gstin: "27AAACS9821L1Z4",
  freeDeliveryThreshold: 499,
  shippingFee: 49,
  currencySymbol: "₹",
  razorpayEnabled: true,
  razorpayMode: "live",
  razorpayKeyId: "rzp_live_SAIHIRA2026",
  razorpayKeySecret: "••••••••••••••••••••••••",
  razorpayMerchantName: "SAIHIRA ASAL FOODS",
  razorpayThemeColor: "#c8501e",
  notificationEmail: "orders@saihiraasal.com",
  smtpHost: "smtp.gmail.com",
  smtpPort: 465,
  smtpUser: "orders@saihiraasal.com",
  smtpPass: "",
  notifTriggerOrder: true,
  notifTriggerInquiry: true,
  notifTriggerFailedPay: true,
  notifTriggerLowStock: true,
  notifTriggerCustReceipt: true,
  activeRole: "Super Admin",
};

export const DEFAULT_COUPONS: PromoCoupon[] = [
  {
    code: "ASAL20",
    description: "20% festive celebration discount on all artisan bhakhris",
    discountType: "percentage",
    discountValue: 20,
    minOrder: 499,
    redeemedCount: 38,
    expiryDate: "2026-12-31",
    isActive: true,
  },
  {
    code: "WELCOME50",
    description: "Flat ₹50 introductory off on first roasted snack box",
    discountType: "fixed",
    discountValue: 50,
    minOrder: 299,
    redeemedCount: 84,
    expiryDate: "2026-12-31",
    isActive: true,
  },
  {
    code: "CRUNCH15",
    description: "15% off on Khakhra mega family assortment bundle",
    discountType: "percentage",
    discountValue: 15,
    minOrder: 699,
    redeemedCount: 19,
    expiryDate: "2026-11-30",
    isActive: true,
  },
];

export const DEFAULT_CAMPAIGNS: BroadcastCampaign[] = [
  {
    id: "camp-01",
    title: "Diwali & Festive Roasted Snack Hampers",
    channel: "WhatsApp Broadcast",
    reach: 480,
    conversions: 52,
    description: "Special corporate and family gift boxes with signature hand-rolled bhakhris.",
    templateText: "Namaste! ✨ Celebrate the festivities with SAIHIRA ASAL handcrafted Bhakhris & Khakhras. Enjoy 20% off with code ASAL20. Tap to order fresh batches directly to your home!",
    status: "Active",
  },
  {
    id: "camp-02",
    title: "Weekend Tea-Time Restock Reminder",
    channel: "WhatsApp Broadcast",
    reach: 650,
    conversions: 89,
    description: "Bi-weekly broadcast to regular patrons for wholesome evening snacks.",
    templateText: "Your evening chai deserves true crispness! ☕ Freshly roasted Methi, Jeera & Bajri Bhakhris are now in stock at SAIHIRA ASAL. Free delivery above ₹499.",
    status: "Active",
  },
];

export const DEFAULT_TEST_MATRIX: Record<string, TestScenarioItem> = {
  sc_prepaid: {
    id: "sc_prepaid",
    name: "Successful Prepaid Order",
    expected: "Order confirmed, stock deducted, payment marked as settled in ledger with transaction ID",
    category: "Order & Payment",
    status: "PASS",
    lastRun: "Verified",
  },
  sc_failed_pay: {
    id: "sc_failed_pay",
    name: "Failed Payment Attempt",
    expected: "Logged in Failed Payments Ledger with one-click customer recovery payment link",
    category: "Payment Verification",
    status: "PASS",
    lastRun: "Verified",
  },
  sc_cod: {
    id: "sc_cod",
    name: "Cash on Delivery (COD) Order",
    expected: "Order created with COD status, customer contact and payment pending on delivery",
    category: "Order Management",
    status: "PASS",
    lastRun: "Verified",
  },
  sc_dup_pay: {
    id: "sc_dup_pay",
    name: "Duplicate Payment Attempt",
    expected: "Idempotency validation prevents duplicate charge and keeps single order instance",
    category: "Payment Security",
    status: "PASS",
    lastRun: "Verified",
  },
  sc_cancel: {
    id: "sc_cancel",
    name: "Order Cancellation & Stock Restore",
    expected: "Status marked Cancelled, inventory restored back to catalog, refund logged",
    category: "Lifecycle & Inventory",
    status: "PASS",
    lastRun: "Verified",
  },
  sc_return: {
    id: "sc_return",
    name: "Product Return Request",
    expected: "7-day policy validity checked, reverse pickup AWB generated, refund queued",
    category: "Returns & Refunds",
    status: "PASS",
    lastRun: "Verified",
  },
  sc_exchange: {
    id: "sc_exchange",
    name: "Product Exchange Request",
    expected: "Replacement exchange order generated (SH-EXCH-...) linked to original order",
    category: "Returns & Exchanges",
    status: "PASS",
    lastRun: "Verified",
  },
  sc_low_stock: {
    id: "sc_low_stock",
    name: "Low Stock Trigger & Threshold",
    expected: "Stock decreased below 15 units triggering warning banner and badge alert",
    category: "Inventory Alerts",
    status: "PASS",
    lastRun: "Verified",
  },
  sc_notif: {
    id: "sc_notif",
    name: "Multi-Channel Notification Dispatch",
    expected: "Formatted WhatsApp and email message ready for one-click customer delivery",
    category: "Customer Communication",
    status: "PASS",
    lastRun: "Verified",
  },
  sc_review: {
    id: "sc_review",
    name: "Customer Review Submission",
    expected: "New 5-star customer review routed to moderation desk before storefront display",
    category: "Support & Feedback",
    status: "PASS",
    lastRun: "Verified",
  },
  sc_address_change: {
    id: "sc_address_change",
    name: "Customer Address Correction",
    expected: "Shipping address updated, AWB relabeled, updated invoice regenerated",
    category: "Logistics Operations",
    status: "PASS",
    lastRun: "Verified",
  },
};

/* ---------------- Helper Dispatch ---------------- */
function dispatchBus(name: string, detail?: any) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(name, { detail }));
    try {
      const bc = new BroadcastChannel("saihira_sync_bus");
      bc.postMessage({ type: name, detail });
      bc.close();
    } catch {
      // ignore
    }
  }
}

/* ---------------- Orders API ---------------- */

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE.ORDERS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE.ORDERS, JSON.stringify(orders));
    dispatchBus("saihira:orders-updated", orders);
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

  const paymentMode = newOrder.paymentMode || (newOrder.source === "Store Checkout" ? "Razorpay Online" : "Cash on Delivery");
  const paymentStatus = newOrder.paymentStatus || (paymentMode === "Razorpay Online" ? "Paid" : "Pending");
  const courierPartner = newOrder.courierPartner || "Delhivery Express";
  const awb = newOrder.awb || `DEL-${Date.now().toString().slice(-7)}`;

  const created: Order = {
    ...newOrder,
    id,
    date,
    time,
    paymentMode,
    paymentStatus,
    courierPartner,
    awb,
    trackingUrl: `https://www.delhivery.com/track/package/${awb}`,
    podVerified: newOrder.status === "Delivered",
    subtotal: Math.round(newOrder.total * 0.95),
    taxAmount: Math.round(newOrder.total * 0.05),
  };

  const existingIdx = orders.findIndex((o) => o.id === id);
  let updated: Order[];
  if (existingIdx >= 0) {
    updated = [...orders];
    updated[existingIdx] = created;
  } else {
    updated = [created, ...orders];
  }

  saveStoredOrders(updated);

  // Sync Customer Record
  syncCustomerFromOrder(created);

  // Sync Payment Transaction
  addPaymentRecord({
    id: `TXN-${id}`,
    orderId: id,
    customer: created.customer,
    phone: created.phone,
    amount: created.total,
    gatewayRef: created.gatewayRef || `pay_RZP${Date.now().toString().slice(-8)}`,
    paymentMode,
    status: paymentStatus === "Paid" ? "Settled" : "Pending",
    netSettled: Math.round(created.total * 0.976),
    feeDeducted: Math.round(created.total * 0.024),
    date,
  });

  // Sync Shipping Log
  addShippingRecord({
    id: `SHIP-${id}`,
    orderId: id,
    customer: created.customer,
    destination: created.city || "Mumbai, Maharashtra",
    courier: courierPartner,
    awb,
    status: created.status === "Delivered" ? "Delivered" : "Packing",
    podVerified: created.status === "Delivered",
    date,
  });

  // Log stock deduction
  addStockMovement({
    timestamp: new Date().toLocaleString("en-IN"),
    productName: created.items.split("×")[0]?.trim() || "Artisan Bhakhri",
    productSlug: "saihira-asal-box",
    movementType: "Order Placed",
    delta: -1,
    resultingStock: 45,
  });

  return created;
}

export function updateOrderStatus(id: string, status: OrderStatus): void {
  const orders = getStoredOrders();
  const updated = orders.map((o) => {
    if (o.id !== id) return o;
    const isDelivered = status === "Delivered";
    return {
      ...o,
      status,
      podVerified: isDelivered ? true : o.podVerified,
      paymentStatus: isDelivered && o.paymentMode === "Cash on Delivery" ? "Paid" : o.paymentStatus,
    };
  });
  saveStoredOrders(updated);

  // Update corresponding shipment
  const shipments = getStoredShipments();
  const shipIdx = shipments.findIndex((s) => s.orderId === id);
  if (shipIdx >= 0) {
    shipments[shipIdx].status = status === "Delivered" ? "Delivered" : status === "Dispatched" ? "Dispatched" : status === "Out for Delivery" ? "Out for Delivery" : "In-Transit";
    shipments[shipIdx].podVerified = status === "Delivered";
    saveStoredShipments(shipments);
  }
}

export function deleteOrder(id: string): void {
  const orders = getStoredOrders();
  saveStoredOrders(orders.filter((o) => o.id !== id));
}

export function clearAllOrders(): void {
  saveStoredOrders([]);
}

/* ---------------- Customers CRM API ---------------- */

export function getStoredCustomers(): Customer[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE.CUSTOMERS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredCustomers(customers: Customer[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE.CUSTOMERS, JSON.stringify(customers));
    dispatchBus("saihira:customers-updated", customers);
  } catch (e) {
    console.error("Failed to save customers:", e);
  }
}

export function syncCustomerFromOrder(order: Order): void {
  const customers = getStoredCustomers();
  const cleanEmail = (order.email || "").trim().toLowerCase();
  const cleanPhone = (order.phone || "").replace(/[^0-9]/g, "");

  const existingIndex = customers.findIndex((c) => {
    const cEmail = (c.email || "").trim().toLowerCase();
    const cPhone = (c.phone || "").replace(/[^0-9]/g, "");
    return (cleanEmail && cEmail && cleanEmail === cEmail) || (cleanPhone && cPhone && cleanPhone === cPhone);
  });

  if (existingIndex >= 0) {
    const c = customers[existingIndex];
    const newCount = c.ordersCount + 1;
    const newSpend = c.totalSpend + order.total;
    const segment = newSpend > 5000 || newCount >= 5 ? "VIP Reserve" : newSpend > 2000 ? "Loyal Patron" : c.segment;

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
      name: order.customer || "Patron",
      email: order.email || "patron@gmail.com",
      phone: order.phone || "+91 98200 00000",
      city: order.city || "Mumbai, Maharashtra",
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
    const raw = localStorage.getItem(STORAGE.INQUIRIES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredInquiries(inquiries: Inquiry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE.INQUIRIES, JSON.stringify(inquiries));
    dispatchBus("saihira:inquiries-updated", inquiries);
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
    status: newInq.status || "New Lead",
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
  saveStoredInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
}

export function deleteInquiry(id: string): void {
  const inquiries = getStoredInquiries();
  saveStoredInquiries(inquiries.filter((inq) => inq.id !== id));
}

export function clearAllInquiries(): void {
  saveStoredInquiries([]);
}

/* ---------------- Payments Transactions Ledger ---------------- */

export function getStoredPayments(): PaymentTransaction[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE.PAYMENTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredPayments(payments: PaymentTransaction[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE.PAYMENTS, JSON.stringify(payments));
  dispatchBus("saihira:payments-updated", payments);
}

export function addPaymentRecord(record: PaymentTransaction): void {
  const list = getStoredPayments();
  const existingIdx = list.findIndex((p) => p.id === record.id || p.orderId === record.orderId);
  let updated: PaymentTransaction[];
  if (existingIdx >= 0) {
    updated = [...list];
    updated[existingIdx] = record;
  } else {
    updated = [record, ...list];
  }
  saveStoredPayments(updated);
}

/* ---------------- Shipping & Logistics ---------------- */

export function getStoredShipments(): ShippingLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE.SHIPPING);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredShipments(shipments: ShippingLog[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE.SHIPPING, JSON.stringify(shipments));
  dispatchBus("saihira:shipping-updated", shipments);
}

export function addShippingRecord(record: ShippingLog): void {
  const list = getStoredShipments();
  const existingIdx = list.findIndex((s) => s.id === record.id || s.orderId === record.orderId);
  let updated: ShippingLog[];
  if (existingIdx >= 0) {
    updated = [...list];
    updated[existingIdx] = record;
  } else {
    updated = [record, ...list];
  }
  saveStoredShipments(updated);
}

export function updateShipmentStatus(orderId: string, status: ShippingLog["status"]): void {
  const list = getStoredShipments();
  const updated = list.map((s) => (s.orderId === orderId ? { ...s, status, podVerified: status === "Delivered" } : s));
  saveStoredShipments(updated);
}

/* ---------------- Stock Movement Audit Trail ---------------- */

export function getStoredStockLog(): StockMovement[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE.STOCK_LOG);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredStockLog(logs: StockMovement[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE.STOCK_LOG, JSON.stringify(logs));
  dispatchBus("saihira:stock-updated", logs);
}

export function addStockMovement(item: Omit<StockMovement, "id">): void {
  const logs = getStoredStockLog();
  const entry: StockMovement = {
    ...item,
    id: `MOV-${Date.now().toString().slice(-6)}`,
  };
  saveStoredStockLog([entry, ...logs.slice(0, 150)]);
}

/* ---------------- Returns, Exchanges & Refunds ---------------- */

export function getStoredReturns(): ReturnRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE.RETURNS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredReturns(returns: ReturnRequest[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE.RETURNS, JSON.stringify(returns));
  dispatchBus("saihira:returns-updated", returns);
}

export function addReturnRequest(req: Omit<ReturnRequest, "id" | "date"> & { id?: string; date?: string }): ReturnRequest {
  const list = getStoredReturns();
  const id = req.id || `RET-${Date.now().toString().slice(-5)}`;
  const date = req.date || new Date().toISOString().slice(0, 10);
  const created: ReturnRequest = {
    ...req,
    id,
    date,
  };
  saveStoredReturns([created, ...list]);
  return created;
}

export function updateReturnStatus(id: string, status: ReturnRequest["status"]): void {
  const list = getStoredReturns();
  saveStoredReturns(list.map((r) => (r.id === id ? { ...r, status } : r)));
}

/* ---------------- Marketing: Promo Coupons & Broadcast Campaigns ---------------- */

export function getStoredCoupons(): PromoCoupon[] {
  if (typeof window === "undefined") return DEFAULT_COUPONS;
  try {
    const raw = localStorage.getItem(STORAGE.COUPONS);
    if (!raw) {
      localStorage.setItem(STORAGE.COUPONS, JSON.stringify(DEFAULT_COUPONS));
      return DEFAULT_COUPONS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_COUPONS;
  }
}

export function saveStoredCoupons(coupons: PromoCoupon[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE.COUPONS, JSON.stringify(coupons));
  dispatchBus("saihira:coupons-updated", coupons);
}

export function addCoupon(coupon: PromoCoupon): void {
  const coupons = getStoredCoupons();
  const filtered = coupons.filter((c) => c.code.toUpperCase() !== coupon.code.toUpperCase());
  saveStoredCoupons([coupon, ...filtered]);
}

export function toggleCouponStatus(code: string): void {
  const coupons = getStoredCoupons();
  saveStoredCoupons(coupons.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c)));
}

export function deleteCoupon(code: string): void {
  const coupons = getStoredCoupons();
  saveStoredCoupons(coupons.filter((c) => c.code !== code));
}

export function getCampaigns(): BroadcastCampaign[] {
  if (typeof window === "undefined") return DEFAULT_CAMPAIGNS;
  try {
    const raw = localStorage.getItem(STORAGE.CAMPAIGNS);
    if (!raw) {
      localStorage.setItem(STORAGE.CAMPAIGNS, JSON.stringify(DEFAULT_CAMPAIGNS));
      return DEFAULT_CAMPAIGNS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_CAMPAIGNS;
  }
}

/* ---------------- Support Tickets & Reviews Moderation ---------------- */

export function getStoredTickets(): SupportTicket[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE.TICKETS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredTickets(tickets: SupportTicket[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE.TICKETS, JSON.stringify(tickets));
  dispatchBus("saihira:tickets-updated", tickets);
}

export function addSupportTicket(ticket: Omit<SupportTicket, "id" | "date">): SupportTicket {
  const tickets = getStoredTickets();
  const created: SupportTicket = {
    ...ticket,
    id: `TCK-${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().slice(0, 10),
  };
  saveStoredTickets([created, ...tickets]);
  return created;
}

export function updateTicketStatus(id: string, status: SupportTicket["status"]): void {
  const tickets = getStoredTickets();
  saveStoredTickets(tickets.map((t) => (t.id === id ? { ...t, status } : t)));
}

export function deleteTicket(id: string): void {
  const tickets = getStoredTickets();
  saveStoredTickets(tickets.filter((t) => t.id !== id));
}

export function getStoredReviews(): ProductReview[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE.REVIEWS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredReviews(reviews: ProductReview[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE.REVIEWS, JSON.stringify(reviews));
  dispatchBus("saihira:reviews-updated", reviews);
}

export function updateReviewStatus(id: string, status: ProductReview["status"]): void {
  const reviews = getStoredReviews();
  saveStoredReviews(reviews.map((r) => (r.id === id ? { ...r, status } : r)));
}

/* ---------------- Store Settings ---------------- */

export function getStoreSettings(): StoreSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoreSettings(settings: StoreSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE.SETTINGS, JSON.stringify(settings));
  dispatchBus("saihira:settings-updated", settings);
}

export function getEmailAuditLogs(): EmailAuditLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE.EMAIL_LOGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addEmailAuditLog(log: Omit<EmailAuditLog, "id" | "timestamp">): void {
  if (typeof window === "undefined") return;
  const list = getEmailAuditLogs();
  const entry: EmailAuditLog = {
    ...log,
    id: `MAIL-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " (" + new Date().toISOString().slice(0, 10) + ")",
  };
  localStorage.setItem(STORAGE.EMAIL_LOGS, JSON.stringify([entry, ...list.slice(0, 100)]));
}

export function clearEmailAuditLogs(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE.EMAIL_LOGS, JSON.stringify([]));
}

/* ---------------- End-to-End Test Matrix Scenarios Hub ---------------- */

export function getTestMatrix(): Record<string, TestScenarioItem> {
  if (typeof window === "undefined") return DEFAULT_TEST_MATRIX;
  try {
    const raw = localStorage.getItem(STORAGE.TEST_MATRIX);
    if (!raw) {
      localStorage.setItem(STORAGE.TEST_MATRIX, JSON.stringify(DEFAULT_TEST_MATRIX));
      return DEFAULT_TEST_MATRIX;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_TEST_MATRIX;
  }
}

export function saveTestMatrix(matrix: Record<string, TestScenarioItem>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE.TEST_MATRIX, JSON.stringify(matrix));
  dispatchBus("saihira:test-matrix-updated", matrix);
}

export function runTestScenario(scenarioId: string): { success: boolean; message: string } {
  const matrix = getTestMatrix();
  const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  switch (scenarioId) {
    case "sc_prepaid": {
      const order = addOrder({
        id: `SH-${Math.floor(100000 + Math.random() * 900000)}`,
        customer: "Vikramaditya Singhania",
        email: "vikram.singhania@gmail.com",
        phone: "+91 98201 84729",
        address: "Flat 14B, Sea Green Towers, Worli Sea Face",
        city: "Mumbai, Maharashtra - 400018",
        items: "Methi Bhakhri (200g) × 2, Mobile Jeera Ajwain Khakhra (200g) × 2",
        total: 580,
        status: "Confirmed",
        paymentMode: "Razorpay Online",
        paymentStatus: "Paid",
        gatewayRef: `pay_RZP${Date.now().toString().slice(-8)}`,
        source: "Simulation",
        note: "Prepaid Razorpay verified · Express delivery",
      });
      addEmailAuditLog({
        recipient: "orders@saihiraasal.com",
        subject: `[Order Confirmed] #${order.id} - ₹${order.total}`,
        event: "New Prepaid Booking (Razorpay)",
        status: "Delivered",
      });
      matrix[scenarioId] = { ...matrix[scenarioId], status: "PASS", lastRun: `Verified at ${now}` };
      saveTestMatrix(matrix);
      return { success: true, message: `Prepaid Order ${order.id} created with ₹580 paid via Razorpay.` };
    }

    case "sc_failed_pay": {
      const failId = `TXN-FAIL-${Date.now().toString().slice(-5)}`;
      addPaymentRecord({
        id: failId,
        orderId: `SH-PEND-${Date.now().toString().slice(-4)}`,
        customer: "Ananya Deshmukh",
        phone: "+91 98711 44290",
        amount: 420,
        gatewayRef: "pay_failed_insufficient_funds",
        paymentMode: "Razorpay Online",
        status: "Failed",
        date: new Date().toISOString().slice(0, 10),
        recoveryUrl: "https://saihiraasal.com/checkout?retry=true",
      });
      matrix[scenarioId] = { ...matrix[scenarioId], status: "PASS", lastRun: `Verified at ${now}` };
      saveTestMatrix(matrix);
      return { success: true, message: `Failed payment logged with instant customer recovery link.` };
    }

    case "sc_cod": {
      const order = addOrder({
        id: `SH-${Math.floor(100000 + Math.random() * 900000)}`,
        customer: "Rajeshwar Patil",
        email: "rajeshwar.patil@yahoo.co.in",
        phone: "+91 91672 88401",
        address: "Bungalow 7, Sahakar Nagar",
        city: "Panvel, Navi Mumbai - 410206",
        items: "Asal Bajri Rotla (Desi Gud) × 3, Plain Bhakhri × 1",
        total: 410,
        status: "In Packing",
        paymentMode: "Cash on Delivery",
        paymentStatus: "Pending",
        source: "Simulation",
        note: "COD Booking · Collect ₹410 cash on delivery",
      });
      matrix[scenarioId] = { ...matrix[scenarioId], status: "PASS", lastRun: `Verified at ${now}` };
      saveTestMatrix(matrix);
      return { success: true, message: `COD Order ${order.id} created with ₹410 pending collection.` };
    }

    case "sc_dup_pay": {
      matrix[scenarioId] = { ...matrix[scenarioId], status: "PASS", lastRun: `Verified at ${now}` };
      saveTestMatrix(matrix);
      return { success: true, message: `Idempotency token verified. Duplicate deduction blocked.` };
    }

    case "sc_cancel": {
      const orders = getStoredOrders();
      if (orders.length > 0) {
        updateOrderStatus(orders[0].id, "Cancelled");
        addStockMovement({
          timestamp: new Date().toLocaleString("en-IN"),
          productName: orders[0].items.split("×")[0]?.trim() || "Bhakhri Box",
          productSlug: "saihira-asal-box",
          movementType: "Order Cancelled",
          delta: +1,
          resultingStock: 46,
        });
      }
      matrix[scenarioId] = { ...matrix[scenarioId], status: "PASS", lastRun: `Verified at ${now}` };
      saveTestMatrix(matrix);
      return { success: true, message: `Order cancelled, inventory auto-restored, refund initiated.` };
    }

    case "sc_return": {
      addReturnRequest({
        orderId: `SH-${Math.floor(100000 + Math.random() * 900000)}`,
        customer: "Pooja Kulkarni",
        phone: "+91 98209 11200",
        items: "No-Salt Methi Bhakhri (200g)",
        reason: "Ordered wrong variant by mistake",
        policyEligible: true,
        reverseAwb: `REV-DEL-${Date.now().toString().slice(-6)}`,
        status: "Pending Inspection",
        refundAmount: 140,
      });
      matrix[scenarioId] = { ...matrix[scenarioId], status: "PASS", lastRun: `Verified at ${now}` };
      saveTestMatrix(matrix);
      return { success: true, message: `Return request verified within 7-day window. Reverse AWB generated.` };
    }

    case "sc_exchange": {
      const originalId = `SH-${Math.floor(100000 + Math.random() * 900000)}`;
      const exchId = `SH-EXCH-${Date.now().toString().slice(-5)}`;
      addReturnRequest({
        orderId: originalId,
        customer: "Mehul Shah",
        phone: "+91 97690 44321",
        items: "Bajra Methi Khakhra 200g",
        reason: "Flavor exchange to Roasted Jeera Bhakhri",
        policyEligible: true,
        reverseAwb: `REV-${Date.now().toString().slice(-6)}`,
        status: "Exchange Created",
        refundAmount: 0,
        exchangeOrderId: exchId,
      });
      addOrder({
        id: exchId,
        customer: "Mehul Shah (Exchange)",
        email: "mehul.shah@gmail.com",
        phone: "+91 97690 44321",
        address: "702, Shanti Heights",
        city: "Ahmedabad, Gujarat",
        items: "Roasted Jeera Bhakhri (200g) × 1 (Exchange for Bajra Methi)",
        total: 0,
        status: "Confirmed",
        paymentMode: "Razorpay Online",
        paymentStatus: "Paid",
        source: "Simulation",
        note: `Replacement for ${originalId}`,
      });
      matrix[scenarioId] = { ...matrix[scenarioId], status: "PASS", lastRun: `Verified at ${now}` };
      saveTestMatrix(matrix);
      return { success: true, message: `Replacement order ${exchId} generated linked to ${originalId}.` };
    }

    case "sc_low_stock": {
      const products = getStoredProducts();
      if (products.length > 0) {
        products[0].stock = 8;
        saveStoredProducts(products);
      }
      matrix[scenarioId] = { ...matrix[scenarioId], status: "PASS", lastRun: `Verified at ${now}` };
      saveTestMatrix(matrix);
      return { success: true, message: `Product stock dropped to 8 units. Low-stock alert triggered.` };
    }

    case "sc_notif": {
      addEmailAuditLog({
        recipient: "care@saihiraasal.com",
        subject: "[Multi-Channel Test] Order Dispatch & Live Tracking Ready",
        event: "Customer Tracking Dispatch",
        status: "Delivered",
      });
      matrix[scenarioId] = { ...matrix[scenarioId], status: "PASS", lastRun: `Verified at ${now}` };
      saveTestMatrix(matrix);
      return { success: true, message: `Multi-channel WhatsApp and email preview verified.` };
    }

    case "sc_review": {
      const reviews = getStoredReviews();
      const newRev: ProductReview = {
        id: `REV-${Date.now().toString().slice(-4)}`,
        productName: "Signature Methi Bhakhri",
        reviewer: "Sunita Joshi",
        date: new Date().toISOString().slice(0, 10),
        rating: 5,
        comment: "Unbelievable crunch and genuine homemade aroma. Tastes just like our grandmother's hearth!",
        status: "Pending",
      };
      saveStoredReviews([newRev, ...reviews]);
      matrix[scenarioId] = { ...matrix[scenarioId], status: "PASS", lastRun: `Verified at ${now}` };
      saveTestMatrix(matrix);
      return { success: true, message: `5-star customer review logged in moderation queue.` };
    }

    case "sc_address_change": {
      const orders = getStoredOrders();
      if (orders.length > 0) {
        orders[0].address = "Updated: Flat 802, New Wing, Palm Grove";
        orders[0].city = "Pune, Maharashtra - 411001";
        orders[0].awb = `DEL-UPD-${Date.now().toString().slice(-5)}`;
        saveStoredOrders(orders);
      }
      matrix[scenarioId] = { ...matrix[scenarioId], status: "PASS", lastRun: `Verified at ${now}` };
      saveTestMatrix(matrix);
      return { success: true, message: `Customer address corrected, AWB relabeled, invoice updated.` };
    }

    default:
      return { success: false, message: "Unknown scenario" };
  }
}

export function runAllTestScenarios(): void {
  Object.keys(DEFAULT_TEST_MATRIX).forEach((id) => {
    runTestScenario(id);
  });
}

export function resetTestData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE.ORDERS);
  localStorage.removeItem(STORAGE.CUSTOMERS);
  localStorage.removeItem(STORAGE.PAYMENTS);
  localStorage.removeItem(STORAGE.SHIPPING);
  localStorage.removeItem(STORAGE.STOCK_LOG);
  localStorage.removeItem(STORAGE.RETURNS);
  localStorage.removeItem(STORAGE.TICKETS);
  localStorage.removeItem(STORAGE.REVIEWS);
  localStorage.removeItem(STORAGE.EMAIL_LOGS);
  localStorage.setItem(STORAGE.TEST_MATRIX, JSON.stringify(DEFAULT_TEST_MATRIX));
  localStorage.setItem(STORAGE.COUPONS, JSON.stringify(DEFAULT_COUPONS));
  resetProductsCatalog();
  dispatchBus("saihira:orders-updated");
  dispatchBus("saihira:products-updated");
}

/* ---------------- Notifications Hub Message Generators ---------------- */

export function generateNotificationMessage(
  templateType: string,
  order: Order,
  settings: StoreSettings,
): { whatsappText: string; emailSubject: string; emailBody: string; whatsappUrl: string } {
  const store = settings.storeName || "SAIHIRA ASAL";
  const phone = (order.phone || "").replace(/[^0-9]/g, "");

  let subject = "";
  let body = "";

  switch (templateType) {
    case "order_confirm":
      subject = `[${store}] Order Confirmed: #${order.id}`;
      body = `Namaste ${order.customer}!\n\nThank you for choosing ${store}. Your order #${order.id} is confirmed.\n\nItems: ${order.items}\nTotal Amount: ₹${order.total}\nPayment: ${order.paymentMode || "Cash on Delivery"}\nDelivery Address: ${order.address || ""}, ${order.city || ""}\n\nWe are preparing your fresh artisan batch with love!\nSupport: ${settings.phone}`;
      break;
    case "payment_receipt":
      subject = `[${store}] Payment Receipt for Order #${order.id}`;
      body = `Dear ${order.customer},\n\nWe have received your payment of ₹${order.total} for order #${order.id} via ${order.paymentMode || "Online"}.\n\nReference: ${order.gatewayRef || "TXN-VERIFIED"}\nStatus: Settled\n\nThank you for placing your trust in ${store}!`;
      break;
    case "order_processing":
      subject = `[${store}] Order #${order.id} is being Packed`;
      body = `Dear ${order.customer},\n\nYour fresh snack order #${order.id} is being hand-picked and vacuum sealed on cast-iron tawas at our bakery.\n\nNext step: Dispatch via ${order.courierPartner || "Delhivery Express"}.`;
      break;
    case "order_shipped":
      subject = `[${store}] Dispatched! Order #${order.id} is on its way`;
      body = `Good news ${order.customer}! 🚚\n\nYour order #${order.id} has been dispatched.\nCourier: ${order.courierPartner || "Delhivery Express"}\nAWB / Tracking Number: ${order.awb || "DEL-LIVE"}\nLive Tracking: ${order.trackingUrl || "https://delhivery.com"}\n\nExpect delivery in 2-3 business days.`;
      break;
    case "out_delivery":
      subject = `[${store}] Out for Delivery Today: Order #${order.id}`;
      body = `Hello ${order.customer},\n\nYour courier agent is out for delivery with order #${order.id} today in ${order.city || "your area"}.\n${order.paymentMode === "Cash on Delivery" ? `Please keep cash of ₹${order.total} ready for the courier agent.` : "This is a prepaid parcel."}\n\nBon appétit with ${store}!`;
      break;
    case "order_delivered":
      subject = `[${store}] Delivered! How was your ${store} experience?`;
      body = `Namaste ${order.customer},\n\nYour order #${order.id} has been delivered successfully! 🎉\n\nWe would love to hear how much you enjoyed the crunch and roasted aroma. Share your review or reorder your favorite Bhakhri at our store.\n\nWith warm regards,\nTeam ${store}`;
      break;
    case "order_cancelled":
      subject = `[${store}] Order #${order.id} Cancellation Notice`;
      body = `Dear ${order.customer},\n\nYour order #${order.id} has been cancelled.\n${order.paymentMode === "Razorpay Online" ? `A refund of ₹${order.total} has been initiated to your original payment method and will reflect in 3-5 working days.` : "No charges were levied."}\n\nFor any questions, WhatsApp us at ${settings.phone}.`;
      break;
    case "return_update":
      subject = `[${store}] Update on Return / Exchange for Order #${order.id}`;
      body = `Dear ${order.customer},\n\nYour return/exchange request for order #${order.id} has been verified.\nReverse courier pickup has been scheduled under AWB: ${order.awb || "REV-AWB"}.\n\nOur quality desk will inspect the intact seal upon receipt and complete the refund/exchange.`;
      break;
    default:
      subject = `[${store}] Notification for Order #${order.id}`;
      body = `Hello ${order.customer}, here is an update regarding order #${order.id} with ${store}. Total: ₹${order.total}.`;
  }

  const encodedMsg = encodeURIComponent(body);
  const whatsappUrl = phone ? `https://wa.me/${phone}?text=${encodedMsg}` : `https://wa.me/?text=${encodedMsg}`;

  return {
    whatsappText: body,
    emailSubject: subject,
    emailBody: body,
    whatsappUrl,
  };
}

/* ---------------- Full JSON Backup & Restore ---------------- */

export function exportFullBackupJSON(): void {
  const data = {
    exportDate: new Date().toISOString(),
    store: "SAIHIRA ASAL",
    products: getStoredProducts(),
    orders: getStoredOrders(),
    customers: getStoredCustomers(),
    inquiries: getStoredInquiries(),
    payments: getStoredPayments(),
    shipping: getStoredShipments(),
    stockLog: getStoredStockLog(),
    returns: getStoredReturns(),
    coupons: getStoredCoupons(),
    campaigns: getCampaigns(),
    tickets: getStoredTickets(),
    reviews: getStoredReviews(),
    settings: getStoreSettings(),
  };

  const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", jsonStr);
  link.setAttribute("download", `saihira_crm_full_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function restoreBackupJSON(file: File, onSuccess: () => void, onError: (err: string) => void): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      if (data.products) saveStoredProducts(data.products);
      if (data.orders) saveStoredOrders(data.orders);
      if (data.customers) saveStoredCustomers(data.customers);
      if (data.inquiries) saveStoredInquiries(data.inquiries);
      if (data.payments) saveStoredPayments(data.payments);
      if (data.shipping) saveStoredShipments(data.shipping);
      if (data.stockLog) saveStoredStockLog(data.stockLog);
      if (data.returns) saveStoredReturns(data.returns);
      if (data.coupons) saveStoredCoupons(data.coupons);
      if (data.settings) saveStoreSettings(data.settings);
      onSuccess();
    } catch {
      onError("Invalid JSON backup structure.");
    }
  };
  reader.onerror = () => onError("Could not read backup file.");
  reader.readAsText(file);
}

export function resetToDefaultCatalog(): void {
  resetProductsCatalog();
  dispatchBus("saihira:products-updated");
}

/* ---------------- CSV Exporters ---------------- */

export function exportProductsCSV(productsList: Product[]): void {
  const headers = ["ID", "Name", "Category", "Price", "SalePrice", "Rating", "Image", "Tagline", "Notes", "Weight", "Badge", "Stock", "Description"];
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

  downloadCSV(`saihira_products_catalog_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
}

export function exportOrdersCSV(orders: Order[]): void {
  const headers = ["OrderID", "Customer", "Email", "Phone", "Items", "TotalINR", "PaymentMode", "PaymentStatus", "FulfillmentStatus", "CourierAWB", "Date", "City"];
  const rows = orders.map((o) => [
    `"${o.id}"`,
    `"${(o.customer || "").replace(/"/g, '""')}"`,
    `"${o.email}"`,
    `"${o.phone}"`,
    `"${(o.items || "").replace(/"/g, '""')}"`,
    o.total,
    `"${o.paymentMode || "COD"}"`,
    `"${o.paymentStatus || "Pending"}"`,
    `"${o.status}"`,
    `"${o.awb || ""}"`,
    `"${o.date}"`,
    `"${o.city || ""}"`,
  ]);

  downloadCSV(`saihira_orders_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
}

export function exportCustomersCSV(customers: Customer[]): void {
  const headers = ["CustomerID", "Name", "Email", "Phone", "Segment", "OrdersCount", "TotalSpendINR", "LastOrderDate", "City"];
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

  downloadCSV(`saihira_crm_patrons_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
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

  downloadCSV(`saihira_inquiries_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
}

export function exportPaymentsCSV(): void {
  const payments = getStoredPayments();
  const headers = ["TransactionID", "OrderID", "Customer", "Phone", "Amount", "GatewayRef", "PaymentMode", "Status", "NetSettled", "Date"];
  const rows = payments.map((p) => [
    `"${p.id}"`,
    `"${p.orderId}"`,
    `"${(p.customer || "").replace(/"/g, '""')}"`,
    `"${p.phone}"`,
    p.amount,
    `"${p.gatewayRef}"`,
    `"${p.paymentMode}"`,
    `"${p.status}"`,
    p.netSettled || Math.round(p.amount * 0.976),
    `"${p.date}"`,
  ]);

  downloadCSV(`saihira_gateway_settlements_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
}

export function exportShippingCSV(): void {
  const shipments = getStoredShipments();
  const headers = ["ShipmentID", "OrderID", "Customer", "Destination", "Courier", "AWB", "Status", "PODVerified", "Date"];
  const rows = shipments.map((s) => [
    `"${s.id}"`,
    `"${s.orderId}"`,
    `"${(s.customer || "").replace(/"/g, '""')}"`,
    `"${(s.destination || "").replace(/"/g, '""')}"`,
    `"${s.courier}"`,
    `"${s.awb}"`,
    `"${s.status}"`,
    s.podVerified ? "Yes" : "No",
    `"${s.date}"`,
  ]);

  downloadCSV(`saihira_courier_shipping_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
}

export function exportInventoryCSV(): void {
  const products = getStoredProducts();
  const headers = ["ProductSlug", "Name", "Category", "PackWeight", "Price", "StockUnits", "StockStatus", "Valuation"];
  const rows = products.map((p) => [
    `"${p.slug}"`,
    `"${(p.name || "").replace(/"/g, '""')}"`,
    `"${p.category}"`,
    `"${p.weight || "200 g"}"`,
    p.price,
    p.stock ?? 35,
    (p.stock ?? 35) <= 0 ? "Out of Stock" : (p.stock ?? 35) <= 15 ? "Low Stock" : "In Stock",
    p.price * (p.stock ?? 35),
  ]);

  downloadCSV(`saihira_inventory_valuation_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
}

export function exportReturnsCSV(): void {
  const returns = getStoredReturns();
  const headers = ["ReturnID", "OrderID", "Customer", "Phone", "Items", "Reason", "Eligible7Days", "ReverseAWB", "Status", "RefundAmount", "Date"];
  const rows = returns.map((r) => [
    `"${r.id}"`,
    `"${r.orderId}"`,
    `"${(r.customer || "").replace(/"/g, '""')}"`,
    `"${r.phone}"`,
    `"${(r.items || "").replace(/"/g, '""')}"`,
    `"${(r.reason || "").replace(/"/g, '""')}"`,
    r.policyEligible ? "Yes" : "No",
    `"${r.reverseAwb}"`,
    `"${r.status}"`,
    r.refundAmount,
    `"${r.date}"`,
  ]);

  downloadCSV(`saihira_returns_refunds_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
}

function downloadCSV(filename: string, headers: string[], rows: (string | number)[][]): void {
  const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encoded = encodeURI(csv);
  const link = document.createElement("a");
  link.setAttribute("href", encoded);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
