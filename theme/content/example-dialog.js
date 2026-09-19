const strings = Services.strings.createBundle(
  "chrome://xul-theme-example/locale/strings.properties"
);

window.addEventListener(
  "DOMContentLoaded",
  () => {
    document.title = strings.GetStringFromName("example-dialog-title");
    document
      .getElementById("example-dialog-heading")
      .setAttribute(
        "value",
        strings.GetStringFromName("example-dialog-heading")
      );
    document.getElementById("example-dialog-description").textContent =
      strings.GetStringFromName("example-dialog-description");
  },
  { once: true }
);
