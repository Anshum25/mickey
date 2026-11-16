import { Github, Linkedin, Mail } from 'lucide-react';
import {
  education,
  experience,
  interests,
  method,
  practice,
  profile,
  social,
} from '../../content/portfolio';
import { Overlay } from './Overlay';
import { ActionLink, Section, Term } from '../ui/Primitives';

export function AboutOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const current = experience.find((r) => r.current);

  return (
    <Overlay
      open={open}
      onClose={onClose}
      eyebrow="01 — About"
      title={profile.identity}
      standfirst={profile.role}
    >
      {/* --- Biography + snapshot ------------------------------------------ */}
      <div className="grid grid-cols-1 border-b border-rule lg:grid-cols-[1fr_280px]">
        <div className="space-y-4 px-5 py-7 sm:px-7">
          {profile.bio.map((para) => (
            <p key={para.slice(0, 32)} className="text-pretty text-[13.5px] leading-[1.68] text-ink-2">
              {para}
            </p>
          ))}

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <ActionLink href={`mailto:${profile.email}`} variant="solid" size="sm">
              <Mail size={12} strokeWidth={2} />
              {profile.email}
            </ActionLink>
            <ActionLink href={social.github} external variant="outline" size="sm">
              <Github size={12} strokeWidth={1.75} />
              GitHub
            </ActionLink>
            <ActionLink href={social.linkedin} external variant="outline" size="sm">
              <Linkedin size={12} strokeWidth={1.75} />
              LinkedIn
            </ActionLink>
          </div>
        </div>

        {/* Profile snapshot */}
        <dl className="space-y-4 border-t border-rule bg-paper-2 px-5 py-7 sm:px-7 lg:border-l lg:border-t-0">
          <Fact label="Location" value={profile.location} />
          <Fact label="Education" value={education.degree} />
          <Fact label="Institution" value={education.institution} />
          <Fact label="Graduation" value={education.graduation} />
          {current && (
            <Fact label="Current role" value={`${current.role} — ${current.company}`} accent />
          )}
          <Fact label="Availability" value={profile.availability} accent />
        </dl>
      </div>

      {/* --- What he works on ---------------------------------------------- */}
      <Section index="A" label="What I work on">
        <div className="grid grid-cols-1 gap-px bg-rule-soft sm:grid-cols-2">
          {practice.map((p) => (
            <div key={p.title} className="bg-paper p-4">
              <h3 className="deck text-[13.5px] text-ink">{p.title}</h3>
              <p className="mt-2 text-pretty text-[12px] leading-[1.6] text-ink-2">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* --- Method --------------------------------------------------------- */}
      <Section index="B" label="How I approach engineering">
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {method.map((m) => (
            <li key={m.step} className="border-t border-rule pt-3">
              <span className="slug text-acid">{m.step}</span>
              <h3 className="deck mt-2 text-[13.5px] text-ink">
                {m.title}
              </h3>
              <p className="mt-1.5 text-pretty text-[12px] leading-[1.6] text-ink-2">{m.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* --- Interests ------------------------------------------------------ */}
      <Section index="C" label="Core technical interests">
        <div className="flex flex-wrap gap-1.5">
          {interests.map((i) => (
            <Term key={i}>{i}</Term>
          ))}
        </div>
      </Section>
    </Overlay>
  );
}

function Fact({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <dt className="slug mb-1.5">{label}</dt>
      <dd className={accent ? 'text-[12.5px] font-bold text-acid' : 'text-[12.5px] text-ink'}>
        {value}
      </dd>
    </div>
  );
}
