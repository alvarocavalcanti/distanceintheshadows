import React from 'react';

const OBRLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-theme-bg text-theme p-4">
      <div className="bg-theme-card rounded-lg border border-theme p-4 text-center max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-2">Connecting to Owlbear Rodeo...</h2>
        <p className="text-theme-secondary text-sm">
          Please wait while the extension initializes.
        </p>
      </div>
    </div>
  );
};

export default OBRLoading;
