export type TAttr = {
  id?: number;
  Phone: {
    phone: string;
    isSecret: boolean;
    PhoneTypes: { name: { [key: string]: string } };
  }[];

  ProductServices: {
    ProductServiceSubCategory: { name: { [key: string]: string } };
  }[];
};
export type TPhone = {
  phone: string;
  isSecret: boolean;
  phoneType: string;
};

export type TSelectedData = {
  id: number | string;
  name: string;
  street: { name: { [key: string]: string } };
  legalName: string;
  index: string;
  Phone: { phone: string }[];
  mainorganization: { name: string };
  mail: string;
  PaymentTypes: { Cash: boolean; Terminal: boolean; Transfer: boolean }[];
  workTime: {
    dayoffs: string[];
    worktimeFrom: string;
    workTimeDescription: string;
    allDayDescription: string;
    worktimeTo: string;
    allDay: boolean;
    noDayoffs: boolean;
    withoutLunch: boolean;
    lunchFrom: string;
    lunchTo: string;
  };
  Nearbees: { Nearby: { name: { [key: string]: string } } }[];
  transport: {
    metroStation: string;
    bus: string;
    microBus: string;
  };
};
