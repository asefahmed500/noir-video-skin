import type { SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement> & {
  /** Rendered size in pixels. The glyphs are drawn on a 24x24 grid. */
  size?: number;
};

function Icon({ size = 18, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* --- Transport --------------------------------------------------------- */

export function PlayIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8.2 5.4a.8.8 0 0 1 1.22-.68l9.1 6.6a.8.8 0 0 1 0 1.36l-9.1 6.6a.8.8 0 0 1-1.22-.68Z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="7" y="5" width="3.6" height="14" rx="1.2" fill="currentColor" stroke="none" />
      <rect x="13.4" y="5" width="3.6" height="14" rx="1.2" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function ReplayIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
      <path d="M3.2 4.4v4.2h4.2" />
    </Icon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </Icon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}

/* --- Audio ------------------------------------------------------------- */

export function VolumeHighIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4Z" />
      <path d="M16 9.2a4 4 0 0 1 0 5.6" />
      <path d="M18.8 6.4a8 8 0 0 1 0 11.2" />
    </Icon>
  );
}

export function VolumeLowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4Z" />
      <path d="M16 9.2a4 4 0 0 1 0 5.6" />
    </Icon>
  );
}

export function VolumeOffIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4Z" />
      <path d="m16.5 9.5 5 5" />
      <path d="m21.5 9.5-5 5" />
    </Icon>
  );
}

/* --- Screen ------------------------------------------------------------ */

export function CaptionsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.6" y="5" width="18.8" height="14" rx="2.4" />
      <path d="M10.4 10.4a2.9 2.9 0 1 0 0 3.2" />
      <path d="M17.2 10.4a2.9 2.9 0 1 0 0 3.2" />
    </Icon>
  );
}

export function PipIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.6" y="4.8" width="18.8" height="14.4" rx="2.4" />
      <rect x="12.4" y="11.4" width="7.2" height="5.8" rx="1.4" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function FullscreenIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8.4 3.4H5a1.6 1.6 0 0 0-1.6 1.6v3.4" />
      <path d="M15.6 3.4H19a1.6 1.6 0 0 1 1.6 1.6v3.4" />
      <path d="M20.6 15.6V19a1.6 1.6 0 0 1-1.6 1.6h-3.4" />
      <path d="M3.4 15.6V19A1.6 1.6 0 0 0 5 20.6h3.4" />
    </Icon>
  );
}

export function FullscreenExitIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.4 8.4h3a1.6 1.6 0 0 0 1.6-1.6v-3" />
      <path d="M20.6 8.4h-3A1.6 1.6 0 0 1 16 6.8v-3" />
      <path d="M16 15.6v3a1.6 1.6 0 0 0 1.6 1.6h3" />
      <path d="M8 15.6v3A1.6 1.6 0 0 1 6.4 20.2h-3" />
    </Icon>
  );
}

/* --- Menu -------------------------------------------------------------- */

export function SettingsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h7" />
      <path d="M17 7h3" />
      <path d="M4 17h3" />
      <path d="M13 17h7" />
      <circle cx="14" cy="7" r="2.6" />
      <circle cx="10" cy="17" r="2.6" />
    </Icon>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4.5 12.5 5 5 10-11" strokeWidth={2.2} />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </Icon>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" strokeOpacity="0.25" />
      <path d="M20.5 12A8.5 8.5 0 0 0 12 3.5" />
    </Icon>
  );
}

export function MarkerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="4" width="16" height="16" fill="currentColor" stroke="none" />
    </Icon>
  );
}
