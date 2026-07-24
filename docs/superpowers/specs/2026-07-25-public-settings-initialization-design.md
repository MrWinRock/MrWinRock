# Public settings initialization

## Goal

Prevent public sections disabled in the admin settings from appearing before the
browser has loaded the authoritative `/api/settings` response.

## Design

The public settings provider will expose a loading state while it retrieves the
runtime settings. The app will render a lightweight loading shell during that
state and will mount the navigation and routes only after the initial request
settles. This preserves deep links: the router first evaluates the requested
path after the visibility settings are available.

When the initial request fails, the provider will use an all-hidden fallback.
This fails closed, so a network or decryption failure cannot expose a section
that the administrator has disabled. Subsequent polling remains unchanged and
can replace the fallback when the API recovers.

## Verification

Add coverage for the initial loading and failure states where the existing test
setup supports it, then run the public frontend's lint and production build.
