import axios from "axios";

const API_KEY = "36fface60233412d811f4f5631bf11b0"; // Replace with your actual API key
const BASE_URL = "https://api.spoonacular.com/recipes";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export interface SearchParams {
  query?: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  type?: string;
  maxReadyTime?: number;
}

export const searchRecipes = async (params: SearchParams) => {
  const response = await api.get("/complexSearch", {
    params: {
      ...params,
      addRecipeInformation: true,
      number: 12,
    },
  });
  return response.data;
};

export const getRecipeById = async (id: number) => {
  const response = await api.get(`/${id}/information`);
  return response.data;
};

export const getRandomRecipes = async (number: number = 10) => {
  const response = await api.get("/random", {
    params: {
      number,
    },
  });
  return response.data;
};

export const getRecipeInstructions = async (id: number) => {
  const response = await api.get(`/${id}/analyzedInstructions`);
  return response.data;
};

export const getSimilarRecipes = async (id: number) => {
  const response = await api.get(`/${id}/similar`);
  return response.data;
};

export const getRecipeNutrition = async (id: number) => {
  const response = await api.get(`/${id}/nutritionWidget.json`);
  return response.data;
};
