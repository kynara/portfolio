import React from 'react';

interface FaceOpenProps {
  onMouthClick: () => void;
}

const FaceOpen: React.FC<FaceOpenProps> = ({ onMouthClick }) => (
  <svg
    viewBox="0 0 400 440"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
    aria-label="Face with open mouth — click the mouth!"
  >
    {/* Hair (back layer) */}
    <ellipse cx="200" cy="110" rx="154" ry="126" fill="#2C1810" />

    {/* Ears */}
    <ellipse cx="43" cy="230" rx="22" ry="30" fill="#FFCBA4" />
    <ellipse cx="357" cy="230" rx="22" ry="30" fill="#FFCBA4" />
    <ellipse cx="43" cy="230" rx="13" ry="20" fill="#E8A882" />
    <ellipse cx="357" cy="230" rx="13" ry="20" fill="#E8A882" />

    {/* Face */}
    <ellipse cx="200" cy="238" rx="150" ry="172" fill="#FFCBA4" />

    {/* Hair side strands */}
    <rect x="49" y="98" width="36" height="118" rx="18" fill="#2C1810" />
    <rect x="315" y="98" width="36" height="118" rx="18" fill="#2C1810" />

    {/* Freckles */}
    <circle cx="112" cy="252" r="4" fill="#E8A882" opacity="0.8" />
    <circle cx="128" cy="262" r="4" fill="#E8A882" opacity="0.8" />
    <circle cx="120" cy="270" r="3" fill="#E8A882" opacity="0.8" />
    <circle cx="288" cy="252" r="4" fill="#E8A882" opacity="0.8" />
    <circle cx="272" cy="262" r="4" fill="#E8A882" opacity="0.8" />
    <circle cx="280" cy="270" r="3" fill="#E8A882" opacity="0.8" />

    {/* Blush */}
    <ellipse cx="92" cy="280" rx="32" ry="18" fill="#FFB0C8" opacity="0.6" />
    <ellipse cx="308" cy="280" rx="32" ry="18" fill="#FFB0C8" opacity="0.6" />

    {/* Eye whites */}
    <ellipse cx="138" cy="197" rx="27" ry="29" fill="white" />
    <ellipse cx="262" cy="197" rx="27" ry="29" fill="white" />

    {/* Pupils */}
    <circle cx="141" cy="200" r="18" fill="#1A0A00" />
    <circle cx="265" cy="200" r="18" fill="#1A0A00" />

    {/* Iris shine */}
    <circle cx="149" cy="192" r="7" fill="white" />
    <circle cx="273" cy="192" r="7" fill="white" />
    <circle cx="135" cy="205" r="3" fill="white" opacity="0.5" />
    <circle cx="259" cy="205" r="3" fill="white" opacity="0.5" />

    {/* Eyebrows — raised in surprise */}
    <path
      d="M 106 162 Q 138 146 168 157"
      stroke="#2C1810"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 232 157 Q 262 146 294 162"
      stroke="#2C1810"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />

    {/* Nose */}
    <path d="M 200 246 L 186 270 Q 200 278 214 270 Z" fill="#E8A882" />

    {/* ── OPEN MOUTH ── */}
    {/* Dark cavity */}
    <ellipse cx="200" cy="333" rx="58" ry="50" fill="#5E0000" />

    {/* Upper lip & gum */}
    <path
      d="M 142 315 Q 167 302 200 310 Q 233 302 258 315 Q 236 332 200 338 Q 164 332 142 315Z"
      fill="#CC4455"
    />

    {/* Upper teeth */}
    <rect x="154" y="315" width="92" height="22" rx="7" fill="white" />
    {/* Tooth dividers */}
    <line x1="185" y1="315" x2="185" y2="337" stroke="#E8D8D8" strokeWidth="2" />
    <line x1="215" y1="315" x2="215" y2="337" stroke="#E8D8D8" strokeWidth="2" />

    {/* Tongue */}
    <ellipse cx="200" cy="366" rx="36" ry="22" fill="#FF6B8A" />
    <path d="M 170 355 Q 200 380 230 355" fill="#E85575" />

    {/* Lower lip */}
    <path
      d="M 142 315 Q 164 360 200 367 Q 236 360 258 315 Q 236 344 200 350 Q 164 344 142 315Z"
      fill="#DD5566"
    />

    {/* Clickable mouth overlay */}
    <ellipse
      cx="200"
      cy="338"
      rx="64"
      ry="58"
      fill="transparent"
      onClick={onMouthClick}
      style={{ cursor: 'pointer' }}
      role="button"
      aria-label="Click to close mouth"
    />
  </svg>
);

export default FaceOpen;

