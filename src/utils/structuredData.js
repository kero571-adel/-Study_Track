/**
 * Structured Data for SEO
 * Schema.org markup for better search engine understanding
 */

export const structuredData = {
  // Organization Schema
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StudyTrack",
    description: "منصة التعلم التفاعلية - تعلم المهارات والألعاب التعليمية",
    url: "https://yoursite.com",
    logo: "https://yoursite.com/image/download.png",
    sameAs: [
      "https://www.facebook.com/yourpage",
      "https://www.twitter.com/yourpage",
      "https://www.instagram.com/yourpage",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "support@yoursite.com",
    },
  },

  // Educational Platform Schema
  educationalPlatform: {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "StudyTrack",
    description: "منصة تعليمية تفاعلية للتعلم من خلال الألعاب والمهارات",
    url: "https://yoursite.com",
    image: "https://yoursite.com/image/download.png",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
    },
  },

  // Course Schema (مثال)
  course: (courseData) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: courseData.title || "Course Title",
    description: courseData.description || "Course Description",
    image: courseData.image || "https://yoursite.com/image/download.png",
    author: {
      "@type": "Person",
      name: "StudyTrack",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: courseData.rating || "4.5",
      ratingCount: courseData.ratingCount || "100",
    },
  }),
};

/**
 * Generate JSON-LD Script Tag
 */
export const generateJSONLD = (schema) => {
  return {
    __html: JSON.stringify(schema),
  };
};

/**
 * Component to inject Structured Data
 */
export const StructuredDataScript = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={generateJSONLD(data)}
  />
);

export default {
  structuredData,
  generateJSONLD,
  StructuredDataScript,
};
