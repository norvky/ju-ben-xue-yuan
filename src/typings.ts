// 全局要用的类型放到这里

type IResData<T> = {
  code: number
  msg: string
  data: T
  info: string
  infocode: string
  route: T
  status: string
}

// uni.uploadFile文件上传参数
type IUniUploadFileOptions = {
  file?: File
  files?: UniApp.UploadFileOptionFiles[]
  filePath?: string
  name?: string
  formData?: any
}

type IUserInfo = {
  nickName?: string
  avatar?: string
  phonenumber?: string
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
}

type ILoginInfo = {
  phonenumber: string
  verificationCode: string
  uuid: string
}

enum TestEnum {
  A = 'a',
  B = 'b',
}
