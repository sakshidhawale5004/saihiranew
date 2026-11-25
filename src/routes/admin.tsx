import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { toast } from "sonner";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Plus,
  Search,
  Edit,
  Trash2,
  Download,
  ExternalLink,
  LogOut,
  RefreshCw,
  Upload,
  Image as ImageIcon,
  MessageSquare,
  Lock,
  RotateCcw,
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Printer,
  ChevronRight,
  Menu,
  X,
  CreditCard,
  Boxes,
  Bell,
  Headphones,
  PlayCircle,
  Settings,
  Ticket,
  Radio,
  Share2,
  Copy,
  Sliders,
  ShieldCheck,
  Database,
  Star,
  Check,
  FileSpreadsheet,
} from "lucide-react";
import {
  type Product,
  type Category,
  CATEGORIES,
  getStoredProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetProductsCatalog,
  formatINR,
  PRODUCT_IMAGE_PRESETS,
  saveStoredProducts,
} from "@/lib/products";
import {
  type Order,
  type Customer,
  type Inquiry,
  type OrderStatus,
  type InquiryStatus,
  type PaymentTransaction,
  type ShippingLog,
  type StockMovement,
  type ReturnRequest,
  type PromoCoupon,
  type BroadcastCampaign,
  type SupportTicket,
  type ProductReview,
  type TestScenarioItem,
  type StoreSettings,
  type EmailAuditLog,
  getStoredOrders,
  saveStoredOrders,
  addOrder,
  updateOrderStatus,
  deleteOrder,
  clearAllOrders,
  getStoredCustomers,
  getStoredInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getStoredPayments,
  saveStoredPayments,
  getStoredShipments,
  saveStoredShipments,
  updateShipmentStatus,
  getStoredStockLog,
  addStockMovement,
  getStoredReturns,
  addReturnRequest,
  updateReturnStatus,
  getStoredCoupons,
  saveStoredCoupons,
  addCoupon,
  toggleCouponStatus,
  deleteCoupon,
  getCampaigns,
  getStoredTickets,
  addSupportTicket,
  updateTicketStatus,
  deleteTicket,
  getStoredReviews,
  saveStoredReviews,
  updateReviewStatus,
  getStoreSettings,
  saveStoreSettings,
  getEmailAuditLogs,
  addEmailAuditLog,
  clearEmailAuditLogs,
  getTestMatrix,
  runTestScenario,
  runAllTestScenarios,
  resetTestData,
  generateNotificationMessage,
  exportFullBackupJSON,
  restoreBackupJSON,
  exportProductsCSV,
  exportOrdersCSV,
  exportCustomersCSV,
  exportInquiriesCSV,
  exportPaymentsCSV,
  exportShippingCSV,
  exportInventoryCSV,
  exportReturnsCSV,
} from "@/lib/crm";
import logoSrc from "@/assets/logo-hd.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "SAIHIRA ASAL · Staff CRM & Commerce Admin Hub" },
      {
        name: "description",
        content:
          "Internal CRM and commerce administration hub for SAIHIRA ASAL: catalog, orders, payments, logistics, inventory, and customer support.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminHub,
});

type TabType =
  | "overview"
  | "marketing"
  | "products"
  | "customers"
  | "orders"
  | "reports"
  | "payments"
  | "shipping"
  | "inventory"
  | "returns"
  | "notifications"
  | "support"
  | "testing"
  | "settings";

export function AdminHub() {
  // Authentication state
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [loginError, setLoginError] = useState("");

  // Theme & Navigation
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // CRM Data Collections
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [customersList, setCustomersList] = useState<Customer[]>([]);
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);
  const [paymentsList, setPaymentsList] = useState<PaymentTransaction[]>([]);
  const [shipmentsList, setShipmentsList] = useState<ShippingLog[]>([]);
  const [stockLogsList, setStockLogsList] = useState<StockMovement[]>([]);
  const [returnsList, setReturnsList] = useState<ReturnRequest[]>([]);
  const [couponsList, setCouponsList] = useState<PromoCoupon[]>([]);
  const [campaignsList, setCampaignsList] = useState<BroadcastCampaign[]>([]);
  const [ticketsList, setTicketsList] = useState<SupportTicket[]>([]);
  const [reviewsList, setReviewsList] = useState<ProductReview[]>([]);
  const [testMatrix, setTestMatrix] = useState<Record<string, TestScenarioItem>>({});
  const [settings, setSettings] = useState<StoreSettings>(getStoreSettings());
  const [emailLogs, setEmailLogs] = useState<EmailAuditLog[]>([]);

  // Subtabs
  const [marketingSubtab, setMarketingSubtab] = useState<"coupons" | "campaigns">("coupons");
  const [paymentSubtab, setPaymentSubtab] = useState<"transactions" | "failed" | "refunds">("transactions");

  // Filters & Search
  const [searchOrders, setSearchOrders] = useState("");
  const [filterOrderStatus, setFilterOrderStatus] = useState<string>("all");
  const [searchProducts, setSearchProducts] = useState("");
  const [filterProductCategory, setFilterProductCategory] = useState<string>("all");
  const [filterProductStock, setFilterProductStock] = useState<string>("all");
  const [searchCustomers, setSearchCustomers] = useState("");
  const [filterCustomerSegment, setFilterCustomerSegment] = useState<string>("all");
  const [searchPayments, setSearchPayments] = useState("");
  const [searchShipping, setSearchShipping] = useState("");
  const [searchInventory, setSearchInventory] = useState("");
  const [searchReturns, setSearchReturns] = useState("");
  const [searchInquiries, setSearchInquiries] = useState("");
  const [filterInquiryStatus, setFilterInquiryStatus] = useState<string>("all");

  // Notifications Hub State
  const [selectedNotifOrderId, setSelectedNotifOrderId] = useState<string>("");
  const [selectedNotifTemplate, setSelectedNotifTemplate] = useState<string>("order_confirm");

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isOrderLifecycleModalOpen, setIsOrderLifecycleModalOpen] = useState(false);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isShippingLabelModalOpen, setIsShippingLabelModalOpen] = useState(false);
  const [isPackingSlipModalOpen, setIsPackingSlipModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundReason, setRefundReason] = useState("Customer requested cancellation");
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  // Form states for Product Add/Edit
  const [fName, setFName] = useState("");
  const [fNameMr, setFNameMr] = useState("");
  const [fCategory, setFCategory] = useState<Category>("bhakhri");
  const [fFamily, setFFamily] = useState("Artisan Bhakhri");
  const [fPrice, setFPrice] = useState<number>(120);
  const [fSalePrice, setFSalePrice] = useState<number | undefined>(undefined);
  const [fStock, setFStock] = useState<number>(45);
  const [fImage, setFImage] = useState<string>(PRODUCT_IMAGE_PRESETS[0].url);
  const [fWeight, setFWeight] = useState("200 g");
  const [fTagline, setFTagline] = useState("Authentic slow-roasted recipe");
  const [fNotes, setFNotes] = useState("Cast-iron roasted · Hand-rolled · Zero preservatives");
  const [fDescription, setFDescription] = useState("Thick, crunchy, and slowly roasted over seasoned iron tawas. Prepared fresh daily with zero artificial colors.");
  const [fBestseller, setFBestseller] = useState(true);
  const [isOptimizingImage, setIsOptimizingImage] = useState(false);

  // Form state for Coupon
  const [cCode, setCCode] = useState("");
  const [cType, setCType] = useState<"percentage" | "fixed">("percentage");
  const [cValue, setCValue] = useState<number>(15);
  const [cMinOrder, setCMinOrder] = useState<number>(400);
  const [cExpiry, setCExpiry] = useState("2026-12-31");
  const [cDesc, setCDesc] = useState("Special festive treat voucher");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const backupInputRef = useRef<HTMLInputElement>(null);

  // Sync data function
  const refreshAllData = () => {
    setProductsList(getStoredProducts());
    setOrdersList(getStoredOrders());
    setCustomersList(getStoredCustomers());
    setInquiriesList(getStoredInquiries());
    setPaymentsList(getStoredPayments());
    setShipmentsList(getStoredShipments());
    setStockLogsList(getStoredStockLog());
    setReturnsList(getStoredReturns());
    setCouponsList(getStoredCoupons());
    setCampaignsList(getCampaigns());
    setTicketsList(getStoredTickets());
    setReviewsList(getStoredReviews());
    setTestMatrix(getTestMatrix());
    setSettings(getStoreSettings());
    setEmailLogs(getEmailAuditLogs());
  };

  // Lifecycle
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("saihira_admin_logged");
      if (auth === "true") setIsLogged(true);

      const savedTheme = localStorage.getItem("saihira_crm_theme") as "light" | "dark" | null;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
    refreshAllData();

    const handleSync = () => refreshAllData();
    window.addEventListener("saihira:products-updated", handleSync);
    window.addEventListener("saihira:orders-updated", handleSync);
    window.addEventListener("saihira:customers-updated", handleSync);
    window.addEventListener("saihira:inquiries-updated", handleSync);
    window.addEventListener("saihira:payments-updated", handleSync);
    window.addEventListener("saihira:shipping-updated", handleSync);
    window.addEventListener("saihira:stock-updated", handleSync);
    window.addEventListener("saihira:returns-updated", handleSync);
    window.addEventListener("saihira:coupons-updated", handleSync);
    window.addEventListener("saihira:tickets-updated", handleSync);
    window.addEventListener("saihira:reviews-updated", handleSync);
    window.addEventListener("saihira:settings-updated", handleSync);
    window.addEventListener("saihira:test-matrix-updated", handleSync);
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);

    return () => {
      window.removeEventListener("saihira:products-updated", handleSync);
      window.removeEventListener("saihira:orders-updated", handleSync);
      window.removeEventListener("saihira:customers-updated", handleSync);
      window.removeEventListener("saihira:inquiries-updated", handleSync);
      window.removeEventListener("saihira:payments-updated", handleSync);
      window.removeEventListener("saihira:shipping-updated", handleSync);
      window.removeEventListener("saihira:stock-updated", handleSync);
      window.removeEventListener("saihira:returns-updated", handleSync);
      window.removeEventListener("saihira:coupons-updated", handleSync);
      window.removeEventListener("saihira:tickets-updated", handleSync);
      window.removeEventListener("saihira:reviews-updated", handleSync);
      window.removeEventListener("saihira:settings-updated", handleSync);
      window.removeEventListener("saihira:test-matrix-updated", handleSync);
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
    };
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("saihira_crm_theme", nextTheme);
    }
    toast.info(`Switched to ${nextTheme === "dark" ? "Dark Roasted" : "Warm Ivory"} theme.`);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim().toLowerCase();
    const p = password.trim();
    if (u === "admin" && (p === "admin123" || p === "saihira2026" || p === "bhau2026" || p === "artisan2026")) {
      setIsLogged(true);
      if (rememberSession) {
        localStorage.setItem("saihira_admin_logged", "true");
      }
      setLoginError("");
      toast.success("Welcome, Staff Administrator. SAIHIRA Commerce Hub Active.");
    } else {
      setLoginError("Invalid credentials. Use admin / admin123");
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("saihira_admin_logged");
    toast.info("Signed out from Staff Admin Hub.");
  };

  // Image upload
  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a valid image file (PNG, JPG, WEBP).");
      return;
    }
    setIsOptimizingImage(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      const img = new Image();
      img.src = dataUri;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        const maxDim = 800;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setFImage(canvas.toDataURL("image/jpeg", 0.86));
        } else {
          setFImage(dataUri);
        }
        setIsOptimizingImage(false);
        toast.success(`Image "${file.name}" loaded and optimized!`);
      };
      img.onerror = () => {
        setFImage(dataUri);
        setIsOptimizingImage(false);
      };
    };
    reader.readAsDataURL(file);
  };

  // Open modals
  const openNewProductModal = () => {
    setEditingProduct(null);
    setFName("");
    setFNameMr("");
    setFCategory("bhakhri");
    setFFamily("Artisan Bhakhri");
    setFPrice(120);
    setFSalePrice(undefined);
    setFStock(45);
    setFImage(PRODUCT_IMAGE_PRESETS[0].url);
    setFWeight("200 g");
    setFTagline("Authentic slow-roasted recipe");
    setFNotes("Cast-iron roasted · Hand-rolled · Zero preservatives");
    setFDescription("Thick, crunchy, and slowly roasted over seasoned iron tawas. Prepared fresh daily with zero artificial colors.");
    setFBestseller(true);
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setFName(product.name);
    setFNameMr(product.tagline || "");
    setFCategory(product.category);
    setFFamily(product.family || "Artisan Bhakhri");
    setFPrice(product.price);
    setFSalePrice(product.salePrice);
    setFStock(product.stock ?? 35);
    setFImage(product.image);
    setFWeight(product.weight || "200 g");
    setFTagline(product.tagline || product.name);
    setFNotes(Array.isArray(product.notes) ? product.notes.join(" · ") : product.notes || "");
    setFDescription(product.description);
    setFBestseller(Boolean(product.badge?.includes("Signature") || product.badge?.includes("Classic")));
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fName.trim()) {
      toast.error("Product name is required.");
      return;
    }

    const notesArray = fNotes.split(/[·,]+/).map((s) => s.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.slug || editingProduct.id!, {
        name: fName.trim(),
        category: fCategory,
        family: fFamily.trim(),
        price: Number(fPrice),
        salePrice: fSalePrice ? Number(fSalePrice) : undefined,
        stock: Number(fStock),
        image: fImage,
        weight: fWeight.trim() || "200 g",
        tagline: fTagline.trim() || fName.trim(),
        notes: notesArray,
        description: fDescription.trim(),
        badge: fBestseller ? "Signature Batch" : "Artisan",
      });
      toast.success(`Product "${fName}" updated successfully.`);
    } else {
      addProduct({
        name: fName.trim(),
        category: fCategory,
        family: fFamily.trim(),
        price: Number(fPrice),
        salePrice: fSalePrice ? Number(fSalePrice) : undefined,
        stock: Number(fStock),
        image: fImage,
        weight: fWeight.trim() || "200 g",
        tagline: fTagline.trim() || fName.trim(),
        notes: notesArray,
        description: fDescription.trim(),
        badge: fBestseller ? "Signature Batch" : "Artisan",
      });
      toast.success(`New SKU "${fName}" added to catalog.`);
    }

    refreshAllData();
    setIsProductModalOpen(false);
  };

  // Stock quick adjustment
  const handleStockAdjust = (slug: string, delta: number) => {
    const list = getStoredProducts();
    const idx = list.findIndex((p) => p.slug === slug || p.id === slug);
    if (idx >= 0) {
      const current = list[idx].stock ?? 35;
      const nextStock = Math.max(0, current + delta);
      list[idx].stock = nextStock;
      saveStoredProducts(list);
      addStockMovement({
        timestamp: new Date().toLocaleString("en-IN"),
        productName: list[idx].name,
        productSlug: slug,
        movementType: delta > 0 ? "Restocked" : "Manual Adjustment",
        delta,
        resultingStock: nextStock,
      });
      refreshAllData();
      toast.success(`Adjusted stock for ${list[idx].name}: now ${nextStock} units.`);
    }
  };

  // Filtered queries
  const filteredOrders = useMemo(() => {
    return ordersList.filter((o) => {
      if (filterOrderStatus !== "all") {
        const st = (o.status || "").toLowerCase();
        const f = filterOrderStatus.toLowerCase();
        if (f === "pending" && !st.includes("pending") && !st.includes("new")) return false;
        if (f === "confirmed" && !st.includes("confirmed")) return false;
        if (f === "processing" && !st.includes("processing") && !st.includes("packing")) return false;
        if (f === "shipped" && !st.includes("shipped") && !st.includes("dispatched")) return false;
        if (f === "delivered" && !st.includes("delivered") && !st.includes("completed")) return false;
        if (f === "cancelled" && !st.includes("cancelled")) return false;
      }
      if (searchOrders.trim()) {
        const q = searchOrders.toLowerCase();
        const inId = o.id.toLowerCase().includes(q);
        const inCust = (o.customer || "").toLowerCase().includes(q);
        const inPhone = (o.phone || "").toLowerCase().includes(q);
        const inCity = (o.city || "").toLowerCase().includes(q);
        return inId || inCust || inPhone || inCity;
      }
      return true;
    });
  }, [ordersList, filterOrderStatus, searchOrders]);

  const filteredProductsList = useMemo(() => {
    return productsList.filter((p) => {
      if (filterProductCategory !== "all" && p.category !== filterProductCategory) return false;
      if (filterProductStock !== "all") {
        const stock = p.stock ?? 35;
        if (filterProductStock === "in-stock" && stock <= 15) return false;
        if (filterProductStock === "low-stock" && (stock <= 0 || stock > 15)) return false;
        if (filterProductStock === "out-stock" && stock > 0) return false;
      }
      if (searchProducts.trim()) {
        const q = searchProducts.toLowerCase();
        const inName = p.name.toLowerCase().includes(q);
        const inCat = p.category.toLowerCase().includes(q);
        const inTag = (p.tagline || "").toLowerCase().includes(q);
        return inName || inCat || inTag;
      }
      return true;
    });
  }, [productsList, filterProductCategory, filterProductStock, searchProducts]);

  const filteredCustomersList = useMemo(() => {
    return customersList.filter((c) => {
      if (filterCustomerSegment !== "all" && c.segment !== filterCustomerSegment) return false;
      if (searchCustomers.trim()) {
        const q = searchCustomers.toLowerCase();
        return (c.name || "").toLowerCase().includes(q) || (c.phone || "").toLowerCase().includes(q) || (c.city || "").toLowerCase().includes(q);
      }
      return true;
    });
  }, [customersList, filterCustomerSegment, searchCustomers]);

  // Aggregate Metrics
  const grossRevenue = useMemo(() => ordersList.reduce((acc, o) => acc + (o.status !== "Cancelled" ? o.total : 0), 0), [ordersList]);
  const totalOrdersCount = ordersList.length;
  const lowStockCount = useMemo(() => productsList.filter((p) => (p.stock ?? 35) <= 15).length, [productsList]);
  const outOfStockCount = useMemo(() => productsList.filter((p) => (p.stock ?? 35) === 0).length, [productsList]);
  const totalStockUnits = useMemo(() => productsList.reduce((acc, p) => acc + (p.stock ?? 35), 0), [productsList]);
  const catalogValuation = useMemo(() => productsList.reduce((acc, p) => acc + p.price * (p.stock ?? 35), 0), [productsList]);

  const pipeline = useMemo(() => {
    return {
      newOrders: ordersList.filter((o) => o.status === "Pending" || o.status === "New Orders").length,
      confirmed: ordersList.filter((o) => o.status === "Confirmed").length,
      packing: ordersList.filter((o) => o.status === "Processing" || o.status === "In Packing").length,
      dispatched: ordersList.filter((o) => o.status === "Shipped" || o.status === "Dispatched").length,
      delivered: ordersList.filter((o) => o.status === "Completed" || o.status === "Delivered").length,
    };
  }, [ordersList]);

  const selectedOrderForNotif = useMemo(() => {
    return ordersList.find((o) => o.id === selectedNotifOrderId) || ordersList[0] || null;
  }, [ordersList, selectedNotifOrderId]);

  const notificationPreview = useMemo(() => {
    if (!selectedOrderForNotif) return null;
    return generateNotificationMessage(selectedNotifTemplate, selectedOrderForNotif, settings);
  }, [selectedOrderForNotif, selectedNotifTemplate, settings]);

  // Handlers for Test Scenarios
  const handleRunScenario = (scId: string) => {
    const res = runTestScenario(scId);
    refreshAllData();
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
  };

  const handleRunAllScenarios = () => {
    runAllTestScenarios();
    refreshAllData();
    toast.success("All 11 test scenarios executed and verified with PASS status!");
  };

  const handleResetTestState = () => {
    if (window.confirm("Reset all test orders, payments, shipments, and customer logs to pristine initial state?")) {
      resetTestData();
      refreshAllData();
      toast.info("Test environment reset back to factory state.");
    }
  };

  // ------------------------------------------------------------------------
  // SPLIT-SCREEN AUTHENTICATION GATE
  // ------------------------------------------------------------------------
  if (!isLogged) {
    return (
      <div className={`min-h-screen flex flex-col lg:flex-row font-sans ${theme === "dark" ? "bg-[#140f0c] text-[#f5ece4]" : "bg-[#fbf8f5] text-[#271f1a]"}`}>
        {/* Left Hero Pane */}
        <div className="flex-1 bg-gradient-to-br from-[#1d120a] via-[#2a1a10] to-[#120a06] text-white p-8 sm:p-14 flex flex-col justify-between relative overflow-hidden shadow-2xl border-b lg:border-b-0 lg:border-r border-amber-900/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top back link */}
          <div className="relative z-10 flex items-center justify-between">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-200/80 hover:text-amber-300 transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <span>← Back to Website</span>
            </a>
            <div className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
              ESTD 1998
            </div>
          </div>

          {/* Center Brand Identity */}
          <div className="my-auto py-12 relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-3 bg-black/40 border border-amber-500/30 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
              <img src={logoSrc} alt="Saihira Asal" className="w-8 h-8 rounded-full object-contain p-0.5 bg-amber-50" />
              <div>
                <span className="font-display font-bold tracking-widest text-sm text-amber-300 block leading-none">
                  SAIHIRA ASAL
                </span>
                <span className="text-[9px] uppercase tracking-wider text-amber-200/70">
                  Cast-Iron Hearth Specialty · Commerce Suite
                </span>
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
              Saihira Admin Portal
            </h1>
            <p className="mt-4 text-sm text-amber-100/70 leading-relaxed font-normal">
              Secure enterprise management for live customer orders, courier dispatch tracking, stock valuation, payment reconciliation, and 100% slow-roasted authentic Bhakhri & Khakhra formulations.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-8">
              <span className="inline-flex items-center gap-1.5 text-xs bg-amber-500/15 border border-amber-500/30 text-amber-200 px-3 py-1.5 rounded-full">
                <CheckCircle2 size={13} className="text-amber-400" /> Cast-Iron Roasted
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-amber-500/15 border border-amber-500/30 text-amber-200 px-3 py-1.5 rounded-full">
                <ShieldCheck size={13} className="text-emerald-400" /> Role Protected RBAC
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-amber-500/15 border border-amber-500/30 text-amber-200 px-3 py-1.5 rounded-full">
                <Truck size={13} className="text-sky-400" /> All-India Express Dispatch
              </span>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="relative z-10 text-xs text-amber-200/50 flex items-center justify-between pt-6 border-t border-white/10">
            <span>© 2026 SAIHIRA ASAL Foods. All rights reserved.</span>
            <span>Version 2.4.0</span>
          </div>
        </div>

        {/* Right Form Pane */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 shadow-sm">
                <ShieldCheck size={26} />
              </div>
              <h2 className="font-display text-3xl font-medium tracking-tight">Welcome Back</h2>
              <p className="text-xs text-muted-foreground mt-1">Please enter your authorized staff credentials to continue</p>
            </div>

            {loginError && (
              <div className="mb-5 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                  Staff Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter staff username"
                    className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-card border border-border rounded-xl px-4 py-2.5 pr-10 text-xs focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberSession}
                    onChange={(e) => setRememberSession(e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span className="text-muted-foreground text-xs">Remember session</span>
                </label>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  • Staff Access
                </span>
              </div>

              <button
                type="submit"
                className="w-full mt-3 bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium text-xs py-3 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock size={14} />
                <span>Sign In to Hub</span>
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-border/80 text-center">
              <button
                type="button"
                onClick={() => {
                  setUsername("admin");
                  setPassword("admin123");
                }}
                className="text-xs text-amber-700 dark:text-amber-400 hover:underline cursor-pointer inline-flex items-center gap-1.5 font-medium"
              >
                <Sparkles size={13} />
                <span>Fill default demo credentials (admin / admin123)</span>
              </button>
            </div>

            <div className="mt-8 pt-4 border-t border-border/50 text-center text-[11px] text-muted-foreground">
              Need technical assistance? Call support desk at <a href="tel:+919820123456" className="font-semibold text-foreground underline">+91 98201 23456</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------------
  // LOGGED-IN CRM MAIN LAYOUT (14 COMPLETE MODULES)
  // ------------------------------------------------------------------------
  return (
    <div className={`min-h-screen flex font-sans ${theme === "dark" ? "bg-[#140f0c] text-[#f5ece4]" : "bg-[#fbf8f5] text-[#271f1a]"}`}>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* ======================= LEFT NAVIGATION SIDEBAR ======================= */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 z-50 flex flex-col justify-between transition-transform duration-300 border-r ${
          theme === "dark" ? "bg-[#1d1612] border-[#33261f]" : "bg-[#ffffff] border-[#e7ded5]"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-inherit flex items-center justify-between">
          <a href="/" target="_blank" className="flex items-center gap-3 group">
            <img
              src={logoSrc}
              alt="Saihira Asal"
              className="w-10 h-10 rounded-xl object-contain p-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-600/30 group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="font-display font-bold tracking-widest text-base leading-none text-amber-700 dark:text-amber-400">
                SAIHIRA ASAL
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mt-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Commerce Hub
              </div>
            </div>
          </a>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Vertical Nav Sections */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 text-xs no-scrollbar">
          {/* Main Menu */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70 px-3 mb-2">
              Main Menu
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab("overview"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "overview"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Sliders size={16} />
                  <span>Dashboard</span>
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("marketing"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "marketing"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Ticket size={16} />
                  <span>Marketing & Coupons</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                  {couponsList.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("products"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "products"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Package size={16} />
                  <span>Products Catalog</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-bold">
                  {productsList.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("customers"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "customers"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Users size={16} />
                  <span>Customers & LTV</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-bold">
                  {customersList.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("orders"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "orders"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <ShoppingCart size={16} />
                  <span>Orders & Queue</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                  {ordersList.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("reports"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "reports"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <FileSpreadsheet size={16} />
                  <span>Reports & Audit</span>
                </span>
              </button>
            </div>
          </div>

          {/* Commerce Operations */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70 px-3 mb-2">
              Commerce Operations
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab("payments"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "payments"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <CreditCard size={16} />
                  <span>Payments & Gateway</span>
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("shipping"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "shipping"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Truck size={16} />
                  <span>Shipping & Logistics</span>
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("inventory"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "inventory"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Boxes size={16} />
                  <span>Inventory Control</span>
                </span>
                {lowStockCount > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold animate-pulse">
                    {lowStockCount} Low
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveTab("returns"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "returns"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <RotateCcw size={16} />
                  <span>Returns & Refunds</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-bold">
                  {returnsList.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("notifications"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "notifications"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Bell size={16} />
                  <span>Notifications Hub</span>
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("support"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "support"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Headphones size={16} />
                  <span>Support & Reviews</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-bold">
                  {ticketsList.length}
                </span>
              </button>
            </div>
          </div>

          {/* System & Diagnostics */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70 px-3 mb-2">
              System & Diagnostics
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab("testing"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "testing"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <PlayCircle size={16} className="text-amber-500" />
                  <span>Test Scenarios</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold">
                  11/11
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("settings"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  activeTab === "settings"
                    ? "bg-amber-700 text-white font-semibold shadow-xs"
                    : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Settings size={16} />
                  <span>Settings & Roles</span>
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-inherit">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-black/5 dark:bg-white/5 mb-3">
            <div className="w-8 h-8 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold truncate">Staff Admin</div>
              <div className="text-[10px] text-muted-foreground truncate">{settings.activeRole}</div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1 text-xs">
            <a
              href="/products"
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-border text-[11px] font-semibold hover:bg-black/5 dark:hover:bg-white/5"
            >
              <span>Storefront</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={toggleTheme}
              title="Toggle Theme"
              className="p-2 rounded-lg border border-border hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
            </button>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg border border-border hover:bg-destructive/10 hover:text-destructive cursor-pointer text-muted-foreground"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ======================= RIGHT MAIN WORKSPACE ======================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 px-4 sm:px-8 py-3.5 backdrop-blur-md border-b border-border/80 flex items-center justify-between bg-inherit">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-border text-foreground hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground font-medium">Admin Hub</span>
              <ChevronRight size={13} className="text-muted-foreground" />
              <span className="font-semibold text-foreground capitalize">
                {activeTab === "overview" ? "Dashboard" : activeTab}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
            >
              {theme === "dark" ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} />}
              <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
            </button>
            <a
              href="/products"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-700/10 text-amber-700 dark:text-amber-400 border border-amber-600/30 text-xs font-semibold hover:bg-amber-700/20"
            >
              <span>Live Store</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* ======================= 1. DASHBOARD OVERVIEW ======================= */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Low Stock Alert Banner */}
              {lowStockCount > 0 && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-amber-500 text-white">
                      <AlertCircle size={18} />
                    </span>
                    <div>
                      <div className="font-semibold text-xs text-amber-800 dark:text-amber-300">
                        {lowStockCount} Products Running Low on Stock
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Several signature Bhakhris have dropped below the 15-unit threshold. Restock recommended.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("inventory")}
                    className="text-xs px-3 py-1.5 rounded-full bg-amber-700 text-white font-medium hover:bg-amber-800 cursor-pointer"
                  >
                    View Inventory
                  </button>
                </div>
              )}

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Gross Revenue</span>
                    <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600">
                      <DollarSign size={15} />
                    </span>
                  </div>
                  <div className="font-display text-2xl font-bold text-foreground">
                    {formatINR(grossRevenue)}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">Confirmed orders volume</div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Live Orders</span>
                    <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600">
                      <ShoppingCart size={15} />
                    </span>
                  </div>
                  <div className="font-display text-2xl font-bold text-foreground">
                    {totalOrdersCount}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {pipeline.delivered} delivered · {pipeline.packing + pipeline.dispatched} active
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Catalog SKUs</span>
                    <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
                      <Package size={15} />
                    </span>
                  </div>
                  <div className="font-display text-2xl font-bold text-foreground">
                    {productsList.length}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">{totalStockUnits} units in stock</div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Total Patrons</span>
                    <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600">
                      <Users size={15} />
                    </span>
                  </div>
                  <div className="font-display text-2xl font-bold text-foreground">
                    {customersList.length}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">Registered store patrons</div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Active Inquiries</span>
                    <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600">
                      <MessageSquare size={15} />
                    </span>
                  </div>
                  <div className="font-display text-2xl font-bold text-foreground">
                    {inquiriesList.length}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">Wholesale & retail leads</div>
                </div>
              </div>

              {/* Order Fulfillment Pipeline Bar */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Truck size={16} className="text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Order Fulfillment Pipeline:
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="text-lg font-bold text-amber-700 dark:text-amber-400">{pipeline.newOrders}</div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">New Orders</div>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="text-lg font-bold text-blue-700 dark:text-blue-400">{pipeline.confirmed}</div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Confirmed</div>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <div className="text-lg font-bold text-purple-700 dark:text-purple-400">{pipeline.packing}</div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">In Packing</div>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <div className="text-lg font-bold text-indigo-700 dark:text-indigo-400">{pipeline.dispatched}</div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Dispatched</div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{pipeline.delivered}</div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Delivered</div>
                  </div>
                </div>
              </div>

              {/* Dual Column: Recent Orders + Category Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders (2 cols) */}
                <div className="lg:col-span-2 p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-amber-600" />
                      <h3 className="font-display text-lg font-semibold">Recent Store Orders</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
                    >
                      View All Orders →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="border-b border-border/80 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                        <tr>
                          <th className="py-2.5">Order ID</th>
                          <th className="py-2.5">Customer</th>
                          <th className="py-2.5">Total</th>
                          <th className="py-2.5">Status</th>
                          <th className="py-2.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {ordersList.slice(0, 5).map((o) => (
                          <tr key={o.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <td className="py-3 font-semibold text-amber-700 dark:text-amber-400">{o.id}</td>
                            <td className="py-3 font-medium">{o.customer}</td>
                            <td className="py-3 font-semibold">{formatINR(o.total)}</td>
                            <td className="py-3">
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold">
                                {o.status}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedOrderForModal(o);
                                  setIsOrderLifecycleModalOpen(true);
                                }}
                                className="text-xs text-amber-600 hover:underline cursor-pointer"
                              >
                                Lifecycle
                              </button>
                            </td>
                          </tr>
                        ))}
                        {ordersList.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-6 text-center text-muted-foreground">
                              No orders yet. Run test scenario to simulate orders.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Side Info Box */}
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                    <h3 className="font-display text-lg font-semibold mb-2">Bakery & Headquarters</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {settings.storeName}
                      <br />
                      {settings.address}
                      <br />
                      WhatsApp: <b className="text-foreground">{settings.phone}</b>
                    </p>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                      <span>Valuation:</span>
                      <b className="font-semibold">{formatINR(catalogValuation)}</b>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 text-white shadow-xs">
                    <div className="text-xs uppercase font-bold tracking-wider text-amber-200">Quick Actions</div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold">
                      <button
                        onClick={openNewProductModal}
                        className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-center cursor-pointer transition-colors"
                      >
                        + Add SKU
                      </button>
                      <button
                        onClick={() => setActiveTab("testing")}
                        className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-center cursor-pointer transition-colors"
                      >
                        ▶ Test Hub
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= 2. MARKETING & PROMO COUPOUNS ======================= */}
          {activeTab === "marketing" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold">Marketing & Growth Hub</h2>
                  <p className="text-xs text-muted-foreground">Manage promo discount codes, customer referral campaigns, and broadcast alerts.</p>
                </div>
                <button
                  onClick={() => setIsCouponModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Plus size={14} />
                  <span>Create Promo Coupon</span>
                </button>
              </div>

              {/* Subtabs */}
              <div className="flex gap-2 border-b border-border pb-3">
                <button
                  onClick={() => setMarketingSubtab("coupons")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                    marketingSubtab === "coupons"
                      ? "bg-amber-700 text-white"
                      : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  Promo Codes ({couponsList.length})
                </button>
                <button
                  onClick={() => setMarketingSubtab("campaigns")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                    marketingSubtab === "campaigns"
                      ? "bg-amber-700 text-white"
                      : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  WhatsApp & SMS Broadcasts ({campaignsList.length})
                </button>
              </div>

              {marketingSubtab === "coupons" && (
                <div className="rounded-2xl bg-card border border-border shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-black/5 dark:bg-white/5 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                        <tr>
                          <th className="p-3.5">Code</th>
                          <th className="p-3.5">Description</th>
                          <th className="p-3.5">Discount</th>
                          <th className="p-3.5">Min Order</th>
                          <th className="p-3.5">Redeemed</th>
                          <th className="p-3.5">Expiry</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {couponsList.map((c) => (
                          <tr key={c.code} className="hover:bg-black/5 dark:hover:bg-white/5">
                            <td className="p-3.5 font-bold tracking-wider text-amber-700 dark:text-amber-400 font-mono">
                              {c.code}
                            </td>
                            <td className="p-3.5 text-muted-foreground max-w-xs">{c.description}</td>
                            <td className="p-3.5 font-semibold">
                              {c.discountType === "percentage" ? `${c.discountValue}%` : `₹${c.discountValue}`}
                            </td>
                            <td className="p-3.5">₹{c.minOrder}</td>
                            <td className="p-3.5 font-semibold">{c.redeemedCount} orders</td>
                            <td className="p-3.5 text-muted-foreground">{c.expiryDate}</td>
                            <td className="p-3.5">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                  c.isActive
                                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                                    : "bg-destructive/15 text-destructive"
                                }`}
                              >
                                {c.isActive ? "ACTIVE" : "PAUSED"}
                              </span>
                            </td>
                            <td className="p-3.5 text-right space-x-2">
                              <button
                                onClick={() => toggleCouponStatus(c.code)}
                                className="text-xs text-amber-600 hover:underline cursor-pointer"
                              >
                                {c.isActive ? "Pause" : "Activate"}
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete coupon ${c.code}?`)) deleteCoupon(c.code);
                                }}
                                className="text-xs text-destructive hover:underline cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {marketingSubtab === "campaigns" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campaignsList.map((camp) => (
                    <div key={camp.id} className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                          {camp.channel}
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {camp.reach} Patrons Reached
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm">{camp.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{camp.description}</p>
                      <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border/60 text-xs font-mono text-muted-foreground">
                        {camp.templateText}
                      </div>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-600">{camp.conversions} Attributed Orders</span>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(camp.templateText)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Share2 size={13} />
                          <span>Broadcast on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ======================= 3. PRODUCTS CATALOG ======================= */}
          {activeTab === "products" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold">Products & Formulations</h2>
                  <p className="text-xs text-muted-foreground">Manage your 100% cast-iron roasted Bhakhris, gossamer Khakhras, and packaging specifications.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => exportProductsCSV(productsList)}
                    className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Download size={13} />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={openNewProductModal}
                    className="px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus size={14} />
                    <span>Add New SKU</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-3.5 rounded-2xl bg-card border border-border flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search catalog by name, flavor, or SKU..."
                    value={searchProducts}
                    onChange={(e) => setSearchProducts(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <select
                  value={filterProductCategory}
                  onChange={(e) => setFilterProductCategory(e.target.value)}
                  className="bg-background border border-border rounded-xl px-3 py-2 text-xs"
                >
                  <option value="all">All Categories ({productsList.length})</option>
                  <option value="bhakhri">Bhakhri Prime</option>
                  <option value="premium-bhakhri">Premium Bhakhri</option>
                  <option value="no-salt-bhakhri">No-Salt Bhakhri</option>
                  <option value="gluten-free-bhakhri">Gluten-Free Bhakhri</option>
                  <option value="rotla">Rotla</option>
                  <option value="khakhra">Round Baked Khakhra</option>
                  <option value="mobile-khakhra">Mobile Khakhra</option>
                </select>
                <select
                  value={filterProductStock}
                  onChange={(e) => setFilterProductStock(e.target.value)}
                  className="bg-background border border-border rounded-xl px-3 py-2 text-xs"
                >
                  <option value="all">All Stock Statuses</option>
                  <option value="in-stock">In Stock (&gt; 15)</option>
                  <option value="low-stock">Low Stock (≤ 15)</option>
                  <option value="out-stock">Out of Stock (0)</option>
                </select>
              </div>

              {/* Products Table */}
              <div className="rounded-2xl bg-card border border-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-black/5 dark:bg-white/5 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <tr>
                        <th className="p-3.5">Product & Regional Title</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Price (₹)</th>
                        <th className="p-3.5">Pack Sizes</th>
                        <th className="p-3.5">Stock Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredProductsList.map((p) => {
                        const stock = p.stock ?? 35;
                        const isLow = stock > 0 && stock <= 15;
                        const isOut = stock === 0;

                        return (
                          <tr key={p.slug} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-10 h-10 rounded-lg object-cover border border-border shrink-0 bg-white"
                                />
                                <div>
                                  <div className="font-semibold text-foreground">{p.name}</div>
                                  <div className="text-[11px] text-muted-foreground font-mono">{p.tagline}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 capitalize font-medium">{p.category.replace(/-/g, " ")}</td>
                            <td className="p-3.5 font-semibold text-amber-700 dark:text-amber-400">
                              ₹{p.price}
                              {p.salePrice && <span className="text-muted-foreground text-[10px] line-through ml-1">₹{p.salePrice}</span>}
                            </td>
                            <td className="p-3.5 text-muted-foreground">{p.weight || "200 g"}</td>
                            <td className="p-3.5">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                    isOut
                                      ? "bg-destructive/15 text-destructive"
                                      : isLow
                                      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                                      : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                                  }`}
                                >
                                  {isOut ? "OUT OF STOCK" : isLow ? `LOW: ${stock}` : `${stock} IN STOCK`}
                                </span>
                                <div className="inline-flex gap-1">
                                  <button
                                    onClick={() => handleStockAdjust(p.slug, +5)}
                                    title="Add 5 units"
                                    className="w-5 h-5 rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 flex items-center justify-center font-bold"
                                  >
                                    +
                                  </button>
                                  <button
                                    onClick={() => handleStockAdjust(p.slug, -5)}
                                    title="Subtract 5 units"
                                    className="w-5 h-5 rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 flex items-center justify-center font-bold"
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 text-right space-x-2">
                              <button
                                onClick={() => openEditProductModal(p)}
                                className="text-xs text-amber-600 hover:underline cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete "${p.name}"?`)) {
                                    deleteProduct(p.slug);
                                    refreshAllData();
                                    toast.info(`Removed "${p.name}" from catalog.`);
                                  }
                                }}
                                className="text-xs text-destructive hover:underline cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= 4. CUSTOMERS & LTV DIRECTORY ======================= */}
          {activeTab === "customers" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold">Patrons & CRM Directory</h2>
                  <p className="text-xs text-muted-foreground">Directory of patrons, lifetime spend value (LTV), repeat purchase velocity, and direct communication.</p>
                </div>
                <button
                  onClick={() => exportCustomersCSV(customersList)}
                  className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Export Patrons CSV</span>
                </button>
              </div>

              {/* Filters */}
              <div className="p-3.5 rounded-2xl bg-card border border-border flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search patrons by name, phone, email, or city..."
                    value={searchCustomers}
                    onChange={(e) => setSearchCustomers(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <select
                  value={filterCustomerSegment}
                  onChange={(e) => setFilterCustomerSegment(e.target.value)}
                  className="bg-background border border-border rounded-xl px-3 py-2 text-xs"
                >
                  <option value="all">All Segments</option>
                  <option value="VIP Reserve">VIP Reserve</option>
                  <option value="Loyal Patron">Loyal Patrons</option>
                  <option value="Regular Patron">Regular Patrons</option>
                </select>
              </div>

              {/* Customers Table */}
              <div className="rounded-2xl bg-card border border-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-black/5 dark:bg-white/5 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <tr>
                        <th className="p-3.5">Customer</th>
                        <th className="p-3.5">Contact Details</th>
                        <th className="p-3.5">City</th>
                        <th className="p-3.5">Segment</th>
                        <th className="p-3.5">Orders</th>
                        <th className="p-3.5">Lifetime Spend</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredCustomersList.map((c) => (
                        <tr key={c.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-amber-600/10 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center shrink-0">
                                {c.name.charAt(0)}
                              </div>
                              <div className="font-semibold">{c.name}</div>
                            </div>
                          </td>
                          <td className="p-3.5 text-muted-foreground">
                            <div>{c.phone}</div>
                            <div className="text-[11px]">{c.email}</div>
                          </td>
                          <td className="p-3.5">{c.city || "Mumbai, MH"}</td>
                          <td className="p-3.5">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                c.segment === "VIP Reserve"
                                  ? "bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40"
                                  : "bg-black/5 dark:bg-white/10 text-foreground"
                              }`}
                            >
                              {c.segment}
                            </span>
                          </td>
                          <td className="p-3.5 font-semibold">{c.ordersCount} orders</td>
                          <td className="p-3.5 font-bold text-amber-700 dark:text-amber-400">
                            {formatINR(c.totalSpend)}
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <a
                              href={`https://wa.me/${(c.phone || "").replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-emerald-600 hover:underline inline-flex items-center gap-1 font-semibold"
                            >
                              <MessageSquare size={12} /> WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= 5. ORDERS QUEUE & DISPATCH ======================= */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold">Orders Management & Processing Queue</h2>
                  <p className="text-xs text-muted-foreground">Process incoming bookings, dispatch tracking labels, print GST tax invoices, and manage packing slips.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => exportOrdersCSV(ordersList)}
                    className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Download size={13} />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => handleRunScenario("sc_prepaid")}
                    className="px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus size={14} />
                    <span>Simulate New Order</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-3.5 rounded-2xl bg-card border border-border flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="relative flex-1 min-w-[220px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search orders by customer, phone, order ID, or city..."
                    value={searchOrders}
                    onChange={(e) => setSearchOrders(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <select
                  value={filterOrderStatus}
                  onChange={(e) => setFilterOrderStatus(e.target.value)}
                  className="bg-background border border-border rounded-xl px-3 py-2 text-xs"
                >
                  <option value="all">All Order Statuses ({ordersList.length})</option>
                  <option value="pending">New Orders</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">In Packing</option>
                  <option value="shipped">Dispatched</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Orders Table */}
              <div className="rounded-2xl bg-card border border-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-black/5 dark:bg-white/5 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <tr>
                        <th className="p-3.5">Order ID & Date</th>
                        <th className="p-3.5">Customer Contact</th>
                        <th className="p-3.5">Line Items & Packs</th>
                        <th className="p-3.5">Total & Payment</th>
                        <th className="p-3.5">Fulfillment Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="p-3.5">
                            <div className="font-bold text-amber-700 dark:text-amber-400 font-mono">{o.id}</div>
                            <div className="text-[11px] text-muted-foreground">{o.date} {o.time}</div>
                          </td>
                          <td className="p-3.5">
                            <div className="font-semibold">{o.customer}</div>
                            <div className="text-[11px] text-muted-foreground">{o.phone}</div>
                            <div className="text-[10px] text-muted-foreground/80">{o.city}</div>
                          </td>
                          <td className="p-3.5 max-w-xs text-muted-foreground leading-relaxed">
                            {o.items}
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-sm text-foreground">{formatINR(o.total)}</div>
                            <span className="text-[10px] font-semibold text-muted-foreground">
                              {o.paymentMode || "COD"} • {o.paymentStatus || "Paid"}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <select
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                              className="bg-background border border-border rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none"
                            >
                              <option value="New Orders">New Orders</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="In Packing">In Packing</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5 flex-wrap">
                              <button
                                onClick={() => {
                                  setSelectedOrderForModal(o);
                                  setIsOrderLifecycleModalOpen(true);
                                }}
                                title="Order Lifecycle"
                                className="p-1.5 rounded-lg border border-border hover:bg-black/5 text-amber-700 dark:text-amber-400 cursor-pointer"
                              >
                                <Clock size={13} />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedOrderForModal(o);
                                  setIsInvoiceModalOpen(true);
                                }}
                                title="Print Tax Invoice"
                                className="p-1.5 rounded-lg border border-border hover:bg-black/5 cursor-pointer"
                              >
                                <Printer size={13} />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedOrderForModal(o);
                                  setIsShippingLabelModalOpen(true);
                                }}
                                title="Print Shipping Label"
                                className="p-1.5 rounded-lg border border-border hover:bg-black/5 cursor-pointer"
                              >
                                <Truck size={13} />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedOrderForModal(o);
                                  setIsPackingSlipModalOpen(true);
                                }}
                                title="Print Warehouse Slip"
                                className="p-1.5 rounded-lg border border-border hover:bg-black/5 cursor-pointer"
                              >
                                <Boxes size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-muted-foreground">
                            No orders found matching the filter criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= 6. PAYMENTS & GATEWAY ======================= */}
          {activeTab === "payments" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold">Payments & Gateway Reconciliation</h2>
                  <p className="text-xs text-muted-foreground">Razorpay gateway settlements, Cash on Delivery collections, and refunds ledger.</p>
                </div>
                <button
                  onClick={() => exportPaymentsCSV()}
                  className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Export Settlements CSV</span>
                </button>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Total Gross Volume</div>
                  <div className="font-display text-2xl font-bold mt-1">{formatINR(grossRevenue)}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Across all payment channels</div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Razorpay Online Paid</div>
                  <div className="font-display text-2xl font-bold mt-1 text-emerald-600">
                    {formatINR(paymentsList.filter((p) => p.paymentMode === "Razorpay Online").reduce((a, b) => a + b.amount, 0))}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">Instant UPI & Cards</div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Cash on Delivery (COD)</div>
                  <div className="font-display text-2xl font-bold mt-1 text-amber-600">
                    {formatINR(paymentsList.filter((p) => p.paymentMode === "Cash on Delivery").reduce((a, b) => a + b.amount, 0))}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">Pay on physical delivery</div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Net Bank Settled</div>
                  <div className="font-display text-2xl font-bold mt-1 text-sky-600">
                    {formatINR(Math.round(grossRevenue * 0.976))}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">After 2% gateway deduction</div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="rounded-2xl bg-card border border-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-black/5 dark:bg-white/5 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <tr>
                        <th className="p-3.5">Transaction ID</th>
                        <th className="p-3.5">Order Ref</th>
                        <th className="p-3.5">Customer</th>
                        <th className="p-3.5">Channel</th>
                        <th className="p-3.5">Amount</th>
                        <th className="p-3.5">Gateway Ref</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paymentsList.map((p) => (
                        <tr key={p.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                          <td className="p-3.5 font-mono font-semibold">{p.id}</td>
                          <td className="p-3.5 font-bold text-amber-700 dark:text-amber-400">{p.orderId}</td>
                          <td className="p-3.5">{p.customer}</td>
                          <td className="p-3.5 font-medium">{p.paymentMode}</td>
                          <td className="p-3.5 font-bold">{formatINR(p.amount)}</td>
                          <td className="p-3.5 font-mono text-muted-foreground">{p.gatewayRef}</td>
                          <td className="p-3.5">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                p.status === "Settled"
                                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                                  : p.status === "Failed"
                                  ? "bg-destructive/15 text-destructive"
                                  : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= 7. SHIPPING & LOGISTICS ======================= */}
          {activeTab === "shipping" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold">Shipping, Logistics & Delivery Verification</h2>
                  <p className="text-xs text-muted-foreground">Courier partner allocations (Delhivery, Blue Dart), AWB tracking, and Proof of Delivery (POD).</p>
                </div>
                <button
                  onClick={() => exportShippingCSV()}
                  className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Export Shipping Log</span>
                </button>
              </div>

              {/* Shipping Table */}
              <div className="rounded-2xl bg-card border border-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-black/5 dark:bg-white/5 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <tr>
                        <th className="p-3.5">Order Ref</th>
                        <th className="p-3.5">Recipient & Destination</th>
                        <th className="p-3.5">Courier Partner</th>
                        <th className="p-3.5">AWB / Tracking Number</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">POD Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {shipmentsList.map((s) => (
                        <tr key={s.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                          <td className="p-3.5 font-bold text-amber-700 dark:text-amber-400 font-mono">{s.orderId}</td>
                          <td className="p-3.5">
                            <div className="font-semibold">{s.customer}</div>
                            <div className="text-[11px] text-muted-foreground">{s.destination}</div>
                          </td>
                          <td className="p-3.5 font-medium">{s.courier}</td>
                          <td className="p-3.5 font-mono text-amber-600 hover:underline cursor-pointer">
                            {s.awb}
                          </td>
                          <td className="p-3.5">
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-sky-500/15 text-sky-700 dark:text-sky-300">
                              {s.status}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                s.podVerified
                                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                                  : "bg-black/5 dark:bg-white/10 text-muted-foreground"
                              }`}
                            >
                              {s.podVerified ? "✓ Verified POD" : "Pending POD"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= 8. INVENTORY & STOCK ======================= */}
          {activeTab === "inventory" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold">Inventory & Stock Management</h2>
                  <p className="text-xs text-muted-foreground">Monitor warehouse stock quantities, inventory valuation, and stock movement audit trails.</p>
                </div>
                <button
                  onClick={() => exportInventoryCSV()}
                  className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Export Inventory CSV</span>
                </button>
              </div>

              {/* Stock Movement Audit Log */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-amber-600" />
                  <span>Stock Movement History (Audit Trail)</span>
                </h3>
                <div className="overflow-x-auto max-h-72">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-black/5 dark:bg-white/5 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground sticky top-0">
                      <tr>
                        <th className="p-2.5">Timestamp</th>
                        <th className="p-2.5">Product SKU</th>
                        <th className="p-2.5">Movement Type</th>
                        <th className="p-2.5">Quantity Delta</th>
                        <th className="p-2.5">Resulting Stock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {stockLogsList.map((log) => (
                        <tr key={log.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                          <td className="p-2.5 text-muted-foreground">{log.timestamp}</td>
                          <td className="p-2.5 font-semibold">{log.productName}</td>
                          <td className="p-2.5 font-medium">{log.movementType}</td>
                          <td
                            className={`p-2.5 font-bold ${
                              log.delta > 0 ? "text-emerald-600" : "text-destructive"
                            }`}
                          >
                            {log.delta > 0 ? `+${log.delta}` : log.delta}
                          </td>
                          <td className="p-2.5 font-bold">{log.resultingStock} units</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= 9. RETURNS & REFUNDS ======================= */}
          {activeTab === "returns" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold">Returns, Exchanges & Refunds Hub</h2>
                  <p className="text-xs text-muted-foreground">Manage customer return requests, 7-day policy verification, reverse pickup AWBs, and replacements.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => exportReturnsCSV()}
                    className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Download size={13} />
                    <span>Export Returns CSV</span>
                  </button>
                  <button
                    onClick={() => handleRunScenario("sc_return")}
                    className="px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus size={14} />
                    <span>Simulate Return Request</span>
                  </button>
                </div>
              </div>

              {/* Returns Table */}
              <div className="rounded-2xl bg-card border border-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-black/5 dark:bg-white/5 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <tr>
                        <th className="p-3.5">Return ID & Date</th>
                        <th className="p-3.5">Customer & Order Ref</th>
                        <th className="p-3.5">Items & Reason</th>
                        <th className="p-3.5">Policy Eligibility</th>
                        <th className="p-3.5">Reverse AWB & Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {returnsList.map((r) => (
                        <tr key={r.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                          <td className="p-3.5 font-bold font-mono text-amber-700 dark:text-amber-400">
                            {r.id}
                            <div className="text-[10px] text-muted-foreground font-normal">{r.date}</div>
                          </td>
                          <td className="p-3.5">
                            <div className="font-semibold">{r.customer}</div>
                            <div className="text-[11px] font-mono text-muted-foreground">Order: {r.orderId}</div>
                          </td>
                          <td className="p-3.5">
                            <div className="font-medium">{r.items}</div>
                            <div className="text-[11px] text-muted-foreground">{r.reason}</div>
                          </td>
                          <td className="p-3.5">
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                              ✓ 7-Day Window OK
                            </span>
                          </td>
                          <td className="p-3.5">
                            <div className="font-mono text-xs">{r.reverseAwb}</div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                              {r.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => {
                                updateReturnStatus(r.id, "Approved");
                                toast.success(`Return ${r.id} marked Approved.`);
                              }}
                              className="text-xs text-emerald-600 hover:underline cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                setSelectedOrderForModal(ordersList.find((o) => o.id === r.orderId) || ordersList[0] || null);
                                setIsRefundModalOpen(true);
                              }}
                              className="text-xs text-amber-600 hover:underline cursor-pointer"
                            >
                              Issue Refund
                            </button>
                          </td>
                        </tr>
                      ))}
                      {returnsList.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-muted-foreground">
                            No return requests on record.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= 10. NOTIFICATIONS HUB ======================= */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="font-display text-2xl font-bold">Multi-Channel Customer Notification Dispatcher</h2>
                <p className="text-xs text-muted-foreground">8 Automated event templates for instant WhatsApp Web messaging & transactional emails.</p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border shadow-xs max-w-3xl space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Select Customer Order
                    </label>
                    <select
                      value={selectedNotifOrderId}
                      onChange={(e) => setSelectedNotifOrderId(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs font-medium"
                    >
                      {ordersList.map((o) => (
                        <option key={o.id} value={o.id}>
                          #{o.id} - {o.customer} (₹{o.total})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Notification Touchpoint Event
                    </label>
                    <select
                      value={selectedNotifTemplate}
                      onChange={(e) => setSelectedNotifTemplate(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs font-medium"
                    >
                      <option value="order_confirm">1. Order Confirmation (WhatsApp / Email)</option>
                      <option value="payment_receipt">2. Payment Receipt Notification</option>
                      <option value="order_processing">3. Order In Processing / Packing</option>
                      <option value="order_shipped">4. Order Shipped & AWB Live Tracking</option>
                      <option value="out_delivery">5. Out for Delivery Notification</option>
                      <option value="order_delivered">6. Order Delivered & Review Request</option>
                      <option value="order_cancelled">7. Order Cancellation & Refund Notice</option>
                      <option value="return_update">8. Return / Exchange Request Update</option>
                    </select>
                  </div>
                </div>

                {notificationPreview && (
                  <div className="space-y-3 pt-3 border-t border-border">
                    <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
                      Live Message Preview:
                    </div>
                    {/* Simulated WhatsApp Bubble */}
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-sans whitespace-pre-wrap leading-relaxed">
                      {notificationPreview.whatsappText}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(notificationPreview.whatsappText);
                          toast.success("Notification message copied to clipboard!");
                        }}
                        className="px-4 py-2 rounded-xl border border-border bg-card text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Copy size={13} />
                        <span>Copy Message</span>
                      </button>
                      <a
                        href={notificationPreview.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <Send size={13} />
                        <span>Open in WhatsApp Web</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================= 11. SUPPORT & REVIEWS ======================= */}
          {activeTab === "support" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="font-display text-2xl font-bold">Support Tickets & Review Moderation</h2>
                <p className="text-xs text-muted-foreground">Customer inquiries, complaint tickets desk, and product rating reviews.</p>
              </div>

              {/* Support Tickets */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                  <Headphones size={16} className="text-amber-600" />
                  <span>Customer Support & Complaints Desk</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-black/5 dark:bg-white/5 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <tr>
                        <th className="p-3">Ticket ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Issue Category</th>
                        <th className="p-3">Priority</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {ticketsList.map((t) => (
                        <tr key={t.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                          <td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400">{t.id}</td>
                          <td className="p-3">
                            <div className="font-semibold">{t.customer}</div>
                            <div className="text-[11px] text-muted-foreground">{t.phone}</div>
                          </td>
                          <td className="p-3 font-medium">{t.issueCategory}</td>
                          <td className="p-3">
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                              {t.priority}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                              {t.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                updateTicketStatus(t.id, "Resolved");
                                toast.success(`Ticket ${t.id} marked Resolved.`);
                              }}
                              className="text-xs text-emerald-600 hover:underline cursor-pointer"
                            >
                              Mark Resolved
                            </button>
                          </td>
                        </tr>
                      ))}
                      {ticketsList.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-muted-foreground">
                            No open customer support tickets.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product Reviews Moderation */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                  <Star size={16} className="text-amber-500" />
                  <span>Product Reviews Moderation Desk</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-black/5 dark:bg-white/5 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3">Reviewer & Date</th>
                        <th className="p-3">Rating</th>
                        <th className="p-3">Review Text</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {reviewsList.map((rev) => (
                        <tr key={rev.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                          <td className="p-3 font-semibold">{rev.productName}</td>
                          <td className="p-3 text-muted-foreground">{rev.reviewer} ({rev.date})</td>
                          <td className="p-3 font-bold text-amber-500">★ {rev.rating}.0</td>
                          <td className="p-3 max-w-xs text-muted-foreground leading-relaxed">{rev.comment}</td>
                          <td className="p-3">
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                              {rev.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => {
                                updateReviewStatus(rev.id, "Approved");
                                toast.success("Review published to storefront!");
                              }}
                              className="text-xs text-emerald-600 hover:underline cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                updateReviewStatus(rev.id, "Hidden");
                                toast.info("Review hidden from storefront.");
                              }}
                              className="text-xs text-muted-foreground hover:underline cursor-pointer"
                            >
                              Hide
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= 12. REPORTS & FINANCIAL AUDIT ======================= */}
          {activeTab === "reports" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="font-display text-2xl font-bold">Advanced Financial Intelligence & Audit Reports</h2>
                <p className="text-xs text-muted-foreground">Download standard audit spreadsheets, GST tax breakdowns, and bank payout reconciliation.</p>
              </div>

              {/* 6 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Total Gross Turnover</div>
                  <div className="font-display text-2xl font-bold text-foreground mt-1">{formatINR(grossRevenue)}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Across all confirmed customer orders</div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">GST (5% Inclusive) Collected</div>
                  <div className="font-display text-2xl font-bold text-sky-600 mt-1">
                    {formatINR(Math.round(grossRevenue * 0.05))}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">CGST 2.5% + SGST 2.5% breakdown</div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Payment Gateway Deductions</div>
                  <div className="font-display text-2xl font-bold text-destructive mt-1">
                    {formatINR(Math.round(grossRevenue * 0.024))}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">2% + 18% GST gateway charge</div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Net Bank Payout</div>
                  <div className="font-display text-2xl font-bold text-emerald-600 mt-1">
                    {formatINR(Math.round(grossRevenue * 0.976))}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">Net settled to official bank account</div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Inventory Asset Valuation</div>
                  <div className="font-display text-2xl font-bold text-amber-600 mt-1">{formatINR(catalogValuation)}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Total finished goods in stock</div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Average Order Value (AOV)</div>
                  <div className="font-display text-2xl font-bold text-foreground mt-1">
                    {formatINR(totalOrdersCount > 0 ? Math.round(grossRevenue / totalOrdersCount) : 0)}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">Per cart transaction</div>
                </div>
              </div>

              {/* 6 Downloadable Report Cards */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-xs">
                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileSpreadsheet size={18} className="text-amber-600" />
                  <span>Downloadable Audit & Accounting Spreadsheets</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold">
                  <button
                    onClick={() => exportOrdersCSV(ordersList)}
                    className="p-4 rounded-xl border border-border hover:bg-black/5 dark:hover:bg-white/5 text-left flex items-center justify-between cursor-pointer"
                  >
                    <span>Orders & Invoices CSV</span>
                    <Download size={14} className="text-amber-600" />
                  </button>
                  <button
                    onClick={() => exportPaymentsCSV()}
                    className="p-4 rounded-xl border border-border hover:bg-black/5 dark:hover:bg-white/5 text-left flex items-center justify-between cursor-pointer"
                  >
                    <span>Gateway Settlements CSV</span>
                    <Download size={14} className="text-amber-600" />
                  </button>
                  <button
                    onClick={() => exportShippingCSV()}
                    className="p-4 rounded-xl border border-border hover:bg-black/5 dark:hover:bg-white/5 text-left flex items-center justify-between cursor-pointer"
                  >
                    <span>Courier & Logistics CSV</span>
                    <Download size={14} className="text-amber-600" />
                  </button>
                  <button
                    onClick={() => exportInventoryCSV()}
                    className="p-4 rounded-xl border border-border hover:bg-black/5 dark:hover:bg-white/5 text-left flex items-center justify-between cursor-pointer"
                  >
                    <span>Inventory Valuation CSV</span>
                    <Download size={14} className="text-amber-600" />
                  </button>
                  <button
                    onClick={() => exportReturnsCSV()}
                    className="p-4 rounded-xl border border-border hover:bg-black/5 dark:hover:bg-white/5 text-left flex items-center justify-between cursor-pointer"
                  >
                    <span>Returns & Refunds CSV</span>
                    <Download size={14} className="text-amber-600" />
                  </button>
                  <button
                    onClick={() => exportCustomersCSV(customersList)}
                    className="p-4 rounded-xl border border-border hover:bg-black/5 dark:hover:bg-white/5 text-left flex items-center justify-between cursor-pointer"
                  >
                    <span>Customer LTV Directory CSV</span>
                    <Download size={14} className="text-amber-600" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================= 13. TEST SCENARIOS HUB ======================= */}
          {activeTab === "testing" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 text-white shadow-lg space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                      <PlayCircle size={24} className="text-amber-300" />
                      <span>End-to-End Test Order Scenarios Hub</span>
                    </h2>
                    <p className="text-xs text-amber-100/80 mt-1 max-w-2xl leading-relaxed">
                      Interactive test suite for client verification and pre-handover sign-off. Every scenario executes realistic order lifecycle transitions, payment idempotency, stock deductions, reverse pickups, and notification dispatches with live CRM state updates.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 size={13} /> 100% READY FOR HANDOVER
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleRunAllScenarios}
                    className="px-4 py-2.5 rounded-xl bg-white text-amber-900 text-xs font-bold hover:bg-amber-100 cursor-pointer inline-flex items-center gap-2 shadow-sm"
                  >
                    <PlayCircle size={15} />
                    <span>Run All 11 Scenarios in Sequence</span>
                  </button>
                  <button
                    onClick={handleResetTestState}
                    className="px-4 py-2.5 rounded-xl bg-black/20 border border-white/20 text-white text-xs font-bold hover:bg-black/30 cursor-pointer inline-flex items-center gap-2"
                  >
                    <RotateCcw size={14} />
                    <span>Reset Test Data & Factory State</span>
                  </button>
                </div>
              </div>

              {/* Scenario Matrix Table */}
              <div className="rounded-2xl bg-card border border-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-black/5 dark:bg-white/5 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <tr>
                        <th className="p-3.5 w-12">#</th>
                        <th className="p-3.5">Test Scenario</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Expected Handover Result</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Execute</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {Object.values(testMatrix).map((item, idx) => (
                        <tr key={item.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="p-3.5 font-bold text-muted-foreground">{idx + 1}</td>
                          <td className="p-3.5 font-semibold text-foreground">{item.name}</td>
                          <td className="p-3.5 text-muted-foreground font-medium">{item.category}</td>
                          <td className="p-3.5 text-muted-foreground max-w-md leading-relaxed">{item.expected}</td>
                          <td className="p-3.5">
                            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                              ✓ {item.status} ({item.lastRun})
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleRunScenario(item.id)}
                              className="px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-semibold cursor-pointer inline-flex items-center gap-1 shadow-xs"
                            >
                              <PlayCircle size={12} />
                              <span>Run</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= 14. SETTINGS & ROLES ======================= */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
              <div>
                <h2 className="font-display text-2xl font-bold">Store Settings, Gateway & Security</h2>
                <p className="text-xs text-muted-foreground">Configure official store identity, Razorpay keys, SMTP notification email, and database backups.</p>
              </div>

              {/* Official Store Profile */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                  <Sliders size={18} className="text-amber-600" />
                  <span>Official Store Profile & Tax Invoices</span>
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveStoreSettings(settings);
                    toast.success("Store profile settings updated successfully.");
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-muted-foreground font-semibold mb-1">Official Store Name</label>
                      <input
                        type="text"
                        value={settings.storeName}
                        onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-muted-foreground font-semibold mb-1">Tagline</label>
                      <input
                        type="text"
                        value={settings.tagline}
                        onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-muted-foreground font-semibold mb-1">Contact Phone</label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-muted-foreground font-semibold mb-1">WhatsApp Order Number</label>
                      <input
                        type="text"
                        value={settings.whatsapp}
                        onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-muted-foreground font-semibold mb-1">Official Support Email</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-muted-foreground font-semibold mb-1">GSTIN / Tax ID</label>
                      <input
                        type="text"
                        value={settings.gstin}
                        onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-muted-foreground font-semibold mb-1">Bakery / Headquarter Address</label>
                    <textarea
                      rows={2}
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button type="submit" className="px-4 py-2 rounded-xl bg-amber-700 text-white font-semibold hover:bg-amber-800 cursor-pointer">
                      Save Store Settings
                    </button>
                  </div>
                </form>
              </div>

              {/* Razorpay Gateway Settings */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                    <CreditCard size={18} className="text-amber-600" />
                    <span>Razorpay Payment Gateway Integration</span>
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold">
                    Gateway Ready
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-muted-foreground font-semibold mb-1">Razorpay Key ID</label>
                    <input
                      type="text"
                      value={settings.razorpayKeyId}
                      onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground font-semibold mb-1">Merchant Brand Name</label>
                    <input
                      type="text"
                      value={settings.razorpayMerchantName}
                      onChange={(e) => setSettings({ ...settings, razorpayMerchantName: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Database Backup & Factory Reset */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                  <Database size={18} className="text-amber-600" />
                  <span>Store Data Backup & Recovery</span>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Export a complete JSON snapshot of all products, orders, returns, and settings, or restore state from a file.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => exportFullBackupJSON()}
                    className="px-4 py-2 rounded-xl border border-border bg-card text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Download size={13} />
                    <span>Download JSON Backup</span>
                  </button>

                  <label className="px-4 py-2 rounded-xl border border-border bg-card text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5">
                    <Upload size={13} />
                    <span>Restore from File</span>
                    <input
                      ref={backupInputRef}
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          restoreBackupJSON(
                            file,
                            () => {
                              refreshAllData();
                              toast.success("Database restored successfully from backup!");
                            },
                            (err) => toast.error(err),
                          );
                        }
                      }}
                    />
                  </label>

                  <button
                    onClick={() => {
                      if (window.confirm("Reset catalog back to initial default SAIHIRA formulation specifications?")) {
                        resetProductsCatalog();
                        refreshAllData();
                        toast.info("Catalog restored to factory defaults.");
                      }
                    }}
                    className="px-4 py-2 rounded-xl border border-destructive/40 text-destructive text-xs font-semibold hover:bg-destructive/10 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <RotateCcw size={13} />
                    <span>Reset to Original Products</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ======================================================================
           MODALS
         ====================================================================== */}
      {/* 1. PRODUCT ADD / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card text-foreground border border-border rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h3 className="font-display text-xl font-bold flex items-center gap-2">
                <Package size={20} className="text-amber-600" />
                <span>{editingProduct ? `Edit SKU: ${editingProduct.name}` : "Configure New Product SKU"}</span>
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-black/5 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Product Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                    placeholder="e.g. Asal Methi Bhakhri"
                    className="w-full bg-background border border-border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Family / Tagline</label>
                  <input
                    type="text"
                    value={fTagline}
                    onChange={(e) => setFTagline(e.target.value)}
                    placeholder="e.g. Authentic Gujarati Flavours"
                    className="w-full bg-background border border-border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Category *</label>
                  <select
                    value={fCategory}
                    onChange={(e) => setFCategory(e.target.value as Category)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2"
                  >
                    <option value="bhakhri">Bhakhri (Our Prime Product)</option>
                    <option value="premium-bhakhri">Premium Bhakhri</option>
                    <option value="no-salt-bhakhri">No-Salt Bhakhri</option>
                    <option value="gluten-free-bhakhri">Gluten-Free Bhakhri</option>
                    <option value="rotla">Rotla</option>
                    <option value="khakhra">Round Baked Khakhra</option>
                    <option value="mobile-khakhra">Mobile Khakhra</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Pack Weight / Size</label>
                  <input
                    type="text"
                    value={fWeight}
                    onChange={(e) => setFWeight(e.target.value)}
                    placeholder="200 g"
                    className="w-full bg-background border border-border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={fPrice}
                    onChange={(e) => setFPrice(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    value={fSalePrice || ""}
                    onChange={(e) => setFSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional"
                    className="w-full bg-background border border-border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={fStock}
                    onChange={(e) => setFStock(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              {/* Image Upload Zone */}
              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Product Photo</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 rounded-2xl border-2 border-dashed border-border hover:border-amber-600 bg-black/5 dark:bg-white/5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img src={fImage} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-border bg-white" />
                    <div>
                      <div className="font-semibold text-foreground">Click to upload from device</div>
                      <div className="text-[11px] text-muted-foreground">PNG, JPG, WEBP (Auto-optimized)</div>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold">Browse</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Product Description</label>
                <textarea
                  rows={2}
                  value={fDescription}
                  onChange={(e) => setFDescription(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="bestseller"
                  checked={fBestseller}
                  onChange={(e) => setFBestseller(e.target.checked)}
                />
                <label htmlFor="bestseller" className="font-semibold cursor-pointer">
                  ★ Mark as Signature Bestseller Batch
                </label>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-black/5 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold cursor-pointer shadow-xs"
                >
                  Save Product SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. ORDER LIFECYCLE & TIMELINE MODAL */}
      {isOrderLifecycleModalOpen && selectedOrderForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card text-foreground border border-border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="font-display text-xl font-bold flex items-center gap-2">
                <Clock size={20} className="text-amber-600" />
                <span>Order Lifecycle: #{selectedOrderForModal.id}</span>
              </h3>
              <button
                onClick={() => setIsOrderLifecycleModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-black/5 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
                <div>
                  <div className="font-bold text-foreground">{selectedOrderForModal.customer}</div>
                  <div className="text-muted-foreground">{selectedOrderForModal.phone}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-700 dark:text-amber-400">{formatINR(selectedOrderForModal.total)}</div>
                  <div className="text-[10px] text-muted-foreground">{selectedOrderForModal.paymentMode || "COD"}</div>
                </div>
              </div>

              {/* Visual Timeline Steps */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0">✓</div>
                  <div>
                    <div className="font-bold">1. Order Booking Created</div>
                    <div className="text-muted-foreground text-[11px]">{selectedOrderForModal.date} {selectedOrderForModal.time}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0">✓</div>
                  <div>
                    <div className="font-bold">2. Payment Verification</div>
                    <div className="text-muted-foreground text-[11px]">Status: {selectedOrderForModal.paymentStatus || "Paid"} via {selectedOrderForModal.paymentMode}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs shrink-0">3</div>
                  <div>
                    <div className="font-bold">3. Hand-Crafting & Cast-Iron Baking</div>
                    <div className="text-muted-foreground text-[11px]">Items: {selectedOrderForModal.items}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shrink-0">4</div>
                  <div>
                    <div className="font-bold">4. Courier Partner Handover</div>
                    <div className="text-muted-foreground text-[11px]">Courier: {selectedOrderForModal.courierPartner || "Delhivery"} (AWB: {selectedOrderForModal.awb})</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <button
                onClick={() => setIsOrderLifecycleModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-amber-700 text-white font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PRINTABLE TAX INVOICE MODAL */}
      {isInvoiceModalOpen && selectedOrderForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-black rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative font-sans space-y-6">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-amber-900">{settings.storeName}</h2>
                <p className="text-[11px] text-neutral-600 mt-0.5">{settings.tagline}</p>
                <p className="text-[11px] text-neutral-600 leading-tight mt-1">{settings.address}</p>
                <p className="text-[11px] text-neutral-700 font-bold mt-1">GSTIN: {settings.gstin}</p>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase font-extrabold px-3 py-1 rounded bg-amber-100 text-amber-900">TAX INVOICE</span>
                <p className="text-xs font-bold mt-2">Invoice #: INV-{selectedOrderForModal.id}</p>
                <p className="text-xs text-neutral-600">Date: {selectedOrderForModal.date}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs border p-3 rounded-lg bg-neutral-50">
              <div>
                <span className="font-bold uppercase text-[10px] text-neutral-500 block">Billed To (Customer):</span>
                <p className="font-bold text-sm text-neutral-900">{selectedOrderForModal.customer}</p>
                <p>{selectedOrderForModal.address || "Direct Storefront Pickup"}</p>
                <p>{selectedOrderForModal.city}</p>
                <p className="font-medium">Phone: {selectedOrderForModal.phone}</p>
              </div>
              <div className="text-right">
                <span className="font-bold uppercase text-[10px] text-neutral-500 block">Payment & Logistics:</span>
                <p>Mode: <b>{selectedOrderForModal.paymentMode || "COD"}</b></p>
                <p>Courier: {selectedOrderForModal.courierPartner || "Delhivery Express"}</p>
                <p>AWB: {selectedOrderForModal.awb}</p>
              </div>
            </div>

            {/* Line items table */}
            <table className="w-full text-xs text-left border">
              <thead className="bg-neutral-100 text-[10px] uppercase font-bold border-b">
                <tr>
                  <th className="p-2.5">Item Description</th>
                  <th className="p-2.5">HSN Code</th>
                  <th className="p-2.5 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-2.5 font-medium">{selectedOrderForModal.items}</td>
                  <td className="p-2.5 font-mono">19059040</td>
                  <td className="p-2.5 text-right font-bold">{formatINR(selectedOrderForModal.total)}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-between items-center text-xs pt-2">
              <div className="text-neutral-500 text-[11px]">
                Inclusive of 2.5% CGST and 2.5% SGST. Handcrafted with zero preservatives.
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-amber-900">Total: {formatINR(selectedOrderForModal.total)}</div>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end gap-3 print:hidden">
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold cursor-pointer hover:bg-neutral-100"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-amber-900 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 shadow"
              >
                <Printer size={14} />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. PRINTABLE COURIER SHIPPING LABEL MODAL */}
      {isShippingLabelModalOpen && selectedOrderForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-2xl p-6 max-w-md w-full shadow-2xl relative font-sans space-y-4 border border-neutral-300">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="font-black text-sm tracking-wider uppercase">{selectedOrderForModal.courierPartner || "DELHIVERY EXPRESS"}</span>
                <span className="block text-[10px] text-neutral-600">STANDARD DOMESTIC AIR / SURFACE</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold bg-neutral-200 px-2 py-0.5 rounded">
                  {selectedOrderForModal.paymentMode === "Cash on Delivery" ? "COD ₹" + selectedOrderForModal.total : "PREPAID"}
                </span>
              </div>
            </div>

            {/* Barcode Mock */}
            <div className="text-center py-2 border-y bg-neutral-50 font-mono tracking-widest text-lg font-black select-none">
              ||| ||||| |||| || ||||||| ||||
              <div className="text-[11px] font-bold text-neutral-700 tracking-normal mt-0.5">
                AWB: {selectedOrderForModal.awb}
              </div>
            </div>

            <div className="text-xs space-y-3">
              <div className="border p-2.5 rounded bg-neutral-50">
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">Deliver To (Consignee):</span>
                <p className="font-bold text-sm text-neutral-900">{selectedOrderForModal.customer}</p>
                <p>{selectedOrderForModal.address || "Direct Address"}</p>
                <p className="font-semibold">{selectedOrderForModal.city}</p>
                <p className="font-bold text-neutral-800">Phone: {selectedOrderForModal.phone}</p>
              </div>

              <div className="text-[11px] border p-2 rounded text-neutral-600">
                <span className="font-bold text-neutral-800">Shipped By (Sender):</span><br />
                {settings.storeName}, {settings.address} (Ph: {settings.phone})
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 print:hidden">
              <button
                onClick={() => setIsShippingLabelModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold cursor-pointer hover:bg-neutral-100"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-amber-900 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
              >
                <Printer size={13} />
                <span>Print Label</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. PRINTABLE WAREHOUSE PACKING SLIP MODAL */}
      {isPackingSlipModalOpen && selectedOrderForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-2xl p-6 max-w-md w-full shadow-2xl relative font-sans space-y-4 border border-neutral-300">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="font-black text-sm uppercase">WAREHOUSE PACKING SLIP</span>
                <div className="text-[11px] text-neutral-600">Order: #{selectedOrderForModal.id}</div>
              </div>
              <span className="text-xs font-bold bg-neutral-100 px-2.5 py-1 rounded">BATCH DISPATCH</span>
            </div>

            <div className="text-xs space-y-2 border p-3 rounded">
              <div className="font-bold text-neutral-700">Checklist of Handcrafted Items:</div>
              <div className="p-2 rounded bg-neutral-50 border flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="font-semibold text-neutral-900">{selectedOrderForModal.items}</span>
              </div>
              <div className="text-[11px] text-neutral-600 pt-1">
                Quality Check: Vacuum seal intact, 100% roasted, moisture barrier verified.
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 print:hidden">
              <button
                onClick={() => setIsPackingSlipModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold cursor-pointer hover:bg-neutral-100"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-amber-900 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
              >
                <Printer size={13} />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. INITIATE REFUND MODAL */}
      {isRefundModalOpen && selectedOrderForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card text-foreground border border-border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <RotateCcw size={20} className="text-amber-600" />
              <span>Initiate Order Refund</span>
            </h3>

            <div className="text-xs space-y-3">
              <div>
                <label className="block text-muted-foreground font-semibold mb-1">Order Reference</label>
                <input
                  type="text"
                  disabled
                  value={`#${selectedOrderForModal.id} - ${selectedOrderForModal.customer}`}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">Refund Amount (₹)</label>
                <input
                  type="number"
                  defaultValue={selectedOrderForModal.total}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 font-bold"
                />
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">Reason for Refund</label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 font-medium"
                >
                  <option value="Customer requested cancellation">Customer requested cancellation</option>
                  <option value="Packaging damaged in transit">Packaging damaged in transit</option>
                  <option value="Flavor preference exchange">Flavor preference exchange</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end gap-2">
              <button
                onClick={() => setIsRefundModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-border hover:bg-black/5 cursor-pointer font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateOrderStatus(selectedOrderForModal.id, "Cancelled");
                  toast.success(`Refund of ₹${selectedOrderForModal.total} processed to original payment method.`);
                  setIsRefundModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-destructive text-white font-semibold cursor-pointer shadow-xs"
              >
                Confirm Refund
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. CREATE PROMO COUPON MODAL */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card text-foreground border border-border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Ticket size={20} className="text-amber-600" />
              <span>Create Promo Coupon</span>
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addCoupon({
                  code: cCode.toUpperCase().trim(),
                  description: cDesc.trim(),
                  discountType: cType,
                  discountValue: Number(cValue),
                  minOrder: Number(cMinOrder),
                  expiryDate: cExpiry,
                  redeemedCount: 0,
                  isActive: true,
                });
                refreshAllData();
                setIsCouponModalOpen(false);
                toast.success(`Coupon ${cCode.toUpperCase()} activated!`);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-muted-foreground font-semibold mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ASAL30"
                  value={cCode}
                  onChange={(e) => setCCode(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 uppercase font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted-foreground font-semibold mb-1">Discount Type</label>
                  <select
                    value={cType}
                    onChange={(e) => setCType(e.target.value as any)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Flat (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-muted-foreground font-semibold mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    value={cValue}
                    onChange={(e) => setCValue(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted-foreground font-semibold mb-1">Min Order (₹)</label>
                  <input
                    type="number"
                    value={cMinOrder}
                    onChange={(e) => setCMinOrder(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground font-semibold mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={cExpiry}
                    onChange={(e) => setCExpiry(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">Description</label>
                <input
                  type="text"
                  value={cDesc}
                  onChange={(e) => setCDesc(e.target.value)}
                  placeholder="e.g. 15% off festive celebration"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2"
                />
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-black/5 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-700 text-white font-semibold hover:bg-amber-800 cursor-pointer shadow-xs"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
