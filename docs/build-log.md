# Build Log — CMS implementation

Running log of the Payload CMS build. See `cms-architecture.md` for the design.
Committed on branch **`feature/team-member-pages`**. Nothing is pushed.

---

## ▶ Resume here (next session)

**State:** Full CMS on Payload 3 — team profiles, all marketing pages (blocks), globals, and a
working contact form — running on **Neon + Cloudflare R2**, with **drafts/preview** and a
member-scoped admin. `next build` passes; public site is fully static (SSG). Phases 1–5 done
except the blocked/deferred items below.

**Run it:**
```bash
docker start selfled-postgres        # Postgres :5433 (if not already up)
npm run dev                          # http://localhost:3000  •  /admin
```
Dev logins: admin `admin@selfledspace.com` · member `mannie@selfledspace.com`. Passwords are
not committed — see "Dev logins" below.

**What's left (in priority order):**
1. **Payload migrations** for production — dev auto-push doesn't run in prod, and enabling
   drafts already required hand-applying schema to Neon (see the drafts note below). Wire
   `payload migrate:create` / `migrate` before deploying. *Not blocked on anyone.*
2. **Vercel staging deploy** — connect the repo, set env vars (`DATABASE_URI`, `PAYLOAD_SECRET`,
   `PREVIEW_SECRET`, `R2_*`, `NEXT_PUBLIC_SERVER_URL`), stays on Hobby for client testing.
3. **Resend email** on new contact submissions — blocked on `RESEND_API_KEY` in `.env.local`.
   Wire the email adapter (conditionally, like R2) + an `afterChange` notify hook.
4. **Direct-R2-CDN images** — enable Public Access on the R2 bucket, put the real `pub-*.r2.dev`
   URL in `R2_PUBLIC_URL` (it's currently the private S3 endpoint), then set the s3 storage to
   serve from it + add the host to `next.config.ts` `images.remotePatterns`.
5. **Design pass** on the other Figma frames (Home/About/Services/Contact) — team page already
   reconciled. Figma file `ocVvuSeUMm4kJaU9kbmL9v`. Match layout/spacing only, NOT font sizes.

**Gotchas to remember:**
- Schema changes trigger Payload's **interactive drizzle-push prompt**, which hangs `next dev`.
  Workaround used: apply the column change directly to Neon via `pg`, then let push add the rest.
  Migrations (#1 above) make this clean.
- `"type": "module"` in package.json is required for the Payload CLI under Node 22.
- Media filenames get a `-N` suffix locally (stale `media/` dir collides); harmless, and Vercel
  (ephemeral fs) won't do it.

---

## Environment verified (before starting)

- Docker 29.4.0 — Postgres 16-alpine container `selfled-postgres` at `localhost:5433`
  (`postgresql://payload:payload@127.0.0.1:5433/selfled`). Image registry is flaky (CloudFront
  EOFs); retries resume partial layers.
- Node v22.21.0, npm 11.6.2, pnpm 10.33.2.
- Playwright (global) headless screenshots + ImageMagick confirmed working against the app.

## Key decisions made this session

1. **Not a monorepo.** Payload 3 co-locates in the single Next.js app via route groups
   (`app/(frontend)`, `app/(payload)`) + a `src/` backend dir — this is not a "drastic infra
   change," and separation of functionality is clean without a workspace. A monorepo would
   force HTTP calls instead of the in-process **Local API** and break the on-demand
   revalidation model. Easily reversible later (wrap app in `apps/web`) if you prefer.
2. **Next.js bump `16.1.1` → `16.2.10`** (+ `eslint-config-next`). Required: `@payloadcms/next`
   peer dep is `next >=16.2.6 <17`. React 19.2.3 already satisfies Payload.
3. **Dev storage = local disk**; the S3/**R2** adapter activates automatically when `R2_*` env
   vars are present (so dev works tonight without your credentials).
4. **Dev DB = local Docker Postgres**; prod = Neon. Same Payload postgres adapter — only
   `DATABASE_URI` changes.

## Waiting on you (morning)

- `.env.local` values: Neon `DATABASE_URI`, Cloudflare `R2_*` creds, `PAYLOAD_SECRET` for prod,
  Resend API key. I'll leave a `.env.example` enumerating every variable.

## Neon + R2 wired & verified (2026-07-04)

- `.env.local` has DATABASE_URI (Neon, pooled ✓), PAYLOAD_SECRET, R2_* (Resend still pending).
- Seeded Neon + R2: schema pushed over the pooled Neon connection; media uploaded to R2
  (confirmed via S3 GetObject). `/team/mannie` renders fully from Neon+R2 (all images load).
- **Media serving:** currently streamed through Payload's `/api/media/file/...` route (works
  regardless of public access). Cost-optimal direct-CDN serving is a follow-up (see below).
- **Two follow-ups:**
  1. `R2_PUBLIC_URL` is currently the S3 API endpoint (not publicly viewable). Enable
     **Public access** on the bucket → use the `pub-xxxx.r2.dev` URL. Then switch the s3
     storage to `disablePayloadAccessControl` + `remotePatterns` for direct CDN serving.
  2. Filenames got a `-1` suffix locally (stale `media/` dir from the earlier localhost seed
     collided). Harmless + won't occur on Vercel. Clear `media/` + reset to get clean names.

## Progress

- [x] Environment + tooling verification
- [x] Phase 1 — Payload core: installed Payload 3.85.2, `withPayload`, `(payload)` route group,
      `users`/`team`/`media` collections + access control. Admin panel loads (200), DB schema
      pushed to Postgres (13 tables). Set `"type": "module"` to fix a Node-22 ESM/TLA error in
      the Payload CLI. Bumped Next → 16.2.10.
- [x] Phase 2 — Profiles: `media` uploads, `bio` rich-text (inline images), free-form
      specialties/expertise/approaches, `active` toggle. Seed migrated Mannie (`src/seed`).
      `/team/[member]` and `/team` now read from the CMS via the Local API (`lib/data.ts`).
      `MemberBio` rewritten to render the `bio` rich text. Deleted `members.ts`.
- [x] On-demand ISR — `afterChange`/`afterDelete` hooks (`src/hooks/revalidateTeam.ts`)
      `revalidatePath` only the changed member page + `/team`.
- [x] Phase 3 — Pages/blocks: `pages` collection + 6 blocks (Hero, HeroSecondary, Featurette,
      CardsFeature, TeamList, Contact) + `RenderBlocks`. Catch-all `[[...slug]]` route renders
      any page. Migrated Home/About/Services/Team/Contact into the CMS (seed `src/seed/pages.ts`);
      deleted the hardcoded page files. All 5 verified pixel-matching the originals on Neon+R2.
- [x] Phase 4 — Globals (`header`/`footer`/`site-settings`) wired into layout/Header/Footer.
      `contact-submissions` collection (public create, admin read). Contact form wired via a
      server action (`lib/actions.ts` + `components/contact/form.tsx`) — submit tested
      end-to-end: row created in Neon, admin can read, success message shown.
- [~] Phase 5 (polish) — IN PROGRESS
  - [x] Member-scoped admin nav: members see only Team Members + Media (Pages/Users/Submissions/
        globals hidden via `admin.hidden`); `readTeam` scopes a member to their own profile.
        Verified by logging in as the member.
  - [x] Header logo wired from `site-settings.logo` (falls back to `/assets/images/logo.png`).
  - [x] Drafts/preview EVERYWHERE (chosen): `versions.drafts` on `pages` + `team`; removed the
        `published`/`active` booleans in favour of Payload `_status`. Public queries filter
        `_status: published`; page routes read `draftMode()` and fetch drafts when previewing.
        Added `/preview` (enable draft mode, guarded by `PREVIEW_SECRET`) + `/preview/exit`, and
        `admin.preview` buttons on both collections. Verified end-to-end: draft edits stay off
        the live site, Publish pushes live, `/preview` shows the draft, bad secret → 401. **Build
        still SSG** — draftMode only serves dynamically when the editor's bypass cookie is present.
        Migration note: dropped `active`/`published` columns via SQL (avoids the destructive
        push prompt); Payload added `_status` + `_pages_v`/`_team_v`; existing rows set to published.
  - [ ] Resend email on new submission — blocked on `RESEND_API_KEY` (will wire conditionally).
  - [ ] Direct-R2-CDN images + `remotePatterns` — blocked on the `pub-*.r2.dev` public URL.
  - [ ] Payload migrations for prod deploy (dev push doesn't run in production) — deploy-prep.

## Design reconciliation — team member page (2026-07-04)

Compared `/team/mannie` against Figma (file `ocVvuSeUMm4kJaU9kbmL9v`, Team/[Member] desktop
`47:378` + mobile `101:1304`) via the Figma MCP. Mobile already matched. The one real
discrepancy: the two bio photos were stacked full-width at all widths (a side effect of the
free-form `bio` rich text) but the design shows them **2-up on desktop, stacked on mobile**.
Fix: `MemberBio` now groups **consecutive images** in the bio into a responsive gallery
(`grid-template-columns: 1fr 1fr` ≥768px; single column below) using `convertLexicalNodesToJSX`
for text runs. Free-form model preserved; verified desktop 2-up + mobile stacked. Image spec
from Figma metadata: **square (aspect-ratio 1/1), 50px gap** (desktop 375×375, mobile 390×390) —
corrected from the earlier 6/5 + 25px which made them too short. Also fixed
earlier: footer year is now auto/current (non-editable), "Teams" → "Team Members" label.
NOTE per [[figma-typography-source-of-truth]]: matched layout/spacing only — did NOT touch fonts.

## CMS is functionally complete (2026-07-04)

The whole app is CMS-managed on Neon + R2: every marketing page (blocks), team profiles,
nav/footer, and a working contact form. `next build` → all public routes Static/SSG, admin+api
Dynamic. Remaining items are Phase-5 polish (above), not blockers for client testing.

## Verified this session (with screenshots + live tests)

- **Build:** `next build` → `/`, `/about`, `/services`, `/contact`, `/team` are **Static**;
  `/team/[member]` is **SSG** (prerenders `/team/mannie`); `/admin` + `/api` are Dynamic.
  Exactly the "static site, dynamic CMS" model. `tsc --noEmit` passes clean.
- **Member profile page** (`/team/mannie`): renders fully from CMS — hero, `bio` (intro →
  two office images inline → body), qualifications, approaches, specialties, all expertise.
- **Team index** (`/team`): lists active members, card image/title/summary from the profile.
- **On-demand revalidation:** edited a profile via API → the static `/team` regenerated with
  new content on the next request, then re-cached (old text gone). Restored original data.
- **Access control:** member login edits only their own profile ✓; admin-only fields
  (`active`, `slug`) silently ignored for members ✓; member `create` → 403 ✓; admin full ✓.

## Dev logins

Seed accounts are `admin@selfledspace.com` (admin) and `mannie@selfledspace.com` (member).

**Passwords are never committed** — this repo is public, so a password in the repo is a live
credential once the CMS is deployed. `npm run seed` reads `SEED_ADMIN_PASSWORD` /
`SEED_MEMBER_PASSWORD`, or generates a random one and prints it once. Production passwords
live in your password manager only.

## Morning quick-start

```bash
# Postgres (already running as container 'selfled-postgres' on :5433; if gone:)
docker start selfled-postgres   # or the docker run in the top of this log

npm run dev                     # http://localhost:3000  (site)  /admin  (CMS)
# npm run seed                  # idempotent — re-seeds Mannie only if missing
# npm run generate:types        # after any collection change
```

## When you have Neon + R2 (put values in .env.local)

- `DATABASE_URI` → Neon: dev data won't carry over; run `npm run seed` against Neon once.
- `R2_*` set → media automatically switches from local disk to R2. Then add the R2 public
  host to `next.config.ts` `images.remotePatterns` so `next/image` can optimize it.
- Set `PAYLOAD_SECRET` (openssl rand -hex 32) and `NEXT_PUBLIC_SERVER_URL` for prod.

## Contact-form notifications (Resend)

`.env.example` is itself caught by the `.env*` ignore rule, so the vars are mirrored here:

```
RESEND_API_KEY=             # without it, Payload logs emails to the console instead of sending
RESEND_FROM_ADDRESS=        # defaults to onboarding@resend.dev (see below)
RESEND_FROM_NAME=           # defaults to "Self-led Space"
CONTACT_NOTIFICATION_EMAIL= # fallback recipient, used only when Site Settings → email is blank
```

- Recipient resolves as **Site Settings → email**, then `CONTACT_NOTIFICATION_EMAIL`. If neither
  is set the submission still saves and a warning is logged — no mail is sent.
- `Reply-To` is the submitter, so replying from the inbox reaches them directly.
- The hook (`src/hooks/notifyContactSubmission.ts`) never throws: a mail failure is logged and
  swallowed so an inquiry is never lost to a Resend outage.
- **Before prod:** selfledspace.com is NOT yet verified in Resend. Until it is, sends only work
  from `onboarding@resend.dev` and only to the Resend account owner's address. Verify the domain
  (DNS records in the Resend dashboard), then set `RESEND_FROM_ADDRESS` to an address on it.

## Loose ends to decide together

- Marketing pages (Home/About/Services/Contact) are still hardcoded JSX — Phase 3 moves them
  to the `pages` blocks model (design in cms-architecture.md §3).
- `npm audit` shows transitive vulns from the Payload tree — review before prod.
- First-user screen defaults role to "Member"; moot now that an admin is seeded.

## Notes for review
- `next dev` warns "No email adapter provided" — expected until Phase 4 (Resend). Harmless.
- `npm install` reported transitive vulns (typical of the Payload dep tree); revisit with
  `npm audit` before production, not a dev blocker.
- Added `"type": "module"` to package.json — required for the Payload CLI under Node 22. The
  app already used ESM everywhere (`.mjs` configs, TS), so no source changes were needed.
