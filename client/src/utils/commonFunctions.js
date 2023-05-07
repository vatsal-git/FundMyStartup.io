export const setCookie = (name, value, expirationDays = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

export const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null; // Cookie not found
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
};

export const formatNumberWithSuffix = (num) => {
  const suffixes = ["", "k", "M", "B", "T"];
  const suffixIndex = Math.floor(("" + num).length / 3);
  const formattedNumber = parseFloat(
    (suffixIndex !== 0 ? num / Math.pow(1000, suffixIndex) : num).toFixed(2)
  );
  return formattedNumber + suffixes[suffixIndex];
};

export const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};
