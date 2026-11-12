import { Menu, useCaptionsOptions, usePlaybackRateOptions, useQualityOptions } from '@videojs/react';
import { useState } from 'react';
import { CheckIcon, ChevronIcon, SettingsIcon } from './Icons';
import { PLAYBACK_RATES } from './media';

interface SubmenuOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface OptionSubmenuProps {
  /** The name shown on the parent row, e.g. "Speed". */
  title: string;
  /** The currently selected value, shown on the parent row. */
  selectedLabel: string;
  /** The radio group label announced to assistive technology. */
  groupLabel: string;
  options: readonly SubmenuOption[];
  value: string;
  onValueChange: (value: string) => void;
  /** Called after an option is chosen, so the menu can close. */
  onSelected?: () => void;
}

/**
 * A settings row that opens a submenu of radio options.
 * Rows carry the mono annotation label; the selected value is marked with a
 * red check, the same mark used everywhere else in the interface.
 */
function OptionSubmenu({
  title,
  selectedLabel,
  groupLabel,
  options,
  value,
  onValueChange,
  onSelected,
}: OptionSubmenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger
        className="noir-menu__item"
        render={(props) => (
          <div {...props}>
            <span className="noir-menu__label-text">{title}</span>
            <span className="noir-menu__value">
              {selectedLabel}
              <ChevronIcon size={14} className="noir-menu__chevron" />
            </span>
          </div>
        )}
      />
      <Menu.Content className="noir-menu__panel">
        <Menu.Item
          className="noir-menu__back"
          render={(props) => (
            <div {...props}>
              <ChevronIcon size={14} className="noir-menu__chevron noir-menu__chevron--back" />
              {title}
            </div>
          )}
        />
        <Menu.RadioGroup
          className="noir-menu__group"
          value={value}
          onValueChange={(next) => {
            onValueChange(next);
            onSelected?.();
          }}
          aria-label={groupLabel}
        >
          <Menu.GroupLabel className="noir-menu__caption">{groupLabel}</Menu.GroupLabel>
          {options.map((option) => (
            <Menu.RadioItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="noir-menu__option"
            >
              <span className="noir-menu__option-label">{option.label}</span>
              <Menu.ItemIndicator
                checked={option.value === value}
                forceMount
                className="noir-menu__check"
              >
                <CheckIcon size={14} />
              </Menu.ItemIndicator>
            </Menu.RadioItem>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

/**
 * The settings menu. Every row opens a working radio group bound to real
 * player state, and rows disappear when the media cannot honour them.
 */
export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const playbackRate = usePlaybackRateOptions({ rates: PLAYBACK_RATES });
  const quality = useQualityOptions();
  const captions = useCaptionsOptions();

  const hasPlaybackRate = playbackRate?.state.availability === 'available';
  const hasQuality = quality?.state.availability === 'available';
  const hasCaptions = captions?.state.availability === 'available';

  if (!hasPlaybackRate && !hasQuality && !hasCaptions) {
    return null;
  }

  return (
    <Menu.Root side="top" align="end" open={open} onOpenChange={setOpen}>
      <Menu.Trigger
        className="noir-btn"
        aria-label="Settings"
        render={<button type="button" />}
      >
        <SettingsIcon size={18} />
      </Menu.Trigger>
      <Menu.Popup className="noir-menu__popup">
        <Menu.Content className="noir-menu__content">
          {hasPlaybackRate ? (
            <OptionSubmenu
              title="Speed"
              groupLabel="Playback rate"
              selectedLabel={playbackRate.selectedLabel}
              options={playbackRate.options}
              value={playbackRate.value}
              onValueChange={playbackRate.setValue}
              onSelected={() => setOpen(false)}
            />
          ) : null}

          {hasQuality ? (
            <OptionSubmenu
              title="Quality"
              groupLabel="Quality"
              selectedLabel={quality.selectedLabel}
              options={quality.options}
              value={quality.value}
              onValueChange={quality.setValue}
              onSelected={() => setOpen(false)}
            />
          ) : null}

          {hasCaptions ? (
            <OptionSubmenu
              title="Captions"
              groupLabel="Captions"
              selectedLabel={captions.selectedLabel}
              options={captions.options}
              value={captions.value}
              onValueChange={captions.setValue}
              onSelected={() => setOpen(false)}
            />
          ) : null}
        </Menu.Content>
      </Menu.Popup>
    </Menu.Root>
  );
}
