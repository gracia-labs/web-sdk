# Privacy and data collection

Last updated: 10 November 2026

## Who receives the data

Playback analytics from the SDK are received by Gracia Labs ("Gracia", "we").

## What the SDK collects

For each playback session the SDK sends the following technical data to Gracia:

- a randomly generated viewer ID (created by the SDK, separate for each website, not derived from any user, account, email or device identifier, and kept in the browser's `localStorage` for that website until it is cleared);
- a randomly generated view ID for each page load and for each time the player is closed (kept in memory only);
- the ID of the content item played, or the address of the file played without its query string, and the length of the content item;
- playback events: play, pause, waiting for data, seeking, reaching the end, hiding the page, closing the player, switching between 2D, VR and AR, and a signal every minute of playback, each with its time, the position in the content item, the playback speed and the viewing mode (2D, VR or AR);
- the domain of the website that shows the player and the browser's User-Agent, which the browser sends with each request;
- the SDK version and whether the browser reports that it is controlled by automation software;
- a hash of the IP address the data comes from, made with a secret key that changes every day.

Data that cannot be sent at once is kept in the browser's `localStorage` and sent later, for at most 7 days.

## What the SDK does not collect

Names, email addresses, user, account or subscriber IDs, payment information, IP addresses (used only transiently to limit how often data is accepted and to compute the daily hash, and not stored), advertising or device identifiers, device fingerprints, precise location, and identifiers that persist across websites or applications.

## Why we collect it

To count playback sessions for billing, to prevent fraud and abuse, to maintain the security and reliability of the player, and to produce aggregated usage statistics. We do not sell this data, use it for advertising or profiling, or share it with advertising or third-party analytics services. Service providers that host our systems act on our behalf under written confidentiality and data protection terms.

## Retention and reporting

Raw playback events are deleted or irreversibly aggregated within 1 year. Partners receive aggregated figures only.

## No re-identification

We do not attempt to identify individuals from this data and we require our service providers to follow the same rule.

## Integrators

Integrators must not pass identifying data (including user IDs, email addresses and authentication tokens) to the SDK or configure it to transmit such data. Integrators remain responsible for their own privacy notices, consents and age verification, and should describe their use of this player in their own privacy notice.

## Contact

support@gracia.ai
