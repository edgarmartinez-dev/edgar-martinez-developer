// Parent router: the portfolio serves its own assets and mounts child apps
// under /apps/<name>/ via service bindings, so everything shares one origin
// (and therefore one PWA scope, one future push subscription, etc.).
const CHILD_APPS = { ndeals: "NDEALS" };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const match = url.pathname.match(/^\/apps\/([a-z0-9-]+)(\/.*)?$/);

    if (match && CHILD_APPS[match[1]]) {
      // Child builds use base /apps/<name>/, so strip the prefix before
      // handing off — the child worker sees its own root-relative paths.
      const inner = new URL(url);
      inner.pathname = match[2] || "/";
      const fwd = new Request(inner, request);
      // request.cf doesn't cross service bindings; children read this header.
      if (request.cf?.country) fwd.headers.set("x-geo-country", request.cf.country);
      return env[CHILD_APPS[match[1]]].fetch(fwd);
    }

    if (match) return new Response("no such app", { status: 404 });

    return env.ASSETS.fetch(request);
  },
};
