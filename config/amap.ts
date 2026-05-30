/**
 * 高德地图 JS API 2.0 配置
 * Key / 安全密钥仍放在 .env.local，此处只配置 SDK 加载参数
 * 文档: https://lbs.amap.com/api/javascript-api-v2/summary
 */
export const amapConfig = {
  version: "2.0",
  scriptBaseUrl: "https://webapi.amap.com/maps",
  /** 按需加载的插件，如 AMap.Driving、AMap.PlaceSearch */
  defaultPlugins: [] as string[],
} as const;

export function buildAmapScriptUrl(
  key: string,
  plugins: string[] = amapConfig.defaultPlugins
): string {
  const params = new URLSearchParams({
    v: amapConfig.version,
    key,
  });

  if (plugins.length > 0) {
    params.set("plugin", plugins.join(","));
  }

  return `${amapConfig.scriptBaseUrl}?${params.toString()}`;
}
