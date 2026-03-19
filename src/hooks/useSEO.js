import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

/**
 * Hook لتحسين SEO لكل صفحة
 * @param {Object} options - خيارات SEO
 * @param {string} options.title - عنوان الصفحة
 * @param {string} options.description - وصف الصفحة
 * @param {string} options.keywords - الكلمات المفتاحية
 * @param {string} options.image - صورة لـ Open Graph
 * @param {string} options.url - رابط الصفحة
 * @param {string} options.type - نوع الصفحة (website, article, etc)
 */
export const useSEO = ({
  title = "StudyTrack",
  description = "منصة التعلم التفاعلية",
  keywords = "تعلم، تعليم، ألعاب تعليمية",
  image = "/image/download.png",
  url = "https://yoursite.com",
  type = "website",
} = {}) => {
  useEffect(() => {
    // تحديث العنوان في الـ document
    document.title = `${title} | StudyTrack`;
  }, [title]);

  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="StudyTrack" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default useSEO;
