// O template é recriado a cada navegação, então a animação de entrada roda em toda troca de página.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="entrada-pagina">{children}</div>;
}
