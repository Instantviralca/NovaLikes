'use client';

import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react';

import './mollie-card-fields.css';

type MollieConfig = {
  profileId: string;
  testmode: boolean;
  currency: string;
};

type MollieComponent = {
  mount: (el: HTMLElement) => void;
  unmount: () => void;
  addEventListener: (event: string, handler: (event: MollieFieldEvent) => void) => void;
};

type MollieFieldEvent = {
  empty?: boolean;
  valid?: boolean;
  touched?: boolean;
  error?: string | { message?: string };
};

type MollieInstance = {
  createComponent: (type: string, options?: unknown) => MollieComponent;
  createToken: () => Promise<{ token?: string; error?: { message?: string } }>;
};

declare global {
  interface Window {
    Mollie?: (profileId: string, options: { locale?: string; testmode?: boolean }) => MollieInstance;
  }
}

const MOLLIE_SCRIPT_SRC = 'https://js.mollie.com/v1/mollie.js';
const MOLLIE_SCRIPT_ID = 'novalikes-mollie-js';

const FIELD_STYLES = {
  styles: {
    base: {
      color: '#101828',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '24px',
      '::placeholder': { color: '#98a2b3' },
    },
    valid: { color: '#101828' },
    invalid: { color: '#b42318' },
  },
};

export type MollieCardFieldsHandle = {
  createCardToken: () => Promise<string>;
};

type MollieCardFieldsProps = {
  enabled: boolean;
  onReadyChange?: (ready: boolean) => void;
  handleRef?: MutableRefObject<MollieCardFieldsHandle | null>;
};

function errorMessage(err: unknown, fallback: string): string {
  if (err instanceof Error && err.message) return err.message;
  // next/script (and some browsers) reject with a raw Event — never surface "[object Event]".
  if (typeof Event !== 'undefined' && err instanceof Event) {
    return fallback;
  }
  if (typeof err === 'string' && err.trim()) return err;
  return fallback;
}

/**
 * Load Mollie.js without next/script.
 * next/script rejects load failures with a raw Event, which React 19's overlay
 * reports as the useless Runtime Error "[object Event]".
 */
function loadMollieScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Secure payment form is unavailable.'));
  }
  if (typeof window.Mollie === 'function') {
    return Promise.resolve();
  }

  const existing = document.getElementById(MOLLIE_SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      if (typeof window.Mollie === 'function') {
        resolve();
        return;
      }
      const onLoad = () => {
        cleanup();
        if (typeof window.Mollie === 'function') resolve();
        else reject(new Error('Unable to load the secure payment form. Please try again.'));
      };
      const onError = () => {
        cleanup();
        reject(new Error('Unable to load the secure payment form. Please try again.'));
      };
      const cleanup = () => {
        existing.removeEventListener('load', onLoad);
        existing.removeEventListener('error', onError);
      };
      existing.addEventListener('load', onLoad);
      existing.addEventListener('error', onError);
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = MOLLIE_SCRIPT_ID;
    script.src = MOLLIE_SCRIPT_SRC;
    script.async = true;
    script.addEventListener('load', () => {
      if (typeof window.Mollie === 'function') resolve();
      else reject(new Error('Unable to load the secure payment form. Please try again.'));
    });
    script.addEventListener('error', () => {
      script.remove();
      reject(new Error('Unable to load the secure payment form. Please try again.'));
    });
    document.head.appendChild(script);
  });
}

/**
 * Mollie Components card fields — mirrors Woo Mollie Remote Payment Client v2.5.
 */
export function MollieCardFields({
  enabled,
  onReadyChange,
  handleRef,
}: MollieCardFieldsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const mollieRef = useRef<MollieInstance | null>(null);
  const componentsRef = useRef<MollieComponent[]>([]);
  const configRef = useRef<MollieConfig | null>(null);
  const mountedRef = useRef(false);

  const cleanup = useCallback(() => {
    for (const component of componentsRef.current) {
      try {
        component.unmount();
      } catch {
        // DOM may already be gone.
      }
    }
    componentsRef.current = [];
    mollieRef.current = null;
    mountedRef.current = false;
  }, []);

  const mountFields = useCallback(
    (config: MollieConfig) => {
      if (!window.Mollie) {
        throw new Error('Unable to load the secure payment form. Please try again.');
      }
      cleanup();
      const mollie = window.Mollie(config.profileId, {
        locale: 'en_US',
        testmode: Boolean(config.testmode),
      });
      mollieRef.current = mollie;

      const bind = (
        type: string,
        mountId: string,
        errorKey: string,
        fieldId: string,
      ) => {
        const mountEl = document.getElementById(mountId);
        const fieldEl = document.getElementById(fieldId);
        if (!mountEl) throw new Error('Unable to load the secure payment form. Please try again.');
        const component = mollie.createComponent(type, FIELD_STYLES);
        component.mount(mountEl);
        component.addEventListener('focus', () => fieldEl?.classList.add('wrp-mollie-field--focused'));
        component.addEventListener('blur', () => fieldEl?.classList.remove('wrp-mollie-field--focused'));
        component.addEventListener('change', (event) => {
          let message = '';
          const hasValue =
            event.empty === false || Boolean(event.valid) || Boolean(event.error && event.empty !== true);
          if (event.error && event.touched) {
            message =
              typeof event.error === 'string'
                ? event.error
                : event.error.message || 'Please check your card details and try again.';
          }
          setFieldErrors((prev) => ({ ...prev, [errorKey]: message }));
          fieldEl?.classList.toggle('wrp-mollie-field--has-value', hasValue);
          fieldEl?.classList.toggle('wrp-mollie-field--invalid', Boolean(message));
          fieldEl?.classList.toggle('wrp-mollie-field--valid', Boolean(event.valid && event.touched));
        });
        componentsRef.current.push(component);
      };

      bind('cardNumber', 'wrp-mollie-card-number', 'cardNumber', 'wrp-field-card-number');
      bind('expiryDate', 'wrp-mollie-expiry-date', 'expiryDate', 'wrp-field-expiry-date');
      bind(
        'verificationCode',
        'wrp-mollie-verification-code',
        'verificationCode',
        'wrp-field-verification-code',
      );
      bind('cardHolder', 'wrp-mollie-card-holder', 'cardHolder', 'wrp-field-card-holder');
      mountedRef.current = true;
      setLoading(false);
      setError(null);
      onReadyChange?.(true);
    },
    [cleanup, onReadyChange],
  );

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      onReadyChange?.(false);
      try {
        if (!configRef.current) {
          const response = await fetch('/api/payments/mollie-config');
          const data = (await response.json()) as {
            ok?: boolean;
            profileId?: string;
            testmode?: boolean;
            currency?: string;
            error?: string;
          };
          if (!response.ok || !data.ok || !data.profileId) {
            throw new Error(data.error || 'Unable to load the secure payment form. Please try again.');
          }
          configRef.current = {
            profileId: data.profileId,
            testmode: Boolean(data.testmode),
            currency: data.currency || '',
          };
        }
        // Only load Mollie.js after config succeeds — avoids useless CDN/script errors
        // when payments are not configured locally.
        await loadMollieScript();
        if (cancelled) return;
        mountFields(configRef.current);
      } catch (err) {
        if (cancelled) return;
        cleanup();
        setLoading(false);
        setError(errorMessage(err, 'Unable to load the secure payment form.'));
        onReadyChange?.(false);
      }
    })();

    return () => {
      cancelled = true;
      cleanup();
      onReadyChange?.(false);
    };
  }, [enabled, cleanup, mountFields, onReadyChange]);

  useEffect(() => {
    if (!handleRef) return;
    handleRef.current = {
      async createCardToken() {
        if (!mollieRef.current || !mountedRef.current) {
          throw new Error('Secure card form is not ready yet. Please wait a moment and try again.');
        }
        const result = await mollieRef.current.createToken();
        if (result.error || !result.token) {
          throw new Error(
            result.error?.message || 'Please check your card details and try again.',
          );
        }
        return result.token;
      },
    };
    return () => {
      handleRef.current = null;
    };
  }, [handleRef]);

  if (!enabled) return null;

  return (
    <div className="mt-4">
      <div id="wrp-mollie-inline" className="wrp-mollie-inline">
        {loading ? (
          <div id="wrp-mollie-loading" className="wrp-mollie-inline__loading" role="status">
            Loading secure card form…
          </div>
        ) : null}
        <div id="wrp-mollie-card" className="wrp-mollie-inline__card" hidden={loading || Boolean(error)}>
          <label className="wrp-mollie-group-label">Card information</label>
          <div className="wrp-mollie-card-group">
            <div className="wrp-mollie-field wrp-mollie-field--number" id="wrp-field-card-number">
              <div className="wrp-mollie-field__surface">
                <div
                  id="wrp-mollie-card-number"
                  className="wrp-mollie-field__control"
                  aria-label="Card number"
                />
                <span className="wrp-mollie-field__placeholder" aria-hidden="true">
                  1234 1234 1234 1234
                </span>
              </div>
            </div>
            <div className="wrp-mollie-card-group__row">
              <div className="wrp-mollie-field" id="wrp-field-expiry-date">
                <div className="wrp-mollie-field__surface">
                  <div
                    id="wrp-mollie-expiry-date"
                    className="wrp-mollie-field__control"
                    aria-label="Expiry date"
                  />
                </div>
              </div>
              <div className="wrp-mollie-field" id="wrp-field-verification-code">
                <div className="wrp-mollie-field__surface">
                  <div
                    id="wrp-mollie-verification-code"
                    className="wrp-mollie-field__control"
                    aria-label="Security code"
                  />
                  <span className="wrp-mollie-field__placeholder" aria-hidden="true">
                    CVC
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="wrp-mollie-field__error" aria-live="polite">
            {fieldErrors.cardNumber}
          </div>
          <div className="wrp-mollie-field__error" aria-live="polite">
            {fieldErrors.expiryDate}
          </div>
          <div className="wrp-mollie-field__error" aria-live="polite">
            {fieldErrors.verificationCode}
          </div>
          <div className="wrp-mollie-field wrp-mollie-field--holder" id="wrp-field-card-holder">
            <label htmlFor="wrp-mollie-card-holder">Card holder</label>
            <div className="wrp-mollie-field__surface">
              <div id="wrp-mollie-card-holder" className="wrp-mollie-field__control" />
              <span className="wrp-mollie-field__placeholder" aria-hidden="true">
                Full name on card
              </span>
            </div>
            <div className="wrp-mollie-field__error" aria-live="polite">
              {fieldErrors.cardHolder}
            </div>
          </div>
        </div>
        {error ? (
          <div className="wrp-mollie-inline__error" role="alert">
            {error}
          </div>
        ) : null}
        <a
          className="wrp-mollie-inline__powered"
          href="https://www.mollie.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            Powered by <strong>mollie</strong>
          </span>
        </a>
      </div>
    </div>
  );
}
