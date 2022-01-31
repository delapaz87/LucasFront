export interface CompanyLogin {
  cia_id:       string;
  company_name: string;
  icon:         string;
  status:       number;
}

export class Parameter {
  constructor(
    id:         number,
    type:       string,
    name:       string,
    value:      string,
    role:       string,
    status:     number,
    created_at: Date,
    updated_at: Date,
  ){
  }
}

export class Company {
  constructor(
    cia_id: string = '',
    name: string = '',
    legal_name: string = '',
    legal_document: string = '',
    legal_number: string = '',
    description: string = '',
    website: string = '',
    logo: string = '',
    company_type: string = '',
    payment_accepted: string = '',
    qr_account: string = '',
    qr_wallet: string = '',
    qr_owner: string = '',
    qr_phone: string = '',
    activate_webstore: boolean = false,
    web_template: number = 3,
    web_dir: string = '',
    web_url: string = '',
    banner_web: string = '',
    banner_app: string = '',
    activate_stock: boolean = false,
    visible_zero_stock: boolean = false,
    activate_delivery: boolean = false,
    activate_moturider: boolean = false,
    ranking_service: number = 0.00,
    ranking_delivery: number = 0.00,
    ranking_avg: number = 0.00,
    order_max: number = 0,
    salesman_code: string = '',
    observations: string = '',
    admin_name: string = '',
    admin_phone: string = '',
    admin_email: string = '',
    sac_email: string = '',
    sac_phone: string = '',
    reg_completed: number = 0,
    covid_permission: boolean = false,
    is_working: boolean = false,
    version_android: string = '',
    version_ios: string = '',
    security: boolean = true,
    subscription: boolean = true,
    status: boolean = true,
    company_delivery: TarifaDelivery = {}
  ){}
}

export class TarifaDelivery {
  constructor(
    cia_id: string = '',
    auto_delivery: boolean = false,
    delivery_way: string = '0',
    delivery_map: number = 0,
    delivery_min: number = 0.00,
    rate_type: number = 0.00,
    rate_fix: number = 0.00 ,
    rate_ruler_km: number = 0.00,
    rate_var_km: number = 0.00,
    rate_ruler_value: number = 0.00,
    rate_var_value: number = 0.00,
    rate_outcity_do: boolean = false,
    rate_outcity_text: string = '',
    delivery_avg: number = 0.00,
    preparation_avg: number = 0.00,
  ){}
}

export interface Store {
  id:             number;
  cia_id:         string;
  title:          string;
  legal_name:     string;
  legal_number:   string;
  phone:          string;
  street_name:    string;
  street_number:  string;
  reference:      string;
  district:       string;
  province:       string;
  city:           string;
  country:        string;
  ubigeo:         string;
  latitude:       string;
  longitude:      string;
  cover:          string;
  store_id_motu:  string;
  store_id_ext:   string;
  license_id:     string;
  license_status: number;
  status:         number;
  coverage:       Coverage[];
  created_at:     Date;
  updated_at:     Date;
}

export interface Coverage {
  id:         number;
  cia_id:     string;
  store_id:   number;
  territory:  string;
  latitude:   string;
  longitude:  string;
  priority:   number;
  status:     number;
  created_at: Date;
  updated_at: Date;
}

export class Tag {
  id: number;
  title: string;
  image_list: string;
  image_zoom: string;
  position:   number;
  visible:    number;
  status:     number;

  constructor(
    id:         number = 0,
    title:      string = '',
    image_list: string = '',
    image_zoom: string = '',
    position:   number = 0,
    visible:    number = 0,
    status:     number = 0,
  ) {
    this.id = id;
    this.title = title;
    this.image_list = image_list;
    this.image_zoom = image_zoom;
    this.position = position;
    this.visible = visible;
    this.status = status;
  }
}

export interface UserCompany {
  id:         number;
  first_name: string;
  last_name:  string;
  email:      string;
  phone:      string;
  role:       string;
}

export interface PaymentAccept {
  id:         number;
  type:       string;
  name:       string;
  value:      string;
  role:       string;
  status:     number;
  created_at: Date;
  updated_at: Date;
}

export class CompanyInscription {
 constructor(
  id:             number,
  userID:         number,
  userName:       string,
  userPass:       null,
  company:        string,
  clientName:     string,
  clientLastname: string,
  clientPhone:    string,
  status:         number,
  createdAt:      Date,
  updatedAt:      Date,
 ) {}
}
