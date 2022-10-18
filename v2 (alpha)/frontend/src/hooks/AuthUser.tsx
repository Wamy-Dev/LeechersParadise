import {useEffect, useState } from "react";
import {auth, fireAuth } from "../config/firebase.config";

export function useAuthUser(): user | null {
    const [currentUser, setCurrentUser] = useState(null);

    function handleStatusChange(user) {
        setCurrentUser(user);
    }

    useEffect(() => {
        fireAuth.onAuthStateChanged((user) => {
            user?.getIdToken().then((token) => {
                auth.token = token
            })
            auth.currentUser = user
            handleStatusChange(user)
        })
    });

    return currentUser;
}

export interface user {
    email: string
}