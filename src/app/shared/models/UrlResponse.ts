export interface UrlResponse<T> {
  statusCode:    number,
  statusMessage: string,
  result:        T,
  isSucess:      boolean;
  id:            number;
  size:          number;
  date:          Date;
  error:         string;
}



