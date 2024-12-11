
/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    require('postcss-nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' 
      ? require('cssnano')({ 
          preset: ['default', { 
            discardComments: { removeAll: true } 
          }]
        })
      : null
  ].filter(Boolean)
}
