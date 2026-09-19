import { attachTitlebarMenu } from "chrome://xul-theme-example/content/TitlebarMenu.sys.mjs";

const styleSheetService = Cc[
  "@mozilla.org/content/style-sheet-service;1"
].getService(Ci.nsIStyleSheetService);

const themeSheet = styleSheetService.preloadSheet(
  Services.io.newURI(
    "chrome://xul-theme-example/content/theme.css"
  ),
  styleSheetService.USER_SHEET
);

const attachedWindows = new WeakSet();

export function attachTheme(window) {
  if (attachedWindows.has(window)) {
    return;
  }

  attachedWindows.add(window);
  window.document.documentElement.setAttribute("example-xul-theme", "true");
  window.windowUtils.addSheet(themeSheet, Ci.nsIDOMWindowUtils.USER_SHEET);
  attachTitlebarMenu(window);
}
