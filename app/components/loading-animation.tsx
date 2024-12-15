export function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center space-x-2 animate-pulse">
      <div className="w-3 h-3 bg-secondary rounded-full"></div>
      <div className="w-3 h-3 bg-secondary rounded-full animation-delay-200"></div>
      <div className="w-3 h-3 bg-secondary rounded-full animation-delay-400"></div>
    </div>
  )
}
