export const openInstagram = () => {
  const instagramURL = import.meta.env.VITE_INSTAGRAM_URL;
  window.open(instagramURL, '_blank', 'noopener,noreferrer');
};
