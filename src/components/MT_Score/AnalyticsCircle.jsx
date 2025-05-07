const ColorfulCircle = () => {
  const radius = 75.6;
  const strokeWidth = 12;
  const fullCircumference = 2 * Math.PI * radius;
  const segmentLength = fullCircumference * 0.21;
  const gapLength = fullCircumference * 0.02;

  return (
    <svg width="190" height="190" viewBox="0 0 190 190">
      <circle
        cx="95"
        cy="95"
        r={radius}
        fill="none"
        stroke="#49D7F2"
        strokeWidth={strokeWidth}
        strokeDasharray={`${segmentLength} ${
          fullCircumference - segmentLength
        }`}
        strokeLinecap="round"
        transform="rotate(-90 95 95)"
      />
      <circle
        cx="95"
        cy="95"
        r={radius}
        fill="none"
        stroke="#FF5D5D"
        strokeWidth={strokeWidth}
        strokeDasharray={`${segmentLength} ${
          fullCircumference - segmentLength
        }`}
        strokeLinecap="round"
        transform="rotate(0 95 95)"
      />
      <circle
        cx="95"
        cy="95"
        r={radius}
        fill="none"
        stroke="#AD826E"
        strokeWidth={strokeWidth}
        strokeDasharray={`${segmentLength} ${
          fullCircumference - segmentLength
        }`}
        strokeLinecap="round"
        transform="rotate(90 95 95)"
      />
      <circle
        cx="95"
        cy="95"
        r={radius}
        fill="none"
        stroke="#868EAF"
        strokeWidth={strokeWidth}
        strokeDasharray={`${segmentLength} ${
          fullCircumference - segmentLength
        }`}
        strokeLinecap="round"
        transform="rotate(180 95 95)"
      />

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize="2.5rem"
        fontFamily="Noto Sans"
        fontWeight="400"
        fill="var(--color-black, #000)"
        style={{
          fontFeatureSettings: "'clig' 0, 'liga' 0",
          lineHeight: "normal",
        }}
      >
        45%
      </text>
    </svg>
  );
};

export default ColorfulCircle;
