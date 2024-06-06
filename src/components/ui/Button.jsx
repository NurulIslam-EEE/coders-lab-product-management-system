function Button({ title, ...buttonProps }) {
  return (
    <button className="button-container" {...buttonProps}>
      {title}
    </button>
  );
}

export default Button;
