export default {
  plugins: {
    'postcss-nesting': {
      preserveEmpty: true
    },
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { 
      cssnano: { 
        preset: ['default', {
          colormin: false,
          discardComments: {
            removeAll: true,
          },
          discardUnused: false,
          mergeRules: true,
          reduceIdents: false,
          zindex: false
        }]
      }
    } : {})
  },
}
