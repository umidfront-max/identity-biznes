/**
 * @description Export the cli configuration. All configuration modifications below require restarting the project.
 */
export const cliConfig: { [key: string]: string | number | boolean | Array<string> } = {
  // In hash mode, it is recommended to use "" or "./" to represent relative paths when the name of the secondary directory is not certain.
  // The history mode uses "/" or "/secondary directory/" by default. Base can be empty when there is only hash. If you configure the history mode, then this item cannot be empty!
  base: './',
  // Directory name of the production environment build file
  outDir: 'dist',
  // Directory to place generated static resources (js, css, img, fonts).
  assetsDir: 'static',
  // Development environment port number
  port: 5173,
  // pwa
  pwa: true,
  // pwaDev
  pwaDev: false,
  // Specify the chunk size that triggers warnings when building. (in kbs)
  chunkSizeWarningLimit: 20480,
  // When the development server starts, automatically open the application in the browser
  open: true,
  // Enable/disable CSS code splitting when building
  cssCodeSplit: true,
  // Enable/disable gzip compression size reporting
  reportCompressedSize: false,
  // obfuscator boolean | 'terser' | 'esbuild'
  minify: 'esbuild',
  // Whether hashing is enabled for packaged files
  outputHash: true,
  // Whether mocking is enabled in the development environment
  localEnabled: true,
  // Whether mocking is enabled in the production environment
  prodEnabled: true,
  // Enable code compression boolean | 'gzip' | 'brotli'
  compress: false,
  // Modules that need to be cached in node_modules/.vite
  include: ['element-plus'],
  // Modules that do not need to be cached in node_modules/.vite
  exclude: [],
  // Turn on https in the development environment
  https: false,
  // Turn on packaging analysis
  report: false,
  // Disable debugging in production environments
  noDebugger: true,
}
