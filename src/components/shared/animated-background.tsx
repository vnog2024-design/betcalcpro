'use client'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 grain-texture opacity-[0.03] dark:opacity-[0.04]" />

      {/* Floating gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,255,136,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(0,255,136,0.06)_0%,transparent_70%)] animate-float-orb-1" />
      <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.07)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(0,212,255,0.05)_0%,transparent_70%)] animate-float-orb-2" />
      <div className="absolute bottom-[-10%] left-[20%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(0,255,136,0.04)_0%,transparent_70%)] animate-float-orb-3" />
      <div className="absolute top-[60%] left-[50%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(139,92,246,0.04)_0%,transparent_70%)] animate-float-orb-4" />
      <div className="absolute top-[10%] right-[30%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(245,158,11,0.03)_0%,transparent_70%)] animate-float-orb-5" />

      {/* Subtle moving grid lines — inherits from grid-pattern class on parent */}
    </div>
  )
}
