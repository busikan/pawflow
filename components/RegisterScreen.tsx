export default function RegisterScreen({
  onRegister,
}: {
  onRegister: () => void;
}) {
  return (
    <div className="h-full px-6 pt-16 bg-[#fffaf1]">
      <h1 className="text-3xl font-bold text-zinc-900">创建账号</h1>
      <p className="text-sm text-zinc-500 mt-2">
        创建你的 PawFlow 账号，开始宠物周末规划。
      </p>

      <div className="mt-10 space-y-4">
        <input
          className="w-full rounded-2xl bg-white px-4 py-4 text-sm outline-none shadow-sm"
          placeholder="用户名"
          defaultValue="Jing"
        />

        <input
          className="w-full rounded-2xl bg-white px-4 py-4 text-sm outline-none shadow-sm"
          placeholder="邮箱"
          defaultValue="cjhcgd@163.com"
        />

        <input
          className="w-full rounded-2xl bg-white px-4 py-4 text-sm outline-none shadow-sm"
          placeholder="密码"
          type="password"
          defaultValue="123456"
        />

        <button
          onClick={onRegister}
          className="w-full rounded-2xl bg-zinc-900 text-white py-4 font-semibold"
        >
          创建账号
        </button>
      </div>
    </div>
  );
}