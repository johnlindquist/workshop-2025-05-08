# Task: Define OpenAPI Specification for Note-Taking App

## Commit 1: feat: Initialize OpenAPI specification with basic info and server config
**Description:**
Create `docs/openapi.yaml` with OpenAPI version 3.0.3.
Define the `info` block:
- `title`: "Note-Taking App API" (from project goal in `docs/PRD.md`)
- `version`: "1.0.0"
- `description`: "API for creating, reading, updating, and deleting notes for a cross-platform note-taking application." (derived from `docs/PRD.md` core functionality)
Define the `servers` block:
- `url`: "https://api.yourdomain.com/v1" (placeholder, actual domain to be configured via Cloudflare later, as per `docs/TECH_STACK.md` which mentions Cloudflare Pages/Workers)
- `description`: "Production Server"
- `url`: "http://localhost:8787/v1" (placeholder for local Cloudflare Workers dev environment, typically runs on 8787)
- `description`: "Local Development Server"

**Verification:**
- Check that `docs/openapi.yaml` is created.
- Validate the YAML structure using a linter or online validator (e.g., Swagger Editor).
- Confirm all specified `info` and `servers` fields are present and correctly populated.

---

## Commit 2: feat: Define core 'Note' schema and tags
**Description:**
In `docs/openapi.yaml`, add the `tags` section:
- `name`: "Notes"
- `description`: "Operations related to notes."
Define the `components.schemas` section with a `Note` schema. Based on `docs/PRD.md` ("Create, edit, and delete notes") and general note-taking app features, the `Note` schema should include:
- `id`: type string, format uuid, readOnly true (for unique identification)
- `title`: type string (optional, for a note title)
- `content`: type string (the main body of the note)
- `createdAt`: type string, format date-time, readOnly true
- `updatedAt`: type string, format date-time, readOnly true
<!-- TODO: Confirm if other fields like 'tags', 'color', 'isPinned', or 'userId' (if multi-user) are needed for MVP based on a more detailed feature breakdown beyond current PRD. For now, keeping it simple. -->

**Verification:**
- Validate `docs/openapi.yaml` structure.
- Ensure the "Notes" tag is defined.
- Verify the `Note` schema is present under `components.schemas` with `id`, `content`, `createdAt`, and `updatedAt` fields and their specified types/formats. `title` should be optional.

---

## Commit 3: feat: Define CRUD endpoints for Notes
**Description:**
In `docs/openapi.yaml`, define paths for CRUD operations on notes under the `/notes` endpoint, using the "Notes" tag and `Note` schema:
- `POST /notes`: Create a new note.
  - Request body: `application/json` with a schema referencing `#/components/schemas/Note` (excluding readOnly fields like `id`, `createdAt`, `updatedAt`).
  - Response: `201 Created` with the created `Note` object.
- `GET /notes`: Retrieve all notes.
  - Response: `200 OK` with an array of `Note` objects.
- `GET /notes/{noteId}`: Retrieve a specific note by ID.
  - Path parameter: `noteId` (string, format uuid).
  - Response: `200 OK` with the `Note` object or `404 Not Found`.
- `PUT /notes/{noteId}`: Update an existing note.
  - Path parameter: `noteId` (string, format uuid).
  - Request body: `application/json` with a schema referencing `#/components/schemas/Note` (excluding readOnly fields).
  - Response: `200 OK` with the updated `Note` object or `404 Not Found`.
- `DELETE /notes/{noteId}`: Delete a note.
  - Path parameter: `noteId` (string, format uuid).
  - Response: `204 No Content` or `404 Not Found`.

**Verification:**
- Validate `docs/openapi.yaml`.
- Confirm all five CRUD endpoints (`POST /notes`, `GET /notes`, `GET /notes/{noteId}`, `PUT /notes/{noteId}`, `DELETE /notes/{noteId}`) are defined with correct request/response schemas and HTTP status codes.
- Ensure path parameters are correctly defined.
- Check that all operations are tagged with "Notes".

---

## Commit 4: feat: Define security schemes for API authentication
**Description:**
Based on `docs/TECH_STACK.md` (mentions `@hono/jwt` for JWT authentication and "JWT-based authentication for API endpoints"), define security schemes in `docs/openapi.yaml`:
Add `components.securitySchemes`:
- `bearerAuth`:
  - `type`: "http"
  - `scheme`: "bearer"
  - `bearerFormat`: "JWT"
Add a global `security` requirement at the top level:
- `security`:
  - `- bearerAuth: []`
This will apply JWT authentication to all endpoints by default.
<!-- TODO: Confirm if any endpoints should be public (e.g., a health check endpoint) and explicitly mark them with `security: []` if so. For now, all are secured. -->

**Verification:**
- Validate `docs/openapi.yaml`.
- Verify `bearerAuth` security scheme is defined under `components.securitySchemes`.
- Confirm the global `security` section applies `bearerAuth` to the API.

---

## Commit 5: chore: Review and validate final OpenAPI specification
**Description:**
Thoroughly review the entire `docs/openapi.yaml` for consistency, correctness, and completeness.
- Ensure all descriptions are clear and accurate.
- Check for any typos or structural issues.
- Use an OpenAPI validator tool (e.g., `spectral lint docs/openapi.yaml` if Spectral is installed, or an online validator) to ensure the specification is fully compliant.
- Add `ErrorResponse` schema to `components.schemas` for standardized error reporting (e.g., properties: `message`, `code`). Update relevant endpoint responses (e.g., 400, 401, 403, 404, 500) to use this schema.
  - `ErrorResponse`:
    - `type: object`
    - `properties:`
      - `statusCode`: `type: integer` (e.g., 400, 404, 500)
      - `message`: `type: string`
      - `error`: `type: string` (optional, e.g., "Bad Request", "Not Found")

**Verification:**
- Run `spectral lint docs/openapi.yaml` (or equivalent validation command/tool) and ensure it passes without errors or significant warnings.
- Manually review that all previous commit objectives are met and the specification is coherent.
- Confirm a standardized `ErrorResponse` schema is defined and referenced in appropriate error responses (e.g., 404 responses for `GET /notes/{noteId}`). 