export function Topbar({text}: {text: string}) {
    return (
      <header className="w-full p-4 border-b bg-white dark:bg-gray-950">
        <h1 className="text-xl font-semibold text-center">{text}</h1>
      </header>
    )
  }
  