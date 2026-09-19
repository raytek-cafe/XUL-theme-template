const STRINGS_URI =
  "chrome://xul-theme-example/locale/strings.properties";
const DIALOG_URI =
  "chrome://xul-theme-example/content/example-dialog.xhtml";

const strings = Services.strings.createBundle(STRINGS_URI);

function label(name) {
  return strings.GetStringFromName(name);
}

function installTitlebarMenu(window) {
  const { document } = window;
  const popup = document.getElementById("toolbar-context-menu");
  const insertionPoint = document.getElementById(
    "customizationMenuSeparator"
  );
  if (
    !popup ||
    !insertionPoint ||
    document.getElementById("example-xul-theme-open-dialog")
  ) {
    return;
  }

  const separator = document.createXULElement("menuseparator");
  separator.id = "example-xul-theme-separator";

  const openDialogItem = document.createXULElement("menuitem");
  openDialogItem.id = "example-xul-theme-open-dialog";
  openDialogItem.label = label("titlebar-menu-open-dialog");
  openDialogItem.addEventListener("command", () => {
    window.openDialog(
      DIALOG_URI,
      "example-xul-theme-dialog",
      "chrome,centerscreen,dialog=yes,dependent,resizable=no"
    );
  });

  const toggleThemeItem = document.createXULElement("menuitem");
  toggleThemeItem.id = "example-xul-theme-toggle";
  toggleThemeItem.type = "checkbox";
  toggleThemeItem.label = label("titlebar-menu-toggle-theme");
  toggleThemeItem.addEventListener("command", () => {
    document.documentElement.toggleAttribute(
      "example-xul-theme",
      toggleThemeItem.checked
    );
  });

  const items = [separator, openDialogItem, toggleThemeItem];
  for (const item of items) {
    popup.insertBefore(item, insertionPoint);
  }

  popup.addEventListener("popupshowing", () => {
    const titlebar = document.getElementById("titlebar");
    const showItems = Boolean(titlebar?.contains(popup.triggerNode));
    for (const item of items) {
      item.hidden = !showItems;
    }
    if (showItems) {
      toggleThemeItem.checked = document.documentElement.hasAttribute(
        "example-xul-theme"
      );
    }
  });
}

export function attachTitlebarMenu(window) {
  if (window.document.readyState === "loading") {
    window.addEventListener(
      "DOMContentLoaded",
      () => installTitlebarMenu(window),
      { once: true }
    );
    return;
  }
  installTitlebarMenu(window);
}
