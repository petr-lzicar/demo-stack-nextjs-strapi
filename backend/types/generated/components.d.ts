import type { Schema, Struct } from '@strapi/strapi';

export interface ObecneMojeKomponenta extends Struct.ComponentSchema {
  collectionName: 'components_obecne_moje_komponentas';
  info: {
    displayName: 'moje komponenta';
    icon: 'envelop';
  };
  attributes: {
    Email: Schema.Attribute.Email & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'obecne.moje-komponenta': ObecneMojeKomponenta;
    }
  }
}
