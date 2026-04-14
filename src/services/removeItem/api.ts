import { axiosInstance } from '/@/services/network'

export async function removeItem_API(ids: number[], url: string): Promise<[null, boolean] | [Error, null]> {
  try {
    await axiosInstance.delete(url, {
      data: {
        ids,
      },
    })

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, null]
  }
}
export async function removePhoneItem_API(phones: string[], url: string): Promise<[null, boolean] | [Error, null]> {
  try {
    await axiosInstance.delete(url, {
      data: {
        phones,
      },
    })

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, null]
  }
}
