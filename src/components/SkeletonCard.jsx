export default function SkeletonCard() {
  return <div className="animate-pulse overflow-hidden rounded-2xl border border-[#e7e1d7] bg-white">
    <div className="aspect-[4/3] bg-[#e9e3d9]"/>
    <div className="space-y-3 p-4"><div className="h-3 w-1/3 rounded bg-[#e9e3d9]"/><div className="h-5 w-3/4 rounded bg-[#e9e3d9]"/><div className="h-4 w-1/2 rounded bg-[#e9e3d9]"/></div>
  </div>;
}