-- LD Query (variation + context key) coming from LD Data Export 

SELECT
  user,
  variation
FROM (
  SELECT
    JSON_EXTRACT_SCALAR(data, '$.event.contextKeys.user') AS user,
    JSON_EXTRACT_SCALAR(data, '$.event.value') AS variation
  FROM
    `tokyo-charge-165115.ldf.flag`
) AS subquery
WHERE
  user IS NOT NULL
AND
  variation IS NOT NULL;

-- GA4 Query (dimension event params - Variation + Session ID) coming from GA4 to Google Pub/Sub and then BigQuery Sync
-- Note: Must be updated for daily run

SELECT
event_name,
event_param1.value.string_value AS session,
event_param2.value.string_value AS variation
FROM `tokyo-charge-165115.analytics_436765282.events_intraday_20240421`,
UNNEST(event_params) AS event_param1,
UNNEST(event_params) as event_param2
WHERE event_param1.key = 'sessionId' 
AND event_param2.key = 'variation'
AND event_name = 'ld-data'