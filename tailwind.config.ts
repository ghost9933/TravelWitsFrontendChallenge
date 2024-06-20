// In tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': '#007BFF',
        'custom-dark-blue': '#0056b3',
      },
      borderRadius: {
        'custom': '8px' // Define custom borderRadius if needed
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'start': '#ffffff',  // Define your start color
        'end': '#e5e7eb',    // Define your end color
        'start-dark': '#1f2937', // Define your dark mode start color
        'end-dark': '#4b5563' // Define your dark mode end color
      }),
    }
  }
};
