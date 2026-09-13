interface DecorativeOrbitsProps {
  className?: string;
  hideMedium?: boolean;
}

export default function DecorativeOrbits({
  className = '',
  hideMedium = false,
}: DecorativeOrbitsProps) {
  return (
    <div aria-hidden="true" className={`decorative-orbits ${className}`}>
      <span className="decorative-orbit decorative-orbit-large" />
      {!hideMedium && <span className="decorative-orbit decorative-orbit-medium" />}
    </div>
  );
}
