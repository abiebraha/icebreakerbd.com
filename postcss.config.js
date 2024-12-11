
export default {
  plugins: [
    'postcss-nesting',
    'tailwindcss',
    'autoprefixer',
    process.env.NODE_ENV === 'production' 
      ? ['cssnano', { 
          preset: ['default', { 
            discardComments: { removeAll: true } 
          }]
        }]
      : null
  ].filter(Boolean)
}
