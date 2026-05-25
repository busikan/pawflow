export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-[390px] h-[844px] rounded-[42px] bg-zinc-950 p-3 shadow-2xl">
        <div className="w-full h-full rounded-[34px] overflow-hidden bg-[#fffaf1] relative">
          {children}
        </div>
      </div>
    </div>
  );
}