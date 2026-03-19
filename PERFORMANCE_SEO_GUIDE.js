/**
 * استراتيجية تحسين الأداء والـ SEO
 * Performance & SEO Optimization Guide
 */

module.exports = {
  // تحسينات Webpack
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // فصل المكتبات الرئيسية
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
          enforce: true,
        },
        // فصل الكود المشترك
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
          name: "common",
        },
        // فصل React وتبعياته
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: "react-vendors",
          priority: 15,
          enforce: true,
        },
      },
    },
    minimize: true,
    usedExports: true,
    sideEffects: false,
  },

  // تحسينات الصور
  imageOptimization: {
    formats: ["webp", "jpg", "png"],
    sizes: {
      small: 320,
      medium: 768,
      large: 1200,
      xlarge: 1920,
    },
    quality: {
      webp: 80,
      jpg: 85,
      png: 90,
    },
  },

  // تحسينات الخطوط
  fontOptimization: {
    // استخدم Font Subsetting
    subset: "latin,arabic",
    // استخدم Font Display Swap
    display: "swap",
    // Preload الخطوط الحرجة
    preload: ["main-font.woff2"],
    // استخدم Variable Fonts
    variable: true,
  },

  // تحسينات الـ CSS
  cssOptimization: {
    // استخدم CSS Modules
    modules: true,
    // إزالة CSS غير المستخدم
    purge: {
      enabled: true,
      paths: ["src/**/*.{js,jsx,ts,tsx}"],
    },
    // Critical CSS
    criticalCSS: true,
  },

  // تحسينات الـ JavaScript
  jsOptimization: {
    // Tree Shaking
    treeShaking: true,
    // Minification
    minify: true,
    // Remove Dead Code
    deadCodeElimination: true,
    // Dynamic Imports
    dynamicImports: true,
  },

  // Content Delivery Network (CDN)
  cdn: {
    // استخدم CDN للملفات الثابتة
    staticAssets: "https://cdn.example.com/assets/",
    // استخدم CDN للصور
    images: "https://cdn.example.com/images/",
    // استخدم CDN للخطوط
    fonts: "https://cdn.example.com/fonts/",
  },

  // Server-Side Rendering (SSR) - إذا أردت
  ssr: {
    enabled: false, // يمكن تفعيله لاحقاً
    staticGeneration: false,
  },

  // Web Vitals Targets
  webVitalsTargets: {
    // Largest Contentful Paint: < 2.5s
    LCP: 2500,
    // First Input Delay: < 100ms
    FID: 100,
    // Cumulative Layout Shift: < 0.1
    CLS: 0.1,
    // First Contentful Paint: < 1.8s
    FCP: 1800,
    // Time to First Byte: < 600ms
    TTFB: 600,
  },

  // Lighthouse Targets
  lighthouseTargets: {
    performance: 90,
    accessibility: 90,
    bestPractices: 90,
    seo: 100,
  },
};

/**
 * نصائح التطبيق:
 *
 * 1. تحسين الصور:
 *    - استخدم WebP مع fallback
 *    - أضف lazy loading للصور
 *    - استخدم responsive images (srcset)
 *
 * 2. تحسين الخطوط:
 *    - استخدم فقط الخطوط المطلوبة
 *    - استخدم Font Display: swap
 *    - Preload الخطوط الحرجة
 *
 * 3. Code Splitting:
 *    - قسم الكود حسب الـ Routes
 *    - استخدم Lazy Loading للمكونات
 *    - فصل المكتبات الكبيرة
 *
 * 4. Caching:
 *    - استخدم Service Worker
 *    - استخدم Browser Cache Headers
 *    - Cache API responses
 *
 * 5. SEO:
 *    - أضف Meta Tags لكل صفحة
 *    - استخدم Structured Data (Schema.org)
 *    - أضف Open Graph و Twitter Cards
 *    - أنشئ Sitemap و Robots.txt
 *
 * 6. Performance Monitoring:
 *    - استخدم Google Analytics
 *    - استخدم Sentry للأخطاء
 *    - استخدم Lighthouse CI
 */
