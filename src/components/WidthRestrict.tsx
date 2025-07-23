export default function WidthRestrict({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      {children}
    </div>
  );
}
