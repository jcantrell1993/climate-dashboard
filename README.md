# Climate Catastrophe Dashboard

Real-time global climate data visualization with impacts from WMO, IPCC, NOAA, NASA and other authoritative sources.

## Overview

This is a single-page HTML dashboard that visualizes the latest climate crisis data globally. Updated weekly with current information on droughts, heatwaves, flooding, hurricanes, and other extreme weather events.

## Live

The dashboard is deployed at: https://climate-dashboard.vercel.app

## Local Development

Just open `index.html` in a browser. No build step required.

## Updating the Dashboard

The dashboard data is embedded directly in `index.html`. To update it:

1. Research latest climate data from authoritative sources (WMO, IPCC, NOAA, NASA, etc.)
2. Edit the data in `index.html` — look for the data structures at the top of the `<script>` section
3. Commit and push to GitHub
4. Vercel auto-deploys on every push

## Data Sources

- **WMO** — Global climate reports and temperature data
- **IPCC** — Intergovernmental Panel on Climate Change reports
- **NOAA** — US weather and ocean data
- **NASA** — Climate science and satellite data

## Technology

- Single HTML file (no external dependencies except CDN libraries)
- Chart.js for charts
- D3.js for map visualization
- Responsive design for all devices
