import { useEffect } from "react";

interface FaqQuestion {
  title: string;
  answer: string;
}

interface FaqSection {
  title: string;
  questions: FaqQuestion[] | Record<string, FaqQuestion>;
}

interface FaqStructuredDataProps {
  sections: FaqSection[] | Record<string, FaqSection>;
}

/**
 * FAQPage structured data component for rich results in search engines
 * Generates JSON-LD schema for FAQ pages
 */
export const FaqStructuredData = ({ sections }: FaqStructuredDataProps) => {
  useEffect(() => {
    // Convert sections to array format if it's an object
    const sectionsArray = Array.isArray(sections)
      ? sections
      : Object.values(sections);

    // Flatten all questions from all sections
    const allQuestions = sectionsArray.flatMap((section) => {
      const questionsArray = Array.isArray(section.questions)
        ? section.questions
        : Object.values(section.questions);
      return questionsArray;
    });

    // Generate FAQPage schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allQuestions.map((q) => ({
        "@type": "Question",
        name: q.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      })),
    };

    // Inject the schema
    const scriptId = "structured-data-faq";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(faqSchema);

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [sections]);

  return null;
};

export default FaqStructuredData;
