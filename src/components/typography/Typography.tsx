interface TypographyProps {
  font: {
    className?: string;
    variable?: string;
  };
  children: React.ReactNode;
}

export const Typography = ({ font, children }: TypographyProps) => {
  return <div className={font.className}>{children}</div>;
};
