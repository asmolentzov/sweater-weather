export const errorLog = (error) => {
  console.log(error);
};

export const errorBackground = (error) => {
  $('body').css("background-image", "linear-gradient(-90deg, #006E90, #67B4DA)")
  console.log(error);
};

export const displayError = (error) => {
  $('.errors').show().text(error);
}

export const clearErrors = () => {
  $('.errors').hide().text('');
}