import { AxiosInstance } from 'axios';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function uploadMetadata(
  metadata: any,
  skuID: string,
  axiosInstance: AxiosInstance
) {
  if (typeof metadata == typeof {} || typeof metadata == typeof []) {
    metadata = JSON.stringify(metadata);
  }
  const res = (
    await axiosInstance.patch(`sku/metadata/${skuID}`, {
      metadata: metadata,
    })
  ).data;
  return res.data;
}
