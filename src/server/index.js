const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function extension(pathname) {
  const dot = pathname.lastIndexOf(".");
  return dot >= 0 ? pathname.slice(dot).toLowerCase() : ".html";
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const assetUrl = new URL(`/server/public${pathname}`, url.origin);
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));

    if (response.status === 404 && pathname !== "/index.html") {
      return env.ASSETS.fetch(new Request(new URL("/server/public/index.html", url.origin), request));
    }

    const headers = new Headers(response.headers);
    headers.set("content-type", contentTypes[extension(pathname)] || "application/octet-stream");
    headers.set("cache-control", pathname === "/index.html" ? "public, max-age=300" : "public, max-age=31536000, immutable");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
