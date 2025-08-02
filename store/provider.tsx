// app/redux-provider.tsx or wherever you're placing it

"use client";

import React from "react";
import { Provider } from "react-redux"; // ✅ Import as a value (component)
import { store } from "@/store"; // ✅ Works with correct tsconfig + alias

type Props = {
    children: React.ReactNode;
};

export default function ReduxProvider({ children }: Props) {
    return <Provider store={ store }> { children } </Provider>;
}
