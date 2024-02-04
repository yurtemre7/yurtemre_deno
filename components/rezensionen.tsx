export default function Rezensionen() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-800">
        <figure className="items-center justify-center py-4 bg-blue-800 text-white">
          <svg className="w-10 h-10 mx-auto mb-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium  text-center text-white">"zzZ... zzZ... zzZ..."</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-400">
              <cite className="pe-3 font-medium text-white">Teoman W.</cite>
              <cite className="ps-3 text-sm text-white">Informatik Student</cite>
            </div>
          </figcaption>
        </figure>
        <figure className="items-center justify-center py-4 bg-blue-800 text-white">
          <svg className="w-10 h-10 mx-auto mb-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-center text-white">"Sieht gut aus für'n Anfänger."</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-400">
              <cite className="pe-3 font-medium text-white">Jason C.</cite>
              <cite className="ps-3 text-sm text-white">Elektrotechnik Student</cite>
            </div>
          </figcaption>
        </figure>
        <figure className="items-center justify-center py-4 bg-blue-800 text-white">
          <svg className="w-10 h-10 mx-auto mb-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-center text-white">"iiiiiiieeeeeehhh Javascript !!!"</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-400">
              <cite className="pe-3 font-medium text-white">Joshua S.</cite>
              <cite className="ps-3 text-sm text-white">Developer of J.dev, Ex-developer of SNP👍🏼</cite>
            </div>
          </figcaption>
        </figure>
      </div>
    )
}