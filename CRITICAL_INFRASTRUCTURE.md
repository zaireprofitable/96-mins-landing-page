# Critical Infrastructure Components

## Analytics Implementation
The Simple Analytics script in `app/layout.tsx` is **CRITICAL** for business operations. It provides essential metrics and MUST NOT be removed or modified without explicit approval.

### Protected Components:
- Simple Analytics script in `app/layout.tsx`
  - Purpose: Site analytics and business metrics
  - Status: REQUIRED
  - Owner: @allenzaire

## Change Protocol
1. Changes to `layout.tsx` require explicit review
2. Analytics implementation must not be removed
3. Any modifications to analytics must be approved by site owner

## Verification Steps
Before deploying changes to `layout.tsx`:
1. Verify Simple Analytics script is present
2. Ensure script configuration is intact
3. Test analytics in staging environment if possible
