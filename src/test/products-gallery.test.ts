import { describe, it, expect } from "vitest";
import { initialProducts, getStoredProducts } from "@/lib/products";
import fs from "fs";
import path from "path";

describe("Product Images and Gallery Verification", () => {
  it("should have valid images and non-empty gallery for all products", () => {
    const products = initialProducts;
    expect(products.length).toBeGreaterThanOrEqual(53);

    let wetransferImagesCount = 0;
    let studioImagesCount = 0;

    for (const p of products) {
      expect(p.image).toBeDefined();
      expect(p.image.length).toBeGreaterThan(0);
      expect(p.gallery).toBeDefined();
      expect(Array.isArray(p.gallery)).toBe(true);
      expect(p.gallery!.length).toBeGreaterThanOrEqual(1);

      for (const imgUrl of p.gallery!) {
        if (imgUrl.startsWith("/")) {
          const decoded = decodeURIComponent(imgUrl);
          const fullPath = imgUrl.startsWith("/src/")
            ? path.resolve("." + decoded)
            : path.resolve("public" + decoded);
          expect(fs.existsSync(fullPath)).toBe(true);

          if (imgUrl.startsWith("/wetransfer_bhakhris_2026-11-12_0630")) {
            wetransferImagesCount++;
          } else if (!imgUrl.startsWith("/src/")) {
            studioImagesCount++;
          }
        }
      }
    }

    // Verify wetransfer and new studio photos
    expect(wetransferImagesCount).toBeGreaterThanOrEqual(170);
    expect(studioImagesCount).toBeGreaterThanOrEqual(60);
  });

  it("should preserve gallery array in getStoredProducts", () => {
    const stored = getStoredProducts();
    const methi = stored.find((p) => p.slug === "methi-bhakhri");
    expect(methi).toBeDefined();
    expect(methi?.gallery?.length).toBe(7);

    // Verify newly upgraded products
    const koki = stored.find((p) => p.slug === "gluten-free-koki-bites-bhakhri");
    expect(koki?.gallery?.length).toBe(11);

    const methiKhakhra = stored.find((p) => p.slug === "methi-khakhra");
    expect(methiKhakhra?.gallery?.length).toBe(14);

    const plainKhakhra = stored.find((p) => p.slug === "plain-khakhra");
    expect(plainKhakhra?.gallery?.length).toBe(8);

    const bajari = stored.find((p) => p.slug === "bajari-bhakhri");
    expect(bajari?.gallery?.length).toBe(15);

    const kotmir = stored.find((p) => p.slug === "gluten-free-kotmir-marcha-bhakhri");
    expect(kotmir?.gallery?.length).toBe(10);

    const jeera = stored.find((p) => p.slug === "jeera-bhakhri");
    expect(jeera?.gallery?.length).toBe(11);
  });
});
