import React from "react";
import NextLink from "next/link";
import style from "./styles/Navbar.module.css";
import { useCurrentUserQuery } from "../generated/graphql";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const [{ data, fetching }] = useCurrentUserQuery();

    let sideLinks = null;

    if (data?.currentUser && !fetching) {
        sideLinks = (
            <>
                <p>{data.currentUser.username}</p>
                <NextLink href="/login">
                    <p className={style.paddedText}>Login</p>
                </NextLink>
                <NextLink href="register">
                    <p className={style.paddedText}>Register</p>
                </NextLink>
            </>
        );
    } else if (!data?.currentUser && !fetching) {
        sideLinks = (
            <>
                <NextLink href="/login">
                    <p className={style.paddedText}>Login</p>
                </NextLink>
                <NextLink href="register">
                    <p className={style.paddedText}>Register</p>
                </NextLink>
            </>
        );
    }

    return (
        <>
            <div className={style.navbar}>
                <h2>Notes</h2>
                <div className={style.rightAligned}>{sideLinks}</div>
            </div>
            <hr className={style.dividor} />
        </>
    );
};
