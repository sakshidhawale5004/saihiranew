import { describe, it, expect } from "vitest";
import { initialProducts, getStoredProducts } from "@/lib/products";
import fs from "fs";
import path from "path";

describe("Product Images and Gallery Verification", () => {
  it("should have valid images and non-empty gallery for all products", () => {
    const products = initialProducts;
    expect(products.length).toBeGreaterThanOrEqual(53);

    let wetransferImagesCount = 0;

    for (const p of products) {
      expect(p.image).toBeDefined();
      expect(p.image.length).toBeGreaterThan(0);
      expect(p.gallery).toBeDefined();
      expect(Array.isArray(p.gallery)).toBe(true);
      expect(p.gallery!.length).toBeGreaterThanOrEqual(1);

      for (const imgUrl of p.gallery!) {
        if (imgUrl.startsWith("/wetransfer_bhakhris_2026-11-12_0630")) {
          wetransferImagesCount++;
          const decoded = decodeURIComponent(imgUrl);
          const fullPath = path.resolve("public" + decoded);
          expect(fs.existsSync(fullPath)).toBe(true);
        }
      }
    }

    // Verify we have mapped over 200 high-res wetransfer product photos
    expect(wetransferImagesCount).toBeGreaterThan(200);
  });

  it("should preserve gallery array in getStoredProducts", () => {
    const stored = getStoredProducts();
    const methi = stored.find((p) => p.slug === "methi-bhakhri");
    expect(methi).toBeDefined();
    expect(methi?.gallery?.length).toBe(7);
  });
});
