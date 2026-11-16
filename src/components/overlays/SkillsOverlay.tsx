import { expertise, interests } from '../../content/portfolio';
import { Overlay } from './Overlay';
import { Slug, Term } from '../ui/Primitives';

export function SkillsOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const total = expertise.reduce((n, g) => n + g.primary.length + g.extended.length, 0);

  return (
    <Overlay
      open={open}
      onClose={onClose}
      eyebrow="04 — Technical expertise"
      title="Technical expertise"
      standfirst={`${total} technologies across ${expertise.length} areas. The inked terms are the ones used most.`}
      size="wide"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {expertise.map((group, i) => (
          <section
            key={group.id}
            className="border-b border-rule px-5 py-6 sm:px-7 lg:[&:nth-child(odd)]:border-r"
          >
            <div className="flex items-baseline justify-between gap-4">
              <Slug index={group.index}>{group.label}</Slug>
              <span className="slug">
                {group.primary.length + group.extended.length} items
              </span>
            </div>

            <h3 className="headline mt-3 text-[22px] text-ink">
              {group.label}
            </h3>

            <div className="mt-4">
              <p className="slug mb-2.5">Core</p>
              <div className="flex flex-wrap gap-1.5">
                {group.primary.map((s) => (
                  <Term key={s} accent>
                    {s}
                  </Term>
                ))}
              </div>
            </div>

            {group.extended.length > 0 && (
              <div className="mt-4 border-t border-rule pt-4">
                <p className="slug mb-2.5">Also</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.extended.map((s) => (
                    <Term key={s}>{s}</Term>
                  ))}
                </div>
              </div>
            )}

            {/* Keep the index readable when the count is odd. */}
            {i === expertise.length - 1 && expertise.length % 2 === 1 && null}
          </section>
        ))}

        {/* --- Interests ----------------------------------------------------- */}
        <section className="border-b border-rule bg-paper-2 px-5 py-6 last:border-b-0 sm:px-7">
          <Slug index="06" className="mb-4">
            Core technical interests
          </Slug>
          <div className="flex flex-wrap gap-1.5">
            {interests.map((i) => (
              <Term key={i}>{i}</Term>
            ))}
          </div>
        </section>
      </div>
    </Overlay>
  );
}
