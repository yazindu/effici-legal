(function () {
    function resolveCommit() {
        const fromGlobal = typeof window.EFFICI_LEGAL_BUILD_COMMIT === "string"
            ? window.EFFICI_LEGAL_BUILD_COMMIT.trim()
            : "";
        if (fromGlobal) return fromGlobal;

        const params = new URLSearchParams(window.location.search);
        const fromQuery = (params.get("build") || params.get("v") || "").trim();
        return fromQuery || "unknown";
    }

    function render() {
        if (!document.body || document.querySelector("[data-effici-build-footer]")) return;

        const footer = document.createElement("p");
        footer.setAttribute("data-effici-build-footer", "true");
        footer.textContent = "Build: " + resolveCommit();
        footer.style.margin = "1.5rem auto 2rem";
        footer.style.textAlign = "center";
        footer.style.fontSize = "0.85rem";
        footer.style.color = "#6b7280";
        footer.style.fontFamily = "Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif";
        document.body.appendChild(footer);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", render, { once: true });
    } else {
        render();
    }
})();
