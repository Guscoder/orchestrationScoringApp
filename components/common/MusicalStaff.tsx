const MusicalStaff = ({ isTop = true }) => (
    <svg 
      width="100%" 
      height="40" 
      viewBox="0 0 1000 40" 
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Staff lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`staff-line-${i}`}
          x1="0"
          y1={8 + i * 6}
          x2="1000"
          y2={8 + i * 6}
          stroke="#666"
          strokeWidth="1"
        />
      ))}
  
      {/* Left bar line */}
      <line x1="0" y1="8" x2="0" y2="32" stroke="#666" strokeWidth="2" />
  
      {/* Right bar line */}
      <line x1="1000" y1="8" x2="1000" y2="32" stroke="#666" strokeWidth="2" />
  
      {/* Musical symbols */}
      <>
        {/* Clef (same for top and bottom) */}
        <g transform="translate(20, 0)">
          <path
            d="M30,32c0-8,6-12,6-18s-4-8-8-8s-8,4-8,8c0,4,2,6,4,6s4-2,4-4s-2-4-4-4"
            fill="none"
            stroke="#666"
            strokeWidth="1.5"
          />
        </g>
  
        {/* Notes - quarter notes for top, half notes for bottom */}
        {[120, 200, 280, 360, 440, 520, 600, 680, 760, 840, 920].map((x, i) => (
          <g key={`note-${i}`}>
            <ellipse 
              cx={x} 
              cy={i % 3 === 0 ? 14 : i % 3 === 1 ? 20 : 26} 
              rx="4" 
              ry="3" 
              fill={isTop ? "#666" : "none"}
              stroke="#666"
              strokeWidth="1.5"
            />
            <line 
              x1={x + 4} 
              y1={i % 3 === 0 ? 14 : i % 3 === 1 ? 20 : 26} 
              x2={x + 4} 
              y2={i % 3 === 0 ? 14 : i % 3 === 1 ? 8 : 14} 
              stroke="#666" 
              strokeWidth="1.5" 
            />
          </g>
        ))}
      </>
    </svg>
  )
  
  export default MusicalStaff;