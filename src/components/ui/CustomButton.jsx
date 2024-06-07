// eslint-disable-next-line react/prop-types
function CustomButton({ title, styleName, ...buttonProps }) {
  return (
    <button className={`button-container ${styleName}`} {...buttonProps}>
      {title}
    </button>
  );
}

export default CustomButton;
