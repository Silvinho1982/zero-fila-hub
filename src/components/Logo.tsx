import logo from "@/assets/logo-fila-zero.png";

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-20 w-20" : "h-14 w-14";
  const title = size === "lg" ? "text-2xl" : "text-xl";

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={logo}
        alt="Logotipo Fila Zero UBS"
        width={816}
        height={816}
        className={`${box} object-contain`}
      />
      <div className="text-center leading-none">
        <p className={`${title} font-extrabold tracking-tight text-primary`}>FILA ZERO</p>
        <p className="text-xs font-semibold tracking-[0.35em] text-muted-foreground">UBS</p>
      </div>
    </div>
  );
}
