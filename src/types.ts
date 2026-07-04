export type ProductType =
  | 'woven-labels'
  | 'printed-labels'
  | 'hang-tags'
  | 'barcode-stickers'
  | 'packaging-boxes'
  | 'insert-cards'
  | 'satin-labels'
  | 'offset-printing'
  | 'custom-branding'
  | 'flyers'
  | 'printed-bags';

export interface CatalogItem {
  id: string;
  type: ProductType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  specs: {
    label: string;
    value: string;
  }[];
  features: string[];
}

export interface CustomDesign {
  productType: ProductType;
  brandName: string;
  tagline: string;
  fontStyle: 'serif' | 'sans' | 'display' | 'mono';
  textColor: string;
  bgColor: string;
  finishType: string;
  widthMm: number;
  heightMm: number;
  quantity: number;
}

export interface EstimateResult {
  basePricePerUnit: number;
  totalPrice: number;
  setupFee: number;
  productionDays: number;
  materialCost: number;
}

export interface WordPressConfig {
  siteUrl: string;
  username: string;
  appPassword: string;
  postType: 'post' | 'page' | 'product';
  status: 'publish' | 'draft';
}

