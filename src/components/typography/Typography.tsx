interface TypographyProps {
  font: {
    className?: string;
    variable?: string;
  };
  className?: string;
  children: React.ReactNode;
}

export const Typography = ({ font, className, children }: TypographyProps) => {
  return (
    <div className={`${className ?? ""} ${font.className ?? ""}`.trim()}>
      {children}
    </div>
  );
};
