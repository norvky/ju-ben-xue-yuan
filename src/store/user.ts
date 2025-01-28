import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  nickName: '',
  avatar: '',
  token: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })

    const setUserInfo = (val: IUserInfo) => {
      const { token } = val

      userInfo.value = {
        ...val,
        token: token || userInfo.value.token,
      }
    }

    const setUserToken = (val: string) => {
      userInfo.value.token = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = { ...initState }
    }
    const isLogined = computed(() => !!userInfo.value.token)

    return {
      userInfo,
      setUserInfo,
      setUserToken,
      clearUserInfo,
      isLogined,
      reset,
    }
  },
  {
    persist: true,
  },
)
