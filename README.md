# LaunchDarkly + Google Analytics Configuration 

In this configuration we bootstrap the server components first in `layout.tsx` and pass the context created there into the client components for initialization. We're running a basic server side experiment in `layout.tsx` as well, and we pass the resolved feature flag values into the frontend (`page.tsx`). 

The experiment is under a feature flag called `buyPage`, which resolves 3 different color background cards when ran (slate, orange, blue) as string values. 

In `page.tsx` we're creating a datalayer for the feature flag and LaunchDarkly key that we will use as a sessionId in Google Tag Manager (GTM). 

## Required .env file 

```bash
NEXT_PUBLIC_LD_CLIENT_SDK_KEY='<Client Key>'
LAUNCHDARKLY_SDK_KEY='<Server Key>'
GTMID='<GTM ID>'
```