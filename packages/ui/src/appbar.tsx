"use client";
import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

export function Appbar() {
    const s = useSession();
    //   const r = useRouter();

    return (
        <>
            <div className="flex flex-row justify-between border-solid border-slate-200 border-b-2">
                                 <div className="flex flex-row h-full items-center">
                <div className="text-lg font-bold p-3 mt-4  ">Paytm</div></div>

                {s.status !== "authenticated" ? (
                    <div className="flex flex-row h-full items-center">
                    <button
                        className="px-3 py-2 m-4 h-fit rounded-lg hover:bg-slate-200 hover:text-black bg-slate-600 text-white font-semibold hover:shadow-xl"
                        onClick={() => {
                            signIn();
                        }}
                    >
                        Sign in
                    </button></div>
                ) : (
                    <div className="flex flex-row h-full items-center">
                        <button
                            className="px-3 py-2 m-4 h-fit rounded-lg hover:bg-slate-200 hover:text-black bg-slate-600 text-white font-semibold hover:shadow-xl"
                            onClick={() => {
                                signOut();
                            }}
                        >
                            Logout
                        </button></div>
                )}
            </div>
            {/* <div>{JSON.stringify(s)}</div> */}
        </>
    );
}
