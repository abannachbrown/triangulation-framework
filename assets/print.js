(() => {
  let disclosureStates = null;

  const preparePrint = () => {
    if (disclosureStates !== null) return;
    disclosureStates = Array.from(document.querySelectorAll("details"), (section) => [section, section.open]);
    disclosureStates.forEach(([section]) => { section.open = true; });
    document.querySelectorAll(".tab-pane").forEach((panel) => {
      const label = document.getElementById(panel.getAttribute("aria-labelledby"));
      if (!label) return;
      const heading = document.createElement("h3");
      heading.className = "print-tab-heading";
      heading.textContent = label.textContent;
      panel.prepend(heading);
    });
  };

  window.addEventListener("beforeprint", preparePrint);
  window.addEventListener("afterprint", () => {
    disclosureStates?.forEach(([section, wasOpen]) => { section.open = wasOpen; });
    disclosureStates = null;
    document.querySelectorAll(".print-tab-heading").forEach((heading) => heading.remove());
  });
  document.querySelectorAll("[data-print-page]").forEach((button) => {
    button.addEventListener("click", () => window.print());
  });
})();
