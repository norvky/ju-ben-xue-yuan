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
    const formKey = ref('')

    const setLoginInfo = (val: ILoginInfo) => {
      loginInfo.value = val
    }

    const setFormKey = (key: string) => {
      formKey.value = key
    }

    const clearLoginInfo = () => {
      loginInfo.value = { ...initState }
      formKey.value = ''
    }

    return {
      loginInfo,
      formKey,
      setLoginInfo,
      clearLoginInfo,
      setFormKey,
    }
  },
  {
    persist: true,
  },
)
