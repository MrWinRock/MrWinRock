---
name: modern-portfolio-ui
description: Design and refine modern, stylish developer portfolios and personal websites when visual hierarchy, project presentation, responsive layouts, or a distinctive identity need improvement. Use within the existing framework and brand; general application dashboards are outside this skill's scope.
---

# Modern Portfolio UI

Make the person memorable and their work easy to assess. A portfolio should reveal identity, relevant work, and a clear next action before decoration competes for attention.

## Establish the visual brief

Inspect the existing homepage, shared styles, project model, assets, translations, and content controls. Preserve working navigation and publishing states. Identify the audience and the visitor's main action from the request and content; ask only when a missing answer materially changes the design.

Choose a coherent direction suited to the person: dark editorial, bright typographic, or expressive studio are useful starting points, not prescribed themes. State the direction, its signature visual gesture, and the implementation scope. Follow any applicable approval requirements before implementation.

## Turn the direction into decisions

- Give the hero one typographic focal point and one dominant action. Treat secondary links as a quieter tier. Size long names against their actual glyph widths, not just the viewport; use intentional first-name/surname styling without clipping or mid-word Latin breaks.
- Use a signature element built from real assets: a framed identity, an unusual composition, or a carefully composed project image. Keep decorative geometry noninteractive and hidden from assistive technology. Avoid adding fabricated terminals, testimonials, availability indicators, or experience metrics for visual effect.
- Define reusable surface, ink, muted, accent, border, spacing, radius, and motion tokens. Use accent color to establish hierarchy; reserve elaborate effects for the focal element instead of applying gradient borders to every surface.
- Match project layouts to available evidence. Show supplied screenshots in a neutral stage, preserving interface details with contain where appropriate. For records without images, use an intentional text-led composition; never invent screenshots or content to fill a template. Keep detail, live, and source actions distinct.
- Make hover and keyboard focus equally clear. Use restrained transforms and transitions, respect reduced motion, and keep meaningful content present without requiring animation to finish.
- Design narrow screens as deliberate compositions. Keep the identity visible when it helps recognition; simplify decorative elements before shrinking readable text or removing primary actions. Use at least 44px touch targets.
- For multilingual sites, inspect the longest translated strings and each script. Thai needs natural word segmentation, generous line height, and normal tracking rather than Latin display typography rules. Localize new visible copy in the site's existing translation system.

## Verify the result

Run the existing relevant tests, lint, and production build. Add behavior tests only for actual new behavior, not assertions that mirror CSS or wording.

Inspect rendered desktop and phone screens, both languages when applicable, and a long-content case. Check the full page for overflow, awkward name wraps, project-image placement, focus visibility, contrast, and cramped controls. Exercise navigation and content states relevant to edited components, including hidden sections and unavailable data. Use existing local content or explicitly mocked browser fixtures for QA without changing production publishing defaults.

Deliver the changed source and a working local preview or screenshots. Distinguish what was verified from what remains untested. Local implementation does not imply authorization to deploy or change public content.
