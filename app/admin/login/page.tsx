export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="admin-login">
      <form method="POST" action="/api/admin/login" className="admin-login-form">
        <h1>Panel de administración</h1>
        {error && <p className="form-error">Contraseña incorrecta.</p>}
        <div className="field field-full">
          <label className="label" htmlFor="password">Contraseña</label>
          <input className="input" type="password" id="password" name="password" required />
        </div>
        <button className="button" type="submit">Entrar</button>
      </form>
    </main>
  );
}
