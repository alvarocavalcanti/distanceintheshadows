import React from "react";

const SceneNotReady: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-theme-bg text-theme p-4">
      <div className="bg-theme-card rounded-lg border border-theme p-4 text-center max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-2">No Active Scene</h2>
        <p className="text-theme-secondary text-sm">
          Please open or load a Scene in Owlbear Rodeo to use this extension.
        </p>
      </div>
    </div>
  );
};

export default SceneNotReady;
