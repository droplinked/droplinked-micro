// packages/droplinked-designer/vite.config.ts
import react from "file:///I:/drplinked-designer/droplinked-micro/node_modules/@vitejs/plugin-react/dist/index.js";
import svgr from "file:///I:/drplinked-designer/droplinked-micro/node_modules/vite-plugin-svgr/dist/index.js";
import dts from "file:///I:/drplinked-designer/droplinked-micro/packages/droplinked-designer/node_modules/vite-plugin-dts/dist/index.mjs";
import { defineConfig } from "file:///I:/drplinked-designer/droplinked-micro/packages/droplinked-designer/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///I:/drplinked-designer/droplinked-micro/node_modules/vite-tsconfig-paths/dist/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "i:\\drplinked-designer\\droplinked-micro\\packages\\droplinked-designer";
var vite_config_default = defineConfig({
  plugins: [react(), tsconfigPaths(), svgr(), dts()],
  resolve: {
    alias: {
      "@": "/src"
      // Maps @ to the src directory
    }
  },
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "DroplinkedDesigner",
      fileName: (format) => `droplinked-designer.${format}.js`,
      formats: ["es", "umd"]
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvZHJvcGxpbmtlZC1kZXNpZ25lci92aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcImk6XFxcXGRycGxpbmtlZC1kZXNpZ25lclxcXFxkcm9wbGlua2VkLW1pY3JvXFxcXHBhY2thZ2VzXFxcXGRyb3BsaW5rZWQtZGVzaWduZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcImk6XFxcXGRycGxpbmtlZC1kZXNpZ25lclxcXFxkcm9wbGlua2VkLW1pY3JvXFxcXHBhY2thZ2VzXFxcXGRyb3BsaW5rZWQtZGVzaWduZXJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2k6L2RycGxpbmtlZC1kZXNpZ25lci9kcm9wbGlua2VkLW1pY3JvL3BhY2thZ2VzL2Ryb3BsaW5rZWQtZGVzaWduZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcbmltcG9ydCBzdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XHJcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksIHRzY29uZmlnUGF0aHMoKSwgc3ZncigpLCBkdHMoKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiAnL3NyYycsIC8vIE1hcHMgQCB0byB0aGUgc3JjIGRpcmVjdG9yeVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcclxuICAgICAgbmFtZTogJ0Ryb3BsaW5rZWREZXNpZ25lcicsXHJcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgZHJvcGxpbmtlZC1kZXNpZ25lci4ke2Zvcm1hdH0uanNgLFxyXG4gICAgICBmb3JtYXRzOiBbJ2VzJywgJ3VtZCddXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgcmVhY3Q6ICdSZWFjdCcsXHJcbiAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxWSxPQUFPLFdBQVc7QUFDdlosT0FBTyxVQUFVO0FBQ2pCLE9BQU8sU0FBUztBQUNoQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLGVBQWU7QUFMeEIsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQztBQUFBLEVBQ2pELFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQTtBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVUsQ0FBQyxXQUFXLHVCQUF1QixNQUFNO0FBQUEsTUFDbkQsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsU0FBUyxXQUFXO0FBQUEsTUFDL0IsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsYUFBYTtBQUFBLFFBQ2Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
