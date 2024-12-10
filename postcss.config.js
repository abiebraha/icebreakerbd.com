export default {
  plugins: {
    'postcss-nesting': {
      preserveEmpty: true
    },
    tailwindcss: {},
    autoprefixer: {
      flexbox: true,
      grid: true
    },
    ...(process.env.NODE_ENV === 'production' ? { 
      cssnano: { 
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          mergeLonghand: true,
          mergeRules: true,
          minifySelectors: true,
          minifyFontValues: true,
          normalizeWhitespace: true,
          cssDeclarationSorter: true,
          uniqueSelectors: true,
          calc: {
            precision: 2
          },
          // Keep color values and z-index for consistency
          colormin: false,
          reduceIdents: false,
          zindex: false
        }]
      }
    } : {})
  },
}
