import { useEffect, useState } from 'react';

const hasARMRenderer = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return false;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);

    return /apple|arm|mali|adreno|powervr/i.test(renderer || '');
  } catch {
    return false;
  }
};

/** Returns true when the Beams animation should be hidden on this device. */
export const useShouldHideBeams = () => {
  const [shouldHide, setShouldHide] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent || '';
    const platform = navigator.userAgentData?.platform || navigator.platform || '';
    const isMacOS = /mac/i.test(platform) || /Macintosh|Mac OS X/i.test(userAgent);
    const isIPhoneOrIPad = /iPhone|iPad|iPod/i.test(userAgent);
    const isAndroidPhone = /Android/i.test(userAgent) && /Mobile/i.test(userAgent);

    if (isMacOS || isIPhoneOrIPad || isAndroidPhone || hasARMRenderer()) {
      setShouldHide(true);
      return;
    }

    const userAgentData = navigator.userAgentData;
    if (userAgentData?.getHighEntropyValues) {
      userAgentData.getHighEntropyValues(['architecture'])
        .then(({ architecture }) => {
          setShouldHide(/arm/i.test(architecture || ''));
        })
        .catch(() => setShouldHide(false));
      return;
    }

    setShouldHide(false);
  }, []);

  return shouldHide;
};

export default useShouldHideBeams;