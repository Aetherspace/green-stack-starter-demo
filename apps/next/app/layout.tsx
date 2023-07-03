// Layouts
import Document, { metadata } from 'app/routes/document'
import NextClientRootLayout from './ClientRootLayout'

/* --- <NextRootLayout/> ----------------------------------------------------------------------- */

const NextRootLayout = ({ children }: { children: React.ReactNode }) => (
  <Document>
    <NextClientRootLayout>{children}</NextClientRootLayout>
  </Document>
)

/* --- Exports --------------------------------------------------------------------------------- */

export { metadata }
export default NextRootLayout
