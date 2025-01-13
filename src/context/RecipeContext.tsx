import axios from "axios";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export interface Recipe {
    _id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    createdBy: string;
    createdAt: string;
}

interface RecipeContextData {
    recipes: Recipe[];
    createRecipe: (recipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>) => Promise<void>;
    fetchRecipes: () => Promise<void>;
    fetchRecipeDetail: (id: string) => Promise<Recipe | undefined>
}

export const RecipeContext = createContext<RecipeContextData>({} as RecipeContextData);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { token } = useContext(AuthContext)

    const createRecipe = async (recipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>) => {
        try {
            const res = await axios({
                method: "POST",
                url: "http://192.168.29.229:3000/api/recipe/create",
                data: recipe,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                fetchRecipes()
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const fetchRecipes = async (): Promise<void> => {
        try {
            const res = await axios.get("http://192.168.29.229:3000/api/recipe/getlist", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                setRecipes(res.data.recipes);
            } else {
                console.error("Unexpected response format:", res.data);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const fetchRecipeDetail = async (id: string): Promise<Recipe | undefined> => {
        try {
            const res = await axios.get(`http://192.168.29.229:3000/api/recipe/getDetail/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (res.status === 200) {
                return res.data; // Return the recipe data
            } else {
                console.error("Unexpected response format:", res.data);
                return undefined; // Handle non-200 responses
            }
        } catch (error) {
            console.error("Error fetching recipe details:", error);
            return undefined; // Return undefined in case of an error
        }
    };
    


    return (
        <RecipeContext.Provider value={{ createRecipe, fetchRecipes, recipes, fetchRecipeDetail }}>
            {children}
        </RecipeContext.Provider>
    );
};
