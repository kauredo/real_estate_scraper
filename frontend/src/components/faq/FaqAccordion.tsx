import { useState } from "react";
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
    {},
  );

  const toggleQuestion = (sectionIndex: number, questionIndex: number) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {Object.entries(sections).map(([sectionKey, section], sectionIndex) => (
        <div className="mb-3" key={sectionKey} id={String(sectionIndex)}>
          <h3 className="pt-10 pb-3 text-2xl text-dark dark:text-light sm:text-3xl">
            {section.title}
          </h3>
          {Object.entries(section.questions).map(
            ([questionKey, question], questionIndex) => {
              const key = `${sectionIndex}-${questionIndex}`;
              const isOpen = openQuestions[key];

              return (
                <div
                  key={questionKey}
                  className="transition-all duration-200 bg-white dark:bg-dark border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => toggleQuestion(sectionIndex, questionIndex)}
                    className="flex items-center justify-between w-full px-4 py-5 sm:p-6 text-black dark:text-light"
                  >
                    <span className="flex text-lg text-left font-semibold text-dark dark:text-light">
                      {question.title}
                    </span>
                    <Icon
                      className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
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
                    className={`p-8 sm:p-6 border-beige-default dark:border-beige-medium text-black dark:text-light ${
                      isOpen ? "block border-t-2" : "hidden"
                    }`}
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                  />
                </div>
              );
            },
          )}
        </div>
      ))}
    </>
  );
};

export default FaqAccordion;
