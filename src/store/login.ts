import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  phonenumber: '',
  verificationCode: '',
  uuid: '',
}

export const useLoginStore = defineStore(
  'login',
  () => {
    const loginInfo = ref<ILoginInfo>({ ...initState })

    const setLoginInfo = (val: ILoginInfo) => {
      loginInfo.value = val
    }

    const clearLoginInfo = () => {
      loginInfo.value = { ...initState }
    }

    return {
      loginInfo,
      setLoginInfo,
      clearLoginInfo,
    }
  },
  {
    persist: true,
  },
)
