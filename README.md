# XUL theme template

A minimal, installable XUL theme for Nocturne 4.0+ or any forks with compatible XUL theming.

The example changes the browser toolbar and selected tab. Its JavaScript loader also adds an example dialog.

## Make your own theme

1. Change the add-on ID, name, version, creator, and internal name in `theme/install.rdf`.
2. Rename the chrome package in `theme/chrome.manifest` and the matching `chrome://` URLs in `theme/content`.
3. Replace the rules in `theme/content/theme.css` and the icon in `theme/icon.png`.
4. Update the target application version if your Nocturne build uses another ESR.
5. Run the build script and install the new XPI.

Use unique add-on IDs and chrome package names. Reusing another theme's values can make one package replace or shadow the other.