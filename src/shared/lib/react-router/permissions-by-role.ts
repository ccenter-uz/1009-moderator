export const enum ACCESSESS {
  GET = "get",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  RESTORE = "restore",
}

export const adminPermissionsByRole = {
  access_token: "",
  role: "admin",
  permissions_pathname: {
    dashboard: {
      main: {
        [ACCESSESS.GET]: true,
      },
    },
    statistics: {
      main: {
        [ACCESSESS.GET]: true,
      },
    },
    orgs: {
      all: {
        [ACCESSESS.GET]: true,
      },
    },
    monitoring: {
      user: {
        [ACCESSESS.GET]: true,
      },
      organization: {
        [ACCESSESS.GET]: true,
      },
      transactions: {
        [ACCESSESS.GET]: true,
      },
    },
    additional: {
      main: {
        [ACCESSESS.GET]: true,
      },
    },
    manage: {
      users: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      roles: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
    },
  },
};

export const operatorPermissionsByRole = {
  access_token: "",
  role: "operator",
  permissions_pathname: {
    dashboard: {
      main: {
        [ACCESSESS.GET]: true,
      },
    },
    statistics: {
      main: {
        [ACCESSESS.GET]: true,
      },
    },
    orgs: {
      all: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
      },
      add: {
        [ACCESSESS.CREATE]: true,
      },
    },
    monitoring: {
      user: {
        [ACCESSESS.GET]: true,
      },
      organization: {
        [ACCESSESS.GET]: true,
      },
      transactions: {
        [ACCESSESS.GET]: true,
      },
    },
    additional: {
      main: {
        [ACCESSESS.GET]: true,
      },
    },
  },
};

export const moderatorPermissionsByRole = {
  access_token: "",
  role: "moderator",
  permissions_pathname: {
    dashboard: {
      main: {
        [ACCESSESS.GET]: true,
      },
    },
    statistics: {
      main: {
        [ACCESSESS.GET]: true,
      },
    },
    orgs: {
      all: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
      },
      add: {
        [ACCESSESS.CREATE]: true,
      },
      edit: {
        [ACCESSESS.UPDATE]: true,
      },
      unconfirmed: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.UPDATE]: true,
      },
    },
    monitoring: {
      user: {
        [ACCESSESS.GET]: true,
      },
      organization: {
        [ACCESSESS.GET]: true,
      },
      transactions: {
        [ACCESSESS.GET]: true,
      },
    },
    additional: {
      main: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
      },
    },
    manage: {
      segments: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      "product-services": {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      category: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      "main-org": {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      "phone-types": {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      "nearby-category": {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      nearby: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      street: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      area: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      lane: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      "residential-area": {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      impasse: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      avenue: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      passage: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      district: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
      village: {
        [ACCESSESS.GET]: true,
        [ACCESSESS.CREATE]: true,
        [ACCESSESS.UPDATE]: true,
        [ACCESSESS.DELETE]: true,
        [ACCESSESS.RESTORE]: true,
      },
    },
  },
};
