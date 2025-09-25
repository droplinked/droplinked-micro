export const appDevelopment =
  window.location.hostname === "localhost" ||
  window.location.hostname.startsWith("dev.");
export const BASE_URL = appDevelopment
  ? "https://apiv3dev.droplinked.com"
  : import.meta.env.REACT_APP_BASE_API_URL;
function getUnstoppableClientID() {
  const defaultUDClientID = import.meta.env.REACT_APP_UNSTOPPABLE_CLIENT_ID;
  const onchainUDClientID = "99d62559-1703-40f8-aa09-0b5b68fee53a";
  const location = window.location.origin;
  const domainMapping = {
    "https://www.shop.unstoppabledomains.com": import.meta.env
      .REACT_APP_UNSTOPPABLE_CLIENT_ID_SHOP_WWW,
    "https://shop.unstoppabledomains.com": import.meta.env
      .REACT_APP_UNSTOPPABLE_CLIENT_ID_SHOP,
    "https://tags.onchain.org": onchainUDClientID,
  };
  if ([undefined, null].includes(domainMapping[location]))
    return defaultUDClientID;
  return domainMapping[location];
}
export const UNSTOPPABLE_CLIENT_ID = getUnstoppableClientID();
