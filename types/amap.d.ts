export {};

declare global {
  namespace AMap {
    class Map {
      constructor(container: HTMLElement | string, opts?: MapOptions);
      add(overlays: unknown | unknown[]): void;
      destroy(): void;
      resize(): void;
      setFitView(
        overlays?: unknown[],
        immediately?: boolean,
        avoid?: number[]
      ): void;
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      on(event: string, handler: () => void): void;
    }

    class Polyline {
      constructor(opts?: PolylineOptions);
    }

    class Pixel {
      constructor(x: number, y: number);
    }

    interface MapOptions {
      viewMode?: string;
      zoom?: number;
      center?: [number, number];
      dragEnable?: boolean;
      zoomEnable?: boolean;
      resizeEnable?: boolean;
    }

    interface MarkerOptions {
      position?: [number, number];
      content?: HTMLElement | string;
      offset?: Pixel;
      zIndex?: number;
    }

    interface PolylineOptions {
      path?: [number, number][];
      strokeColor?: string;
      strokeWeight?: number;
      strokeOpacity?: number;
      lineJoin?: string;
      lineCap?: string;
      zIndex?: number;
    }
  }
}
