import { Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-16 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500">
            A{' '}
            <a 
              href="https://profitable.agency" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 underline underline-offset-4"
            >
              Profitable
            </a>
            {' '}company
          </p>
          <a 
            href="https://www.linkedin.com/company/96mins" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-gray-600"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  )
}
