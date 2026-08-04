export type CountryRawData = {
  names: {
    common: string;
  };
  codes: {
    alpha_2: string;
  };
  capitals: {
    attributes: {
      administrative: boolean;
      constitutional: boolean;
      executive: boolean;
      judicial: boolean;
      legislative: boolean;
      primary: boolean;
    };
    coordinates: {
      lat: number;
      lng: number;
    };
    name: string;
  }[];
  flag: {
    url_svg: string;
  };
  region: string;
  population: number;
  _match: {
    path: string;
    value: string;
  }[];
  _meta: {
    lastUpdatedTimestamp: number;
  };
};
