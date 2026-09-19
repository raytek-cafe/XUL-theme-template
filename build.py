#!/usr/bin/env python3

from pathlib import Path
import shutil
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "theme"
OUTPUT_DIR = ROOT / "dist"
REQUIRED_FILES = (
    "install.rdf",
    "chrome.manifest",
    "icon.png",
    "content/overlay.xhtml",
    "content/overlay.js",
    "content/Theme.sys.mjs",
    "content/TitlebarMenu.sys.mjs",
    "content/example-dialog.xhtml",
    "content/example-dialog.js",
    "content/example-dialog.css",
    "content/theme.css",
    "locale/en-US/strings.properties",
)
ARCHIVE_TIMESTAMP = (1980, 1, 1, 0, 0, 0)


def package_version():
    root = ET.parse(SOURCE / "install.rdf").getroot()
    version = root.find(".//{http://www.mozilla.org/2004/em-rdf#}version")
    if version is None or not version.text or not version.text.strip():
        raise ValueError("theme/install.rdf does not contain em:version")
    return version.text.strip()


def source_files():
    missing = [name for name in REQUIRED_FILES if not (SOURCE / name).is_file()]
    if missing:
        raise FileNotFoundError("Missing package files: " + ", ".join(missing))
    return sorted(path for path in SOURCE.rglob("*") if path.is_file())


def build():
    OUTPUT_DIR.mkdir(exist_ok=True)
    output = OUTPUT_DIR / f"xul-theme-example-{package_version()}.xpi"
    temporary = output.with_suffix(".xpi.tmp")
    temporary.unlink(missing_ok=True)

    with zipfile.ZipFile(
        temporary,
        mode="w",
        compression=zipfile.ZIP_DEFLATED,
        compresslevel=9,
    ) as archive:
        for path in source_files():
            name = path.relative_to(SOURCE).as_posix()
            info = zipfile.ZipInfo(name, ARCHIVE_TIMESTAMP)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, path.read_bytes(), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)

    shutil.move(temporary, output)
    print(output)
    return output


if __name__ == "__main__":
    build()
