import Link from "next/link";

export default function NaoEncontrado() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-7xl font-extrabold texto-ouro">404</p>
      <p className="mt-4 text-muted">Essa página voou para longe.</p>
      <Link href="/" className="mt-8 inline-block rounded bg-gold px-5 py-2.5 text-sm font-bold text-black">
        Voltar para o início
      </Link>
    </div>
  );
}
