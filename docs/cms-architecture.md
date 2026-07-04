# CMS Architecture — Self-led Space

Status: **Phases 1–4 built & verified** on Neon + R2 (see `build-log.md`) · Phase 5 (polish) optional
Stack: Next.js 16 (App Router) · React 19 · Tailwind v4 · **Payload CMS 3** (self-hosted, TypeScript)

---

## 1. Scope

This CMS (Payload) owns the site's **public content**:

- Marketing pages (Home, About, Services, Contact, Team index)
- **Team member** profiles that each member fully owns and customizes
- Business contact inquiries

**Out of scope:** any patient-facing feature — secure patient check-ins / portal, or anything
handling patient health information — is deliberately **not** part of this system and will
not live in this CMS.

---

## 2. Roles & access model

Three subject types, enforced by Payload access-control functions (row- and field-level):

| Role | Can do |
|---|---|
| **Admin** | Everything: all pages, all team profiles, globals, submissions, user management — and may adjust any member's profile when needed |
| **Member** | Log in and edit **only their own team profile**; upload their own media; read published content |
| **Public** (anon) | Read published content; submit the business contact form |

Single auth collection (`users`) with a `role` field and a `member` relationship linking a
member-role user to the one team profile they own. The core ownership rule:

```ts
// access/canEditProfile.ts — used on the `team` collection `update`
export const canEditProfile: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;         // admins: all docs
  if (user.role === "member" && user.member)      // members: own doc only
    return { id: { equals: user.member } };        // returns a query constraint
  return false;
};
```

Field-level access adds guardrails so a member can't touch structural fields
(e.g. `slug`, `active`, `owner`) even on their own document.

### Access matrix

| Collection | read | create | update | delete |
|---|---|---|---|---|
| `pages` | public (published) | admin | admin | admin |
| `team` | public (active) | admin | admin **or self** | admin |
| `media` | public | admin, member | admin, or own | admin |
| `contact-submissions` | admin | **public** (site form) | admin | admin |
| `users` | admin (self read) | admin | admin (self, limited) | admin |
| Globals (`site-settings`, `header`, `footer`) | public | — | admin | — |

---

## 3. Content model

The marketing site is already composed of a small set of repeating blocks, so pages become a
**layout builder**. Team profiles keep their **fixed section structure**, but the narrative
area becomes a single member-editable **rich content field**.

### Collections

**`users`** _(auth)_ — login identity.
- `email`, `password` (Payload auth)
- `role`: `admin` | `member`
- `member`: relationship → `team` (required when role = member)

**`team`** — a team member's public profile **and** their editable record. Members manage
their own; admins can adjust any.
- `name`, `title`, `slug` (admin-managed), `summary` (the profile "overview")
- `active`: boolean — controls whether the profile is live and listed on `/team`
- `banner`, `photo`: relationship → `media`
- **`bio`: rich content** — a single Lexical richText field with **inline media** enabled, so
  a member composes their whole narrative (text and images, in whatever order they choose).
  **This replaces the old `intro` + `body` + `gallery` fields** — no assumed text→image→text
  shape.
- `qualifications`: array of `{ label, content: richText }`
- `approaches`: array of `{ title, text }` — **free-form per member**
- `specialties`: array of text — **free-form per member**
- `expertise`: array of text — **free-form per member**
- `owner`: relationship → `users` (mirrors `users.member`; drives ownership checks)

> Free-form `specialties` / `expertise` / `approaches` can be promoted to shared,
> admin-curated lists later **without changing the page rendering**.

**`pages`** — flexible marketing pages (Home, About, Services, Contact, Team index).
- `title`, `slug`, `published`, SEO group (`metaTitle`, `metaDescription`)
- `layout`: **blocks** field — an ordered list chosen from:
  - `HeroBlock` (home hero)
  - `HeroSecondaryBlock` — `heading`, `subheading`, `content` (richText), `image`, `name`
  - `FeaturetteBlock` — `heading`, `subheading?`, `content`, `image`, `link?`, `reverse?`
  - `CardsFeatureBlock` — `heading`, `subheading?`, `description?`, `image`, `cards[] {title,text}`, `link?`
  - `TeamListBlock` — renders **all active team members**, each card's `photo`, `title`, and
    `summary` pulled live from that member's `team` profile (links to `/team/[slug]`)
  - `ContactBlock` — renders the business contact form
- Non-`TeamListBlock` block fields are a 1:1 match to the existing component prop types in
  `components/*/types.ts`, so rendering is a thin mapping (see §4).

**`media`** _(upload)_ — images with required `alt`, focal point, responsive sizes.

**`contact-submissions`** — business inquiries from the site form.
- `name`, `email`, `phone?`, `message`, `member?` (which team member), `createdAt`
- create = public; read/delete = admin.
- _Note: a therapy-site contact form can attract sensitive disclosures — keep fields minimal,
  encrypt at rest, avoid emailing message bodies in plaintext, set a retention policy._

### Globals
- **`site-settings`** — site name, logo, business email/phone, socials
- **`header`** — nav links (currently hardcoded in `components/header`)
- **`footer`** — copyright, links

---

## 4. Rendering & data flow

Payload 3 runs **in-process** inside this Next.js app, so Server Components read content
through the **Local API** (a direct function call — no HTTP round-trip, no secrets in the
browser).

- **Pages:** `generateStaticParams()` from `pages` slugs → fetch page by slug → a
  `<RenderBlocks blocks={page.layout} />` component maps each block `type` to the existing
  React component. Current components stay almost untouched; only their data source changes
  from hardcoded props to CMS data.
- **Team index (`/team`):** the `TeamListBlock` queries all `team` docs where `active = true`
  and renders each member's `photo`, `title`, and `summary` (the card links to that member's
  page). This replaces today's hardcoded Mannie entry, so the list grows automatically as
  members are added.
- **Team profile (`/team/[member]`):** fetches the `team` doc by slug and feeds the existing
  `MemberHero`, `MemberBio`, `Qualifications`, `CardsFeature`, `Specialties`, `Expertise`.
  `MemberBio` renders the single `bio` rich content (text + inline images) via the richText
  serializer, replacing the old `intro` / `body` / `gallery` props.
- **RichText:** narrative fields become Payload Lexical richText, rendered with the official
  serializer; the `bio` field additionally allows inline image nodes.
- **Images:** `{ src, alt }` props are sourced from `media` docs (`next/image` stays).
- **Preview:** Payload **drafts** + Next.js **draft mode** give members/admins a live
  preview before publishing.

### Static generation & caching (SSG + on-demand revalidation)

The public site is **100% static** — no per-request server rendering, no per-request DB hit.
Content only regenerates when the CMS changes, and only the **affected page** regenerates.

- **Build/generate:** every public route is statically generated (`generateStaticParams` +
  static rendering). After build, serving a page reads **zero** DB — it's a cached static
  asset on Vercel's edge CDN.
- **Tagged caches:** each page's data fetch is tagged (e.g. `team:<slug>`, `page:<slug>`,
  `team-list`) via Next.js `unstable_cache` / `fetch` cache tags.
- **Targeted invalidation:** a Payload `afterChange` / `afterDelete` hook fires on save and
  calls `revalidateTag(...)` for **only** the changed document — e.g. editing Mannie's profile
  invalidates `team:mannie` **and** `team-list` (so the `/team` grid updates), nothing else.
- **Invalidate-once, then re-cache:** invalidation marks that one page stale. The **next**
  request regenerates it a single time (stale-while-revalidate), then it's cached again at the
  edge. Every subsequent visitor gets the static cached copy. This is exactly the
  "one load to refresh, then cached" behavior you described, and it keeps compute ~zero.
- **Cost effect:** because regeneration is purely on-demand (no time-based `revalidate`
  interval), function invocations happen only when staff edit content — a handful per day —
  so the site lives comfortably inside Vercel Pro's included usage.
- **Media** is served straight from object storage's CDN (see §6), so image bandwidth doesn't
  count against Vercel data transfer.

---

## 5. Target directory structure

Payload 3 installs into the App Router via a `(payload)` route group; the public site moves
into an `(app)` group. Existing component code is unaffected.

```
app/
  (app)/                     # public site (moved as-is)
    page.tsx  about/  services/  contact/  team/ ...
  (payload)/                 # generated: admin UI + REST/GraphQL
    admin/[[...segments]]/page.tsx
    api/[...slug]/route.ts
src/
  payload.config.ts
  collections/   users.ts  team.ts  pages.ts  media.ts  contact-submissions.ts
  globals/       site-settings.ts  header.ts  footer.ts
  blocks/        hero.ts  heroSecondary.ts  featurette.ts  cardsFeature.ts  teamList.ts  contact.ts
  access/        isAdmin.ts  canEditProfile.ts  isActive.ts
  components/RenderBlocks.tsx
components/                  # existing presentational components — unchanged
```

---

## 6. Infrastructure & cost analysis

Goal: lowest possible cost for a small healthcare startup, staying as close to the current
Vercel setup as possible. **No component here touches patient data, so no BAA is required**,
which keeps every tier cheap. Prices verified July 2026 (see Sources at end).

### Recommended stack — ~$20/mo total

| Component | Service | Tier | Cost | Why it fits |
|---|---|---|---|---|
| Hosting / CDN / compute | **Vercel** | **Pro** | **$20/mo** | Commercial use requires Pro (Hobby forbids it). Static site + on-demand revalidation keeps usage far inside Pro's included $20 credit / 1 TB transfer. |
| Database | **Neon** (Postgres) | **Free** | **$0** | 0.5 GB storage + scale-to-zero. A small practice's content is a few MB. DB is only hit at build + when staff edit; it sleeps (and costs nothing) otherwise. |
| Media storage | **Cloudflare R2** | **Free** | **$0** | 10 GB storage, **zero egress fees**, served via CDN. Profile images fit easily; offloads bandwidth from Vercel. |
| Transactional email | **Resend** | **Free** | **$0** | ~3k emails/mo for contact-form notifications. |
| **Total** | | | **~$20/mo** | Essentially just the Vercel Pro base fee. |

Headroom before any of these start costing more: hundreds of profiles / thousands of images
before R2 leaves free; Neon free covers the DB until well beyond this site's needs.

### Rock-bottom alternative — ~$0–6/mo (more ops)

If avoiding the $20 matters more than DX/reliability, self-host the Payload app instead of
Vercel and keep Neon + R2 free:

| Option | Cost | Trade-off |
|---|---|---|
| Railway / Render / Fly.io | ~$0–5/mo | Cheap Node hosting; cold starts / spin-down on the lowest tiers; you manage the deploy. |
| Hetzner/VPS + Coolify | ~$4–6/mo | Cheapest steady price; most DevOps burden (OS, TLS, updates, backups). |

**Recommendation:** for a healthcare startup, the reliability, managed CDN, and near-zero ops
of **Vercel Pro + Neon + R2 (~$20/mo)** is worth it and stays closest to your current setup.
The self-host route trades $15–20/mo for meaningful ongoing maintenance you'd own.

> **Rollout decision:** stage on Vercel **Hobby** (free) for internal + client testing, then
> flip to **Pro** before production go-live. The infra (Neon + R2 + Resend + the Payload/Next
> config) is identical across both — only the Vercel plan toggle changes — so staging is a
> faithful mirror of production.

Env: `DATABASE_URI` (Neon), `PAYLOAD_SECRET`, R2 creds (`R2_*`), `NEXT_PUBLIC_SERVER_URL`,
Resend API key.

---

## 7. Migration path (from today's hardcoded content)

1. Stand up Payload + collections (no data yet).
2. **Seed script** converts `app/team/[member]/members.ts` → `team` docs, uploading the images
   in `public/assets/images` into `media`. The old `intro` + `body` + `gallery` collapse into
   the single `bio` rich content field.
3. Seed `pages` from the current page JSX (each `<Featurette/>`, `<CardsFeature/>`, etc. → a
   block entry); the Team index page uses a `TeamListBlock` instead of the hardcoded member.
4. Repoint pages/team routes to the Local API; delete `members.ts` and hardcoded props.
5. Seed globals (header nav, footer, site settings).

Because block fields mirror existing prop types, the visual output should be pixel-identical
— verify against `./screenshots` per the repo's visual-verification workflow.

---

## 8. Phased roadmap

| Phase | Deliverable |
|---|---|
| **0 — Decisions & infra** | Confirm Postgres host + S3 bucket + hosting target; provision env |
| **1 — Payload core** | Install Payload; `payload.config.ts`; `users` + `team` collections; access control; admin panel live |
| **2 — Profiles** | `media`; `bio` rich content; free-form fields; seed Mannie's profile; wire `/team/[member]` to CMS |
| **3 — Pages** | Blocks model + `RenderBlocks` (incl. `TeamListBlock`); migrate Home/About/Services/Contact/Team-index |
| **4 — Globals & forms** | `site-settings`/`header`/`footer`; `contact-submissions` + wire the form |
| **5 — Polish** | Drafts + preview + on-demand revalidation; roles/permissions QA |

---

## 9. Decisions — settled

- **Content model:** settled (§3).
- **Member media:** members manage their own content **including their own media** — `media`
  create/update is owner-or-admin (§2 matrix).
- **Rendering:** fully static (SSG) with targeted on-demand revalidation (§4).
- **Infra (recommended, pending your OK):** Vercel Pro + Neon Free + Cloudflare R2 Free +
  Resend Free ≈ **$20/mo** (§6). Only open question: accept this stack, or take the
  ~$0–6/mo self-host route and trade cost for ops?

---

## Sources (pricing, verified July 2026)

- Vercel plans / commercial-use terms: https://vercel.com/docs/plans/hobby · https://vercel.com/pricing
- Neon free tier & pricing: https://neon.com/pricing · https://neon.com/docs/introduction/plans
- Cloudflare R2 free tier & egress: https://developers.cloudflare.com/r2/pricing/
