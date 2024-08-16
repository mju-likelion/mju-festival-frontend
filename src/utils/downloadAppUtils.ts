export const downloadAppByDevice = () => {
  const mobileType = navigator.userAgent.toLowerCase();
  if (
    mobileType.includes('mac') ||
    mobileType.includes('iphone') ||
    mobileType.includes('ipad')
  )
    return window.open(import.meta.env.VITE_IOS_DOWNLOAD_URL, '_blank');
  if (mobileType.includes('android')) {
    return window.open(import.meta.env.VITE_ANDROID_DOWNLOAD_URL, '_blank');
  }
  alert("해당 기기의 마켓에서 '티켓프렌즈'를 검색해주세요");
};
