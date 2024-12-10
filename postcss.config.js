export default {
  plugins: {
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { 
      cssnano: { 
        preset: ['default', {
          colormin: false,
          discardComments: {
            removeAll: true,
          },
        }]
      }
    } : {})
  },
}
