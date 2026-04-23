import { useState, useEffect } from 'react';

/**
 * Hook to detect if the device uses ARM-based chips by checking WebGL renderer
 * @returns {boolean} true if likely ARM-based device
 */
export const useIsARM = () => {
  const [isARM, setIsARM] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo 
          ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) 
          : gl.getParameter(gl.RENDERER);
        
        // Check for common ARM GPU identifiers
        if (renderer && (
          renderer.includes('Apple') || 
          renderer.includes('ARM') || 
          renderer.includes('Mali') || 
          renderer.includes('Adreno') ||
          renderer.includes('PowerVR')
        )) {
          setIsARM(true);
        }
      }
    } catch (error) {
      // Fallback: check user agent for mobile devices (most are ARM)
      const ua = navigator.userAgent;
      if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone') || ua.includes('iPad')) {
        setIsARM(true);
      }
    }
  }, []);

  return isARM;
};

export default useIsARM;