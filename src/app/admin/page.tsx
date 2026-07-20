import SiteHeader from "@/components/navigation/SiteHeader";
import AdminEmailList from "@/features/authorization/components/AdminEmailList";
import { getAllowedGoogleEmails } from "@/features/authorization/dal/queries";
import { ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { FC } from "react";

export const dynamic = "force-dynamic";

const Page: FC = async () => {
  const result = await getAllowedGoogleEmails();

  if (!result.success) redirect(result.error.type === "unauthenticated" ? "/login" : "/");

  return <main className="min-h-screen bg-[#08090d] text-white">
    <SiteHeader active="admin" /><section className="mx-auto w-full max-w-4xl px-6 pb-20 pt-16 lg:px-10">
      <div className="flex items-center gap-3 text-[#9e85ff]">
        <ShieldCheck className="size-5" />
        <p className="text-xs font-medium uppercase tracking-[0.2em]">Adminisztráció</p>
      </div>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Google-belépések</h1>
      <p className="mt-4 max-w-xl text-base text-white/45">Itt kezelheted, mely e-mail címek használhatják a Google-belépést és a dubmastert.</p>
      <AdminEmailList initialEmails={result.data} />
    </section>
  </main>;
}

export default Page;
