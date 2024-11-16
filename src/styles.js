export const fontSizes = {
  fontSize : {
    xs: '0.8rem', // 100% width on extra-small screens
    sm: '0.8rem',  // 50% width on small screens
    md: '0.8rem',  // 33% width on medium screens
  }
}

export const headingFontSizes = {
  fontSize : {
    xs: '1.2rem', // 100% width on extra-small screens
    sm: '1.3rem',  // 50% width on small screens
    md: '1.6rem',  // 33% width on medium screens
  }
}

export const textStyling={
    '& .MuiInputBase-input': fontSizes,
    // '& .css-kg5swy': {fontSize : {xs : '0.5rem', md : '0.75rem'}},
    '& .MuiInputLabel-root': fontSizes
  }

