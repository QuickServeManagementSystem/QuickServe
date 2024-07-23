export interface TIngredientRequest {
  productTemplateId: number;
}

export interface IngredientTypesDetail {
  id: number;
  name: string;
  price: number;
  calo: number;
  defaultQuantity: number;
  imageUrl: string;
}
export interface IngredientTypes {
  ingredientTypeId: number;
  name: string;
  quantityMin: number;
  quantityMax: number;
  ingredients: IngredientTypesDetail[];
}
export interface TemplatesIngredient {
  templateStepId: number;
  name: string;
  ingredientTypes: IngredientTypes[];
}
export type TIngredient = {
  id: number;
  name: string;
  price: number;
  templates: TemplatesIngredient[];
};

// parce

export const parceIngredientType = (data: TIngredient) => {
  const IngredientTypes = data.templates.flatMap(item =>
    item.ingredientTypes.map(i => i),
  );
  return IngredientTypes;
};
