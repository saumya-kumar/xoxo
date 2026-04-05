"use client";

import { useEffect, useRef } from "react";

export default function LandingPrototype({ bodyHtml, styles }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const revealElements = Array.from(container.querySelectorAll(".reveal"));
    let observer;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
            }
          });
        },
        { threshold: 0.1 },
      );

      revealElements.forEach((element) => observer.observe(element));
    } else {
      revealElements.forEach((element) => element.classList.add("in"));
    }

    const calc = () => {
      const visitsInput = container.querySelector("#visits");
      const spendInput = container.querySelector("#spend");
      const botsInput = container.querySelector("#bots");
      const visitsOutput = container.querySelector("#visits-out");
      const spendOutput = container.querySelector("#spend-out");
      const botsOutput = container.querySelector("#bots-out");
      const wasteOutput = container.querySelector("#waste");
      const savingOutput = container.querySelector("#saving");
      const roiOutput = container.querySelector("#roi");

      if (
        !visitsInput ||
        !spendInput ||
        !botsInput ||
        !visitsOutput ||
        !spendOutput ||
        !botsOutput ||
        !wasteOutput ||
        !savingOutput ||
        !roiOutput
      ) {
        return;
      }

      const spend = Number(spendInput.value);
      const botShare = Number(botsInput.value) / 100;
      const waste = Math.round(spend * botShare);
      const saving = Math.round(waste * 0.85);
      const plan = spend <= 2000 ? 99 : spend <= 10000 ? 499 : 2000;
      const roi = (saving / plan).toFixed(1);

      visitsOutput.textContent = `${visitsInput.value}M`;
      spendOutput.textContent = `$${spend.toLocaleString()}`;
      botsOutput.textContent = `${botsInput.value}%`;
      wasteOutput.textContent = `$${waste.toLocaleString()}/mo`;
      savingOutput.textContent = `$${saving.toLocaleString()}/mo`;
      roiOutput.textContent = `${roi}×`;
    };

    const rangeInputs = Array.from(container.querySelectorAll('input[type="range"]'));
    rangeInputs.forEach((input) => input.addEventListener("input", calc));
    calc();

    return () => {
      observer?.disconnect();
      rangeInputs.forEach((input) => input.removeEventListener("input", calc));
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
