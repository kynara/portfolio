import React from 'react';

const FaceClosed: React.FC = () => (
  <svg
    viewBox="0 0 400 440"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
    aria-label="Face with happy closed smile"
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

    {/* Blush — bigger/brighter when smiling */}
    <ellipse cx="88" cy="278" rx="36" ry="21" fill="#FFB0C8" opacity="0.75" />
    <ellipse cx="312" cy="278" rx="36" ry="21" fill="#FFB0C8" opacity="0.75" />

    {/* Eye whites — slightly squinted/happy */}
    <ellipse cx="138" cy="197" rx="27" ry="25" fill="white" />
    <ellipse cx="262" cy="197" rx="27" ry="25" fill="white" />

    {/* Pupils */}
    <circle cx="141" cy="200" r="17" fill="#1A0A00" />
    <circle cx="265" cy="200" r="17" fill="#1A0A00" />

    {/* Iris shine */}
    <circle cx="149" cy="192" r="7" fill="white" />
    <circle cx="273" cy="192" r="7" fill="white" />

    {/* Happy squint line under eyes */}
    <path
      d="M 111 214 Q 138 224 165 214"
      stroke="#E8A882"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 235 214 Q 262 224 289 214"
      stroke="#E8A882"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />

    {/* Eyebrows — relaxed/happy */}
    <path
      d="M 108 168 Q 138 158 168 164"
      stroke="#2C1810"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 232 164 Q 262 158 292 168"
      stroke="#2C1810"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />

    {/* Nose */}
    <path d="M 200 246 L 186 270 Q 200 278 214 270 Z" fill="#E8A882" />

    {/* ── CLOSED SMILE ── */}
    {/* Filled smile shape */}
    <path
      d="M 143 315 Q 200 368 257 315 Q 200 355 143 315Z"
      fill="#CC4455"
    />
    {/* Top smile line */}
    <path
      d="M 143 315 Q 200 368 257 315"
      stroke="#AA2233"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
    {/* Cute dimples */}
    <circle cx="132" cy="320" r="8" fill="#E8A882" opacity="0.5" />
    <circle cx="268" cy="320" r="8" fill="#E8A882" opacity="0.5" />
  </svg>
);

export default FaceClosed;

