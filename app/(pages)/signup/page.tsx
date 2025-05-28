import Link from "next/link";
import Image from "next/image";
import SignUpForm from "./(components)/SignUpForm";

export default function Home() {

  return (
    <section className="min-h-screen h-full w-full flex">
      {/* Lado izquierdo */}
      <div className={`w-1/2 h-full bg-[url("/login.avif")] bg-cover`}/>

      {/* Lado derecho */}
      <div className="h-full w-1/2 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex flex-col space-y-4 items-center">
        <Image src={"/logo.png"} width={50} height={50} alt="logo-budkit" />
        <h1 className="text-5xl">BUDKIT</h1>
      {/* Formulario del login */}
      </div>
        <SignUpForm />
        <Link href={"/"}>¿Ya tienes cuenta? Acceder aquí</Link>
      </div>
    </section>
  );
}
