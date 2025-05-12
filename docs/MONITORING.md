# Monitoring and Analytics

This document outlines the monitoring and analytics setup for the project.

## 1. Web Analytics (Cloudflare)

- **Tool:** Cloudflare Web Analytics
- **Purpose:** Tracks page views, visitors, basic user interactions, and Core Web Vitals for the web application (`apps/web`).
- **Setup:** A JavaScript snippet is included in the main layout (`apps/web/app/layout.tsx`). The specific Cloudflare site token needs to be configured in this snippet (placeholder `YOUR_TOKEN_HERE`).
- **Access:** Analytics data can be viewed in the Cloudflare Dashboard under "Analytics & Logs" > "Web Analytics" for the configured site.
- **Key Metrics Tracked:**
    - Page Views
    - Unique Visitors
    - Top Pages
    - Referrers
    - Device Types
    - Core Web Vitals (LCP, FID, CLS) - Provides application load time insights.

## 2. Technical Success Metrics

- **Definition:** Key technical success metrics are defined in the Product Requirements Document (`docs/PRD.md`, Section 7).
- **Purpose:** These metrics help gauge the technical health, performance, and reliability of the application and backend services.
- **Categories:**
    - API Endpoint Usage (Request Counts)
    - API Error Rates (4xx/5xx percentages)
    - Application Performance (Page Load Time, API Response Time)
    - Core Functionality Success Rates (Note Creation/Sync)
- **Tracking:** Metrics are tracked primarily through:
    - Cloudflare Web Analytics (for frontend performance like Page Load Time).
    - Backend Logging (for API usage, error rates, API response times).

## 3. Backend Logging (Hono)

- **Tool:** Hono Logger Middleware (`hono/logger`)
- **Purpose:** Logs incoming requests and outgoing responses for the backend API (`backend/src/index.ts`). This provides data for tracking API usage and error rates.
- **Setup:** The `logger()` middleware is applied globally in the Hono application instance.
- **Log Format:** The default logger outputs information like:
    - Timestamp (implicitly via console output)
    - HTTP Method (`GET`, `POST`, etc.)
    - Request Path (`/notes`, `/health`)
    - Response Status Code (`200`, `404`, `500`)
    - Response Time (e.g., `15ms`)
- **Access:** Logs are currently output to the standard console where the backend worker/server is running. In a Cloudflare Workers deployment, these can be viewed using `wrangler tail` or within the Cloudflare dashboard logs.
- **Future:** Logs are formatted simply for console output but could potentially be structured (e.g., JSON) and forwarded to a dedicated logging service if needed. 