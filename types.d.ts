export type User = {
  ID: number
  hoVaTen: string
  tuoi: number
  canCuoc: string
  lienHe: LienHe
  nguoiPhuThuoc: string[]
}

export type LienHe = {
  dienThoai: string
  email: string
  diaChi: string
}
