import React, { useEffect, useState } from 'react';

interface AnimatePresenceProps {
  children: React.ReactNode;
}

export const AnimatePresence: React.FC<AnimatePresenceProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};