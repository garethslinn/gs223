// styles/theme.ts

export const theme = {
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      background: '#f8f9fa',
      border: '#dee2e6',
      text: '#6c757d',
      white: '#ffffff'
    },
    fontSizes: {
      small: '0.875rem',
      base: '1rem',
      large: '1.25rem',
      vlarge: '2rem'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem'
    },
    shadows: {
      base: '0.25rem 0.25rem 0.30rem rgba(0, 0, 0, 0.1)'
    }
  };
  
  export type Theme = typeof theme;
  