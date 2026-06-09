#!/usr/bin/env python3
"""Build a shareable Echo Room FM browser package."""

from __future__ import annotations

import datetime as dt
import html
import json
import shutil
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parent
WORKSPACE = ROOT.parent
DIST = WORKSPACE / "dist" / "echo_room_fm"
SITE = DIST / "Echo_Room_FM_Website"
NETLIFY_PROJECT = DIST / "Echo_Room_FM_Netlify_Project"
STANDALONE_NAME = "Echo_Room_FM.html"


def read_text(path: Path) -> str:
  return path.read_text(encoding="utf-8")


def escape_script(source: str) -> str:
  return source.replace("</script", "<\\/script")


def build_standalone() -> Path:
  index = read_text(ROOT / "index.html")
  css = read_text(ROOT / "styles.css")
  library = read_text(ROOT / "library-data.js")
  app = read_text(ROOT / "app.js")

  index = index.replace('    <link rel="stylesheet" href="./styles.css">\n', f"    <style>\n{css}\n    </style>\n")
  index = index.replace('    <script src="./library-data.js?v=20260610-full-refresh"></script>\n', f"    <script>\n{escape_script(library)}\n    </script>\n")
  index = index.replace('    <script src="./app.js?v=20260610-full-refresh"></script>\n', f"    <script>\n{escape_script(app)}\n    </script>\n")
  index = index.replace("<title>Echo Room FM</title>", "<title>Echo Room FM Portable</title>")

  out = DIST / STANDALONE_NAME
  out.write_text(index, encoding="utf-8")
  return out


def build_site() -> Path:
  if SITE.exists():
    shutil.rmtree(SITE)
  SITE.mkdir(parents=True)

  for name in ["index.html", "styles.css", "app.js", "library-data.js", "library.json"]:
    shutil.copy2(ROOT / name, SITE / name)

  manifest = {
    "name": "Echo Room FM",
    "short_name": "Echo Room",
    "description": "A browser radio built from the Echo Room music archive.",
    "start_url": "./index.html",
    "display": "standalone",
    "background_color": "#050505",
    "theme_color": "#16f4d0",
  }
  (SITE / "manifest.webmanifest").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

  service_worker = """const CACHE_NAME = "echo-room-fm-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./library-data.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
"""
  (SITE / "service-worker.js").write_text(service_worker, encoding="utf-8")

  index_path = SITE / "index.html"
  index = read_text(index_path)
  index = index.replace(
    '    <link rel="stylesheet" href="./styles.css">\n',
    '    <link rel="manifest" href="./manifest.webmanifest">\n    <link rel="stylesheet" href="./styles.css">\n',
  )
  index = index.replace(
    '    <script src="./app.js?v=20260610-full-refresh"></script>\n',
    '    <script src="./app.js?v=20260610-full-refresh"></script>\n    <script>\n      if ("serviceWorker" in navigator && location.protocol !== "file:") {\n        navigator.serviceWorker.register("./service-worker.js").catch(() => {});\n      }\n    </script>\n',
  )
  index_path.write_text(index, encoding="utf-8")
  return SITE


def write_readme() -> Path:
  generated = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
  text = f"""Echo Room FM 使用说明
生成时间：{generated}

最快使用：
1. 打开 Echo_Room_FM.html。
2. 如果浏览器拦截自动播放，点“启动电台”。
3. 播放依赖网易云音乐的网页音频地址；有些歌曲可能因为版权、会员或地区限制无法直接播放，可以点“网易云打开”。
4. 喜欢当前歌曲时点红心；红心歌曲会保存在浏览器本地，并可用“只播红心”单独播放。
5. 输入用户名后可以读取和保存这个用户名下的云端红心歌单；不输入用户名时仍是本机红心。
6. 左侧 NETEASE SYNC 默认收起；展开后可以联网读取网易云公开歌单，只同步你创建的歌单和我喜欢的音乐，不同步收藏的歌单；如果浏览器拦截网易云跨域请求，需要填写可用的同步线路。

跨平台建议：
- Windows / macOS：直接双击 Echo_Room_FM.html，用 Chrome、Edge 或 Safari 打开。
- Android：把 Echo_Room_FM.html 发到手机，用 Chrome 打开。
- iPhone / iPad：不要把本地 HTML 当作最稳方案；更推荐把 Echo_Room_FM_Website 整个文件夹部署到一个 HTTPS 静态网站，然后在 Safari 里“添加到主屏幕”，并打开“作为网页 App 打开”。
- 想让所有人像 App 一样打开：把 Echo_Room_FM_Website 文件夹上传到 Netlify、Vercel、Cloudflare Pages、GitHub Pages 或你自己的服务器。
- 真正“一点即开”的 iOS 形态不是某个 zip 或 html 格式，而是一个 HTTPS 链接或添加到主屏幕后的 Web App 图标。需要上架 App Store 或 TestFlight 时，才需要再包一层 iOS 原生壳。
- 云端红心歌单需要通过 Netlify Functions + Netlify Blobs 部署；只上传静态文件夹时，网页仍能用，但用户名云同步不会生效。

隐私提醒：
这个包内包含你的 3841 首歌曲资料和频道分类。分享给别人前，确认你愿意让对方看到这份曲库。
"""
  out = DIST / "README_CN.txt"
  out.write_text(text, encoding="utf-8")
  return out


def build_netlify_project() -> Path:
  if NETLIFY_PROJECT.exists():
    shutil.rmtree(NETLIFY_PROJECT)
  (NETLIFY_PROJECT / "radio_app").mkdir(parents=True)
  (NETLIFY_PROJECT / "netlify" / "functions").mkdir(parents=True)

  for name in ["index.html", "styles.css", "app.js", "library-data.js", "library.json"]:
    shutil.copy2(ROOT / name, NETLIFY_PROJECT / "radio_app" / name)
  shutil.copy2(WORKSPACE / "netlify" / "functions" / "loved.mjs", NETLIFY_PROJECT / "netlify" / "functions" / "loved.mjs")
  shutil.copy2(WORKSPACE / "package.json", NETLIFY_PROJECT / "package.json")
  shutil.copy2(WORKSPACE / "netlify.toml", NETLIFY_PROJECT / "netlify.toml")

  deploy_readme = """Echo Room FM - Netlify 云同步部署包

这个文件夹用于部署支持“用户名红心歌单云端保存”的版本。

推荐方式：
1. 把这个文件夹上传到 GitHub。
2. 在 Netlify 里 Add new site -> Import an existing project。
3. 选择这个仓库。
4. Netlify 会读取 netlify.toml：发布目录是 radio_app，Functions 目录是 netlify/functions。
5. 部署完成后，网页里输入用户名，红心歌单会保存到 Netlify Blobs。

也可以使用 Netlify CLI：
1. 在这个文件夹里运行 npm install。
2. 运行 netlify deploy --prod。

注意：
- 只拖拽上传静态文件夹时，页面可以打开，但 Netlify Functions 通常不会一起部署。
- 用户名没有密码保护；输入同一个用户名的人会共享同一份红心歌单。
"""
  (NETLIFY_PROJECT / "README_NETLIFY_DEPLOY.txt").write_text(deploy_readme, encoding="utf-8")
  return NETLIFY_PROJECT


def zip_directory(source_dir: Path, zip_path: Path) -> Path:
  if zip_path.exists():
    zip_path.unlink()
  with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
    for path in source_dir.rglob("*"):
      if path.is_file():
        zf.write(path, path.relative_to(source_dir))
  return zip_path


def make_zip(files: list[Path], site_dir: Path) -> Path:
  zip_path = WORKSPACE / "dist" / "Echo_Room_FM_Portable.zip"
  if zip_path.exists():
    zip_path.unlink()
  with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
    for path in files:
      zf.write(path, path.relative_to(DIST))
    for path in site_dir.rglob("*"):
      if path.is_file():
        zf.write(path, path.relative_to(DIST))
  return zip_path


def main() -> None:
  DIST.mkdir(parents=True, exist_ok=True)
  standalone = build_standalone()
  site = build_site()
  readme = write_readme()
  netlify_project = build_netlify_project()
  zip_path = make_zip([standalone, readme], site)
  netlify_zip = zip_directory(netlify_project, WORKSPACE / "dist" / "Echo_Room_FM_Netlify_Project.zip")
  print(json.dumps({
    "standalone": str(standalone),
    "site": str(site),
    "netlify_project": str(netlify_project),
    "zip": str(zip_path),
    "netlify_zip": str(netlify_zip),
    "zip_size_mb": round(zip_path.stat().st_size / 1024 / 1024, 2),
    "netlify_zip_size_mb": round(netlify_zip.stat().st_size / 1024 / 1024, 2),
  }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
  main()
