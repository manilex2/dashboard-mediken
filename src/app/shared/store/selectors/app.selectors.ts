import { createFeatureSelector } from "@ngrx/store";
import { Appstate } from "../AppState";

export const selectAppState = createFeatureSelector<Appstate>('appState');
