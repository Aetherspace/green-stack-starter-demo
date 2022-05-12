import {
  Article,
  Aside,
  B,
  BlockQuote,
  BR,
  Caption,
  Code,
  Del,
  EM,
  Footer,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Header,
  HR,
  I,
  Main,
  Mark,
  Nav,
  P,
  Pre,
  Q,
  S,
  Section,
  Strong,
  Table,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Time,
  UL,
  LI,
} from '@expo/html-elements'
import { aetherify } from '../core'
import { AetherLink } from '../navigation'

/* --- HTML Elements --------------------------------------------------------------------------- */
// -i- Superset of @expo/html-elements for SEO, aetherspace & web friendly alternative primitives
// -i- See https://github.com/expo/expo/tree/master/packages/html-elements#components
// -i- Renders as semantic HTML on web & server, but as Text / View / etc. on mobile
// -i- Bringing the power of tailwind 'tw' prefixes & media query support to web

const AetherArticle = aetherify(Article)()
const AetherAside = aetherify(Aside)()

const AetherB = aetherify(B)()
const AetherBlockQuote = aetherify(BlockQuote)()
const AetherBR = aetherify(BR)()

const AetherCaption = aetherify(Caption)()
const AetherCode = aetherify(Code)()

const AetherDel = aetherify(Del)()
const AetherEM = aetherify(EM)()
const AetherFooter = aetherify(Footer)()

const AetherH1 = aetherify(H1)()
const AetherH2 = aetherify(H2)()
const AetherH3 = aetherify(H3)()
const AetherH4 = aetherify(H4)()
const AetherH5 = aetherify(H5)()
const AetherH6 = aetherify(H6)()

const AetherHeader = aetherify(Header)()
const AetherHR = aetherify(HR)()
const AetherI = aetherify(I)()

const AetherMain = aetherify(Main)()
const AetherMark = aetherify(Mark)()
const AetherNav = aetherify(Nav)()

const AetherP = aetherify(P)()
const AetherPre = aetherify(Pre)()
const AetherQ = aetherify(Q)()
const AetherS = aetherify(S)()

const AetherSection = aetherify(Section)()
const AetherStrong = aetherify(Strong)()

const AetherTable = aetherify(Table)()
const AetherTBody = aetherify(TBody)()
const AetherTD = aetherify(TD)()
const AetherTFoot = aetherify(TFoot)()
const AetherTH = aetherify(TH)()
const AetherTHead = aetherify(THead)()
const AetherTR = aetherify(TR)()

const AetherTime = aetherify(Time)()
const AetherUL = aetherify(UL)()
const AetherLI = aetherify(LI)()

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
