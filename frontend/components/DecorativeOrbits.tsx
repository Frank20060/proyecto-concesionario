interface DecorativeOrbitsProps {
  className?: string;
  hideMedium?: boolean;
  hideSmall?: boolean;
}

export default function DecorativeOrbits({
  className = '',
  hideMedium = false,
  hideSmall = false,
}: DecorativeOrbitsProps) {
  return (
    <div aria-hidden="true" className={`decorative-orbits ${className}`}>
      <span className="decorative-orbit decorative-orbit-large" />
      {!hideMedium && <span className="decorative-orbit decorative-orbit-medium" />}
      {!hideSmall && <span className="decorative-orbit decorative-orbit-small" />}
    </div>
  );
}
