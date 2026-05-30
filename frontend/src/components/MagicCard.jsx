import React from 'react';

export function MagicCard({ children, gradientColor = '#D9D9D955', style, className }) {
  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(180deg, ${gradientColor} 0%, rgba(255,255,255,0.8) 100%)`,
        borderRadius: '28px',
        border: '1px solid rgba(148, 163, 184, 0.16)',
        boxShadow: '0 24px 80px rgba(15, 23, 42, 0.08)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        padding: '2rem',
        width: '100%',
        maxWidth: '420px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
