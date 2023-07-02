// vite.config.js
import { defineConfig } from "file:///D:/React/JumpStart/Jump-Start/node_modules/vite/dist/node/index.js";
import react from "file:///D:/React/JumpStart/Jump-Start/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This maps the "images" alias to the "src/images" directory
      images: "/src/images"
    }
  },
  // This tells Vite to copy any files in the "public" directory to the output build
  // directory without processing them. This is useful for static files like images.
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "[name][extname]"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxSZWFjdFxcXFxKdW1wU3RhcnRcXFxcSnVtcC1TdGFydFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUmVhY3RcXFxcSnVtcFN0YXJ0XFxcXEp1bXAtU3RhcnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1JlYWN0L0p1bXBTdGFydC9KdW1wLVN0YXJ0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAvLyBUaGlzIG1hcHMgdGhlIFwiaW1hZ2VzXCIgYWxpYXMgdG8gdGhlIFwic3JjL2ltYWdlc1wiIGRpcmVjdG9yeVxuICAgICAgaW1hZ2VzOiAnL3NyYy9pbWFnZXMnXG4gICAgfVxuICB9LFxuICAvLyBUaGlzIHRlbGxzIFZpdGUgdG8gY29weSBhbnkgZmlsZXMgaW4gdGhlIFwicHVibGljXCIgZGlyZWN0b3J5IHRvIHRoZSBvdXRwdXQgYnVpbGRcbiAgLy8gZGlyZWN0b3J5IHdpdGhvdXQgcHJvY2Vzc2luZyB0aGVtLiBUaGlzIGlzIHVzZWZ1bCBmb3Igc3RhdGljIGZpbGVzIGxpa2UgaW1hZ2VzLlxuICBidWlsZDoge1xuICAgIGFzc2V0c0RpcjogJ2Fzc2V0cycsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnW25hbWVdW2V4dG5hbWVdJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVIsU0FBUyxvQkFBb0I7QUFDOVMsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxNQUVMLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQSxFQUdBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
