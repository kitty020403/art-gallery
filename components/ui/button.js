export const Button = ({
  children,
  className = '',
  variant,
  size,
  style,
  ...rest
}) => {
  const variants = {
    ghost: 'bg-transparent hover:bg-[#BEAD73]/10 text-[#CBBD93] border-transparent',
    outline: 'bg-transparent border border-[#BEAD73] text-[#BEAD73] hover:bg-[#BEAD73]/10',
    default: 'bg-[#BEAD73] text-[#001026] hover:bg-[#CBBD93]'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    icon: 'p-2 w-9 h-9',
    default: 'px-4 py-2 text-sm'
  };

  const v = variant ? variants[variant] || variants.default : variants.default;
  const s = size ? sizes[size] || sizes.default : sizes.default;

  const classes = `inline-flex items-center justify-center gap-2 rounded-md transition-all duration-150 ${v} ${s} ${className}`.trim();

  return (
    <button className={classes} style={style} {...rest}>
      {children}
    </button>
  );
};

export default Button;