import { CropperDrawSettings } from "ngx-img-cropper";
import { CompanyLogin } from "./Company";
import { User } from "./User";

export interface OAuth {
  has_companies: boolean;
  user:          User;
  companies:     CompanyLogin[];
  access_token:  string;
  token_type:    string;
  expires_in:    number;
}

export interface Ologin {
  email: string;
  password: string;
}

export interface OAccessToken {
  access_token:  string;
  token_type:    string;
  expires_in:    number;
}

export interface OForgotPassword {
  email: string;
}

export interface OImgCropper {
  title: string;
  width: number;
  height: number;
  croppedWidth: number;
  croppedHeight: number;
  uploadtype: UploadType;
}

export enum UploadType {
  logo,
  pagoQR,
  bannerApp,
  bannerWeb,
}

export interface ODialogHours {
  store_id: string;
}

export interface ODialogData {
  data: any;
  email: string;
  phone: string;
  code: string;
  token: string;
  refered: string;
}

export interface OValidateCode {
  token: string;
}

export interface OChangePassword {
  email: string;
  password: string;
}

export interface OCheckUser {
  email: string;
  phone: string;
}

