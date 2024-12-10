/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: ['default', {
              discardComments: { removeAll: true }
            }]
          }
        }
      : {})
  }
}
