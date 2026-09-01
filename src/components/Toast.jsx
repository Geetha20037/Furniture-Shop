import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  const Icon = toast.type === "error" ? AlertCircle : toast.type === "info" ? Info : CheckCircle2;
  return (
    <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#29251f] px-5 py-3 text-sm font-medium text-white shadow-2xl">
      <Icon size={18} />
      <span>{toast.message}</span>
    </div>
  );
}