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
  quantity?: number;
}
export interface IngredientTypes {
  ingredientTypeId: number;
  name: string;
  quantityMin: number;
  quantityMax: number;
  ingredients: IngredientTypesDetail[];
  outerName?: string;
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

export interface Ingredient {
  id: number;
  name: string;
  price: number;
  img: string;
  max: number;
  isSold: boolean;
  remainingQuantity: number;
}

export interface Step {
  id: number;
  step_name: string;
  min: number;
  max: number;
  ingredient: Ingredient[];
}

// parce

export const transformData = (data: any): Step[] => {
  return data.templates.map((templateStep: any, index: number) => {
    const ingredientType = templateStep.ingredientTypes[0];
    return {
      id: index + 1,
      step_name: templateStep.name,
      min: ingredientType.quantityMin,
      max: ingredientType.quantityMax,
      ingredient: ingredientType.ingredients.map((ingredient: any) => ({
        id: ingredient.id,
        name: ingredient.name,
        price: ingredient.price,
        img: ingredient.imageUrl,
        max: ingredient.quantityMax,
        isSold: ingredient.isSold,
        remainingQuantity: ingredient.remainingQuantity,
      })),
    };
  });
};

export const parceIngredientType = (data: TIngredient) => {
  const ingredientTypesWithOuterName = data.templates.flatMap(template =>
    template.ingredientTypes.map(ingredientType => ({
      ...ingredientType,
      outerName: template.name,
    })),
  );
  return ingredientTypesWithOuterName;
};
