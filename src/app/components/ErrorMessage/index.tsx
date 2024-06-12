

export default function ErrorMessage({
    children,
}: {
  children: React.ReactNode
}) {

 
  return (
    <div>
      <p className="text-xs text-red-500 mt-1">{children}</p>
    </div>
  )
}