import { lazy, Suspense } from "react";

/**
 * تحسين الأداء من خلال Code Splitting والـ Lazy Loading
 */

// تأخير تحميل المكونات بناءً على احتياج المستخدم
export const lazyLoadComponent = (importStatement, displayName) => {
  const Component = lazy(importStatement);
  Component.displayName = displayName;
  return Component;
};

/**
 * مكون Loading محسّن
 */
export const LoadingFallback = ({ message = "جاري التحميل..." }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "50px",
          height: "50px",
          margin: "0 auto 20px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #1976d2",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p style={{ color: "#666", fontSize: "16px" }}>{message}</p>
    </div>
  </div>
);

/**
 * Wrapper لـ Lazy Components مع Suspense
 */
export const withLazyLoad =
  (Component, fallback = <LoadingFallback />) =>
  (props) =>
    (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );

/**
 * تحسينات الأداء: Image Loading
 */
export const ImageOptimizer = {
  // استخدام WebP مع fallback
  getSrcSet: (imagePath) => {
    const basePath = imagePath.replace(/\.[^/.]+$/, "");
    return `${basePath}.webp`;
  },

  // Lazy loading للصور
  lazyLoadImage: (src, alt, className = "") => ({
    src,
    alt,
    loading: "lazy",
    className,
    decoding: "async",
  }),
};

/**
 * تحسينات الشبكة: Connection Aware Loading
 */
export const useConnectionAware = () => {
  if (!("connection" in navigator)) {
    return { effectiveType: "4g", saveData: false };
  }

  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  return {
    effectiveType: connection?.effectiveType || "4g",
    saveData: connection?.saveData || false,
    downlink: connection?.downlink || null,
  };
};

/**
 * Cache Helper للبيانات المحلية
 */
export const CacheHelper = {
  set: (key, value, ttl = 3600000) => {
    const item = {
      value,
      expiry: Date.now() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  get: (key) => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { value, expiry } = JSON.parse(item);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return value;
  },

  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};

/**
 * Performance Monitoring
 */
export const performanceMetrics = {
  // قياس Web Vitals
  getFCP: () => {
    if (!window.performance || !window.performance.getEntriesByName)
      return null;
    const fcp = performance.getEntriesByName("first-contentful-paint")[0];
    return fcp ? Math.round(fcp.startTime) : null;
  },

  getLCP: () => {
    if (!window.PerformanceObserver) return null;
    let lcp = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      lcp =
        entries[entries.length - 1].renderTime ||
        entries[entries.length - 1].loadTime;
    });

    try {
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
      return lcp;
    } catch (e) {
      return null;
    }
  },

  // قياس وقت الاستجابة من الخادم
  getServerTiming: () => {
    if (!window.performance || !window.performance.getEntriesByType)
      return null;
    const timing = performance.timing;
    return {
      pageLoadTime: timing.loadEventEnd - timing.navigationStart,
      domReadyTime: timing.domContentLoadedEventEnd - timing.navigationStart,
      serverResponseTime: timing.responseEnd - timing.requestStart,
    };
  },
};

const performanceOptimizerExport = {
  lazyLoadComponent,
  LoadingFallback,
  withLazyLoad,
  ImageOptimizer,
  useConnectionAware,
  CacheHelper,
  performanceMetrics,
};

export default performanceOptimizerExport;
