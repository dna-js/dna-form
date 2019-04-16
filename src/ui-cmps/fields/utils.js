export const curWidth = () => {
  const boxWidth = document.getElementsByClassName('form-region')[0].clientWidth;
  return boxWidth > 1000 ? 800 : boxWidth * 0.8;
}