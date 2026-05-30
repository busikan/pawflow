"use client";

import { useEffect, useRef, useState } from "react";

import { loadAmap } from "@/lib/amap";
import { MapWaypoint } from "@/types/app";

type AmapRouteMapProps = {
  waypoints: MapWaypoint[];
  className?: string;
  onSelectNode?: (timelineIndex: number) => void;
};

const DEFAULT_COLORS = ["#111827", "#16a34a", "#f97316", "#a855f7"];

function createMarkerContent(index: number, label: string, color: string) {
  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    "display:flex;flex-direction:column;align-items:center;cursor:pointer;";

  const labelEl = document.createElement("div");
  labelEl.textContent = label;
  labelEl.style.cssText =
    "margin-bottom:4px;padding:2px 8px;border-radius:9999px;background:#fff;font-size:11px;font-weight:700;color:#111827;box-shadow:0 1px 4px rgba(0,0,0,0.12);white-space:nowrap;";

  const pin = document.createElement("div");
  pin.style.cssText = `width:30px;height:30px;border-radius:9999px;background:${color};border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:800;`;

  pin.textContent = String(index + 1);
  wrapper.appendChild(labelEl);
  wrapper.appendChild(pin);

  return wrapper;
}

export default function AmapRouteMap({
  waypoints,
  className = "",
  onSelectNode,
}: AmapRouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<AMap.Map | null>(null);
  const overlaysRef = useRef<Array<AMap.Marker | AMap.Polyline>>([]);
  const onSelectRef = useRef(onSelectNode);

  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    onSelectRef.current = onSelectNode;
  }, [onSelectNode]);

  useEffect(() => {
    if (!containerRef.current || waypoints.length === 0) {
      setStatus(waypoints.length === 0 ? "error" : "loading");
      if (waypoints.length === 0) {
        setErrorMessage("暂无路线坐标");
      }
      return;
    }

    let cancelled = false;

    async function initMap() {
      try {
        setStatus("loading");
        setErrorMessage("");

        const AMap = await loadAmap();
        if (cancelled || !containerRef.current) return;

        const map = new AMap.Map(containerRef.current, {
          viewMode: "2D",
          zoom: 13,
          dragEnable: true,
          zoomEnable: true,
          resizeEnable: true,
        });

        mapRef.current = map;

        const markers: AMap.Marker[] = waypoints.map((waypoint, index) => {
          const color =
            waypoint.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];

          const marker = new AMap.Marker({
            position: waypoint.position,
            content: createMarkerContent(index, waypoint.label, color),
            offset: new AMap.Pixel(-15, -42),
            zIndex: 120 + index,
          });

          marker.on("click", () => {
            onSelectRef.current?.(waypoint.timelineIndex);
          });

          return marker;
        });

        const path = waypoints.map((waypoint) => waypoint.position);
        const polyline = new AMap.Polyline({
          path,
          strokeColor: "#f97316",
          strokeWeight: 6,
          strokeOpacity: 0.95,
          lineJoin: "round",
          lineCap: "round",
          zIndex: 50,
        });

        map.add([...markers, polyline]);
        overlaysRef.current = [...markers, polyline];

        map.setFitView([...markers, polyline], false, [48, 48, 48, 48]);

        requestAnimationFrame(() => {
          map.resize();
        });

        if (!cancelled) {
          setStatus("ready");
        }
      } catch (error) {
        if (cancelled) return;

        console.error("[AmapRouteMap]", error);
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "地图加载失败"
        );
      }
    }

    initMap();

    return () => {
      cancelled = true;
      overlaysRef.current = [];
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, [waypoints]);

  if (waypoints.length === 0) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center bg-emerald-50 text-sm text-zinc-500 ${className}`}
      >
        暂无路线数据
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <div ref={containerRef} className="h-full w-full" />

      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-emerald-50/80 text-sm text-zinc-500">
          地图加载中...
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-50 px-6 text-center text-sm text-red-500">
          {errorMessage || "地图加载失败，请检查 .env.local 中的高德 Key"}
        </div>
      )}
    </div>
  );
}
