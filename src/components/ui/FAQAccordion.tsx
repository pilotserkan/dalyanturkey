'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  questions: FAQItem[];
}

export default function FAQAccordion({ questions }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="divide-y divide-gray-200">
      {questions.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={`faq-item ${isOpen ? 'open' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{item.question}</span>

              {/* Chevron icon */}
              <svg
                className="faq-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id={`faq-answer-${index}`}
              className="faq-answer"
              style={{
                maxHeight: isOpen ? '500px' : '0px',
                opacity: isOpen ? 1 : 0,
              }}
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              <div className="faq-answer-content">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
