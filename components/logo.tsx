import Image from "next/image"

export default function Logo() {
  return (
    <div className="relative h-12 w-48">
      <Image
        src="/images/tastytrail-logo.png"
        alt="TastyTrail Logo"
        fill
        className="object-contain"
        priority
        sizes="(max-width: 768px) 100vw, 200px"
      />
    </div>
  )
}
