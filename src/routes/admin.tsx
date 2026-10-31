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
} from "lucide-react";
import {
  type Product,
  type Category,
  getStoredProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetProductsCatalog,
  formatINR,
  PRODUCT_IMAGE_PRESETS,
} from "@/lib/products";
import {
  type Order,
  type Customer,
  type Inquiry,
  type OrderStatus,
  type InquiryStatus,
  getStoredOrders,
  saveStoredOrders,
  updateOrderStatus,
  deleteOrder,
  clearAllOrders,
  getStoredCustomers,
  clearAllCustomers,
  getStoredInquiries,
  updateInquiryStatus,
  deleteInquiry,
  clearAllInquiries,
  exportProductsCSV,
  exportOrdersCSV,
  exportCustomersCSV,
  exportInquiriesCSV,
} from "@/lib/crm";
import logoSrc from "@/assets/logo-hd.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "SAIHIRA CRM & Staff Admin Hub" },
      {
        name: "description",
        content:
          "Internal CRM and commerce administration hub for SAIHIRA: product catalog control, CSV exports, customer profiles, and real-time order tracking.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminHub,
});

type TabType = "dashboard" | "products" | "orders" | "customers" | "inquiries";

export function AdminHub() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [customersList, setCustomersList] = useState<Customer[]>([]);
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Modal / Form state for Product Addition
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields matching reference
  const [fName, setFName] = useState("");
  const [fCategory, setFCategory] = useState<Category>("khakhra");
  const [fFamily, setFFamily] = useState("Whole Wheat");
  const [fPrice, setFPrice] = useState<number>(120);
  const [fSalePrice, setFSalePrice] = useState<number | undefined>(undefined);
  const [fStock, setFStock] = useState<number>(45);
  const [fImage, setFImage] = useState<string>(PRODUCT_IMAGE_PRESETS[0].url);
  const [fImageMode, setFImageMode] = useState<"file" | "url">("file");
  const [isDragging, setIsDragging] = useState(false);
  const [isOptimizingImage, setIsOptimizingImage] = useState(false);
  const [fNotes, setFNotes] = useState("Hand-ground spices · Whole wheat · Roasted");
  const [fWeight, setFWeight] = useState("200 g");
  const [fRating, setFRating] = useState<number>(4.9);
  const [fBadge, setFBadge] = useState("Signature Batch");
  const [fTagline, setFTagline] = useState("Clean, wholesome taste");
  const [fDescription, setFDescription] = useState(
    "Paper-thin, hand-rolled and slow-roasted on cast-iron tawas until perfectly crisp. Baked in small batches with zero preservatives.",
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync data function
  const refreshAllData = (showToast = false) => {
    if (showToast) setIsSyncing(true);
    setProductsList(getStoredProducts());
    setOrdersList(getStoredOrders());
    setCustomersList(getStoredCustomers());
    setInquiriesList(getStoredInquiries());
    if (showToast) {
      setTimeout(() => {
        setIsSyncing(false);
        toast.success("Telemetry and catalog records synced with live store.");
      }, 400);
    }
  };

  // Lifecycle & Storage sync
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("saihira_admin_logged");
      if (auth === "true") setIsLogged(true);
    }
    refreshAllData();

    const handleSync = () => refreshAllData();
    window.addEventListener("saihira:products-updated", handleSync);
    window.addEventListener("saihira:orders-updated", handleSync);
    window.addEventListener("saihira:customers-updated", handleSync);
    window.addEventListener("saihira:inquiries-updated", handleSync);
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);

    let bc: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        bc = new BroadcastChannel("saihira_sync_bus");
        bc.onmessage = () => refreshAllData();
      } catch (err) {
        void err;
      }
    }

    return () => {
      window.removeEventListener("saihira:products-updated", handleSync);
      window.removeEventListener("saihira:orders-updated", handleSync);
      window.removeEventListener("saihira:customers-updated", handleSync);
      window.removeEventListener("saihira:inquiries-updated", handleSync);
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
      if (bc) bc.close();
    };
  }, []);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim().toLowerCase();
    const p = password.trim();
    if (u === "admin" && (p === "admin123" || p === "saihira2026" || p === "artisan2026")) {
      setIsLogged(true);
      localStorage.setItem("saihira_admin_logged", "true");
      setLoginError("");
      toast.success("Welcome, Administrator. SAIHIRA Staff Hub active.");
    } else {
      setLoginError("Invalid staff credentials. (Tip: username: admin / password: admin123)");
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("saihira_admin_logged");
    toast.info("Signed out from Staff Admin Hub.");
  };

  // Image upload & canvas optimization
  const processImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WEBP, or SVG).");
      return;
    }
    setIsOptimizingImage(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUri = ev.target?.result as string;
      const img = new Image();
      img.src = dataUri;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        const maxDim = 900;
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
          const isPng = file.type === "image/png";
          const optimizedUri = canvas.toDataURL(isPng ? "image/png" : "image/jpeg", 0.88);
          setFImage(optimizedUri);
          toast.success(`Image "${file.name}" uploaded and optimized!`);
        } else {
          setFImage(dataUri);
          toast.success(`Image "${file.name}" uploaded successfully!`);
        }
        setIsOptimizingImage(false);
      };
      img.onerror = () => {
        setFImage(dataUri);
        setIsOptimizingImage(false);
        toast.success(`Image "${file.name}" loaded!`);
      };
    };
    reader.onerror = () => {
      setIsOptimizingImage(false);
      toast.error("Could not read image file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processImageFile(file);
  };

  // Open modal for NEW product
  const openNewProductModal = () => {
    setEditingProduct(null);
    setFName("");
    setFCategory("khakhra");
    setFFamily("Whole Wheat");
    setFPrice(120);
    setFSalePrice(undefined);
    setFStock(45);
    setFImage(PRODUCT_IMAGE_PRESETS[0].url);
    setFImageMode("file");
    setFNotes("Hand-ground spices · Whole wheat · Roasted");
    setFWeight("200 g");
    setFRating(4.9);
    setFBadge("Signature Batch");
    setFTagline("Paper-thin crunch & pure wheat taste");
    setFDescription(
      "Paper-thin, hand-rolled and slow-roasted on cast-iron tawas until crisp. Prepared in small batches with zero preservatives.",
    );
    setIsModalOpen(true);
  };

  // Open modal for EDIT product
  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setFName(product.name);
    setFCategory(product.category);
    setFFamily(product.family || "Whole Wheat");
    setFPrice(product.price);
    setFSalePrice(product.salePrice);
    setFStock(product.stock ?? 35);
    setFImage(product.image);
    setFImageMode(product.image.startsWith("data:") ? "file" : "url");
    setFNotes(Array.isArray(product.notes) ? product.notes.join(" · ") : product.notes || "");
    setFWeight(product.weight || "200 g");
    setFRating(product.rating || 4.9);
    setFBadge(product.badge || "Classic");
    setFTagline(product.tagline || product.name);
    setFDescription(product.description);
    setIsModalOpen(true);
  };

  // Submit product form (Add or Edit)
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fName.trim()) {
      toast.error("Product name is required.");
      return;
    }

    const notesArray = fNotes
      .split(/[·,]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.slug || editingProduct.id!, {
        name: fName.trim(),
        category: fCategory,
        family: fFamily.trim(),
        price: Number(fPrice),
        salePrice: fSalePrice ? Number(fSalePrice) : undefined,
        stock: Number(fStock),
        image: fImage,
        notes: notesArray,
        weight: fWeight.trim() || "200 g",
        rating: Number(fRating),
        badge: fBadge.trim(),
        tagline: fTagline.trim(),
        description: fDescription.trim(),
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
        notes: notesArray,
        weight: fWeight.trim() || "200 g",
        rating: Number(fRating),
        badge: fBadge.trim(),
        tagline: fTagline.trim(),
        description: fDescription.trim(),
      });
      toast.success(`New product "${fName}" added to catalog.`);
    }

    refreshAllData();
    setIsModalOpen(false);
  };

  // Delete product
  const handleDeleteProduct = (product: Product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}" from the catalog?`)) {
      deleteProduct(product.slug || product.id!);
      refreshAllData();
      toast.success(`Product "${product.name}" removed from catalog.`);
    }
  };

  // Reset to default products
  const handleResetCatalog = () => {
    if (window.confirm("Reset catalog back to initial 19 default SAIHIRA formulations?")) {
      resetProductsCatalog();
      refreshAllData();
      toast.info("Catalog restored to default specifications.");
    }
  };

  // Order status update
  const handleOrderStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    refreshAllData();
    toast.success(`Order ${orderId} marked as ${newStatus}.`);
  };

  // Inquiry status update
  const handleInquiryStatusChange = (inquiryId: string, newStatus: InquiryStatus) => {
    updateInquiryStatus(inquiryId, newStatus);
    refreshAllData();
    toast.success(`Inquiry ${inquiryId} updated to "${newStatus}".`);
  };

  // Delete inquiry
  const handleDeleteInquiry = (inquiryId: string) => {
    if (window.confirm("Delete this inquiry record?")) {
      deleteInquiry(inquiryId);
      refreshAllData();
      toast.success("Inquiry removed.");
    }
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = p.name.toLowerCase().includes(q);
        const inNotes = Array.isArray(p.notes)
          ? p.notes.join(" ").toLowerCase().includes(q)
          : false;
        const inCat = p.category.toLowerCase().includes(q);
        const inSku = p.sku ? p.sku.toLowerCase().includes(q) : false;
        return inName || inNotes || inCat || inSku;
      }
      return true;
    });
  }, [productsList, selectedCategory, searchQuery]);

  // Aggregate Metrics
  const grossRevenue = useMemo(() => ordersList.reduce((acc, o) => acc + o.total, 0), [ordersList]);
  const totalOrdersCount = ordersList.length;
  const avgOrderValue = useMemo(
    () => (totalOrdersCount > 0 ? Math.round(grossRevenue / totalOrdersCount) : 0),
    [grossRevenue, totalOrdersCount],
  );
  const catalogValuation = useMemo(
    () => productsList.reduce((acc, p) => acc + p.price * (p.stock ?? 35), 0),
    [productsList],
  );

  const orderFunnel = useMemo(
    () => ({
      completed: ordersList.filter((o) => o.status === "Completed").length,
      processing: ordersList.filter((o) => o.status === "Processing").length,
      shipped: ordersList.filter((o) => o.status === "Shipped").length,
      pending: ordersList.filter((o) => o.status === "Pending").length,
    }),
    [ordersList],
  );

  const categoryDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    productsList.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [productsList]);

  // ---------------- Render Staff Login Screen (Matching Front Website Palette) ----------------
  if (!isLogged) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
        {/* Warm ambient roasted gold glows matching SAIHIRA brand */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-accent/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-card border border-border/80 rounded-3xl p-8 sm:p-10 shadow-deep relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-secondary/50 border-2 border-accent/40 flex items-center justify-center mx-auto mb-4 p-2 shadow-xs">
              <img src={logoSrc} alt="SAIHIRA Asal" className="w-full h-full object-contain" />
            </div>
            <span className="eyebrow block">SAIHIRA · SHM ASAL</span>
            <h1 className="font-display text-3xl font-medium text-primary mt-2">
              Staff CRM & Admin Hub
            </h1>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Enter your staff credentials to manage the snack catalog, review orders, and monitor
              store telemetry.
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
              <Lock size={15} className="shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                Staff Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-primary hover:bg-accent text-primary-foreground font-semibold text-xs py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock size={14} />
              <span>Enter Staff Control Center</span>
            </button>
          </form>

          {/* Quick preset credentials helper */}
          <div className="mt-6 pt-5 border-t border-border/70 text-center">
            <button
              type="button"
              onClick={() => {
                setUsername("admin");
                setPassword("admin123");
              }}
              className="text-xs text-accent hover:text-primary underline cursor-pointer inline-flex items-center gap-1.5 font-medium transition-colors"
            >
              <Sparkles size={13} />
              <span>Fill default demo credentials (admin / admin123)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Render Full Admin CRM Hub (Exact Front Website Palette) ----------------
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Top Header - Warm Ivory matching the storefront */}
      <header className="bg-[#FCFAF7]/95 backdrop-blur-md border-b border-border/80 sticky top-0 z-40 px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 group">
              <img
                src={logoSrc}
                alt="SAIHIRA Asal"
                className="w-9 h-9 rounded-full object-contain bg-secondary/60 p-1 border border-accent/40 group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="font-display tracking-widest text-base sm:text-lg text-primary font-bold leading-none">
                  SAIHIRA <span className="text-accent">ASAL</span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.22em] text-accent font-semibold font-sans mt-0.5">
                  COMMERCE SUITE & CRM v2.0
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-border/70">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-foreground/75 hover:text-primary hover:bg-card/70 font-medium"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                activeTab === "products"
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-foreground/75 hover:text-primary hover:bg-card/70 font-medium"
              }`}
            >
              Products ({productsList.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-foreground/75 hover:text-primary hover:bg-card/70 font-medium"
              }`}
            >
              Orders ({ordersList.length})
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                activeTab === "customers"
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-foreground/75 hover:text-primary hover:bg-card/70 font-medium"
              }`}
            >
              CRM Patrons ({customersList.length})
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-foreground/75 hover:text-primary hover:bg-card/70 font-medium"
              }`}
            >
              Inquiries ({inquiriesList.length})
            </button>
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <a
              href="/products"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-accent hover:text-primary font-semibold flex items-center gap-1 hidden sm:flex transition-colors"
            >
              <span>Storefront</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={handleLogout}
              className="h-8 px-3 rounded-full border border-border bg-card text-foreground/80 hover:bg-primary hover:text-primary-foreground text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center gap-1.5 mt-3 pt-2.5 border-t border-border/60 overflow-x-auto no-scrollbar">
          {(["dashboard", "products", "orders", "customers", "inquiries"] as TabType[]).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap capitalize cursor-pointer transition-all ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-foreground/75 bg-card/60 border border-border/50"
                }`}
              >
                {tab === "products" ? `Products (${productsList.length})` : tab}
              </button>
            ),
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        {/* ======================= TAB 1: DASHBOARD ======================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Command Center Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="eyebrow">Executive Telemetry</span>
                <h1 className="font-display text-3xl sm:text-4xl text-primary font-medium mt-1">
                  Command Center
                </h1>
                <p className="text-xs text-muted-foreground mt-1 font-normal leading-relaxed">
                  Real-time store metrics, snack catalog valuation, and live customer orders.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={openNewProductModal}
                  className="rounded-full bg-primary hover:bg-accent text-primary-foreground h-9 px-4 text-xs font-medium shadow-xs inline-flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Plus size={14} />
                  <span>Add Product</span>
                </button>
                <button
                  onClick={() => exportProductsCSV(productsList)}
                  className="rounded-full border border-border bg-card hover:bg-secondary text-primary h-9 px-4 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                >
                  <Download size={13} />
                  <span>Export Products CSV</span>
                </button>
                {ordersList.length > 0 && (
                  <button
                    onClick={() => exportOrdersCSV(ordersList)}
                    className="rounded-full border border-border bg-card hover:bg-secondary text-primary h-9 px-4 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <Download size={13} />
                    <span>Orders CSV</span>
                  </button>
                )}
              </div>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">
                  <span>Gross Revenue</span>
                  <span className="p-2 rounded-xl bg-accent/15 text-accent">
                    <DollarSign size={16} />
                  </span>
                </div>
                <div className="font-display text-3xl font-bold text-primary">
                  {formatINR(grossRevenue)}
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">
                  Avg. Order Value:{" "}
                  <span className="font-medium text-primary">{formatINR(avgOrderValue)}</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">
                  <span>Total Orders</span>
                  <span className="p-2 rounded-xl bg-accent/15 text-accent">
                    <ShoppingCart size={16} />
                  </span>
                </div>
                <div className="font-display text-3xl font-bold text-primary">
                  {totalOrdersCount}
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">
                  {orderFunnel.completed} completed · {orderFunnel.processing + orderFunnel.shipped}{" "}
                  in transit
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">
                  <span>Active CRM Patrons</span>
                  <span className="p-2 rounded-xl bg-accent/15 text-accent">
                    <Users size={16} />
                  </span>
                </div>
                <div className="font-display text-3xl font-bold text-primary">
                  {customersList.length}
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">
                  {customersList.filter((c) => c.segment === "VIP Reserve").length} VIP Reserve
                  Patrons
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">
                  <span>Catalog Valuation</span>
                  <span className="p-2 rounded-xl bg-accent/15 text-accent">
                    <Package size={16} />
                  </span>
                </div>
                <div className="font-display text-3xl font-bold text-primary">
                  {formatINR(catalogValuation)}
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">
                  Across {productsList.length} active formulations
                </div>
              </div>
            </div>

            {/* Funnel & Portfolio Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Fulfillment Funnel */}
              <div className="rounded-2xl bg-card border border-border/80 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-display text-2xl text-primary font-medium">
                        Order Fulfillment Funnel
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Status distribution of customer orders.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs text-accent hover:text-primary font-semibold cursor-pointer transition-colors"
                    >
                      Manage Orders →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                    <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-center">
                      <div className="text-[10px] uppercase font-semibold text-emerald-800 tracking-wider">
                        Completed
                      </div>
                      <div className="font-display text-2xl font-bold text-emerald-900 mt-1">
                        {orderFunnel.completed}
                      </div>
                      <div className="text-[10px] text-emerald-700 mt-0.5">Delivered</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-center">
                      <div className="text-[10px] uppercase font-semibold text-amber-800 tracking-wider">
                        Processing
                      </div>
                      <div className="font-display text-2xl font-bold text-amber-900 mt-1">
                        {orderFunnel.processing}
                      </div>
                      <div className="text-[10px] text-amber-700 mt-0.5">Baking / Pack</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200 text-center">
                      <div className="text-[10px] uppercase font-semibold text-sky-800 tracking-wider">
                        Shipped
                      </div>
                      <div className="font-display text-2xl font-bold text-sky-900 mt-1">
                        {orderFunnel.shipped}
                      </div>
                      <div className="text-[10px] text-sky-700 mt-0.5">In Transit</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-secondary/80 border border-border text-center">
                      <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                        Pending
                      </div>
                      <div className="font-display text-2xl font-bold text-primary mt-1">
                        {orderFunnel.pending}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        Awaiting Action
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Total Active Workflows:{" "}
                    <strong className="text-primary font-semibold">{totalOrdersCount}</strong>
                  </span>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-accent hover:text-primary font-semibold text-xs cursor-pointer transition-colors"
                  >
                    Open Orders Ledger →
                  </button>
                </div>
              </div>

              {/* Portfolio Distribution */}
              <div className="rounded-2xl bg-card border border-border/80 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-display text-2xl text-primary font-medium">
                        Portfolio Distribution
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Snack variety counts across categories.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("products")}
                      className="text-xs text-accent hover:text-primary font-semibold cursor-pointer transition-colors"
                    >
                      Manage Products →
                    </button>
                  </div>

                  <div className="space-y-4 mt-5">
                    {[
                      { key: "khakhra", label: "Paper-Thin Khakhras", color: "bg-primary" },
                      { key: "bhakhri", label: "Hearty Bhakhris", color: "bg-accent" },
                    ].map((cat) => {
                      const count = categoryDistribution[cat.key] || 0;
                      const percent =
                        productsList.length > 0
                          ? Math.round((count / productsList.length) * 100)
                          : 0;
                      return (
                        <div key={cat.key} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-foreground">{cat.label}</span>
                            <span className="text-muted-foreground font-mono">
                              {count} items ({percent}%)
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Total Formulations:{" "}
                    <strong className="text-primary font-semibold">{productsList.length}</strong>
                  </span>
                  <button
                    onClick={() => setActiveTab("products")}
                    className="text-accent hover:text-primary font-semibold text-xs cursor-pointer transition-colors"
                  >
                    View Catalog in Products Tab →
                  </button>
                </div>
              </div>
            </div>

            {/* Live Telemetry Stream / Recent Orders */}
            <div className="rounded-2xl bg-card border border-border/80 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                    </span>
                    <h3 className="font-display text-2xl text-primary font-medium">
                      Recent Orders & Checkouts
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent/15 text-accent border border-accent/25">
                      Live Stream
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Orders register in real time whenever a customer places an order on the website.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => refreshAllData(true)}
                    className="rounded-full border border-border bg-card hover:bg-secondary text-primary h-8 px-3 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <RefreshCw size={12} className={isSyncing ? "animate-spin text-accent" : ""} />
                    <span>Sync</span>
                  </button>
                  {ordersList.length > 0 && (
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs text-accent hover:text-primary font-semibold cursor-pointer transition-colors ml-1"
                    >
                      View All Orders ({ordersList.length}) →
                    </button>
                  )}
                </div>
              </div>

              {ordersList.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted-foreground border border-dashed border-border rounded-2xl bg-secondary/20 px-4">
                  <ShoppingCart size={32} className="mx-auto text-accent/60 mb-3" />
                  <div className="font-display text-xl font-medium text-primary">
                    No Customer Orders Registered Yet
                  </div>
                  <div className="text-xs text-muted-foreground mt-1.5 max-w-md mx-auto leading-relaxed">
                    Customer orders placed through store checkout will automatically register here
                    in real time with instant status workflows and CSV export.
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border bg-secondary/40 text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                        <th className="py-3 px-3">Order ID</th>
                        <th className="py-3 px-3">Customer</th>
                        <th className="py-3 px-3">Items</th>
                        <th className="py-3 px-3">Total (₹)</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Timestamp</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {ordersList.slice(0, 6).map((order) => (
                        <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-mono font-bold text-primary">{order.id}</div>
                            <span className="inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-secondary text-primary">
                              {order.source || "Store Checkout"}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-medium text-foreground">{order.customer}</div>
                            <div className="text-[11px] text-muted-foreground">
                              {order.phone || order.email}
                            </div>
                          </td>
                          <td className="py-3 px-3 max-w-xs">
                            <div className="text-foreground/90 line-clamp-2">{order.items}</div>
                            {order.note && (
                              <div className="text-[10px] text-accent bg-accent/10 rounded px-1.5 py-0.5 mt-1 inline-block border border-accent/20">
                                Note: {order.note}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3 font-display text-base font-bold text-primary">
                            {formatINR(order.total)}
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleOrderStatusChange(order.id, e.target.value as OrderStatus)
                              }
                              className={`text-xs rounded-lg px-2.5 py-1 font-medium border cursor-pointer focus:outline-none ${
                                order.status === "Completed"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                  : order.status === "Processing"
                                    ? "bg-amber-50 text-amber-800 border-amber-300"
                                    : order.status === "Shipped"
                                      ? "bg-sky-50 text-sky-800 border-sky-300"
                                      : "bg-secondary text-primary border-border"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="py-3 px-3 text-muted-foreground whitespace-nowrap">
                            <div>{order.date}</div>
                            {order.time && (
                              <div className="text-[10px] opacity-75">{order.time}</div>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <a
                              href={`https://wa.me/${(order.phone || "919876543210").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Namaste ${order.customer}! Regarding your SAIHIRA order #${order.id} for ₹${order.total}: Your freshly baked snack box is ready for dispatch.`,
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xs transition-colors"
                            >
                              <Send size={11} />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================= TAB 2: PRODUCTS ======================= */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header & Main Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="eyebrow">Inventory Control</span>
                <h1 className="font-display text-3xl sm:text-4xl text-primary font-medium mt-1">
                  Products Catalog
                </h1>
                <p className="text-xs text-muted-foreground mt-1 font-normal">
                  Manage specifications, pricing, imagery, flavour notes, and stock levels.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={openNewProductModal}
                  className="rounded-full bg-primary hover:bg-accent text-primary-foreground h-9 px-4 text-xs font-medium shadow-xs inline-flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Plus size={14} />
                  <span>Add Product</span>
                </button>
                <button
                  onClick={() => exportProductsCSV(productsList)}
                  className="rounded-full border border-border bg-card hover:bg-secondary text-primary h-9 px-4 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                >
                  <Download size={13} />
                  <span>Export Catalog CSV</span>
                </button>
                <button
                  onClick={handleResetCatalog}
                  className="rounded-full border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-primary h-9 px-3.5 text-xs inline-flex items-center gap-1 cursor-pointer transition-all"
                  title="Reset to 19 original formulations"
                >
                  <RotateCcw size={12} />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter products by name, notes, category..."
                  className="w-full pl-9 pr-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Category:
                </span>
                {["all", "khakhra", "bhakhri"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "bg-secondary/60 text-foreground/80 hover:bg-secondary"
                    }`}
                  >
                    {cat === "all" ? "All Varieties" : cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Table */}
            <div className="rounded-2xl bg-card border border-border/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-secondary/40 border-b border-border/80 text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                    <tr>
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Name & Flavour Notes</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price (₹)</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredProducts.map((p) => (
                      <tr key={p.slug || p.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="py-3 px-4">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 object-contain rounded-xl border border-border p-1 bg-white shadow-xs"
                          />
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-display text-base font-semibold text-primary">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground line-clamp-1">
                            {Array.isArray(p.notes) ? p.notes.join(" · ") : p.notes}
                          </div>
                          <div className="text-[10px] text-accent font-sans font-medium mt-0.5">
                            {p.badge || "Signature"} · {p.weight || "200 g"}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-secondary text-primary text-[10px] font-semibold uppercase tracking-wider">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-display text-base font-bold text-primary">
                          {formatINR(p.price)}
                          {p.salePrice && (
                            <span className="ml-1.5 text-xs text-muted-foreground line-through font-normal">
                              {formatINR(p.salePrice)}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-accent font-semibold text-xs">
                          ★ {p.rating || 4.9}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              (p.stock ?? 35) > 15
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                            }`}
                          >
                            {p.stock ?? 35} in stock
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => openEditProductModal(p)}
                            className="p-1.5 rounded-lg text-foreground/70 hover:text-accent hover:bg-secondary transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
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

        {/* ======================= TAB 3: ORDERS ======================= */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="eyebrow">Fulfillment & Shipping</span>
                <h1 className="font-display text-3xl sm:text-4xl text-primary font-medium mt-1">
                  Orders & Logistics
                </h1>
                <p className="text-xs text-muted-foreground mt-1 font-normal">
                  Track real-time customer purchases, update order stages, and export logistics
                  spreadsheets.
                </p>
              </div>
              {ordersList.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => exportOrdersCSV(ordersList)}
                    className="rounded-full border border-border bg-card hover:bg-secondary text-primary h-9 px-4 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <Download size={13} />
                    <span>Export Orders CSV</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Clear all order records from local storage?")) {
                        clearAllOrders();
                        refreshAllData();
                        toast.info("Orders cleared.");
                      }
                    }}
                    className="rounded-full border border-border bg-card hover:bg-destructive/10 text-muted-foreground hover:text-destructive h-9 px-3.5 text-xs inline-flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Trash2 size={12} />
                    <span>Clear Orders</span>
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-card border border-border/80 shadow-xs overflow-hidden">
              {ordersList.length === 0 ? (
                <div className="py-16 text-center text-xs text-muted-foreground px-4">
                  <ShoppingCart size={36} className="mx-auto text-accent/60 mb-3" />
                  <div className="font-display text-2xl font-medium text-primary">
                    No Customer Orders Registered Yet
                  </div>
                  <div className="text-xs text-muted-foreground mt-1.5 max-w-md mx-auto leading-relaxed">
                    Whenever a customer completes checkout on the website, their order ID, shipping
                    details, and items will register here immediately.
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-secondary/40 border-b border-border/80 text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                      <tr>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer Details</th>
                        <th className="py-3 px-4">Cart Formulation</th>
                        <th className="py-3 px-4">Subtotal</th>
                        <th className="py-3 px-4">Fulfillment Status</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {ordersList.map((order) => (
                        <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-mono font-bold text-primary">{order.id}</div>
                            <span className="inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-secondary text-primary">
                              {order.source || "Store Checkout"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-foreground">{order.customer}</div>
                            <div className="text-[11px] text-muted-foreground">
                              {order.phone || order.email}
                            </div>
                            {order.city && (
                              <div className="text-[10px] text-muted-foreground/80">
                                {order.city}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-foreground/90 max-w-sm">
                            <div>{order.items}</div>
                            {order.note && (
                              <div className="text-[10px] text-accent bg-accent/10 rounded px-1.5 py-0.5 mt-1 inline-block border border-accent/20">
                                Note: {order.note}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-display text-base font-bold text-primary">
                            {formatINR(order.total)}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleOrderStatusChange(order.id, e.target.value as OrderStatus)
                              }
                              className={`bg-background border rounded-lg px-2.5 py-1 text-xs cursor-pointer focus:outline-none font-medium ${
                                order.status === "Completed"
                                  ? "text-emerald-800 border-emerald-300 bg-emerald-50"
                                  : order.status === "Processing"
                                    ? "text-amber-800 border-amber-300 bg-amber-50"
                                    : order.status === "Shipped"
                                      ? "text-sky-800 border-sky-300 bg-sky-50"
                                      : "text-primary border-border bg-secondary/50"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-muted-foreground">
                            <div>{order.date}</div>
                            {order.time && (
                              <div className="text-[10px] opacity-75">{order.time}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`https://wa.me/${(order.phone || "919876543210").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                  `Namaste ${order.customer}! Regarding your SAIHIRA order #${order.id} for ₹${order.total}: Your freshly baked snack box is ready for dispatch.`,
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xs transition-colors"
                              >
                                <Send size={11} />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================= TAB 4: CRM PATRONS ======================= */}
        {activeTab === "customers" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="eyebrow">Customer Relationships</span>
                <h1 className="font-display text-3xl sm:text-4xl text-primary font-medium mt-1">
                  Patron CRM Directory
                </h1>
                <p className="text-xs text-muted-foreground mt-1 font-normal">
                  Customer lifetime value (LTV), buying tier segmentation, and corporate hamper
                  leads.
                </p>
              </div>
              {customersList.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => exportCustomersCSV(customersList)}
                    className="rounded-full border border-border bg-card hover:bg-secondary text-primary h-9 px-4 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <Download size={13} />
                    <span>Export Customers CSV</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Clear all patron records from local storage?")) {
                        clearAllCustomers();
                        refreshAllData();
                        toast.info("Patron directory cleared.");
                      }
                    }}
                    className="rounded-full border border-border bg-card hover:bg-destructive/10 text-muted-foreground hover:text-destructive h-9 px-3.5 text-xs inline-flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Trash2 size={12} />
                    <span>Clear Patrons</span>
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-card border border-border/80 shadow-xs overflow-hidden">
              {customersList.length === 0 ? (
                <div className="py-16 text-center text-xs text-muted-foreground px-4">
                  <Users size={36} className="mx-auto text-accent/60 mb-3" />
                  <div className="font-display text-2xl font-medium text-primary">
                    No Customer Profiles Recorded Yet
                  </div>
                  <div className="text-xs text-muted-foreground mt-1.5 max-w-md mx-auto leading-relaxed">
                    Customer profiles and their lifetime order history will be built automatically
                    as customers place orders.
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-secondary/40 border-b border-border/80 text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                      <tr>
                        <th className="py-3 px-4">Patron Name</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">CRM Segment</th>
                        <th className="py-3 px-4">Orders Count</th>
                        <th className="py-3 px-4">Lifetime Spend (₹)</th>
                        <th className="py-3 px-4">Last Order</th>
                        <th className="py-3 px-4 text-right">Direct Concierge</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {customersList.map((c) => (
                        <tr key={c.id} className="hover:bg-secondary/20 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-medium text-foreground">{c.name}</div>
                            <div className="text-[10px] text-muted-foreground font-mono">
                              {c.id}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-foreground/90">{c.email}</div>
                            <div className="text-[11px] text-muted-foreground">{c.phone}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                c.segment === "VIP Reserve"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : c.segment === "Festive Corporate"
                                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                                    : "bg-secondary text-primary border border-border"
                              }`}
                            >
                              {c.segment}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono font-medium">{c.ordersCount}</td>
                          <td className="py-3 px-4 font-display text-base font-bold text-primary">
                            {formatINR(c.totalSpend)}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{c.lastOrder}</td>
                          <td className="py-3 px-4 text-right">
                            <a
                              href={`https://wa.me/${(c.phone || "919876543210").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Namaste ${c.name}! Hope you enjoyed your recent SAIHIRA Asal treats. We have exciting festive batches available!`,
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xs transition-colors"
                            >
                              <Send size={11} />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================= TAB 5: INQUIRIES ======================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="eyebrow">Corporate Gifting & Wholesale</span>
                <h1 className="font-display text-3xl sm:text-4xl text-primary font-medium mt-1">
                  Inquiries & Hamper Leads
                </h1>
                <p className="text-xs text-muted-foreground mt-1 font-normal">
                  Review bulk inquiries, tasting requests, and customer contact form submissions.
                </p>
              </div>
              {inquiriesList.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => exportInquiriesCSV(inquiriesList)}
                    className="rounded-full border border-border bg-card hover:bg-secondary text-primary h-9 px-4 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <Download size={13} />
                    <span>Export Inquiries CSV</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Clear all inquiry records from local storage?")) {
                        clearAllInquiries();
                        refreshAllData();
                        toast.info("Inquiries cleared.");
                      }
                    }}
                    className="rounded-full border border-border bg-card hover:bg-destructive/10 text-muted-foreground hover:text-destructive h-9 px-3.5 text-xs inline-flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Trash2 size={12} />
                    <span>Clear Inquiries</span>
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-card border border-border/80 shadow-xs overflow-hidden">
              {inquiriesList.length === 0 ? (
                <div className="py-16 text-center text-xs text-muted-foreground px-4">
                  <MessageSquare size={36} className="mx-auto text-accent/60 mb-3" />
                  <div className="font-display text-2xl font-medium text-primary">
                    No Inquiries Received Yet
                  </div>
                  <div className="text-xs text-muted-foreground mt-1.5 max-w-md mx-auto leading-relaxed">
                    Customer messages submitted through the Contact Us page will automatically
                    register and appear here.
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-secondary/40 border-b border-border/80 text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                      <tr>
                        <th className="py-3 px-4">Lead ID & Date</th>
                        <th className="py-3 px-4">Contact Details</th>
                        <th className="py-3 px-4">Purpose</th>
                        <th className="py-3 px-4">Inquiry Message</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {inquiriesList.map((inq) => (
                        <tr key={inq.id} className="hover:bg-secondary/20 transition-colors">
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="font-mono font-bold text-primary">{inq.id}</div>
                            <div className="text-[10px] text-muted-foreground">
                              {inq.date} {inq.time}
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="font-medium text-foreground">{inq.name}</div>
                            <div className="text-[11px] text-muted-foreground">{inq.phone}</div>
                            <div className="text-[11px] text-muted-foreground">{inq.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent/15 text-accent border border-accent/20">
                              {inq.interest}
                            </span>
                          </td>
                          <td className="py-3 px-4 max-w-sm text-foreground/90 leading-relaxed">
                            {inq.message}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <select
                              value={inq.status}
                              onChange={(e) =>
                                handleInquiryStatusChange(inq.id, e.target.value as InquiryStatus)
                              }
                              className="text-xs rounded-lg px-2.5 py-1 font-medium border bg-background border-border text-foreground cursor-pointer focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Discussion">In Discussion</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ======================= PRODUCT ADDITION / EDIT MODAL ======================= */}
      {/* Taken directly from the reference https://artisanscent-abcd.vercel.app/admin */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-card rounded-3xl border border-border shadow-deep overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header - Warm Primary */}
            <div className="bg-primary text-primary-foreground px-6 sm:px-8 py-4.5 flex items-center justify-between border-b border-primary/20">
              <div>
                <h2 className="font-display text-2xl font-medium text-primary-foreground">
                  {editingProduct ? "Edit Product Formulation" : "Add New Product Formulation"}
                </h2>
                <p className="text-xs text-primary-foreground/75 font-light mt-0.5">
                  Products added will immediately sync to the live storefront and CSV export
                  engines.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleProductSubmit}
              className="p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto"
            >
              {/* Product Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  placeholder="e.g. Garlic Herb Bhakhri or Oats Methi Khakhra"
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>

              {/* Category & Recipe Family */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={fCategory}
                    onChange={(e) => setFCategory(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer transition-all"
                  >
                    <option value="khakhra">Paper-Thin Khakhra</option>
                    <option value="bhakhri">Hearty Bhakhri</option>
                    <option value="snack">Specialty Gujarati Snack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    Grain / Recipe Family *
                  </label>
                  <input
                    type="text"
                    required
                    value={fFamily}
                    onChange={(e) => setFFamily(e.target.value)}
                    placeholder="e.g. Whole Wheat, Millet / Ragi, Sattvik Jain"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
              </div>

              {/* Price, Sale Price, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    Regular Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={fPrice}
                    onChange={(e) => setFPrice(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    Sale Price (₹ Optional)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={fSalePrice || ""}
                    onChange={(e) =>
                      setFSalePrice(e.target.value ? Number(e.target.value) : undefined)
                    }
                    placeholder="Optional"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    Stock Units *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={fStock}
                    onChange={(e) => setFStock(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
              </div>

              {/* Product Image Selection & Upload */}
              <div className="rounded-2xl border border-border p-4 bg-secondary/30 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-accent" />
                    <span>Product Image *</span>
                  </label>
                  <div className="flex items-center gap-1 bg-secondary p-0.5 rounded-lg text-[10px]">
                    <button
                      type="button"
                      onClick={() => setFImageMode("file")}
                      className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                        fImageMode === "file"
                          ? "bg-card text-primary font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setFImageMode("url")}
                      className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                        fImageMode === "url"
                          ? "bg-card text-primary font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Image URL / Presets
                    </button>
                  </div>
                </div>

                {fImageMode === "file" ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        isDragging
                          ? "border-accent bg-accent/10"
                          : "border-border bg-card hover:border-accent hover:bg-secondary/40"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                          <Upload size={18} />
                        </div>
                        <div className="text-xs font-medium text-foreground">
                          {isOptimizingImage
                            ? "Optimizing image canvas..."
                            : "Drag & drop image here, or browse files"}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          PNG, JPG, WEBP or SVG (Auto-compressed to local Data URI)
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={fImage}
                      onChange={(e) => setFImage(e.target.value)}
                      placeholder="Paste image URL..."
                      className="w-full bg-card border border-border rounded-xl px-3.5 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                    <div>
                      <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">
                        Or pick from Sai Hira Brand Presets:
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {PRODUCT_IMAGE_PRESETS.map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setFImage(preset.url)}
                            className={`p-1 rounded-xl border text-center transition-all cursor-pointer ${
                              fImage === preset.url
                                ? "border-accent ring-2 ring-accent/25 bg-accent/10"
                                : "border-border bg-card hover:border-accent"
                            }`}
                            title={preset.label}
                          >
                            <img
                              src={preset.url}
                              alt={preset.label}
                              className="w-full h-9 object-contain mx-auto"
                            />
                            <div className="text-[8px] truncate mt-0.5 text-muted-foreground">
                              {preset.label}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Image Preview */}
                {fImage && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                      <img
                        src={fImage}
                        alt="Product Preview"
                        className="w-12 h-12 rounded-lg object-contain bg-secondary/30 p-1 border border-border"
                      />
                      <div>
                        <div className="text-xs font-semibold text-primary">
                          Active Product Image
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono truncate max-w-xs">
                          {fImage.startsWith("data:")
                            ? "Uploaded from device (Optimized Data URI)"
                            : fImage}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-accent hover:underline font-semibold px-2 py-1 cursor-pointer"
                    >
                      Change photo
                    </button>
                  </div>
                )}
              </div>

              {/* Flavour Notes Breakdown */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  Flavour Notes Breakdown *
                </label>
                <input
                  type="text"
                  required
                  value={fNotes}
                  onChange={(e) => setFNotes(e.target.value)}
                  placeholder="e.g. Whole wheat · Roasted cumin · Light & crisp"
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>

              {/* Weight, Rating & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    Packaging Weight *
                  </label>
                  <input
                    type="text"
                    required
                    value={fWeight}
                    onChange={(e) => setFWeight(e.target.value)}
                    placeholder="e.g. 200 g"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    Rating (1.0 to 5.0) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={1}
                    max={5}
                    required
                    value={fRating}
                    onChange={(e) => setFRating(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    Product Badge
                  </label>
                  <input
                    type="text"
                    value={fBadge}
                    onChange={(e) => setFBadge(e.target.value)}
                    placeholder="e.g. Bestseller, Jain Sattvik, New Batch"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  Tagline / Highlights
                </label>
                <input
                  type="text"
                  value={fTagline}
                  onChange={(e) => setFTagline(e.target.value)}
                  placeholder="e.g. A wholesome, oil-light bite with pure roasted spices"
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>

              {/* Description / Story */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  Artisanal Story & Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={fDescription}
                  onChange={(e) => setFDescription(e.target.value)}
                  placeholder="Describe the recipe, roasting process, and culinary character..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none transition-all"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-border text-xs h-9 px-5 hover:bg-secondary text-foreground cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-primary hover:bg-accent text-primary-foreground text-xs h-9 px-6 font-medium shadow-sm cursor-pointer transition-all"
                >
                  {editingProduct ? "Save Changes" : "Create & Publish Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
