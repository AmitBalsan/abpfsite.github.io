declare module "vite-plugin-raw" {
  const rawPlugin: (options?: { fileRegex?: RegExp }) => any;
  export default rawPlugin;
}
