"use client";

import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addAllowedGoogleEmailAddress, removeAllowedGoogleEmailAddress } from "@/features/authorization/dal/mutations";
import { SelectAllowedGoogleEmail } from "../types";



type FormValues = {
    email: string;
};

const AdminEmailList: FC<{ initialEmails: SelectAllowedGoogleEmail[] }> = ({ initialEmails }) => {
    const router = useRouter();
    const [isRemoving, startRemoving] = useTransition();
    const [removingEmail, setRemovingEmail] = useState<string | null>(null);
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>();

    async function handleAdd({ email }: FormValues) {
        const result = await addAllowedGoogleEmailAddress(email);

        if (!result.success) {
            toast.error(result.error.type === "already-allowed" ? "Ez az e-mail cím már engedélyezve van." : "Az e-mail cím engedélyezése sikertelen.");
            return;
        }

        reset();
        router.refresh();
        toast.success("Az e-mail cím engedélyezve.");
    }

    function handleRemove(email: string) {
        setRemovingEmail(email);
        startRemoving(async () => {
            const result = await removeAllowedGoogleEmailAddress(email);

            if (!result.success) {
                toast.error("Az e-mail cím eltávolítása sikertelen.");
            } else {
                router.refresh();
                toast.success("Az e-mail cím eltávolítva.");
            }

            setRemovingEmail(null);
        });
    }

    return (
        <div className="mt-10 space-y-5">
            <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:flex-row">
                <Input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="felhasznalo@example.com"
                    aria-label="Engedélyezendő e-mail cím"
                    className="h-11 flex-1 border-white/10 bg-white/[0.04] text-white placeholder:text-white/30"
                />
                <Button type="submit" disabled={isSubmitting} className="h-11 bg-white text-[#0b0c11] hover:bg-[#e9e4ff]">
                    {isSubmitting ? <LoaderCircle className="size-4 animate-spin" /> : <Plus className="size-4" />}
                    E-mail engedélyezése
                </Button>
            </form>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                {initialEmails.length === 0 ? (
                    <p className="p-6 text-sm text-white/45">Még nincs további engedélyezett e-mail cím.</p>
                ) : (
                    <ul className="divide-y divide-white/10">
                        {initialEmails.map(({ email, createdAt }) => (
                            <li key={email} className="flex items-center justify-between gap-4 px-5 py-4">
                                <div className="min-w-0">
                                    <p className="truncate text-sm text-white/80">{email}</p>
                                    <p className="mt-1 text-xs text-white/35">Hozzáadva: {createdAt.toLocaleString("hu-HU")}</p>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    disabled={isRemoving}
                                    onClick={() => handleRemove(email)}
                                    aria-label={`${email} eltávolítása`}
                                    className="shrink-0 text-white/45 hover:bg-[#ff9da8]/10 hover:text-[#ff9da8]"
                                >
                                    {isRemoving && removingEmail === email ? <LoaderCircle className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default AdminEmailList;