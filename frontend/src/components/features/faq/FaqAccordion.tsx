import { useState, useCallback, KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

interface FaqQuestion {
  title: string;
  answer: string;
}

interface FaqSection {
  title: string;
  questions: Record<string, FaqQuestion>;
}

interface FaqAccordionProps {
  sections: Record<string, FaqSection>;
}

const FaqAccordion = ({ sections }: FaqAccordionProps) => {
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>(
    {}
  );

  const toggleQuestion = useCallback(
    (sectionIndex: number, questionIndex: number) => {
      const key = `${sectionIndex}-${questionIndex}`;
      setOpenQuestions((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    },
    []
  );

  const handleKeyDown = useCallback(
    (
      e: KeyboardEvent<HTMLButtonElement>,
      sectionIndex: number,
      questionIndex: number,
      totalQuestions: number
    ) => {
      const key = e.key;

      if (key === "ArrowDown" || key === "ArrowUp") {
        e.preventDefault();
        const buttons = document.querySelectorAll<HTMLButtonElement>(
          `[data-section="${sectionIndex}"]`
        );
        const currentIndex = questionIndex;
        let nextIndex: number;

        if (key === "ArrowDown") {
          nextIndex = currentIndex < totalQuestions - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : totalQuestions - 1;
        }

        buttons[nextIndex]?.focus();
      } else if (key === "Home") {
        e.preventDefault();
        const buttons = document.querySelectorAll<HTMLButtonElement>(
          `[data-section="${sectionIndex}"]`
        );
        buttons[0]?.focus();
      } else if (key === "End") {
        e.preventDefault();
        const buttons = document.querySelectorAll<HTMLButtonElement>(
          `[data-section="${sectionIndex}"]`
        );
        buttons[buttons.length - 1]?.focus();
      }
    },
    []
  );

  return (
    <>
      {Object.entries(sections).map(([sectionKey, section], sectionIndex) => {
        const questionsArray = Object.entries(section.questions);

        return (
          <div
            className="mb-3"
            key={sectionKey}
            id={`faq-section-${sectionIndex}`}
            role="region"
            aria-labelledby={`faq-section-title-${sectionIndex}`}
          >
            <h3
              id={`faq-section-title-${sectionIndex}`}
              className="pt-10 pb-3 text-2xl text-dark dark:text-light sm:text-3xl"
            >
              {section.title}
            </h3>
            <div role="group" aria-label={section.title}>
              {questionsArray.map(([questionKey, question], questionIndex) => {
                const key = `${sectionIndex}-${questionIndex}`;
                const isOpen = openQuestions[key] || false;
                const panelId = `faq-panel-${sectionIndex}-${questionIndex}`;
                const buttonId = `faq-button-${sectionIndex}-${questionIndex}`;

                return (
                  <div
                    key={questionKey}
                    className="transition-all duration-200 bg-white dark:bg-dark border border-gray-200 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Button
                      id={buttonId}
                      type="button"
                      variant="ghost"
                      onClick={() => toggleQuestion(sectionIndex, questionIndex)}
                      onKeyDown={(e) =>
                        handleKeyDown(
                          e,
                          sectionIndex,
                          questionIndex,
                          questionsArray.length
                        )
                      }
                      className="flex items-center justify-between w-full px-4 py-5 sm:p-6 text-black dark:text-light rounded-none"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      data-section={sectionIndex}
                    >
                      <span className="flex text-lg text-left font-semibold text-dark dark:text-light">
                        {question.title}
                      </span>
                      <Icon
                        className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </Icon>
                    </Button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className={`p-8 sm:p-6 border-beige-default dark:border-beige-medium text-black dark:text-light ${
                        isOpen ? "block border-t-2" : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: question.answer }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FaqAccordion;
