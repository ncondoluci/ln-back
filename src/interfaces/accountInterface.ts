export interface DataAPI {
  accounts: Account[];
}

export interface Account {
  id: string;
  crmid: string /* */;
  name: string /* */;
  isGeoLocal: boolean;
  haveVoucher: boolean;
  cuit: string;
  status: string;
  tags: Tag[];
  branches: Branch[] /* */;
  benefits: Benefit[] /* */;
  phone: null | string;
  email: null | string;
  web: null | string;
  highlighted: string;
  created_on: string;
  updated_on: string;
  ecommerce: boolean;
  images: Image[] /* */;
  relevance: number;
  description: string;
  virtualCard: boolean;
  socialNetworks: SocialNetworks;
}

export interface SocialNetworks {
  facebook: Facebook;
  twitter: Facebook | null;
  instagram: Facebook;
}

export interface Facebook {
  name: string;
  type: string;
  prefix: string;
  url: string;
}

export interface Benefit {
  ids: string[];
  id: string;
  program_name: string[];
  name: string;
  type: string;
  type_benefit: string /* */;
  type_weight: number;
  category: string;
  subcategory: string;
  gender: null;
  exclusive: boolean;
  alliance: null;
  title: string;
  description: string;
  legal: string;
  images: Image[];
  value: string;
  weekdays: string[];
  status: string;
  auto_renew: string;
  validity: Validity;
  crm_ids: string[];
  created_on: string;
  updated_on: string;
  transactionTypes: (string | string)[];
  urlBenefit: null;
  haveVoucher: boolean;
}

export interface Validity {
  date_from: string;
  date_to: string;
}

export interface Image {
  id: string;
  type: string;
  url: string;
  highlighted: boolean;
  thumb: boolean;
}

export interface Branch {
  id: string;
  crmid: string;
  country: string;
  state: string;
  city: string;
  cuit: string;
  neighborhood: string;
  zip_code: null | string | string;
  region: null | string | string;
  address: string;
  number: string;
  observations: null | string | string;
  location: number /* */;
  status: string;
  phone: null | null | string | string;
  virtualCard: boolean;
  created_on: string;
  updated_on: string;
}

export interface Tag {
  name: string;
  id_web: string;
  type_id: string;
  type: string;
}

export interface VMAccountTagged {
  // AccountTag
  url: string;
  name: string;
  location: number;
  type_benefit: ProgramBenefit[];
  image: Image;
}

export interface ProgramBenefit {
  // ProgramBenefit
  program_name: string;
  value: number;
}

export interface VMAccountFlaged {
  // AccountFlag
  url: string;
  name: string;
  image: string;
}

export interface AccountFilterOptions {
  tag: string;
  limitNum: number;
  offsetNum: number;
  orderAscBool: boolean;
}
