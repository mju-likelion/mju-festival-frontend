// vite.config.dev.ts
import { defineConfig } from "file:///C:/Users/rntqh/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/2024%20%EB%AA%85%EC%A7%80%EB%8C%80%20%EC%B6%95%EC%A0%9C%20%EB%A7%88%EC%A0%9C%EC%8A%A4%ED%8B%B0%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/mju-festival-frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/rntqh/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/2024%20%EB%AA%85%EC%A7%80%EB%8C%80%20%EC%B6%95%EC%A0%9C%20%EB%A7%88%EC%A0%9C%EC%8A%A4%ED%8B%B0%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/mju-festival-frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import svgr from "file:///C:/Users/rntqh/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/2024%20%EB%AA%85%EC%A7%80%EB%8C%80%20%EC%B6%95%EC%A0%9C%20%EB%A7%88%EC%A0%9C%EC%8A%A4%ED%8B%B0%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/mju-festival-frontend/node_modules/@svgr/rollup/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/rntqh/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/2024%20%EB%AA%85%EC%A7%80%EB%8C%80%20%EC%B6%95%EC%A0%9C%20%EB%A7%88%EC%A0%9C%EC%8A%A4%ED%8B%B0%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/mju-festival-frontend/vite.config.dev.ts";
var fileName = fileURLToPath(__vite_injected_original_import_meta_url);
var dirName = path.dirname(fileName);
var https = {
  key: fs.readFileSync(path.resolve(dirName, "cert/localhost-key.pem")),
  cert: fs.readFileSync(path.resolve(dirName, "cert/localhost.pem"))
};
var vite_config_dev_default = defineConfig({
  plugins: [react(), svgr()],
  server: {
    https,
    host: true
  }
});
export {
  vite_config_dev_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuZGV2LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccm50cWhcXFxcT25lRHJpdmVcXFxcXHVCQzE0XHVEMEQ1IFx1RDY1NFx1QkE3NFxcXFwyMDI0IFx1QkE4NVx1QzlDMFx1QjMwMCBcdUNEOTVcdUM4MUMgXHVCOUM4XHVDODFDXHVDMkE0XHVEMkYwIFx1RDUwNFx1Qjg1Q1x1QzgxRFx1RDJCOFxcXFxtanUtZmVzdGl2YWwtZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHJudHFoXFxcXE9uZURyaXZlXFxcXFx1QkMxNFx1RDBENSBcdUQ2NTRcdUJBNzRcXFxcMjAyNCBcdUJBODVcdUM5QzBcdUIzMDAgXHVDRDk1XHVDODFDIFx1QjlDOFx1QzgxQ1x1QzJBNFx1RDJGMCBcdUQ1MDRcdUI4NUNcdUM4MURcdUQyQjhcXFxcbWp1LWZlc3RpdmFsLWZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmRldi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcm50cWgvT25lRHJpdmUvJUVCJUIwJTk0JUVEJTgzJTk1JTIwJUVEJTk5JTk0JUVCJUE5JUI0LzIwMjQlMjAlRUIlQUElODUlRUMlQTclODAlRUIlOEMlODAlMjAlRUMlQjYlOTUlRUMlQTAlOUMlMjAlRUIlQTclODglRUMlQTAlOUMlRUMlOEElQTQlRUQlOEIlQjAlMjAlRUQlOTQlODQlRUIlQTElOUMlRUMlQTAlOUQlRUQlOEElQjgvbWp1LWZlc3RpdmFsLWZyb250ZW5kL3ZpdGUuY29uZmlnLmRldi50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XHJcbmltcG9ydCBzdmdyIGZyb20gJ0BzdmdyL3JvbGx1cCc7XHJcblxyXG5jb25zdCBmaWxlTmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcclxuY29uc3QgZGlyTmFtZSA9IHBhdGguZGlybmFtZShmaWxlTmFtZSk7XHJcblxyXG5jb25zdCBodHRwcyA9IHtcclxuICBrZXk6IGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoZGlyTmFtZSwgJ2NlcnQvbG9jYWxob3N0LWtleS5wZW0nKSksXHJcbiAgY2VydDogZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShkaXJOYW1lLCAnY2VydC9sb2NhbGhvc3QucGVtJykpLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgc3ZncigpXSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIGh0dHBzLFxyXG4gICAgaG9zdDogdHJ1ZSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxakIsU0FBUyxvQkFBb0I7QUFDbGxCLE9BQU8sV0FBVztBQUNsQixPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyxVQUFVO0FBTDBQLElBQU0sMkNBQTJDO0FBTzVULElBQU0sV0FBVyxjQUFjLHdDQUFlO0FBQzlDLElBQU0sVUFBVSxLQUFLLFFBQVEsUUFBUTtBQUVyQyxJQUFNLFFBQVE7QUFBQSxFQUNaLEtBQUssR0FBRyxhQUFhLEtBQUssUUFBUSxTQUFTLHdCQUF3QixDQUFDO0FBQUEsRUFDcEUsTUFBTSxHQUFHLGFBQWEsS0FBSyxRQUFRLFNBQVMsb0JBQW9CLENBQUM7QUFDbkU7QUFFQSxJQUFPLDBCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUFBLEVBQ3pCLFFBQVE7QUFBQSxJQUNOO0FBQUEsSUFDQSxNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
