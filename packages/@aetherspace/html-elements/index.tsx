import * as HTML from '@expo/html-elements'
import { aetherify } from '../core'
import { AetherLink } from '../navigation'

/* --- HTML Elements --------------------------------------------------------------------------- */
// -i- Superset of @expo/html-elements for SEO, aetherspace & web friendly alternative primitives
// -i- See https://github.com/expo/expo/tree/master/packages/html-elements#components
// -i- Renders as semantic HTML on web & server, but as Text / View / etc. on mobile
// -i- Bringing the power of tailwind 'tw' prefixes & media query support to web

const AetherArticle = aetherify(HTML.Article)()
const AetherAside = aetherify(HTML.Aside)()

const AetherB = aetherify(HTML.B)()
const AetherBlockQuote = aetherify(HTML.BlockQuote)()
const AetherBR = aetherify(HTML.BR)()

const AetherCaption = aetherify(HTML.Caption)()
const AetherCode = aetherify(HTML.Code)()

const AetherDel = aetherify(HTML.Del)()
const AetherEM = aetherify(HTML.EM)()
const AetherFooter = aetherify(HTML.Footer)()

const AetherH1 = aetherify(HTML.H1)()
const AetherH2 = aetherify(HTML.H2)()
const AetherH3 = aetherify(HTML.H3)()
const AetherH4 = aetherify(HTML.H4)()
const AetherH5 = aetherify(HTML.H5)()
const AetherH6 = aetherify(HTML.H6)()

const AetherHeader = aetherify(HTML.Header)()
const AetherHR = aetherify(HTML.HR)()
const AetherI = aetherify(HTML.I)()

const AetherMain = aetherify(HTML.Main)()
const AetherMark = aetherify(HTML.Mark)()
const AetherNav = aetherify(HTML.Nav)()

const AetherP = aetherify(HTML.P)()
const AetherPre = aetherify(HTML.Pre)()
const AetherQ = aetherify(HTML.Q)()
const AetherS = aetherify(HTML.S)()

const AetherSection = aetherify(HTML.Section)()
const AetherStrong = aetherify(HTML.Strong)()

const AetherTable = aetherify(HTML.Table)()
const AetherTBody = aetherify(HTML.TBody)()
const AetherTD = aetherify(HTML.TD)()
const AetherTFoot = aetherify(HTML.TFoot)()
const AetherTH = aetherify(HTML.TH)()
const AetherTHead = aetherify(HTML.THead)()
const AetherTR = aetherify(HTML.TR)()

const AetherTime = aetherify(HTML.Time)()
const AetherUL = aetherify(HTML.UL)()
const AetherLI = aetherify(HTML.LI)()

/* --- Exports --------------------------------------------------------------------------------- */

export {
  AetherLink as A, // For maximum aetherspace compatibility
  AetherArticle as Article,
  AetherAside as Aside,
  AetherB as B,
  AetherBlockQuote as BlockQuote,
  AetherBR as BR,
  AetherCaption as Caption,
  AetherCode as Code,
  AetherDel as Del,
  AetherEM as EM,
  AetherFooter as Footer,
  AetherH1 as H1,
  AetherH2 as H2,
  AetherH3 as H3,
  AetherH4 as H4,
  AetherH5 as H5,
  AetherH6 as H6,
  AetherHeader as Header,
  AetherHR as HR,
  AetherI as I,
  AetherMain as Main,
  AetherMark as Mark,
  AetherNav as Nav,
  AetherP as P,
  AetherPre as Pre,
  AetherQ as Q,
  AetherS as S,
  AetherSection as Section,
  AetherStrong as Strong,
  AetherTable as Table,
  AetherTBody as TBody,
  AetherTD as TD,
  AetherTFoot as TFoot,
  AetherTH as TH,
  AetherTHead as THead,
  AetherTR as TR,
  AetherTime as Time,
  AetherUL as UL,
  AetherLI as LI,
}
