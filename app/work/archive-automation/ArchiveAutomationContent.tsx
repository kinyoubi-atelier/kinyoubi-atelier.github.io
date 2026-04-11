'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'

/* ─── Data (all facts and metrics supplied directly by the founder) ─── */

const heroTags = [
  'Python 3',
  'pandas',
  'openpyxl',
  'Google Drive API',
  'OAuth 2.0',
  'Bash',
]

const metrics = [
  { num: '3,905', label: 'Records reconciled' },
  { num: '796', label: 'Folders generated' },
  { num: '116', label: 'Fuzzy duplicates merged' },
  { num: '~14 hrs', label: 'Manual work replaced' },
]

const pipeline = [
  {
    idx: '01',
    title: 'Reconcile & sort',
    body: 'Read the Excel source, build a consumer-number lookup, and copy every matching image into its correct area/locality subfolder.',
  },
  {
    idx: '02',
    title: 'Normalise names',
    body: 'Detect fuzzy-duplicate locality names across delivery areas and merge them into canonical folders — 116 distinct merges.',
  },
  {
    idx: '03',
    title: 'Publish & link',
    body: 'Upload the normalised archive to Google Drive with OAuth, then rewrite the Excel so each consumer number becomes a clickable hyperlink to its KYC image.',
  },
]

const demonstrates = [
  {
    title: 'Reading the real problem, not the stated one.',
    body: 'The request was "sort the files." The actual deliverable had to solve data inconsistency first — otherwise the sort would produce 796 fractured folders instead of the ~680 real ones.',
  },
  {
    title: 'Idempotency and restart safety.',
    body: 'Every stage can be re-run without breaking earlier output. Copies skip files that already exist; uploads skip files already in the log; hyperlink generation reads from the log, never from the network.',
  },
  {
    title: 'Pragmatic stack choices.',
    body: 'pandas for the Excel read because it is fast and the schema is messy; openpyxl for the write because hyperlinks and font styling need the object model; shell scripts for the merge step because mv at the filesystem level is simpler than shelling out from Python.',
  },
  {
    title: 'Defensive file I/O.',
    body: 'Filename sanitisation for cross-platform safety, exist_ok=True on every makedirs, graceful handling of orphaned files, and a separate unreconciled bucket so nothing ever gets silently lost.',
  },
  {
    title: 'API integration with persistence.',
    body: 'The Google Drive uploader survives crashes, network drops, and repeated runs — a one-line CSV log is often a better choice than a database for this scale of batch work.',
  },
]

const fullStack = [
  'Python 3',
  'pandas',
  'openpyxl',
  'google-auth-oauthlib',
  'google-api-python-client',
  'shutil',
  'argparse',
  'Bash',
]

/* ─── Code blocks — raw strings so JSX parsing never touches the Python ─── */

const codeStage1 = `import os, shutil, re
import pandas as pd

def sanitize(name: str) -> str:
    # strip characters that are invalid in macOS folder names
    return re.sub(r'[<>:"/\\\\|?*\\x00-\\x1f]', '_', str(name)).strip()

df = pd.read_excel(EXCEL_PATH)
df['id'] = df['id'].astype(int).astype(str)

# build lookup: id -> (region, locality)
lookup = {
    row['id']: (sanitize(row['region']), sanitize(row['locality']))
    for _, row in df.iterrows()
}

# pre-create every destination folder in one pass
for region, locality in set(lookup.values()):
    os.makedirs(os.path.join(DEST_DIR, region, locality), exist_ok=True)

# index files on disk once, then copy by lookup
disk_files = {
    os.path.splitext(f)[0]: f
    for f in os.listdir(SOURCE_DIR)
    if f.endswith('.jpg')
}

for id_, (region, locality) in lookup.items():
    fname = disk_files.get(id_)
    if fname is None:
        continue
    shutil.copy2(
        os.path.join(SOURCE_DIR, fname),
        os.path.join(DEST_DIR, region, locality, fname),
    )
`

const codeStage2 = `# normalise suffix variants across every region folder
# e.g. "Market Street" -> "Market Road" inside every region
for REGION in "$SORTED"/*/; do
    SRC="\${REGION}Market Street"
    DST="\${REGION}Market Road"
    if [ -d "$SRC" ]; then
        mkdir -p "$DST"
        mv "$SRC"/* "$DST"/ 2>/dev/null
        rmdir "$SRC" 2>/dev/null
    fi
done
`

const codeStage3 = `from googleapiclient.http import MediaFileUpload
from openpyxl.styles import Font

def upload_and_publish(service, local_path, filename, folder_id):
    media = MediaFileUpload(local_path, mimetype="image/jpeg", resumable=True)
    uploaded = service.files().create(
        body={"name": filename, "parents": [folder_id]},
        media_body=media,
        fields="id, webViewLink",
    ).execute()
    service.permissions().create(
        fileId=uploaded["id"],
        body={"type": "anyone", "role": "reader"},
    ).execute()
    return uploaded["webViewLink"]

# rewrite the Excel so every id becomes a clickable hyperlink
hyperlink_font = Font(color="0070C0", underline="single", bold=True)
for row in ws.iter_rows(min_row=2):
    cell = row[id_col - 1]
    link = upload_log.get(str(cell.value))
    if link:
        cell.hyperlink = link
        cell.font = hyperlink_font
`

/* ─── Small presentational helpers ─── */

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-surface-dark text-text-on-dark/90 rounded-card border border-text-primary/10 p-5 md:p-6 overflow-x-auto text-[12.5px] md:text-[13px] leading-relaxed font-mono my-6">
      <code>{children}</code>
    </pre>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium px-3 py-1.5 rounded-full border border-text-primary/10 bg-background-alt text-text-secondary">
      {children}
    </span>
  )
}

/* ─── Page ─── */

export default function ArchiveAutomationContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-36 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/#built-with-care"
              className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-gold transition-colors mb-10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to work
            </Link>

            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-5">
              Case study · Python automation
            </p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary tracking-tight mb-6 leading-[1.1]">
              Rebuilding a 4,000-record consumer archive into a searchable, link-backed index
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl">
              An operations project for an LPG distributorship: reconcile a decade of scanned KYC documents against a fragmented Excel database, normalise inconsistent locality naming, and hand back an archive that staff could actually navigate.
            </p>

            <div className="flex flex-wrap gap-2">
              {heroTags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="pb-20 md:pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-card border border-text-primary/5 bg-background-alt p-5 md:p-6"
              >
                <div className="font-heading text-2xl md:text-3xl text-gold mb-1.5 tracking-tight">
                  {m.num}
                </div>
                <div className="text-[11px] text-text-tertiary uppercase tracking-widest leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The problem
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              An LPG distributorship I worked with had accumulated a flat folder of roughly four thousand scanned KYC images — each file named only by an internal consumer number. Finding a single customer&apos;s record meant opening an Excel sheet, looking up the consumer number, then scrolling through thousands of identically named files. For field staff responsible for delivery areas containing dozens of villages, this was functionally unusable.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Beneath the surface was a harder problem: a decade of manual data entry had produced well over a hundred fuzzy-duplicate locality names in the database — transliteration variants, suffix inconsistencies (<code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">Street</code> vs. <code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">Road</code> vs. <code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">Lane</code>), and typos that looked different to a computer but identical to the staff who&apos;d typed them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The outcome */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The outcome
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              The archive is now organised as a two-level hierarchy (delivery area → locality), every consumer record in the spreadsheet resolves to a one-click hyperlink that opens the corresponding KYC image, and a single idempotent script re-runs the whole pipeline in under a minute whenever the source data changes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The pipeline */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
              The pipeline
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              I broke the work into three independent Python stages, each with its own concerns, so any one of them could be re-run without touching the others:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pipeline.map((step, i) => (
              <motion.div
                key={step.idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative rounded-card border border-text-primary/5 bg-background-alt p-6"
              >
                <div className="absolute top-5 right-5 text-[11px] font-semibold text-text-tertiary tracking-widest">
                  {step.idx}
                </div>
                <h3 className="text-base font-semibold text-gold mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>

          <BrushStrokeDivider variant={0} className="mt-16 opacity-50" />
        </div>
      </section>

      {/* Stage 1 */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Stage 1</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Reconcile and sort
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              The core of the sorter is a dictionary lookup keyed by consumer number, resolving to the pair of folder names the file should end up in. Pre-creating every destination folder before the copy loop avoids a <code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">stat</code> syscall per file and keeps the hot loop tight:
            </p>

            <CodeBlock>{codeStage1}</CodeBlock>

            <p className="text-text-secondary text-lg leading-relaxed mt-6">
              I also wrote a companion script that inverts the matching logic: files present on disk but <em>not</em> in the spreadsheet get copied into an <code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">unreconciled/</code> folder for manual review. On the first run this flagged several dozen orphaned records that had been silently invisible for years.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stage 2 */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Stage 2</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The data-cleaning problem nobody noticed
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              After the first run I had 796 distinct <code className="text-sm text-gold bg-surface-card px-1.5 py-0.5 rounded border border-text-primary/10">region/locality</code> folders — which was obviously wrong. A village with one name in 2014 had been entered with a different spelling in 2017, and a variant transliteration in 2021. <em>Market Street</em>, <em>Market Road</em>, and <em>Marketpur</em> were the same place. A locality entered as <em>Ramanagar</em> by one operator and <em>Raamnagar</em> by another needed to collapse into a single folder.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              I worked through the folder listing, identified the fuzzy-duplicate clusters, and generated a repeatable merge script. One hundred and sixteen normalisations later — 105 sub-area merges and 11 suffix consolidations — the archive dropped to a much tighter structure that matched the way staff actually referred to places:
            </p>

            <CodeBlock>{codeStage2}</CodeBlock>

            <div className="border-l-2 border-gold pl-5 md:pl-6 py-3 my-8 text-text-secondary italic text-base leading-relaxed">
              This was the part the client hadn&apos;t asked for and didn&apos;t know they needed. The original brief was <em>&ldquo;sort the files into folders by village&rdquo;</em>. The actual deliverable had to answer the question underneath that: <em>&ldquo;what counts as a village?&rdquo;</em>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stage 3 */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Stage 3</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Publish to Drive and link from Excel
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              Once the archive was clean, the last problem was making it usable from inside the spreadsheet staff already lived in. I wrote an uploader that:
            </p>
            <ul className="space-y-3 text-text-secondary text-lg leading-relaxed mb-6 list-disc pl-6 marker:text-gold">
              <li>Handles the full Google OAuth 2.0 desktop flow, caching the token so subsequent runs are non-interactive.</li>
              <li>Is fully resumable — it writes each successful upload to a CSV log, so a crash or network drop never re-uploads a file that is already on Drive.</li>
              <li>Sets each uploaded file to public-readable via the Drive permissions API, then captures the <code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">webViewLink</code>.</li>
              <li>Rewrites the Excel with <code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">openpyxl</code>, turning the consumer-number column into clickable blue hyperlinks.</li>
            </ul>

            <CodeBlock>{codeStage3}</CodeBlock>

            <p className="text-text-secondary text-lg leading-relaxed mt-6">
              The resumable-upload log turned out to matter more than I expected. The initial bulk upload ran for around forty minutes on a domestic connection; having every completed file durably checkpointed to disk meant I could stop and restart it whenever I needed to, without worrying about duplicates or progress loss.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What this demonstrates */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
              What this demonstrates
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              On the surface this is a file-organisation script. Underneath it is the stuff that actually makes operational automation work in the real world:
            </p>
          </motion.div>

          <div className="space-y-5">
            {demonstrates.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                viewport={{ once: true }}
                className="rounded-card border border-text-primary/5 bg-surface-card p-6"
              >
                <h3 className="text-base font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Tech stack
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {fullStack.map((s) => (
                <span
                  key={s}
                  className="text-sm font-mono px-3 py-1.5 rounded border border-text-primary/10 bg-background-alt text-text-secondary"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* DPDPA disclosure footer */}
      <section className="py-12 px-6 md:px-12 border-t border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-text-tertiary leading-relaxed">
            All client data and screenshots have been omitted from this page in accordance with the consumer-data confidentiality obligations that apply to oil-marketing-company distributorships under India&apos;s Digital Personal Data Protection Act, 2023. Code snippets use generic placeholder column names.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-on-dark mb-4 tracking-tight">
              Have a problem shaped like this?
            </h2>
            <p className="text-text-on-dark/70 mb-8 text-lg">
              Messy data, fragile spreadsheets, or a legacy archive nobody wants to touch — tell us about it.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Start a conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
