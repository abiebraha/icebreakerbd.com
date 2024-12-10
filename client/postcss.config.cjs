module.exports = {
  plugins: [
    require('postcss-nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : [])
  ]
}
