import { Link } from "@/i18n/navigation";
import type { MDXComponents } from "mdx/types";

/**
 * Mapeo de elementos MDX a estilos del Design System. Se pasa a
 * <MDXRemote components={mdxComponents} /> en app/(marketing)/blog/[slug]/page.tsx.
 * Mantiene el contenido del blog visualmente consistente con el resto del
 * sitio sin que cada artículo tenga que repetir clases de Tailwind.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="text-h3 text-dta-black mt-10 mb-4" {...props} />,
  h3: (props) => <h3 className="text-lg font-bold text-dta-black mt-8 mb-3" {...props} />,
  p: (props) => <p className="text-sm text-dta-black/80 leading-relaxed mb-4" {...props} />,
  ul: (props) => <ul className="list-disc pl-5 space-y-2 text-sm text-dta-black/80 mb-4" {...props} />,
  ol: (props) => <ol className="list-decimal pl-5 space-y-2 text-sm text-dta-black/80 mb-4" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold text-dta-black" {...props} />,
  a: ({ href = "", ...props }) => (
    <Link
      href={href}
      className="text-dta-blue-600 font-medium hover:underline"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-dta-blue-600 pl-4 italic text-dta-gray-600 my-6"
      {...props}
    />
  ),
};
