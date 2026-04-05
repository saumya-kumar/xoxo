"use client";

import { useEffect, useRef } from "react";

const DASHBOARD_TITLES = {
  overview: "Overview",
  traffic: "Traffic",
  savings: "Savings",
  bots: "Bot Intelligence",
  policy: "Policy",
  settings: "Settings",
};

export default function JourneyPrototype({ bodyHtml, styles }) {
  const containerRef = useRef(null);
  const currentStepRef = useRef(5);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const goToStep = (stepNumber) => {
      const screens = Array.from(container.querySelectorAll(".screen"));
      const steps = Array.from(container.querySelectorAll(".jb-step"));
      const targetScreen = container.querySelector(`#s${stepNumber}`);

      screens.forEach((screen) => screen.classList.remove("active"));
      steps.forEach((step, index) => {
        step.classList.remove("active", "done");

        if (index < stepNumber) {
          step.classList.add("done");
        } else if (index === stepNumber) {
          step.classList.add("active");
        }
      });

      targetScreen?.classList.add("active");
      currentStepRef.current = stepNumber;
    };

    const nextStep = () => {
      if (currentStepRef.current < 6) {
        goToStep(currentStepRef.current + 1);
      }
    };

    const selectDashboardPage = (pageId, element) => {
      const pages = Array.from(container.querySelectorAll(".dash-page"));
      const navItems = Array.from(container.querySelectorAll(".nav-i"));
      const targetPage = container.querySelector(`#dp-${pageId}`);
      const title = container.querySelector("#dash-title");

      pages.forEach((page) => page.classList.remove("active"));
      navItems.forEach((item) => item.classList.remove("active"));

      targetPage?.classList.add("active");
      element?.classList.add("active");

      if (title) {
        title.textContent = DASHBOARD_TITLES[pageId] || pageId;
      }
    };

    window.xoxoJourneyGo = goToStep;
    window.xoxoJourneyNext = nextStep;
    window.xoxoJourneySelectPage = selectDashboardPage;

    const policyButtons = Array.from(container.querySelectorAll(".pb"));
    const policyHandlers = new Map();

    policyButtons.forEach((button) => {
      const handler = () => {
        const row = button.closest(".set-row, .pol-row");
        const rowButtons = row
          ? Array.from(row.querySelectorAll(".pb"))
          : Array.from(button.parentElement?.querySelectorAll(".pb") || []);

        rowButtons.forEach((rowButton) => {
          rowButton.className = "pb";
        });

        const label = button.textContent.trim().toLowerCase();

        if (label === "cache" || label === "allow") {
          button.classList.add("pa");
        } else if (label === "block") {
          button.classList.add("pr");
        } else if (label === "rate limit") {
          button.classList.add("pl");
        }
      };

      button.addEventListener("click", handler);
      policyHandlers.set(button, handler);
    });

    goToStep(currentStepRef.current);

    const activeNav = container.querySelector(".nav-i.active");
    if (activeNav) {
      selectDashboardPage("overview", activeNav);
    }

    return () => {
      delete window.xoxoJourneyGo;
      delete window.xoxoJourneyNext;
      delete window.xoxoJourneySelectPage;

      policyButtons.forEach((button) => {
        const handler = policyHandlers.get(button);

        if (handler) {
          button.removeEventListener("click", handler);
        }
      });
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
