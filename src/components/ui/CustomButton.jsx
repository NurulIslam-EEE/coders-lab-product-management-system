// eslint-disable-next-line react/prop-types
function CustomButton({ title, styleName, style, ...buttonProps }) {
  return (
    <button
      className={`button-container ${styleName}`}
      {...buttonProps}
      style={style}
    >
      {title}
    </button>
  );
}

export default CustomButton;
