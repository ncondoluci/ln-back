import { Account } from "../interfaces/accountInterface.js";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

export const createMockAccount = (
  overrides: DeepPartial<Account> = {}
): Account =>
  ({
    id: "mock-id",
    crmid: "mock-crmid",
    name: "mock-name",
    isGeoLocal: false,
    haveVoucher: false,
    cuit: "00-00000000-0",
    status: "active",
    tags: [],
    branches: [],
    benefits: [],
    phone: null,
    email: null,
    web: null,
    highlighted: "",
    created_on: "",
    updated_on: "",
    ecommerce: false,
    images: [],
    relevance: 0,
    description: "",
    virtualCard: false,
    socialNetworks: {
      facebook: { name: "", type: "", prefix: "", url: "" },
      twitter: null,
      instagram: { name: "", type: "", prefix: "", url: "" },
    },
    ...overrides,
  } as Account);
