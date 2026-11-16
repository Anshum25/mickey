import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Twitter } from 'lucide-react';
import { profile, resume, social } from '../../content/portfolio';
import { Overlay } from './Overlay';
import { ActionLink, CopyButton, Slug, StatusDot } from '../ui/Primitives';
import { cn } from '../../lib/cn';

const CHANNELS = [
  { label: 'GitHub', handle: 'github.com/Anshum25', href: social.github, Icon: Github },
  { label: 'LinkedIn', handle: 'linkedin.com/in/anshum-dev', href: social.linkedin, Icon: Linkedin },
  { label: 'X', handle: '@TheAnshumDev', href: social.x, Icon: Twitter },
];

export function ContactOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const subject = encodeURIComponent('Hello Anshum — opportunity');

  return (
    <Overlay
      open={open}
      onClose={onClose}
      eyebrow="05 — Contact"
      title="Let’s build something useful."
      standfirst={profile.pitch}
    >
      {/* --- Email, the primary action -------------------------------------- */}
      <section className="bloom border-b border-rule bg-paper-2 px-5 py-7 sm:px-7">
        <Slug className="mb-4">Email</Slug>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`mailto:${profile.email}?subject=${subject}`}
            data-autofocus
            className={cn(
              'group min-w-0 font-sans text-[22px] font-bold tracking-[-0.015em] text-ink',
              'transition-colors duration-200 hover:text-acid sm:text-[28px]',
            )}
          >
            <span className="break-all">{profile.email}</span>
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="ml-1.5 inline-block align-[1px] text-ink-3 transition-all duration-200 group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-acid"
            />
          </a>
          <CopyButton value={profile.email} label={`Copy ${profile.email}`} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <ActionLink href={`mailto:${profile.email}?subject=${subject}`} variant="solid">
            <Mail size={13} strokeWidth={2} />
            Start a conversation
          </ActionLink>

          {resume.available ? (
            <ActionLink href={resume.url} download={resume.filename} variant="outline">
              Download résumé
            </ActionLink>
          ) : (
            <ActionLink
              href={`mailto:${profile.email}?subject=${encodeURIComponent('Résumé request')}`}
              variant="outline"
            >
              Request résumé
            </ActionLink>
          )}
        </div>

        {!resume.available && (
          <p className="mt-3 text-[11.5px] leading-relaxed text-ink-3">
            A résumé PDF is not published on this site yet — email is the fastest route to it.
          </p>
        )}
      </section>

      {/* --- Channels -------------------------------------------------------- */}
      <section className="border-b border-rule px-5 py-7 sm:px-7">
        <Slug className="mb-4">Elsewhere</Slug>
        <ul className="flex flex-col gap-px bg-rule-soft">
          {CHANNELS.map(({ label, handle, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center justify-between gap-4 bg-paper px-4 py-3.5 transition-colors duration-200 hover:bg-paper-2"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Icon size={15} strokeWidth={1.75} className="shrink-0 text-ink-3" />
                  <span className="min-w-0">
                    <span className="deck block text-[13px] text-ink">{label}</span>
                    <span className="slug mt-0.5 block truncate normal-case tracking-normal">
                      {handle}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.75}
                  className="shrink-0 text-ink-3 transition-all duration-200 group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-acid"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* --- Where / status --------------------------------------------------- */}
      <section className="grid grid-cols-1 sm:grid-cols-2">
        <div className="border-rule px-5 py-7 sm:border-r sm:px-7">
          <Slug className="mb-3">Location</Slug>
          <p className="flex items-center gap-2 text-[12.5px] text-ink">
            <MapPin size={13} strokeWidth={1.75} className="text-ink-3" />
            {profile.location}
          </p>
          <p className="slug mt-2">{profile.timezone}</p>
        </div>

        <div className="border-t border-rule px-5 py-7 sm:border-t-0 sm:px-7">
          <Slug className="mb-3">Availability</Slug>
          <p className="flex items-center gap-2 text-[12.5px] font-medium text-acid">
            <StatusDot />
            {profile.availability}
          </p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-ink-3">
            Internships, full-time roles, and interesting engineering problems.
          </p>
        </div>
      </section>
    </Overlay>
  );
}
