import { buildAmapScriptUrl } from "@/config/amap";

type AMapNamespace = typeof AMap;

let amapPromise: Promise<AMapNamespace> | null = null;

function configureSecurity() {
  const securityCode = process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE;

  if (!securityCode) {
    console.warn(
      "[amap] NEXT_PUBLIC_AMAP_SECURITY_CODE is missing. Set it in .env.local"
    );
    return;
  }

  window._AMapSecurityConfig = {
    securityJsCode: securityCode,
  };
}

function loadScript(src: string): Promise<void> {
  const existing = document.querySelector<HTMLScriptElement>(
    `script[data-amap-sdk="true"]`
  );

  if (existing) {
    if (existing.src === src) {
      return existing.dataset.loaded === "true"
        ? Promise.resolve()
        : new Promise((resolve, reject) => {
            existing.addEventListener("load", () => resolve(), { once: true });
            existing.addEventListener(
              "error",
              () => reject(new Error(`Failed to load AMap script: ${src}`)),
              { once: true }
            );
          });
    }

    existing.remove();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.amapSdk = "true";

    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };

    script.onerror = () => {
      reject(new Error(`Failed to load AMap script: ${src}`));
    };

    document.head.appendChild(script);
  });
}

function waitForAmap(): Promise<AMapNamespace> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.AMap) {
      resolve(window.AMap);
      return;
    }

    let attempts = 0;
    const maxAttempts = 50;

    const timer = window.setInterval(() => {
      attempts += 1;

      if (window.AMap) {
        window.clearInterval(timer);
        resolve(window.AMap);
        return;
      }

      if (attempts >= maxAttempts) {
        window.clearInterval(timer);
        reject(new Error("AMap object not available after script load"));
      }
    }, 100);
  });
}

export function loadAmap(plugins: string[] = []): Promise<AMapNamespace> {
  const key = process.env.NEXT_PUBLIC_AMAP_KEY;

  if (!key) {
    return Promise.reject(
      new Error(
        "NEXT_PUBLIC_AMAP_KEY is missing. Copy .env.example to .env.local and set your key."
      )
    );
  }

  if (!amapPromise) {
    configureSecurity();

    const scriptUrl = buildAmapScriptUrl(key, plugins);

    amapPromise = loadScript(scriptUrl)
      .then(() => waitForAmap())
      .catch((error) => {
        amapPromise = null;
        throw error;
      });
  }

  return amapPromise;
}

export function resetAmapLoader() {
  amapPromise = null;
}

declare global {
  interface Window {
    AMap: typeof AMap;
    _AMapSecurityConfig?: {
      securityJsCode?: string;
      serviceHost?: string;
    };
  }
}
